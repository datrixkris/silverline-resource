import { api } from "@/app/axiosApi/api";

export interface Service {
    id: string;
    title: string;
    lightThemeIcon: string;
    darkThemeIcon: string;
    description: string;
}

export async function fetchServices(): Promise<Service[]> {
    const response = await api.get("/services");
    return response.data;
}

export async function createService(serviceData: Omit<Service, "id">): Promise<Service> {
    const response = await api.post("/services", serviceData);
    return response.data;
}

export async function updateService(id: string, serviceData: Omit<Service, "id">): Promise<Service> {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;

}

export async function deleteService(id: string): Promise<void> {
    await api.delete(`/services/${id}`);
}