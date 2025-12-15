import React from "react";

const baseClasses =
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2";

const variants = {
  default: "bg-[#4A9B9E] text-white hover:bg-[#3D8385]",
  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
  ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
};

export function Button({
  variant = "default",
  className = "",
  ...props
}) {
  const variantClasses = variants[variant] || variants.default;
  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props} />
  );
}
