import Image from 'next/image';
import AddToCartButton from '@/components/menu/AddToCartButton';

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;

  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <div className='bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all'>
      <div className='text-center '>
        <Image
          src={image}
          alt={name}
          height={150}
          width={150}
          className='max-h-auto max-h-24 block mx-auto'
          // layout='responsive'
        />
      </div>
      <h4 className='font-semibold text-xl my-3'>{name}</h4>
      <p className='text-gray-500 text-sm max-h-16  line-clamp-3'>
        {description}
      </p>
      <AddToCartButton
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
        image={image}
      />
    </div>
  );
}
