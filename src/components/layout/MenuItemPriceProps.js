import Trash from '@/components/icons/Trash';
import Plus from '@/components/icons/Plus';
import ChevronDown from '@/components/icons/ChevronDown';
import ChevronUp from '@/components/icons/ChevronUp';
import { useState } from 'react';

export default function MenuItemPriceProps({
  name,
  props,
  setProps,
  addLabel,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: '', price: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }
  return (
    <div className='bg-gray-200 p-2 rounded-md mb-2'>
      <button
        type='button'
        className='inline-flex p-2 border-0 justify-start'
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronUp /> : <ChevronDown />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>

      <div className={isOpen ? 'block' : 'hidden'}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div
              className='flex gap-2 items-end'
              key={index}
            >
              <div>
                <label>Name</label>

                <input
                  type='text'
                  value={size.name}
                  placeholder='Size name'
                  onChange={(ev) => editProp(ev, index, 'name')}
                />
              </div>
              <div>
                <label>Extra price</label>
                <input
                  type='text'
                  value={size.price}
                  placeholder='Exra price'
                  onChange={(ev) => editProp(ev, index, 'price')}
                />
              </div>
              <div>
                <button
                  type='button'
                  onClick={() => removeProp(index)}
                  className='bg-white mb-2 py-3 px-3'
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          className='bg-white items-center'
          onClick={addProp}
          type='button'
        >
          <Plus className='w-4 h-4' />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}
