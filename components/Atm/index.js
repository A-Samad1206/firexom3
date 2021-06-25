import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { updateOrder } from '#LIB/orders';
import { initialValues, validation, months, years } from './atmFormSchema';
import SuccessMessage from './SuccessMessage';
import PaymentDetail from './PaymentDetail';
const index = ({ orderId, userId }) => {
  const router = useRouter();
  !userId && router.push(`/login?redirectTo=pay?${orderId}`);
  const [paid, setPaid] = useState(false);
  const onSubmit = async (values, actions) => {
    const { paymentDetails, alreadyPaid } = await updateOrder(
      userId,
      orderId,
      values
    );
    typeof alreadyPaid !== 'undefined' &&
      alreadyPaid &&
      router.push(`/order/${orderId}`);
    setPaid(paymentDetails);
    actions.setSubmitting(false);
  };

  return paid ? (
    <>
      <PaymentDetail paymentDetails={paid} />
      <SuccessMessage orderId={orderId} />
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
