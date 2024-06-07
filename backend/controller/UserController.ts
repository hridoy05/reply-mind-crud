import { NextFunction, Request, Response } from 'express';
import { prisma } from '../prisma/prismaDB';
import jwt from 'jsonwebtoken';
import { BadRequestError, NotFoundError, ServerError } from '../global-errors/error-handler';
import { hashSync, compareSync } from 'bcrypt';
import { JWT_SECRET } from '../secrets';

// Signup
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, bio, professionId, interests } = req.body;

    let user = await prisma.user.findFirst({ where: { email } });
    if (user) {
      return next(new BadRequestError('User already exists!'));
    }

    const hashedPassword = hashSync(password, 10);
    const createUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        bio,
        profession: { connect: { id: professionId } },
        interests: {
          connect: interests.map((interestId: number) => ({ id: interestId })),
        },
      },
    });

    return res.json(createUser);
  } catch (error) {
    next(new ServerError('Server error'));
  }
};

// Login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    let user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new NotFoundError('User not found.');
    }
    if (!compareSync(password, user.password)) {
      throw new BadRequestError('Incorrect password');
    }

    const token = jwt.sign({
      userId: user.id,
    }, JWT_SECRET);

    return res.json({ user, token });
  } catch (error) {
    next(error);
  }
};

// Get info of currently logged in user
export const getAuthenticatedUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (req as any).user.id },
    });
    return res.json(user);
  } catch (err) {
    next(err);
  }
};

// Update user
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { bio, professionId, interests } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { interests: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updateData: any = {};
    if (bio) updateData.bio = bio;

    if (professionId) {
      const profession = await prisma.profession.findUnique({ where: { id: professionId } });
      if (!profession) {
        return res.status(400).json({ error: 'Invalid profession ID' });
      }
      updateData.professionId = professionId;
    }

    if (interests && interests.length > 0) {
      const validInterests = await prisma.interest.findMany({
        where: { id: { in: interests }, professionId: professionId || user.professionId },
      });

      if (validInterests.length !== interests.length) {
        return res.status(400).json({ error: 'Some interests are invalid for the specified profession' });
      }

      await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          interests: {
            set: interests.map((interestId: number) => ({ id: interestId })),
          },
        },
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        profession: true,
        interests: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'User update failed' });
  }
};

// Delete user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'User deletion failed' });
  }
};
