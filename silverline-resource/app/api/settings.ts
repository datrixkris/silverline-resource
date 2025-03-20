import { api } from "@/app/axiosApi/api";



interface EmailSettings {
    id: string;
    emailHost: string;
    emailPort: string;
    emailUser: string;
    emailPass: string;
}




export const createEmailDetails = async (emailSettings: Omit<EmailSettings, 'id' | 'createdAt'>): Promise<EmailSettings> => {
    const response = await api.post("/contacts", emailSettings);
    return response.data;
};

export const updateEmailDetails = async (
    id: string,
    emailData: Omit<EmailSettings, "id">
): Promise<EmailSettings> => {
    const response = await api.put(`/contacts/${id}`, emailData);
    return response.data;
};
export const fetchEmailDetail = async (): Promise<EmailSettings> => {
    const response = await api.get("/contacts/1");
    return response.data;
};

