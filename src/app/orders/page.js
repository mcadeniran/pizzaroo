import UserTabs from '@/components/layout/UserTabs';

export default function OrdersPage() {
  return (
    <section className='mt-8 max-w-2xl mx-auto'>
      <UserTabs isAdmin={true} />
    </section>
  );
}
