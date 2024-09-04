// components/ui/Card.js
import React from 'react';

export const Card = ({ children, className }) => {
  return <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>;
};

export const CardHeader = ({ children }) => {
  return <div className="p-4 border-b">{children}</div>;
};

export const CardContent = ({ children, className }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const CardTitle = ({ children, className }) => {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
};

export const Badge = ({ children, className }) => {
    return (
      <span
        className={`inline-block px-2 py-1 text-xs font-bold bg-blue-500 text-white rounded-full ${className}`}
      >
        {children}
      </span>
    );
  };
