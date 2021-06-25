import Link from 'next/link';
const SuccessMessage = ({ orderId }) => (
  <div className=" py-16">
    <div className="text-3xl font-bold my-4">Thank you for your order.</div>
    <div className="text-xl italic">
      Your order number is{' '}
      <Link href={`/order/${orderId}`}>
        <a className="m-1 text-blue-700 underline"> {orderId}</a>
      </Link>
      . We have emailed your order confirmation, and will send you an update
      when your order has shipped.
    </div>
  </div>
);
export default SuccessMessage;
