import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "positive" | "negative" | "default";
  size?: "sm" | "md" | "lg" | "full";
  children: React.ReactNode;
}

export default function Button({
  variant = "default",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  let base =
    "rounded-xl font-semibold transition-all duration-150 shadow focus:outline-none focus:ring-2 focus:ring-offset-2";
  let variantClass = "";
  let sizeClass = "";

  switch (variant) {
    case "positive":
      variantClass =
        "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500";
      break;
    case "negative":
      variantClass =
        "bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 focus:ring-red-400";
      break;
    default:
      variantClass =
        "bg-gray-200 text-gray-900 hover:bg-gray-300 border border-gray-300 focus:ring-gray-400";
  }

  switch (size) {
    case "sm":
      sizeClass = "py-1 px-3 text-sm";
      break;
    case "lg":
      sizeClass = "py-3 px-6 text-lg";
      break;
    case "full":
      sizeClass = "py-2 px-4 text-base w-full";
      break;
    default:
      sizeClass = "py-2 px-4 text-base";
  }

  return (
    <button
      className={`${base} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
