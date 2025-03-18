import { api } from "@/app/axiosApi/api";

export interface Staff {
  id: string;
  name: string;
  position: string;
  picture: string | File;
}

export const fetchStaff = async (): Promise<Staff[]> => {
  const response = await api.get("/staff");
  return response.data;
};

export const fetchStaffMember = async (id: string): Promise<Staff> => {
  const response = await api.get(`/staff/${id}`);
  return response.data;
};

export const createStaff = async (
  staffData: Omit<Staff, "id">
): Promise<Staff> => {
  const response = await api.post("/staff", staffData);
  return response.data;
};

export const updateStaff = async (
  id: string,
  staffData: Omit<Staff, "id">
): Promise<Staff> => {
  const response = await api.put(`/staff/${id}`, staffData);
  return response.data;
};

export const deleteStaff = async (id: string): Promise<void> => {
  await api.delete(`/staff/${id}`);
};