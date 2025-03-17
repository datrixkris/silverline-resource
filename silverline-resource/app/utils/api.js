import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.silverlineresource.com/v1/api/",
});
