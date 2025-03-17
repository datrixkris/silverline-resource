"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import Image from "next/image";
import { fetchPost, updatePost, Post } from "@/app/api/posts";


export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Note: Ensure this works with Suspense or awaits the Promise correctly
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Define all Hooks at the top
  const [post, setPost] = useState({
    title: "",
    image: "" as string | File,
    content: "",
    status: "" as "published" | "draft" | "",
  });

  const { data, isLoading, error } = useQuery<Post, Error>({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });

  const updatePostMutation = useMutation({
    mutationFn: (postData: Omit<Post, "id" | "createdAt">) =>
      updatePost(id, postData),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.setQueryData(["post", id], updatedPost);
      toast({
        title: "Post Updated",
        description: `"${updatedPost.title}" has been updated successfully.`,
      });
      router.push("/dashboard/blog");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Set initial post data when fetched (useEffect or similar logic could also work)
  if (data && post.title === "" && post.content === "") {
    setPost(data);
  }

  // Early returns after all Hooks are called
  if (error) {
    toast({
      title: "Error",
      description: "Failed to fetch post data.",
      variant: "destructive",
    });
    router.push("/dashboard/blog");
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  // Image upload function
  const uploadImageToCloudinary = async (
    file: File
  ): Promise<string | null> => {
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
      toast({
        title: "Upload Failed",
        description: "Could not upload image. Please try again.",
        variant: "destructive",
      });
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // Type guard for File
  const isFile = (image: string | File): image is File => {
    return image instanceof File;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = typeof post.image === "string" ? post.image : "";

    if (isFile(post.image)) {
      toast({ title: "Uploading Image...", description: "Please wait." });
      const uploadedUrl = await uploadImageToCloudinary(post.image);
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    const postData: Omit<Post, "id" | "createdAt"> = {
      title: post.title || "",
      excerpt: post.content?.substring(0, 100) || "",
      content: post.content || "",
      image: imageUrl,
      status: (post.status as "published" | "draft") || "draft",
    };

    updatePostMutation.mutate(postData);
  };

  // Render the form
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Edit Post Details</CardTitle>
            <CardDescription>
              Update your blog post content and settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                value={post.title || ""}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const newFile = e.target.files?.[0];
                  setPost({ ...post, image: newFile || post.image });
                }}
              />
              {typeof post.image === "string" && post.image && (
                <div className="relative w-40 h-24 mt-2">
                  <Image
                    src={post.image}
                    alt="Current Image"
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your post content here..."
                rows={10}
                value={post.content || ""}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">
                Tip: You can use Markdown formatting for rich text.
              </p>
            </div>

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
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
              disabled={updatePostMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updatePostMutation.isPending}>
              {updatePostMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}


