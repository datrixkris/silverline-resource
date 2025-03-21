"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { api } from "@/app/axiosApi/api";

// Schema for password validation
const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function ResetPasswordPreview() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!token) {
      toast({
        title: "Invalid Token",
        description: "Reset password link is invalid or expired.",
        variant: "destructive",
      });
      return;
    }

    try {
      await api.post(`/users/reset-password/${token}`, values);
      toast({
        title: "Password reset successful",
        description: "You can now log in with your new password.",
      });
    } catch (error) {
      console.error("Error resetting password", error);
      toast({
        title: "Error resetting password",
        description: "Failed to reset the password. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex min-h-screen h-full w-full items-center justify-center">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                {/* New Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="password">New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="password"
                            className="pe-9"
                            placeholder="******"
                            type={passwordVisible ? "text" : "password"}
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setPasswordVisible((prev) => !prev)}
                            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
                            aria-label={
                              passwordVisible ? "Hide password" : "Show password"
                            }
                          >
                            {passwordVisible ? (
                              <EyeOffIcon size={16} aria-hidden="true" />
                            ) : (
                              <EyeIcon size={16} aria-hidden="true" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            className="pe-9"
                            placeholder="******"
                            type={confirmPasswordVisible ? "text" : "password"}
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setConfirmPasswordVisible((prev) => !prev)}
                            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
                            aria-label={
                              confirmPasswordVisible ? "Hide password" : "Show password"
                            }
                          >
                            {confirmPasswordVisible ? (
                              <EyeOffIcon size={16} aria-hidden="true" />
                            ) : (
                              <EyeIcon size={16} aria-hidden="true" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
