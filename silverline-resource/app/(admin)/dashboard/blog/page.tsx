"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Search,
  FileText,
  Calendar,
  Eye,
} from "lucide-react";
import {
  fetchPosts,
  deletePost,
  publishPost,
  Post,
  updatePost,
} from "@/app/api/posts";
import { Label } from "@/components/ui/label";
import Loader from "@/components/loader";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  // const [isImageUploading, setIsImageUploading] = useState(false);
  const [editForm, setEditForm] = useState<Omit<Post, "id" | "createdAt"> & { image: string | File }>({
    title: "",
    excerpt: "",
    image: "" as string | File,
    content: "",
    status: "draft",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const publishMutation = useMutation({
    mutationFn: (id: string) => publishPost(id),
    onSuccess: (publishedPost) => {
      queryClient.setQueryData(["posts"], (oldPosts: Post[] | undefined) =>
        oldPosts?.map((post) =>
          post.id === publishedPost.id ? publishedPost : post
        )
      );
      toast({
        title: "Post published",
        description: `"${publishedPost.title}" has been published.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error publishing post",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error("Error publishing post:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["posts"], (oldPosts: Post[] | undefined) =>
        oldPosts?.filter((post) => post.id !== id)
      );
      const deletedPost = posts.find((post) => post.id === id);
      toast({
        title: "Post deleted",
        description: `"${deletedPost?.title}" has been removed.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting post",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error("Error deleting post:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      postData,
    }: {
      id: string;
      postData: Omit<Post, "id" | "createdAt">;
    }) => updatePost(id, postData),
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(["posts"], (oldPosts: Post[] | undefined) =>
        oldPosts?.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
      toast({
        title: "Post updated",
        description: `"${updatedPost.title}" has been saved.`,
      });
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error updating post",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating post:", error);
    },
  });

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (post: Post) => {
    setSelectedPost(post);
    setEditForm({
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      content: post.content,
      status: post.status,
    });
    setIsEditDialogOpen(true);
  };

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
      console.error(error);
      toast({
        title: "Upload Failed",
        description: "Could not upload image. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = editForm.image;

    if (editForm.image instanceof File) {
      // setIsImageUploading(true);
      toast({ title: "Uploading Image...", description: "Please wait." });
      const uploadedUrl = await uploadImageToCloudinary(editForm.image);
      // setIsImageUploading(false);

      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    const postData: Omit<Post, "id" | "createdAt"> = {
      title: editForm.title,
      excerpt: editForm.content.substring(0, 100), // Generate excerpt from content
      content: editForm.content,
      image: imageUrl,
      status: editForm.status,
    };

    if (selectedPost) {
      updateMutation.mutate({ id: selectedPost.id, postData });
    }
  };

  if (isLoading) {
    return <Loader/>;
  }

  if (error) {
    return <div>Error loading posts: {(error as Error).message}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
        <Button asChild>
          <Link href="/dashboard/blog/new">
            <FileText className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full flex h-40 items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">No posts found.</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={typeof post.image === "string" ? post.image : "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    variant={
                      post.status === "published" ? "default" : "secondary"
                    }
                  >
                    {post.status === "published" ? "Published" : "Draft"}
                  </Badge>
                </div>
              </div>
              <CardHeader className="p-4 pb-0">
                <div className="flex items-center ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Open menu"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditClick(post)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      {post.status !== "published" && (
                        <DropdownMenuItem
                          onClick={() => publishMutation.mutate(post.id)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Publish
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => deleteMutation.mutate(post.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="line-clamp-1 text-xl">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 mt-2">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between p-4 pt-0 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {post.createdAt || "Not published"}
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {selectedPost && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Post</DialogTitle>
              <DialogDescription>
                Update the details of your blog post below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={editForm.title}
                  onChange={handleInputChange}
                  placeholder="Enter post title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Input
                  id="content"
                  name="content"
                  value={editForm.content}
                  onChange={handleInputChange}
                  placeholder="Enter post content"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setEditForm((prev) => ({ ...prev, image: file }));
                    }
                  }}
                />
                {typeof editForm.image === "string" && editForm.image && (
                  <div className="relative w-40 h-24 mt-2">
                    <Image
                      src={editForm.image}
                      alt="Current Image"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      status: e.target.value as "published" | "draft",
                    }))
                  }
                  className="p-2 border rounded"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </form>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}