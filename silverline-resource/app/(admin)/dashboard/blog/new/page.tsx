"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { createPost, Post } from "@/app/api/posts";

export default function NewPostPage() {
  const [post, setPost] = useState({
    title: "",
    image: null as File | null,
    content: "",
    status: "published" as "published" | "draft",
  });
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Upload image to Cloudinary and return the URL
  const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "default_preset");

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
      toast({
        title: "Upload Failed",
        description: "Could not upload image. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  };

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (postData: Omit<Post, 'id' | 'createdAt'>) => {
      return createPost(postData);
    },
    onSuccess: (newPost) => {
      // Invalidate posts query to refetch the latest data
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({
        title: "Post Created",
        description: `"${newPost.title}" has been created successfully.`,
      });
      router.push("/dashboard/blog");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = "";
    if (post.image) {
      toast({ title: "Uploading Image...", description: "Please wait." });
      imageUrl = (await uploadImageToCloudinary(post.image)) || "";
      if (!imageUrl) return; // Stop submission if image upload fails
    }

    // Prepare post data without id and createdAt
    const postData = {
      title: post.title,
      excerpt: post.content.substring(0, 100), // Generate excerpt from content
      content: post.content,
      image: imageUrl,
      status: post.status,
    };

    createPostMutation.mutate(postData);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
            <CardDescription>
              Create a new blog post with rich content.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Title Input */}
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                required
              />
            </div>

            {/* Image Selection */}
            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setPost({ ...post, image: e.target.files?.[0] || null })}
              />
              {post.image && (
                <p className="text-sm text-gray-500">
                  Image selected: {post.image.name}
                </p>
              )}
            </div>

            {/* Content Input */}
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your post content here..."
                rows={10}
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">
                Tip: You can use Markdown formatting for rich text.
              </p>
            </div>

            {/* Status Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={post.status}
                  onValueChange={(value) =>
                    setPost({ ...post, status: value as "published" | "draft" })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
              disabled={createPostMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createPostMutation.isPending}>
              {createPostMutation.isPending ? "Creating..." : "Create Post"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}