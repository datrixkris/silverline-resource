"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Pencil, Trash2, Search, FileText, Calendar, Eye, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock blog post data
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

interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  authorImage: string
  category: string
  status: string
  publishedAt: string | null
  views: number
  comments: number
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // In a real app, this would be an API call
    // const fetchPosts = async () => {
    //   const response = await fetch('/api/posts')
    //   const data = await response.json()
    //   setPosts(data)
    // }
    // fetchPosts()

    // Using mock data for demonstration
    setPosts(mockPosts)
  }, [])

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeletePost = (id: string) => {
    // In a real app, this would be an API call
    // const deletePost = async () => {
    //   await fetch(`/api/posts/${id}`, {
    //     method: 'DELETE',
    //   })
    //   setPosts(posts.filter(post => post.id !== id))
    // }
    // deletePost()

    // Using mock data for demonstration
    const postToDelete = posts.find((post) => post.id === id)
    setPosts(posts.filter((post) => post.id !== id))

    toast({
      title: "Post deleted",
      description: `"${postToDelete?.title}" has been removed.`,
    })
  }

  const handlePublishPost = (id: string) => {
    // In a real app, this would be an API call
    // const publishPost = async () => {
    //   const response = await fetch(`/api/posts/${id}/publish`, {
    //     method: 'PUT',
    //   })
    //   const data = await response.json()
    //   setPosts(posts.map(post => post.id === id ? data : post))
    // }
    // publishPost()

    // Using mock data for demonstration
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            status: "published",
            publishedAt: new Date().toISOString().split("T")[0],
          }
        }
        return post
      }),
    )

    const postToPublish = posts.find((post) => post.id === id)
    toast({
      title: "Post published",
      description: `"${postToPublish?.title}" is now live.`,
    })
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
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge variant={post.status === "published" ? "default" : "secondary"}>
                    {post.status === "published" ? "Published" : "Draft"}
                  </Badge>
                </div>
              </div>
              <CardHeader className="p-4 pb-0">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="px-2 py-0 text-xs">
                    {post.category}
                  </Badge>
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
                        <DropdownMenuItem onClick={() => handlePublishPost(post.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Publish
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleDeletePost(post.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="line-clamp-1 text-xl">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.authorImage} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium">{post.author}</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {post.publishedAt || "Not published"}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {post.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {post.comments}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

