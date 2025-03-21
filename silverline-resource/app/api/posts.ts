import { api } from "@/app/axiosApi/api";

export interface Post {
  id: string;
  title: string;
  // excerpt: string;
  content: string;
  image: string | File; 
  status: "published" | "draft";
  createdAt: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get("/blogs");
  return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
};

export const publishPost = async (id: string): Promise<Post> => {
  const response = await api.put(`/blogs/${id}/publish`);
  return response.data;
};

export const createPost = async (postData: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
  const response = await api.post("/blogs", postData);
  return response.data;
};

export const fetchPost = async (id: string): Promise<Post> => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

export const updatePost = async (id: string, postData: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
  const response = await api.put(`/blogs/${id}`, postData);
  return response.data;
};