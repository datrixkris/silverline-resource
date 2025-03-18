import axios from "axios";
// import { useAuthStore } from "../stores/auth-store";


export const baseURL = "https://api.silverlineresource.com/v1/api/";
// export const baseURL = "http://localhost:8000/v1/api/";


export const api = axios.create({
  baseURL,
  timeout: 50000,
  headers: {},
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("cms-auth-token");

    // If a token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Return the modified config object
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("Api response intercepted");
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");

      }
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;
    originalRequest._retry = originalRequest._retry || false;


    console.log("Api response error");
    // useAuthStore.getState().logout();
    return Promise.reject(error);
  },
);

// api.interceptors.response.use(
//   (response) => {
//     // Handle successful responses
//     // console.log("Api response intercepted");
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // Initialize `_retry` if not set
//     originalRequest._retry = originalRequest._retry || false;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // Prevent retrying the refresh-token API itself
//       if (originalRequest.url.includes("/v1/auth/refresh-token")) {
//         return Promise.reject(error);
//       }

//       try {
//         // Retrieve refreshToken and other methods from the auth store
//         const { refreshToken, logout } = useAuthStore.getState();

//         if (!refreshToken) {
//           logout();
//           return Promise.reject(error);
//         }

//         // Attempt to refresh the token
//         const response = await api.post("/v1/auth/refresh-token", {
//           refresh_token: refreshToken,
//         });

//         // Update the accessToken in the auth store
//         useAuthStore.setState({ accessToken: response.data.token });

//         // Retry the original request with the new token
//         originalRequest.headers.Authorization = response.data.token;
//         return api(originalRequest);
//       } catch (err) {
//         console.error("Token refresh failed:", err);
//         useAuthStore.getState().logout();
//         return Promise.reject(err);
//       }
//     }

//     // console.error("Api response error:", error);
//     return Promise.reject(error);
//   },
// );
