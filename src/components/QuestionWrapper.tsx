import React from 'react';

interface QuestionWrapperProps {
  children: React.ReactNode;
  question?: string;
  className?: string;
}

export default function QuestionWrapper({ 
  children, 
  question,
  className = '' 
}: QuestionWrapperProps) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {question && (
        <h1 className="text-xl font-semibold mb-6 text-gray-800">
          {question}
        </h1>
      )}
      {children}
    </div>
  );
}





