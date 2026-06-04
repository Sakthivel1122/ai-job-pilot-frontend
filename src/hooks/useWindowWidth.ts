"use client";

import { useEffect, useState } from "react";

export const useWindowWidth = (): number | undefined => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWidth(); // Set initial width

    window.addEventListener("resize", updateWidth);


    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return windowWidth;
};
