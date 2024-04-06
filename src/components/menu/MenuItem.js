import Image from 'next/image';
import { useContext, useState } from 'react';
import { CartContext } from '../AppContext';
import toast from 'react-hot-toast';
import MenuItemTile from '@/components/menu/MenuItemTile';

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem;

  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);

  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 && extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    addToCart(menuItem, selectedSize, selectedExtras);

    setShowPopup(false);
    toast.success('Added to cart!');
  }

  function handleExtrasClick(ev, extra) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extra]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extra.name);
      });
    }
  }

  let selectedPrice = basePrice;

  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }

  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className='fixed inset-0 bg-black/80 flex items-center justify-center'
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className='my-8 bg-white p-2 rounded-lg max-w-md'
          >
            <div
              className=' overflow-y-scroll p-2'
              style={{ maxHeight: 'calc(100vh - 80px)' }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={300}
                className='mx-auto'
              />
              <h2 className='text-lg font-bold text-center mb-2'>{name}</h2>
              <p className='text-center text-gray-500 text-sm mb-2'>
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className='py-2'>
                  <h3 className='text-center text-gray-700'>Pick your size</h3>
                  {sizes.map((size) => (
                    <label
                      key={size.name}
                      className='flex items-center gap-2 p-4 border rounded-md mb-1'
                    >
                      <input
                        type='radio'
                        name='size'
                        onClick={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                      />
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className='py-2'>
                  <h3 className='text-center text-gray-700'>
                    Pick additional ingredients
                  </h3>
                  {extraIngredientPrices.map((extra) => (
                    <label
                      key={extra.name}
                      className='flex items-center gap-2 p-4 border rounded-md mb-1'
                    >
                      <input
                        type='checkbox'
                        onClick={(ev) => handleExtrasClick(ev, extra)}
                        name={extra.name}
                        id=''
                      />{' '}
                      {extra.name} ${extra.price}
                    </label>
                  ))}
                </div>
              )}
              <button
                className='primary sticky bottom-2'
                type='button'
                onClick={handleAddToCartButtonClick}
              >
                Add to cart ${selectedPrice}
              </button>
              <button
                className='mt-2'
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile
        onAddToCart={handleAddToCartButtonClick}
        {...menuItem}
      />
    </>
  );
}
