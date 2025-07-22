
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children }) => {
  return (
    <div className="mb-8 border-b border-slate-200 pb-5">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
                {description && <p className="mt-2 text-slate-500">{description}</p>}
            </div>
            <div>{children}</div>
        </div>
    </div>
  );
};
