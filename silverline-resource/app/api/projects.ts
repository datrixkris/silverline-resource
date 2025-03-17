import { api } from "@/app/axiosApi/api";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await api.get("/projects");
  return response.data;
};

export const createProject = async (
  projectData: Omit<Project, "id" | "createdAt" | "team">
): Promise<Project> => {
  const response = await api.post("/projects", projectData);
  return response.data;
};

export const updateProject = async (
  id: string,
  projectData: Omit<Project, "id" | "createdAt" | "team">
): Promise<Project> => {
  const response = await api.put(`/projects/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};