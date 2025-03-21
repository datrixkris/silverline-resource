"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Search,
  PlusCircle,
} from "lucide-react";
import { fetchSliders, createSlider, updateSlider, deleteSlider, Slider } from "@/app/api/slider";
import Loader from "@/components/loader";

export default function SliderPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSlider, setCurrentSlider] = useState<Slider | null>(null);
  const [newSlider, setNewSlider] = useState({
    title: "",
    content: "",
    image: "" as string | File,
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch sliders
  const { data: sliders = [], isLoading, error } = useQuery<Slider[], Error>({
    queryKey: ["sliders"],
    queryFn: fetchSliders,
  });

  // Create slider mutation
  const createSliderMutation = useMutation({
    mutationFn: (sliderData: Omit<Slider, "id">) => createSlider(sliderData),
    onSuccess: (newSlider) => {
      queryClient.invalidateQueries({ queryKey: ["sliders"] });
      toast({
        title: "Slider created",
        description: `${newSlider.title} has been added successfully.`,
      });
      setIsCreateDialogOpen(false);
      setNewSlider({ title: "", content: "", image: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create slider. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update slider mutation
  const updateSliderMutation = useMutation({
    mutationFn: (sliderData: Omit<Slider, "id">) =>
      updateSlider(currentSlider!.id, sliderData),
    onSuccess: (updatedSlider) => {
      queryClient.invalidateQueries({ queryKey: ["sliders"] });
      toast({
        title: "Slider updated",
        description: `${updatedSlider.title} has been updated.`,
      });
      setIsEditDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update slider. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete slider mutation
  const deleteSliderMutation = useMutation({
    mutationFn: (id: string) => deleteSlider(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sliders"] });
      toast({
        title: "Slider deleted",
        description: `${currentSlider?.title} has been removed.`,
      });
      setIsDeleteDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete slider. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Upload image to Cloudinary
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
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) throw new Error("Cloudinary upload failed");
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading picture:", error);
      toast({
        title: "Upload Failed",
        description: "Could not upload image. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const isFile = (image: string | File): image is File => {
    return image instanceof File;
  };

  const filteredSliders = sliders.filter(
    (slider) =>
      slider.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slider.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateSlider = async () => {
    let imageUrl = typeof newSlider.image === "string" ? newSlider.image : "";
    if (isFile(newSlider.image)) {
      toast({ title: "Uploading Image...", description: "Please wait." });
      const uploadedUrl = await uploadImageToCloudinary(newSlider.image);
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    createSliderMutation.mutate({
      title: newSlider.title,
      content: newSlider.content,
      image: imageUrl,
    });
  };

  const handleEditSlider = async () => {
    if (!currentSlider) return;

    let imageUrl = typeof currentSlider.image === "string" ? currentSlider.image : "";
    if (isFile(currentSlider.image)) {
      toast({ title: "Uploading Image...", description: "Please wait." });
      const uploadedUrl = await uploadImageToCloudinary(currentSlider.image);
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    updateSliderMutation.mutate({
      title: currentSlider.title,
      content: currentSlider.content,
      image: imageUrl,
    });
  };

  const handleDeleteSlider = () => {
    if (!currentSlider) return;
    deleteSliderMutation.mutate(currentSlider.id);
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading sliders: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Sliders</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Slider
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search sliders..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSliders.length === 0 ? (
          <div className="col-span-full flex h-40 items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">No sliders found.</p>
          </div>
        ) : (
          filteredSliders.map((slider) => (
            <Card key={slider.id}>
              <CardHeader className="p-0">
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={slider.image}
                    alt={slider.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{slider.title}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setCurrentSlider(slider);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setCurrentSlider(slider);
                          setIsDeleteDialogOpen(true);
                        }}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="mt-2 line-clamp-2">
                  {slider.content}
                </CardDescription>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Create Slider Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Slider</DialogTitle>
            <DialogDescription>
              Create a new slider with title, content, and image.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewSlider({
                    ...newSlider,
                    image: e.target.files?.[0] || "",
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newSlider.title}
                onChange={(e) =>
                  setNewSlider({ ...newSlider, title: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                rows={3}
                value={newSlider.content}
                onChange={(e) =>
                  setNewSlider({ ...newSlider, content: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateSlider}
              disabled={createSliderMutation.isPending}
            >
              {createSliderMutation.isPending ? "Creating..." : "Create Slider"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Slider Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Slider</DialogTitle>
            <DialogDescription>
              Update slider details and image.
            </DialogDescription>
          </DialogHeader>
          {currentSlider && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-image">Image</Label>
                <Input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setCurrentSlider({
                      ...currentSlider,
                      image: e.target.files?.[0]
                        ? URL.createObjectURL(e.target.files[0])
                        : currentSlider.image,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={currentSlider.title}
                  onChange={(e) =>
                    setCurrentSlider({
                      ...currentSlider,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  rows={3}
                  value={currentSlider.content}
                  onChange={(e) =>
                    setCurrentSlider({
                      ...currentSlider,
                      content: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditSlider}
              disabled={updateSliderMutation.isPending}
            >
              {updateSliderMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Slider Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Slider</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this slider? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentSlider && (
            <div className="py-4">
              <h3 className="font-medium">{currentSlider.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {currentSlider.content}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteSlider}
              disabled={deleteSliderMutation.isPending}
            >
              {deleteSliderMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}