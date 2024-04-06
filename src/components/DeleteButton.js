import { useState } from 'react';

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  if (showConfirm) {
    return (
      <div className='fixed bg-black/50 inset-0 flex items-center h-full justify-center'>
        <div className=' bg-white p-4 rounded-lg'>
          <div className=''>Are you sure?</div>
          <div className='flex gap-4 mt-1'>
            <button
              type='button'
              className='items-center'
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
            <button
              type='button'
              className='primary items-center'
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
            >
              {'Yes,delete!'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button
      type='button'
      onClick={() => setShowConfirm(true)}
    >
      {label}
    </button>
  );
}
