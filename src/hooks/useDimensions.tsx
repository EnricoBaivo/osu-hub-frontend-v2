"use client"
import React from "react";

export const useDimensions = () => {
  const [width, setWidth] = React.useState(0);
  const [height, setHeigth] = React.useState(0);
  const updateDimensions = () => {
    setWidth(window.innerWidth);

    setHeigth(window.innerHeight);
  };
  const refresh = React.useCallback(() => {
    updateDimensions();
  }, []);
  React.useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    // Trigger updateDimensions on document ready to set dimensions immediately.

    document.readyState === "complete" && updateDimensions();
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  React.useEffect(() => {
    // on window loaded set dimensions again
    window.addEventListener("load", updateDimensions);
    return () => window.removeEventListener("load", updateDimensions);
  }, []);

  return { width, height, refresh };
};
