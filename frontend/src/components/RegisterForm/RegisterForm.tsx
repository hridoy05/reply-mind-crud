"use client"
import CardWrapper from "../CardWrapper/CardWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      profession: "", // Add profession field
      interests: [], // Add interests field
      bio: "", // Add bio field
    },
  });

  const onSubmit = (data: any) => {
    setLoading(true);
    router.push('/home')
    console.log(data);
  };

  const { pending } = useFormStatus();

  // Interest options based on profession
  const interestsOptions = {
    "Marketing Professional": [
      "Growth marketing",
      "Digital Marketing",
      "Product Marketing",
      "Paid marketing",
      "Organic marketing",
    ],
    Entrepreneur: [
      "Startup enthusiast",
      "SME",
      "Product enthusiast",
      "Product Leader",
      "Product owner",
    ],
    "Content Creator": [
      "Youtube",
      "Twitch",
      "Twitter",
      "Video Content",
    ],
  };

  return (
    <CardWrapper
      label="Create an account"
      title="Register"
      backButtonHref="/login"
      backButtonLabel="Already have an account? Login here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
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
            {form.watch("profession") && (
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests</FormLabel>
                    <div className="space-y-2">
                      {interestsOptions[form.watch("profession") as keyof typeof interestsOptions].map((interest: string, index: number) => (
                        <label key={index} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            {...field}
                            value={interest}
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                          <span className="ml-2">{interest}</span>
                        </label>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio (Under 50 words)</FormLabel>
                  <FormControl>
                    <textarea {...field} maxLength={50} rows={3} className="block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            {loading ? "Loading..." : "Register"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
