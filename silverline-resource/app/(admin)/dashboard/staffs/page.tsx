"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { MoreHorizontal, Trash2, Search, UserPlus } from "lucide-react";
import Link from "next/link";
import { fetchStaff, deleteStaff, updateStaff, Staff } from "@/app/api/staff";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [editForm, setEditForm] = useState<Omit<Staff, "id">>({
    name: "",
    position: "",
    picture: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: staff = [], isLoading, error } = useQuery<Staff[], Error>({
    queryKey: ["staff"],
    queryFn: fetchStaff,
  });

  const deleteStaffMutation = useMutation({
    mutationFn: (id: string) => deleteStaff(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      toast({
        title: "Staff deleted",
        description: "Staff member has been removed.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete staff. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateStaffMutation = useMutation({
    mutationFn: ({ id, staffData }: { id: string; staffData: Omit<Staff, "id"> }) =>
      updateStaff(id, staffData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      toast({
        title: "Staff Updated",
        description: `${selectedStaff?.name} has been updated.`,
      });
      setIsEditModalOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update staff.",
        variant: "destructive",
      });
    },
  });

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

  const handleEditClick = (member: Staff) => {
    setSelectedStaff(member);
    setEditForm({
      name: member.name,
      position: member.position,
      picture: member.picture,
    });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditForm((prev) => ({ ...prev, picture: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let pictureUrl = editForm.picture;

    if (editForm.picture instanceof File) {
      const uploadedUrl = await uploadImageToCloudinary(editForm.picture);
      if (!uploadedUrl) return;
      pictureUrl = uploadedUrl;
    }

    if (selectedStaff) {
      updateStaffMutation.mutate({
        id: selectedStaff.id,
        staffData: {
          name: editForm.name,
          position: editForm.position,
          picture: pictureUrl,
        },
      });
    }
  };

  const filteredStaff = staff.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div>Loading staff...</div>;
  if (error) return <div>Error loading staff: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Staff</h1>
        <Button asChild>
          <Link href="/dashboard/staffs/new">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Staff
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search staff..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStaff.length === 0 ? (
          <div className="col-span-full flex h-40 items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">No staff found.</p>
          </div>
        ) : (
          filteredStaff.map((member) => (
            <Card key={member.id}>
              <CardHeader className="p-0">
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={typeof member.picture === "string" ? member.picture : "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{member.position}</p>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <Button variant="outline" onClick={() => handleEditClick(member)}>
                  Edit
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => deleteStaffMutation.mutate(member.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Edit Staff Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Staff</DialogTitle>
            <DialogDescription>
              Update the details of the staff member below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                placeholder="Enter staff name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                value={editForm.position}
                onChange={handleInputChange}
                placeholder="Enter staff position"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="picture">Picture</Label>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {typeof editForm.picture === "string" && editForm.picture && (
                <div className="relative w-40 h-24 mt-2">
                  <Image
                    src={editForm.picture}
                    alt="Current Image"
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}