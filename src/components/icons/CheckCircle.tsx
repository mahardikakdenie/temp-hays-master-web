import type React from 'react';

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...props }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
};

export default CheckCircleIcon;
