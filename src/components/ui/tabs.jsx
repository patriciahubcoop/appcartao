import React from "react";

export function Tabs({ value, onValueChange, children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function TabsList({ className = "", ...props }) {
  return (
    <div
      className={
        "inline-flex items-center justify-center rounded-lg bg-slate-100 p-1 " +
        className
      }
      {...props}
    />
  );
}

export function TabsTrigger({
  value,
  className = "",
  children,
  ...props
}) {
  // Componente "burro"; o estado é controlado fora
  return (
    <button
      data-value={value}
      className={
        "inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-white " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ className = "", ...props }) {
  return <div className={className} {...props} />;
}
