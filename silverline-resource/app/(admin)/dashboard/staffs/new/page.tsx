"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createStaff, Staff } from "@/app/api/staff";

export default function NewStaffPage() {
  const [staff, setStaff] = useState({ name: "", position: "", picture: "" as string | File });
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "default_preset");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      if (!response.ok) throw new Error("Cloudinary upload failed");
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      toast({ title: "Upload Failed", description: "Could not upload image.", variant: "destructive" });
      console.error("Error creating product:", error)
      return null;
    }
  };

  const createStaffMutation = useMutation({
    mutationFn: (staffData: Omit<Staff, "id">) => createStaff(staffData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      toast({ title: "Staff Created", description: `${staff.name} has been added.` });
      router.push("/dashboard/staffs");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create staff.", variant: "destructive" });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let pictureUrl = typeof staff.picture === "string" ? staff.picture : "";
    if (staff.picture instanceof File) {
      toast({ title: "Uploading Image...", description: "Please wait." });
      pictureUrl = (await uploadImageToCloudinary(staff.picture)) || "";
      if (!pictureUrl) return;
    }

    createStaffMutation.mutate({
      name: staff.name,
      position: staff.position,
      picture: pictureUrl,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Add New Staff</h1>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Staff Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={staff.name}
                onChange={(e) => setStaff({ ...staff, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={staff.position}
                onChange={(e) => setStaff({ ...staff, position: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="picture">Picture</Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={(e) => setStaff({ ...staff, picture: e.target.files?.[0] || "" })}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={createStaffMutation.isPending}>
              {createStaffMutation.isPending ? "Creating..." : "Create Staff"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}