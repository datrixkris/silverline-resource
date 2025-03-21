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
import { fetchServices, createService, updateService, deleteService, Service } from "@/app/api/services";
import Loader from "@/components/loader";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);
  const [newService, setNewService] = useState({
    title: "",
    lightThemeIcon: "" as string | File,
    darkThemeIcon: "" as string | File,
    description: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch services
  const { data: services = [], isLoading, error } = useQuery<Service[], Error>({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  // Create service mutation
  const createServiceMutation = useMutation({
    mutationFn: (serviceData: Omit<Service, "id">) => createService(serviceData),
    onSuccess: (newService) => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Service created",
        description: `${newService.title} has been added successfully.`,
      });
      setIsCreateDialogOpen(false);
      setNewService({ title: "", lightThemeIcon: "", darkThemeIcon: "", description: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create service. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update service mutation
  const updateServiceMutation = useMutation({
    mutationFn: (serviceData: Omit<Service, "id">) =>
      updateService(currentService!.id, serviceData),
    onSuccess: (updatedService) => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Service updated",
        description: `${updatedService.title} has been updated.`,
      });
      setIsEditDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update service. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete service mutation
  const deleteServiceMutation = useMutation({
    mutationFn: (id: string) => deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "Service deleted",
        description: `${currentService?.title} has been removed.`,
      });
      setIsDeleteDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete service. Please try again.",
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
        description: "Could not upload icon. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const isFile = (icon: string | File): icon is File => {
    return icon instanceof File;
  };

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateService = async () => {
    let lightIconUrl = typeof newService.lightThemeIcon === "string" ? newService.lightThemeIcon : "";
    let darkIconUrl = typeof newService.darkThemeIcon === "string" ? newService.darkThemeIcon : "";

    if (isFile(newService.lightThemeIcon)) {
      toast({ title: "Uploading Light Icon...", description: "Please wait." });
      const uploadedUrl = await uploadImageToCloudinary(newService.lightThemeIcon);
      if (!uploadedUrl) return;
      lightIconUrl = uploadedUrl;
    }

    if (isFile(newService.darkThemeIcon)) {
      toast({ title: "Uploading Dark Icon...", description: "Please wait." });
      const uploadedUrl = await uploadImageToCloudinary(newService.darkThemeIcon);
      if (!uploadedUrl) return;
      darkIconUrl = uploadedUrl;
    }

    createServiceMutation.mutate({
      title: newService.title,
      lightThemeIcon: lightIconUrl,
      darkThemeIcon: darkIconUrl,
      description: newService.description,
    });
  };

  const handleEditService = async () => {
    if (!currentService) return;

    let lightIconUrl = typeof currentService.lightThemeIcon === "string" ? currentService.lightThemeIcon : "";
    let darkIconUrl = typeof currentService.darkThemeIcon === "string" ? currentService.darkThemeIcon : "";

    if (isFile(currentService.lightThemeIcon)) {
      toast({ title: "Uploading Light Icon...", description: "Please wait." });
      const uploadedUrl = await uploadImageToCloudinary(currentService.lightThemeIcon);
      if (!uploadedUrl) return;
      lightIconUrl = uploadedUrl;
    }

    if (isFile(currentService.darkThemeIcon)) {
      toast({ title: "Uploading Dark Icon...", description: "Please wait." });
      const uploadedUrl = await uploadImageToCloudinary(currentService.darkThemeIcon);
      if (!uploadedUrl) return;
      darkIconUrl = uploadedUrl;
    }

    updateServiceMutation.mutate({
      title: currentService.title,
      lightThemeIcon: lightIconUrl,
      darkThemeIcon: darkIconUrl,
      description: currentService.description,
    });
  };

  const handleDeleteService = () => {
    if (!currentService) return;
    deleteServiceMutation.mutate(currentService.id);
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading services: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Services</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search services..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.length === 0 ? (
          <div className="col-span-full flex h-40 items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">No services found.</p>
          </div>
        ) : (
          filteredServices.map((service) => (
            <Card key={service.id}>
              <CardHeader className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12">
                    <Image
                      src={service.lightThemeIcon}
                      alt={`${service.title} light icon`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between">
                  <div className="relative h-12 w-12">
                    <Image
                      src={service.darkThemeIcon}
                      alt={`${service.title} dark icon`}
                      fill
                      className="object-contain"
                    />
                  </div>
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
                          setCurrentService(service);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setCurrentService(service);
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
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Create Service Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new service with title, icons, and description.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="light-icon">Light Theme Icon</Label>
              <Input
                id="light-icon"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    lightThemeIcon: e.target.files?.[0] || "",
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dark-icon">Dark Theme Icon</Label>
              <Input
                id="dark-icon"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewService({
                    ...newService,
                    darkThemeIcon: e.target.files?.[0] || "",
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newService.title}
                onChange={(e) =>
                  setNewService({ ...newService, title: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
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
              onClick={handleCreateService}
              disabled={createServiceMutation.isPending}
            >
              {createServiceMutation.isPending ? "Creating..." : "Create Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update service details and icons.
            </DialogDescription>
          </DialogHeader>
          {currentService && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-light-icon">Light Theme Icon</Label>
                <Input
                  id="edit-light-icon"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setCurrentService({
                      ...currentService,
                      lightThemeIcon: e.target.files?.[0]
                        ? URL.createObjectURL(e.target.files[0])
                        : currentService.lightThemeIcon,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-dark-icon">Dark Theme Icon</Label>
                <Input
                  id="edit-dark-icon"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setCurrentService({
                      ...currentService,
                      darkThemeIcon: e.target.files?.[0]
                        ? URL.createObjectURL(e.target.files[0])
                        : currentService.darkThemeIcon,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={currentService.title}
                  onChange={(e) =>
                    setCurrentService({
                      ...currentService,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  rows={3}
                  value={currentService.description}
                  onChange={(e) =>
                    setCurrentService({
                      ...currentService,
                      description: e.target.value,
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
              onClick={handleEditService}
              disabled={updateServiceMutation.isPending}
            >
              {updateServiceMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Service Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this service? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentService && (
            <div className="py-4">
              <h3 className="font-medium">{currentService.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {currentService.description}
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
              onClick={handleDeleteService}
              disabled={deleteServiceMutation.isPending}
            >
              {deleteServiceMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}