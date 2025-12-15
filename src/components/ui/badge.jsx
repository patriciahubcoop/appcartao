import React from "react";

const variants = {
  default: "bg-slate-900 text-white",
  secondary: "bg-slate-100 text-slate-800",
  outline: "border border-slate-300 text-slate-700 bg-transparent",
  destructive: "bg-red-600 text-white",
};

export function Badge({ variant = "default", className = "", ...props }) {
  const v = variants[variant] || variants.default;
  return (
    <span
      className={
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold " +
        v +
        " " +
        className
      }
      {...props}
    />
  );
}
