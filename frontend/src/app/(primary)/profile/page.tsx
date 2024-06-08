"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { RegisterSchema, RegisterFormData } from "@/schema";
import { api } from "@/service/api";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/CardWrapper/CardWrapper";

const ProfilePage = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<RegisterFormData | null>(null);
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      profession: undefined, 
      interests: [],
      bio: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/api/v1/user/${userId}`);
        setUserData(response.data);
        form.reset(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      await api.put(`/api/v1/user/${userId}`, data);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    setLoading(true);
    try {
      await api.delete(`/api/v1/user/${userId}`);
      router.push('/register');
    } catch (error) {
      console.error("Failed to delete account", error);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <CardWrapper
      label="Your Profile"
      title="Profile"
      backButtonHref="/"
      backButtonLabel="Back to Home"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Profile Information</h2>
            <Button onClick={deleteAccount} className="bg-red-500 hover:bg-red-600 text-white">
              Delete Account
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Profession:</strong> {userData.profession}</p>
            <div>
              <strong>Interests:</strong>
              <ul>
                {userData.interests.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="johndoe@gmail.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <select {...field} className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                      <option value="">Select Profession</option>
                      <option value="Marketing Professional">Marketing Professional</option>
                      <option value="Entrepreneur">Entrepreneur</option>
                      <option value="Content Creator">Content Creator</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interests</FormLabel>
                  <FormControl>
                    <textarea {...field} placeholder="Enter your interests" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Update Profile"}
            </Button>
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
};

export default ProfilePage;
