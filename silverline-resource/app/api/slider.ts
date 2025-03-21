import { api } from "@/app/axiosApi/api";

export interface Slider {
    id: string;
    title: string;
    content: string;
    image: string;
}

export async function fetchSliders(): Promise<Slider[]> {
    const response = await api.get("/sliders");
    return response.data
}

export async function createSlider(sliderData: Omit<Slider, "id">): Promise<Slider> {
    const response = await api.post("/sliders", sliderData);
    return response.data;
}

export async function updateSlider(id: string, sliderData: Omit<Slider, "id">): Promise<Slider> {
    const response = await api.put(`/sliders/${id}`, sliderData);
    return response.data;
}

export async function deleteSlider(id: string): Promise<void> {
    await api.delete(`/sliders/${id}`);
}