import FlyingButton from 'react-flying-item';

export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
  image,
}) {
  if (!hasSizesOrExtras) {
    return (
      <div className='flying-button-parent mt-4'>
        <FlyingButton
          targetTop={'5%'}
          targetLeft={'85%'}
          src={image}
        >
          <div onClick={onClick}>
            <span>Add to cart (from ${basePrice})</span>
          </div>
        </FlyingButton>
      </div>
    );
  }
  return (
    <button
      type='button'
      className='bg-primary mt-4 text-white rounded-full px-8 py-2'
      onClick={onClick}
    >
      {hasSizesOrExtras && <span>Add to cart (from ${basePrice})</span>}
    </button>
  );
}
