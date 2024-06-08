import * as z from 'zod';

export const RegisterSchema = z.object({
    email: z.string().email("Invalid email address").min(1),
    name: z.string().min(1),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    profession: z.enum(["Marketing Professional", "Entrepreneur", "Content Creator"]),
    interests: z.array(z.string()),
    bio: z.string().max(50),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
})
})