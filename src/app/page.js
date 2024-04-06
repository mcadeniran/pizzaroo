import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import HomeMenu from '@/components/layout/HomeMenu';
import SectionHeaders from '@/components/layout/SectionHeaders';

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section
        className='text-center my-16'
        id={'about'}
      >
        <SectionHeaders
          subHeader={'Our story'}
          mainHeader={'About us'}
        />
        <div className='text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4'>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos optio
            minus maiores, voluptate illum neque accusamus distinctio corrupti
            ipsum incidunt culpa corporis tempore laboriosam vel a tempora!
            Aliquam, debitis beatae?
          </p>
          <p>
            Quos optio minus maiores, voluptate illum neque accusamus distinctio
            corrupti ipsum incidunt culpa corporis tempore laboriosam vel a
            tempora! Aliquam, debitis beatae?
          </p>
          <p>
            Ipsum incidunt culpa corporis tempore laboriosam vel a tempora!
            Aliquam, debitis beatae?
          </p>
        </div>
      </section>

      <section
        className='text-center my-8'
        id='contact'
      >
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={'Contact us'}
        />
        <div className='mt-8'>
          <a
            className='text-4xl underline text-gray-500'
            href='tel:+905331442587'
          >
            +90 533 144 2587
          </a>
        </div>
      </section>
    </>
  );
}
