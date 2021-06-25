import { auth, db } from '#firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Spin from '#UI/Spin';
import {
  initialValues,
  signUpValidate,
  loginValidate,
  onSubmit,
} from './formSchema';
import { Formik, Form } from 'formik';

import SwitchForm from './SwitchForm';
import PasswordField from './PasswordField';
import InputField from './InputField';
import TopHeader from './TopHeader';
const Login = () => {
  const router = useRouter();
  const { redirectTo } = router.query;
  const [user, loading] = useAuthState(auth);
  // user ? redirectTo ? router.push(redirectTo): router.push('/cart');
  const [loginForm, setLoginForm] = useState(true);
  useEffect(() => {
    if (user && !loading && redirectTo) {
      router.push(redirectTo);
    }
    if (user && !loading && !redirectTo) router.push('/profile');
  }, [user]);
  const submit = (values, actions) =>
    onSubmit(values, actions, loginForm, redirectTo, router);
  return (
    !loading &&
    !user && (
      <div className="mx-auto shadow-lg border-4 max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {loginForm
              ? 'Please sign in to your account'
              : 'Please create account.'}
          </p>
        </div>
        <TopHeader />
        <Formik
          initialValues={initialValues}
          onSubmit={submit}
          validate={loginForm ? loginValidate : signUpValidate}
        >
          {(props) => {
            return (
              <Form className="mt-8 space-y-6">
                {!loginForm && (
                  <InputField
                    label="Username"
                    placeholder="Enter your username"
                    name="username"
                  />
                )}
                <InputField
                  placeholder="mail@gmail.com"
                  name="email"
                  label="Email"
                />
                <PasswordField props={props} />
                <div>
                  <button
                    type="submit"
                    disabled={props.isSubmitting === true}
                    className="w-full flex justify-center p-4 cursor-pointer focus:text-white disabled:opacity-1000 disabled:cursor-not-allowed ease-in duration-300 text-xl items-center my-2  rounded-full text-white bg-blue-500 hover:bg-blue-700 focus:bg-blue-400 hover:shadow-md focus:shadow-xl focus:outline-none 
                  "
                  >
                    {props.isSubmitting ? (
                      <Spinner />
                    ) : loginForm ? (
                      'Sign in'
                    ) : (
                      'Sign up'
                    )}
                  </button>
                </div>
                <SwitchForm
                  loginForm={loginForm}
                  onClick={() => {
                    props.setErrors({});
                    setLoginForm(!loginForm);
                  }}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    )
  );
};
export default Login;
const Spinner = () => (
  <>
    <Spin /> <Spin /> <Spin />
  </>
);

const Additional = () => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <input
        id="remember_me"
        name="remember_me"
        type="checkbox"
        className="
                      h-4
                      w-4
                      bg-indigo-500
                      focus:ring-indigo-400
                      border-gray-300
                      rounded
                    "
      />
      <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
        Remember me
      </label>
    </div>
    <div className="text-sm">
      <button className="font-medium text-indigo-500 hover:text-indigo-500">
        Forgot your password?
      </button>
    </div>
  </div>
);
