"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { fetchStaffMember, updateStaff, Staff } from "@/app/api/staff";

export default function EditStaffPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Define all Hooks at the top
  const [staff, setStaff] = useState({
    name: "",
    position: "",
    picture: "" as string | File,
  });

  const { data, isLoading, error } = useQuery<Staff, Error>({
    queryKey: ["staff", id],
    queryFn: () => fetchStaffMember(id),
  });

  const updateStaffMutation = useMutation({
    mutationFn: (staffData: Omit<Staff, "id">) => updateStaff(id, staffData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      toast({
        title: "Staff Updated",
        description: `${staff.name} has been updated.`,
      });
      router.push("/dashboard/staffs");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update staff.",
        variant: "destructive",
      });
    },
  });

  // Set initial staff data when fetched
  if (data && staff.name === "" && !isLoading) {
    setStaff(data);
  }

  // Early returns after all Hooks are called
  if (error) {
    toast({
      title: "Error",
      description: "Failed to fetch staff data.",
      variant: "destructive",
    });
    router.push("/dashboard/staffs");
    return null;
  }

  if (isLoading) {
    return <div>Loading staff member...</div>;
  }

  // Image upload function
  const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "default_preset"
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      if (!response.ok) throw new Error("Cloudinary upload failed");
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Could not upload image.",
        variant: "destructive",
      });
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // Type guard for File
  const isFile = (picture: string | File): picture is File => {
    return picture instanceof File;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let pictureUrl = typeof staff.picture === "string" ? staff.picture : "";

    if (isFile(staff.picture)) {
      toast({ title: "Uploading Image...", description: "Please wait." });
      const uploadedUrl = await uploadImageToCloudinary(staff.picture);
      if (!uploadedUrl) return;
      pictureUrl = uploadedUrl;
    }

    updateStaffMutation.mutate({
      name: staff.name || "",
      position: staff.position || "",
      picture: pictureUrl,
    });
  };

  // Render the form
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Edit Staff</h1>
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
                value={staff.name || ""}
                onChange={(e) => setStaff({ ...staff, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={staff.position || ""}
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
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setStaff({ ...staff, picture: file });
                  }
                }}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
              disabled={updateStaffMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateStaffMutation.isPending}>
              {updateStaffMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}