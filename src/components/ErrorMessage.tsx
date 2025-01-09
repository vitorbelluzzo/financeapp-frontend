// components/ErrorMessage/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="text-red-500">Erro: {message}</div>
);
