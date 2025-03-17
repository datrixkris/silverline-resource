// pages/dashboard/blog.tsx
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
  MoreHorizontal,
  Pencil,
  Trash2,
  Search,
  FileText,
  Calendar,
  Eye,
} from "lucide-react";
import { fetchPosts, deletePost, publishPost, Post } from "@/app/api/posts";
// import { fetchPosts, deletePost, publishPost, Post } from "@/api/posts";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch posts using TanStack Query
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // Delete post mutation
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
      console.error("Error creating product:", error)

    },
  });

  // Publish post mutation
  const publishMutation = useMutation({
    mutationFn: publishPost,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(["posts"], (oldPosts: Post[] | undefined) =>
        oldPosts?.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        )
      );
      toast({
        title: "Post published",
        description: `"${updatedPost.title}" is now live.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error publishing post",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error("Error creating product:", error)

    },
  });

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
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
                  src={post.image || "/placeholder.svg"}
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
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/blog/edit/${post.id}`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
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
    </div>
  );
}