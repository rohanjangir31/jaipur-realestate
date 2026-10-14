import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function FormError({ message }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1.5 text-red-600 text-xs mt-1">
      <AlertCircle size={13} />
      {message}
    </p>
  );
}
