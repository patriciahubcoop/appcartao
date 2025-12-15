import React from "react";

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl bg-white p-4 shadow-xl">
        {children}
      </div>
    </div>
  );
}

export function DialogContent(props) {
  return <div {...props} />;
}

export function DialogHeader(props) {
  return <div className="mb-4 space-y-1" {...props} />;
}

export function DialogTitle(props) {
  return <h2 className="text-lg font-semibold" {...props} />;
}

export function DialogDescription(props) {
  return <p className="text-sm text-slate-600" {...props} />;
}

export function DialogTrigger({ children }) {
  // Implementação mínima; nos seus usos atuais o Trigger não é essencial,
  // pois o estado open é controlado externamente.
  return children;
}
