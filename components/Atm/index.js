import { updateOrder } from '#LIB/orders';

import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
const initialValues = {
  nameOnCard: 'John Doe',
  cardNumber: '4111 1111 1111 1111',
  cvv: '123',
  expirationMonth: '02',
  expirationYear: '2021',
};
const validation = (values) => {
  let errors = {};
  if (!values.nameOnCard)
    errors.nameOnCard = 'Mention the name on card and is required';
  if (!values.cvv) errors.securityCode = 'CVV is required';
  if (!values.expirationYear) errors.expirationYear = 'Card Number is required';
  if (!values.cardNumber) errors.cardNumber = 'Card Number is required';
  if (!values.expirationMonth)
    errors.expirationMonth = 'Card Number is required';
  return errors;
};

export const months = [
  { value: '00', name: 'Month' },
  { value: '01', name: 'January' },
  { value: '02', name: 'February' },
  { value: '03', name: 'March' },
  { value: '04', name: 'April' },
  { value: '05', name: 'May' },
  { value: '06', name: 'June' },
  { value: '07', name: 'July' },
  { value: '08', name: 'August' },
  { value: '09', name: 'September' },
  { value: '10', name: 'October' },
  { value: '11', name: 'November' },
  { value: '12', name: 'December' },
];
export const years = [
  { value: '0', name: 'Year' },
  { value: '2020', name: '2020' },
  { value: '2021', name: '2021' },
  { value: '2022', name: '2022' },
  { value: '2023', name: '2023' },
  { value: '2024', name: '2024' },
  { value: '2025', name: '2025' },
  { value: '2026', name: '2026' },
  { value: '2027', name: '2027' },
  { value: '2028', name: '2028' },
  { value: '2029', name: '2029' },
  { value: '2030', name: '2030' },
];
const index = ({ orderId, userId }) => {
  console.log('order.paymentorder.payment', orderId);
  const [paid, setPaid] = useState(false);
  const onSubmit = async (values, actions) => {
    console.log('Values', values);
    const { success, paymentDetails } = await updateOrder(
      userId,
      orderId,
      values
    );
    setPaid(paymentDetails);
    actions.setSubmitting(false);
  };

  return paid ? (
    <>
      <PayDetail paymentDetails={paid} />
      <OrderSuccess orderId={orderId} />
    </>
  ) : (
    <Formik
      initialValues={initialValues}
      validate={validation}
      onSubmit={onSubmit}
    >
      {(props) => {
        return (
          <Form>
            <div className="mt-8    w-full  overflow-x-auto">
              <div className="min-w-[400px] pb-4  rounded-lg relative   bg-gradient-to-r from-indigo-300   to-blue-500   flex flex-col  px-8 ml-auto border">
                {props.isSubmitting && (
                  <div className="absolute inset-0 w-full h-full grid place-items-center rounded-lg">
                    <div className="w-full h-full absolute rounded-lg inset-0 bg-gray-700 opacity-900 animate-pulse" />
                    <div className="w-16 h-16  bg-transparent rounded-full border-t-8 border-red-600 relative animate-spin" />
                  </div>
                )}
                <Field
                  type="text"
                  name="cardNumber"
                  className="w-3/4 mx-auto my-8 bg-transparent text-white text-2xl  text-center px-3 py-2  
              focus:outline-none font-semibold placeholder-white::placeholder border-1"
                />
                <div className="grid grid-cols-2">
                  <label htmlFor="name" className="font-semibold text-white">
                    Card Holder
                  </label>
                  <label htmlFor="name" className="font-semibold text-white">
                    Valid Thru
                  </label>
                  <Field
                    type="text"
                    name="nameOnCard"
                    className=" bg-transparent text-white text-2xl py-1  
              focus:outline-none font-semibold placeholder-white::placeholder border-b-2 w-[80%]"
                  />
                  <div className="grid my-2 grid-cols-2 space-x-4 mb-0">
                    <Select name="expirationMonth" data={months} />

                    <Select name="expirationYear" data={years} />
                  </div>
                  <div className="col-start-2 my-4     items-center  ">
                    <label
                      htmlFor="name"
                      className="  font-semibold mr-4 text-white italic"
                    >
                      CVV
                    </label>
                    <Field
                      type="text"
                      name="cvv"
                      className="mx-auto w-16 h-6 rounded-md  bg-gray-50 inline text-black text-sm  px-2  
              focus:outline-none italic placeholder-white::placeholder"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex my-8 justify-end">
              <button
                disabled={props.isSubmitting === true}
                type="submit"
                className="cursor-pointer inline-flex items-center my-2  rounded-md px-6 py-2 text-white bg-blue-500 hover:bg-blue-400 focus:bg-blue-600 focus:shadow-2xl transition duration-600 focus:outline-none disabled:cursor-not-allowed "
              >
                Pay
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default index;

const Select = ({ name, data }) => (
  <Field
    as="select"
    className=" 
          bg-transparent text-white text-lg
          focus:outline-none
          border-b-2
          focus:border-indigo-500
          transition-colors
          cursor-pointer focus:bg-gray-700
        "
    id={name}
    name={name}
  >
    {data.map((option, index) => (
      <option key={option.value} value={option.value}>
        {option.name}
      </option>
    ))}
  </Field>
);
const PayDetail = ({ paymentDetails }) => (
  <div>
    <div className="text-xl font-semibold py-4 ">Payment Details</div>
    <div className="flex items-center justify-between ">
      <div>Card Type</div>
      <div>Visa</div>
    </div>
    <div className="flex items-center justify-between ">
      <div>Card Name</div>
      <div>{paymentDetails.nameOnCard}</div>
    </div>
    <div className="flex items-center justify-between ">
      <div>Card Number</div>
      <div>{paymentDetails.cardNumber}</div>
    </div>
    <div className="flex items-center justify-between ">
      <div>Expire Date</div>
      <div>
        {paymentDetails.expirationMonth}/{paymentDetails.expirationYear}
      </div>
    </div>
  </div>
);

const OrderSuccess = ({ orderId }) => (
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
