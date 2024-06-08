// "use client";
// import CardWrapper from "../CardWrapper/CardWrapper";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { RegisterSchema, RegisterFormData } from "@/schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { api } from "@/service/api";

// const RegisterForm = () => {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
  
//   const form = useForm<RegisterFormData>({
//     resolver: zodResolver(RegisterSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       confirmPassword: "",
//       profession: undefined, 
//       interests: [],
//       bio: "",
//     },
//   });

//   const onSubmit = async (data: RegisterFormData) => {
//     console.log('Form Submitted:', data);
//     setLoading(true);
//     try {
//       const response = await api.post('/user/signup', data);
//       console.log('API Response:', response);
//       router.push('/login');
//     } catch (error) {
//       console.error("Failed to register", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const interestsOptions = {
//     "Marketing Professional": [
//       "Growth marketing",
//       "Digital Marketing",
//       "Product Marketing",
//       "Paid marketing",
//       "Organic marketing",
//     ],
//     "Entrepreneur": [
//       "Startup enthusiast",
//       "SME",
//       "Product enthusiast",
//       "Product Leader",
//       "Product owner",
//     ],
//     "Content Creator": [
//       "Youtube",
//       "Twitch",
//       "Twitter",
//       "Video Content",
//     ],
//   };

//   return (
//     <CardWrapper
//       label="Create an account"
//       title="Register"
//       backButtonHref="/login"
//       backButtonLabel="Already have an account? Login here."
//     >
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <div className="space-y-4">
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       type="email"
//                       placeholder="johndoe@gmail.com"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input {...field} type="password" placeholder="******" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="confirmPassword"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Confirm Password</FormLabel>
//                   <FormControl>
//                     <Input {...field} type="password" placeholder="******" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="profession"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Profession</FormLabel>
//                   <FormControl>
//                     <select {...field} className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
//                       <option value="">Select Profession</option>
//                       <option value="Marketing Professional">Marketing Professional</option>
//                       <option value="Entrepreneur">Entrepreneur</option>
//                       <option value="Content Creator">Content Creator</option>
//                     </select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {form.watch("profession") && (
//               <FormField
//                 control={form.control}
//                 name="interests"
//                 render={() => (
//                   <FormItem>
//                     <FormLabel>Interests</FormLabel>
//                     <div className="space-y-2">
//                       {interestsOptions[form.watch("profession") as keyof typeof interestsOptions].map((interest: string, index: number) => (
//                         <label key={index} className="inline-flex items-center">
//                           <input
//                             type="checkbox"
//                             value={interest}
//                             checked={form.watch("interests").includes(interest)}
//                             onChange={() => {
//                               const currentInterests = form.watch("interests");
//                               const newInterests = currentInterests.includes(interest)
//                                 ? currentInterests.filter((i: string) => i !== interest)
//                                 : [...currentInterests, interest];
//                               form.setValue("interests", newInterests);
//                             }}
//                             className="form-checkbox h-5 w-5 text-blue-600"
//                           />
//                           <span className="ml-2">{interest}</span>
//                         </label>
//                       ))}
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             )}
//             <FormField
//               control={form.control}
//               name="bio"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Bio (Under 50 words)</FormLabel>
//                   <FormControl>
//                     <textarea {...field} maxLength={50} rows={3} className="block w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <Button type="submit" className="w-full" disabled={loading}>
//             {loading ? "Loading..." : "Register"}
//           </Button>
//         </form>
//       </Form>
//     </CardWrapper>
//   );
// };

// export default RegisterForm;


"use client";
import CardWrapper from "../CardWrapper/CardWrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RegisterSchema, RegisterFormData } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/service/api";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
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

  const onSubmit = async (data: RegisterFormData) => {
    console.log('Form Submitted:', data);
    setLoading(true);
    try {
      const response = await api.post('/user/signup', data);
      console.log('API Response:', response);
      router.push('/login');
    } catch (error) {
      console.error("Failed to register", error);
    } finally {
      setLoading(false);
    }
  };

  const professionOptions = [
    { value: "Marketing Professional", label: "Marketing Professional" },
    { value: "Entrepreneur", label: "Entrepreneur" },
    { value: "Content Creator", label: "Content Creator" },
  ];

  const interestsOptions = {
    "Marketing Professional": [
      "Growth marketing",
      "Digital Marketing",
      "Product Marketing",
      "Paid marketing",
      "Organic marketing",
    ],
    "Entrepreneur": [
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
                    <Select
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      placeholder="Select Profession"
                    >
                      {professionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("profession") && (
              <FormField
                control={form.control}
                name="interests"
                render={() => (
                  <FormItem>
                    <FormLabel>Interests</FormLabel>
                    <FormControl>
                      <Select
                        value={form.watch("interests")}
                        onChange={(value) => form.setValue("interests", value)}
                        placeholder="Select Interests"
                      >
                        {interestsOptions[form.watch("profession") as keyof typeof interestsOptions].map((interest) => (
                          <SelectItem key={interest} value={interest}>
                            {interest}
                          </SelectItem>
                        ))}
                      </Select>
                    </FormControl>
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Register"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;