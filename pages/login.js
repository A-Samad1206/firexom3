import { auth, db } from '#firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import Spin from '#UI/Spin';
import firebase from 'firebase';

import { ErrorMessage, Field, Formik, Form } from 'formik';
const initialValues = {
  email: 'john@doe.com',
  username: 'John Doe',
  password: '123456',
};
const signUpValidate = (values) => {
  const errors = {};
  if (!values.email) errors.email = 'Email is required';
  if (!values.username) errors.username = 'Username required';
  if (!values.password) errors.password = 'Password required';
  return errors;
};
const loginValidate = (values) => {
  const errors = {};
  if (!values.email) errors.email = 'Email is required';
  if (!values.password) errors.password = 'Password required';
  return errors;
};
const Login = () => {
  console.log('page/Login');
  const router = useRouter();
  const { redirectTo } = router.query;
  console.log('Router', redirectTo);
  const [user, loading] = useAuthState(auth);
  // user ? redirectTo ? router.push(redirectTo): router.push('/cart');
  const [loginForm, setLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (user && !loading && redirectTo) {
      router.push(redirectTo);
    }
    if (user && !loading) router.push('/profile');
  }, [user]);
  const submit = async (values, actions) => {
    try {
      let createdUser;
      if (loginForm) {
        createdUser = await auth.signInWithEmailAndPassword(
          values.email,
          values.password
        );
        actions.setSubmitting(false);
      } else {
        createdUser = await auth.createUserWithEmailAndPassword(
          values.email,
          values.password
        );
        console.log('createdUser', createdUser.user.uid);
        await db.collection('users').doc(createdUser.user.uid).set({
          username: values.username,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        actions.setSubmitting(false);
      }
      redirectTo ? router.push(redirectTo) : router.push('/cart');
    } catch (err) {
      console.log('Err', err.message);
      err.message.indexOf('record') > 0 &&
        actions.setErrors({ email: 'Enter valid email address.' });
      err.message.indexOf('password') > 0 &&
        actions.setErrors({ password: 'Enter valid password.' });
      err.message.indexOf('already') > 0 &&
        actions.setErrors({ email: 'This email already registerd.' });
      err.message.indexOf('6 characters') > 0 &&
        actions.setErrors({
          password: 'Password should be at least 6 characters.',
        });
      // actions.setSubmitting(false);

      //   err.message.indexOf('password') > 0 &&
      //     setError((p) => ({
      //       ...p,
      //       password: 'Password length must be more then 6.',
      //     }));
    }
  };
  return (
    !loading && (
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
                  <Input
                    label="Username"
                    placeholder="Enter your username"
                    name="username"
                  />
                )}
                <Input
                  placeholder="mail@gmail.com"
                  name="email"
                  label="Email"
                />
                <div className="relative select-none">
                  {!props.errors.password && (
                    <div
                      className="absolute inset-y-0 top-1/2 right-0 mr-4   p-2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-h h-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </div>
                  )}
                  <Input
                    type={showPassword ? 'name' : 'password'}
                    label="Password"
                    placeholder="Enter your password"
                    name="password"
                  />
                </div>
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
const Input = ({
  name,
  placeholder,

  type,
  label,
  minlength,
}) => (
  <div>
    <label
      htmlFor={name}
      className=" text-sm font-bold text-gray-700 tracking-wide"
    >
      {label}
    </label>
    <Field
      minLength={minlength ? minlength : 0}
      className="
      w-full
      text-base
      py-2
      border-b border-gray-300
      focus:outline-none
      focus:border-indigo-500
     
    "
      type={type ? type : 'text'}
      placeholder={placeholder}
      name={name}
    />
    <ErrorMessage name={name} component={ErrorComponent} />
  </div>
);
const TopHeader = () => (
  <>
    <div className="flex flex-row justify-center items-center space-x-3">
      <span
        className="
      w-11
      h-11
      items-center
      justify-center
      inline-flex
      rounded-full
      font-bold
      text-lg text-white
      bg-blue-900
      hover:shadow-lg
      cursor-pointer
      transition
      ease-in
      duration-300
    "
      >
        F
      </span>
      <span
        className="
      w-11
      h-11
      items-center
      justify-center
      inline-flex
      rounded-full
      font-bold
      text-lg text-white
      bg-blue-400
      hover:shadow-lg
      cursor-pointer
      transition
      ease-in
      duration-300
    "
      >
        T
      </span>
      <span
        className="
      w-11
      h-11
      items-center
      justify-center
      inline-flex
      rounded-full
      font-bold
      text-lg text-white
      bg-blue-500
      hover:shadow-lg
      cursor-pointer
      transition
      ease-in
      duration-300
    "
      >
        Li
      </span>
    </div>
    <div className="flex items-center justify-center space-x-2">
      <span className="h-px w-16 bg-gray-300"></span>
      <span className="text-gray-500 font-normal">OR</span>
      <span className="h-px w-16 bg-gray-300"></span>
    </div>
  </>
);
const Spinner = () => (
  <>
    <Spin /> <Spin /> <Spin />
  </>
);
const ErrorComponent = ({ children }) => (
  <div className="text-sm my-2 text-red-300 mx-4">{children}</div>
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
const SwitchForm = ({ onClick, loginForm }) => (
  <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
    <span>
      {loginForm ? "Don't have an account?" : 'Already have an account!'}
    </span>
    <button
      type="button"
      onClick={onClick}
      className="
            text-indigo-500
            hover:text-indigo-500no-underline
            hover:underline
            cursor-pointer
            focus:outline-none
            transition
            ease-in
            duration-300
          "
    >
      {loginForm ? 'Sign up' : 'Sign In'}
    </button>
  </p>
);
