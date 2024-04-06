export default function Left({ className = 'w-6 h-6' }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5'
      />
    </svg>
  );
}
