import React from 'react';
import { Check } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast-notification-pill">
      <div className="toast-icon-circle">
        <Check size={14} color="#ffffff" strokeWidth={3} />
      </div>
      <span className="toast-message-text">{message}</span>
    </div>
  );
}
