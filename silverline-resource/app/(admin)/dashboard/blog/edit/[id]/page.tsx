"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// Mock blog post data (same as in blog/page.tsx)
const mockPosts = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js and React.",
    content: "Next.js is a React framework that enables server-side rendering and static site generation...",
    image: "/placeholder.svg?height=200&width=300&text=Next.js",
    author: "John Doe",
    authorImage: "/placeholder.svg?height=40&width=40&text=JD",
    category: "Development",
    status: "published",
    publishedAt: "2023-01-15",
    views: 1250,
    comments: 8,
  },
  {
    id: "2",
    title: "Mastering CSS Grid Layout",
    excerpt: "A comprehensive guide to using CSS Grid for modern web layouts.",
    content: "CSS Grid Layout is a two-dimensional layout system designed specifically for the web...",
    image: "/placeholder.svg?height=200&width=300&text=CSS+Grid",
    author: "Jane Smith",
    authorImage: "/placeholder.svg?height=40&width=40&text=JS",
    category: "Design",
    status: "published",
    publishedAt: "2023-02-20",
    views: 980,
    comments: 5,
  },
  {
    id: "3",
    title: "Introduction to TypeScript",
    excerpt: "Why TypeScript is becoming essential for JavaScript developers.",
    content:
      "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale...",
    image: "/placeholder.svg?height=200&width=300&text=TypeScript",
    author: "Mike Johnson",
    authorImage: "/placeholder.svg?height=40&width=40&text=MJ",
    category: "Development",
    status: "draft",
    publishedAt: null,
    views: 0,
    comments: 0,
  },
  {
    id: "4",
    title: "Responsive Design Best Practices",
    excerpt: "Tips and tricks for creating responsive websites that work on any device.",
    content:
      "Responsive web design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes...",
    image: "/placeholder.svg?height=200&width=300&text=Responsive",
    author: "Sarah Williams",
    authorImage: "/placeholder.svg?height=40&width=40&text=SW",
    category: "Design",
    status: "published",
    publishedAt: "2023-03-10",
    views: 1560,
    comments: 12,
  },
]

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    status: "draft",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { id } = params

  useEffect(() => {
    // In a real app, this would be an API call
    // const fetchPost = async () => {
    //   const response = await fetch(`/api/posts/${id}`)
    //   const data = await response.json()
    //   setPost(data)
    //   setIsLoading(false)
    // }
    // fetchPost()

    // Using mock data for demonstration
    const foundPost = mockPosts.find((p) => p.id === id)
    if (foundPost) {
      setPost({
        title: foundPost.title,
        excerpt: foundPost.excerpt,
        content: foundPost.content,
        category: foundPost.category,
        status: foundPost.status,
      })
    } else {
      toast({
        title: "Post not found",
        description: "The requested post could not be found.",
        variant: "destructive",
      })
      router.push("/dashboard/blog")
    }
    setIsLoading(false)
  }, [id, router, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/posts/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(post),
      // })
      // const data = await response.json()

      // Mock successful update
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Post updated",
        description: `"${post.title}" has been updated successfully.`,
      })

      router.push("/dashboard/blog")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading post...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Edit Post Details</CardTitle>
            <CardDescription>Update your blog post content and settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                placeholder="Brief summary of the post"
                rows={2}
                value={post.excerpt}
                onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                required
              />
            </div>
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
              <p className="text-xs text-muted-foreground">Tip: You can use Markdown formatting for rich text.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={post.category} onValueChange={(value) => setPost({ ...post, category: value })} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={post.status} onValueChange={(value) => setPost({ ...post, status: value })}>
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
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

