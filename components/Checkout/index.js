import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link';

import Input from './Input';
import { initialValues, payMethod, validate } from './CheckoutFormModel';
import { auth } from '#firebase';
import { useCart } from '#Ctx';
import Spin from '#UI/Spin';
import { createOrder } from '#LIB/orders';
import { ArrowNarrowRightIcon } from '@heroicons/react/solid';
const index = () => {
  const [user, loading] = useAuthState(auth);
  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const { carts, cartDispatch } = useCart();
  // const onSubmit = async (values, actions) => {
  //   await _sleep(2500);
  //   console.log('object', values);
  // };
  const router = useRouter();
  const onSubmit = async (values, actions) => {
    try {
      const res = await createOrder(values, carts, user.uid);
      console.log('Res', res);
      cartDispatch({ type: 'REMOVE' });
      actions.setSubmitting(false);
      router.push(`pay/?id=${res}`);
    } catch (err) {
      actions.setSubmitting(false);
    }
  };
  useEffect(() => {
    // !loading && !user && router.push('/login?redirectTo=checkout');
    // if cart is empty.
  }, [user, loading]);
  console.log('Chckout/index');
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {(props) => {
        console.log('Props');
        return (
          <Form>
            <div className="mx-auto max-w-md border-2  bg-blue-50 shadow-lg rounded-lg md:max-w-xl">
              <div className="mx-auto md:flex">
                <div className="w-full px-5 py-5">
                  <div className="flex flex-row py-5">
                    <h2 className="text-3xl font-semibold">Nexom</h2>

                    <h2 className="text-3xl text-blue-400 font-semibold">
                      Checkout
                    </h2>
                  </div>
                  <AddressFrom />
                  <Payment />
                  <div className="flex justify-between items-center pt-2">
                    <Link href="/cart">
                      <a
                        type="button"
                        className="cursor-pointer inline-flex items-center  my-2 
                      rounded-full px-6 py-2 text-white
                      bg-red-500
                        hover:bg-red-400
                        focus:bg-red-600
                        hover:shadow-lg
                        focus:shadow-xl
                        transition duration-600
                        focus:outline-none"
                      >
                        Return to cart
                      </a>
                    </Link>
                    {/* <Link href="/placeorder"> */}
                    <button
                      type="submit"
                      disabled={props.isSubmitting}
                      className="cursor-pointer inline-flex items-center justify-center  my-2 
                      rounded-full px-6 py-2 text-white
                      bg-blue-500
                        hover:bg-blue-400
                        focus:bg-blue-300
                        hover:shadow-lg
                        focus:shadow-xl
                        focus:text-white
                        transition duration-600
                        focus:outline-none 
                        disabled:opacity-1000
                        disabled:cursor-not-allowed"
                    >
                      {props.isSubmitting ? (
                        <>
                          <Spin /> <Spin /> <Spin />
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowNarrowRightIcon className="w-4 h-4 mx-2" />
                        </>
                      )}
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default index;

const ErrorComponent = ({ children }) => (
  <div className="span text-red-500 text-sm h-6 ml-2">{children}</div>
);
const Payment = () => {
  console.log('Checkout/payment');
  return (
    <>
      <TopHeading name="Payment Method" />

      <div className="my-3  flex flex-col -mx-2  px-4  ">
        <Field name="paymentMethod">
          {({ field }) => {
            return payMethod.map((option) => {
              return (
                <div className="flex items-center  " key={option.value}>
                  <input
                    id={option.value}
                    key={option.value}
                    type="radio"
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                    className="h-5 w-5 text-indigo-500"
                  />
                  {option.src ? (
                    <img
                      htmlFor={option.value}
                      src={option.src}
                      className="h-6 mx-4 my-1"
                    />
                  ) : (
                    <div className="h-8 mx-4 text-lg font-semibold my-1 ">
                      {option.name}
                    </div>
                  )}
                </div>
              );
            });
          }}
        </Field>
      </div>
      <ErrorMessage name="paymentMethod" component={ErrorComponent} />
    </>
  );
};
export const TopHeading = ({ name }) => {
  console.log('Checkout/TopHeading');
  return (
    <div className="my-5 ">
      <h1 className="text-center font-bold text-xl uppercase">{name}</h1>
    </div>
  );
};
const AddressFrom = () => {
  console.log('Checkout/addressForm');
  return (
    <div id="adressFrom">
      <TopHeading name="Shipping Address" />

      <div className="grid md:grid-cols-2 md:gap-2">
        <div>
          <Input
            name="firstName"
            placeholder="First name*"
            label="First Name"
          />
        </div>
        <div>
          <Input name="lastName" placeholder="Last name*" label="Last Name" />
        </div>
      </div>
      <Input name="company" placeholder="Company (optional)" />
      <Input name="address1" placeholder="Address*" />
      <Input name="address2" placeholder="Apartment, suite, etc. (optional)" />
      <div className="grid md:grid-cols-3 md:gap-2">
        <div>
          <Input name="zipcode" placeholder="Zipcode*" />
        </div>
        <div>
          <Input name="city" placeholder="City*" />
        </div>
        <div>
          <Input name="state" placeholder="State*" />
        </div>
      </div>
      <Input name="country" placeholder="Country*" />
      <Input name="phNo" placeholder="Phone Number*" />
    </div>
  );
};
