import React from "react";

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-10 w-10 border-4",
  lg: "h-14 w-14 border-4",
};

export const Spinner = ({ size = "md", className = "" }) => (
  <span
    className={`inline-block flex-shrink-0 rounded-full border-secondary-100 border-t-green-color animate-spin ${sizes[size]} ${className}`}
  />
);
