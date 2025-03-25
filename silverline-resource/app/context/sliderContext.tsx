"use client";

import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
} from "react";
import axios from "axios";
import { api } from "../utils/api";

// Define the SlideData interface
export interface SlideData {
  content: string;
  image: string;
  id: number;
}

// Define the context type
interface SliderContextType {
  slides: SlideData[];
  loading: boolean;
}

// Create the context
const SliderContext = createContext<SliderContextType | undefined>(undefined);

// Create provider component
const SliderProvider = ({ children }: { children: React.ReactNode }) => {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("sliders"); // Update with actual API URL
        setSlides(response.data);
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SliderContext.Provider value={{ slides, loading }}>
      {children}
    </SliderContext.Provider>
  );
};

// Custom hook for consuming the context
export const useSlider = (): SliderContextType => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("useSlider must be used within a SliderProvider");
  }
  return context;
};

export default SliderProvider;
