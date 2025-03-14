"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Trash2, Search, FolderPlus, Calendar, Users2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock project data
const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design and improved UX.",
    image: "/placeholder.svg?height=200&width=300&text=Website",
    status: "in-progress",
    createdAt: "2023-01-10",
    team: ["John Doe", "Jane Smith"],
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Creating a new mobile application for both iOS and Android platforms.",
    image: "/placeholder.svg?height=200&width=300&text=Mobile",
    status: "planning",
    createdAt: "2023-02-15",
    team: ["Mike Johnson", "Sarah Williams"],
  },
  {
    id: "3",
    name: "E-commerce Integration",
    description: "Integrating e-commerce functionality into the existing platform.",
    image: "/placeholder.svg?height=200&width=300&text=E-commerce",
    status: "completed",
    createdAt: "2023-03-20",
    team: ["Alex Brown", "John Doe"],
  },
  {
    id: "4",
    name: "Content Strategy",
    description: "Developing a comprehensive content strategy for digital marketing.",
    image: "/placeholder.svg?height=200&width=300&text=Content",
    status: "in-progress",
    createdAt: "2023-04-05",
    team: ["Jane Smith", "Mike Johnson"],
  },
]

interface Project {
  id: string
  name: string
  description: string
  image: string
  status: string
  createdAt: string
  team: string[]
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    image: "/placeholder.svg?height=200&width=300&text=New+Project",
    status: "planning",
    team: [],
  })
  const { toast } = useToast()

  useEffect(() => {
    // In a real app, this would be an API call
    // const fetchProjects = async () => {
    //   const response = await fetch('/api/projects')
    //   const data = await response.json()
    //   setProjects(data)
    // }
    // fetchProjects()

    // Using mock data for demonstration
    setProjects(mockProjects)
  }, [])

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateProject = () => {
    // In a real app, this would be an API call
    // const createProject = async () => {
    //   const response = await fetch('/api/projects', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(newProject),
    //   })
    //   const data = await response.json()
    //   setProjects([...projects, data])
    // }
    // createProject()

    // Using mock data for demonstration
    const id = (projects.length + 1).toString()
    const createdAt = new Date().toISOString().split("T")[0]
    const createdProject = { id, createdAt, ...newProject }

    setProjects([...projects, createdProject])
    setIsCreateDialogOpen(false)
    setNewProject({
      name: "",
      description: "",
      image: "/placeholder.svg?height=200&width=300&text=New+Project",
      status: "planning",
      team: [],
    })

    toast({
      title: "Project created",
      description: `${newProject.name} has been added successfully.`,
    })
  }

  const handleEditProject = () => {
    if (!currentProject) return

    // In a real app, this would be an API call
    // const updateProject = async () => {
    //   const response = await fetch(`/api/projects/${currentProject.id}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(currentProject),
    //   })
    //   const data = await response.json()
    //   setProjects(projects.map(project => project.id === data.id ? data : project))
    // }
    // updateProject()

    // Using mock data for demonstration
    setProjects(projects.map((project) => (project.id === currentProject.id ? currentProject : project)))
    setIsEditDialogOpen(false)

    toast({
      title: "Project updated",
      description: `${currentProject.name} has been updated.`,
    })
  }

  const handleDeleteProject = () => {
    if (!currentProject) return

    // In a real app, this would be an API call
    // const deleteProject = async () => {
    //   await fetch(`/api/projects/${currentProject.id}`, {
    //     method: 'DELETE',
    //   })
    //   setProjects(projects.filter(project => project.id !== currentProject.id))
    // }
    // deleteProject()

    // Using mock data for demonstration
    setProjects(projects.filter((project) => project.id !== currentProject.id))
    setIsDeleteDialogOpen(false)

    toast({
      title: "Project deleted",
      description: `${currentProject.name} has been removed.`,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planning":
        return <Badge variant="outline">Planning</Badge>
      case "in-progress":
        return <Badge variant="default">In Progress</Badge>
      case "completed":
        return <Badge variant="success">Completed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <FolderPlus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full flex h-40 items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="p-0">
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{project.name}</CardTitle>
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
                          setCurrentProject(project)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setCurrentProject(project)
                          setIsDeleteDialogOpen(true)
                        }}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="mt-2 line-clamp-2">{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2 p-4 pt-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {project.createdAt}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users2 className="h-4 w-4" />
                  {project.team.join(", ")}
                </div>
                <div className="mt-2">{getStatusBadge(project.status)}</div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Create Project Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>Create a new project with details and team members.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newProject.status}
                onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
              >
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="team">Team Members (comma separated)</Label>
              <Input
                id="team"
                placeholder="John Doe, Jane Smith"
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    team: e.target.value
                      .split(",")
                      .map((member) => member.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProject}>Create Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update project details and status.</DialogDescription>
          </DialogHeader>
          {currentProject && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Project Name</Label>
                <Input
                  id="edit-name"
                  value={currentProject.name}
                  onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  rows={3}
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={currentProject.status}
                  onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value })}
                >
                  <option value="planning">Planning</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-team">Team Members (comma separated)</Label>
                <Input
                  id="edit-team"
                  value={currentProject.team.join(", ")}
                  onChange={(e) =>
                    setCurrentProject({
                      ...currentProject,
                      team: e.target.value
                        .split(",")
                        .map((member) => member.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditProject}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Project Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentProject && (
            <div className="py-4">
              <h3 className="font-medium">{currentProject.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{currentProject.description}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProject}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

