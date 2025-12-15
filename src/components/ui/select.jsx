import React from "react";

export function Select({ value, onValueChange, children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function SelectTrigger({ className = "", ...props }) {
  return (
    <button
      className={
        "flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm " +
        className
      }
      {...props}
    />
  );
}

export function SelectContent({ className = "", ...props }) {
  return (
    <div
      className={
        "mt-1 max-h-60 w-full overflow-auto rounded-md border border-slate-200 bg-white shadow-lg " +
        className
      }
      {...props}
    />
  );
}

export function SelectItem({ className = "", children, ...props }) {
  return (
    <div
      className={
        "cursor-pointer px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 " +
        className
      }
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}
