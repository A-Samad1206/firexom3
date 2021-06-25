import { db, auth } from '#firebase';
import firebase from 'firebase';

export const initialValues = {
  email: 'john@doe.com',
  username: 'John Doe',
  password: '123456',
};
export const signUpValidate = (values) => {
  const errors = {};
  if (!values.email) errors.email = 'Email is required';
  if (!values.username) errors.username = 'Username required';
  if (!values.password) errors.password = 'Password required';
  return errors;
};
export const loginValidate = (values) => {
  const errors = {};
  if (!values.email) errors.email = 'Email is required';
  if (!values.password) errors.password = 'Password required';
  return errors;
};
export const onSubmit = async (
  values,
  actions,
  loginForm,
  redirectTo,
  router
) => {
  try {
    let createdUser;
    if (loginForm) {
      await auth.signInWithEmailAndPassword(values.email, values.password);
      actions.setSubmitting(false);
    } else {
      createdUser = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      await db.collection('users').doc(createdUser.user.uid).set({
        username: values.username,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      actions.setSubmitting(false);
    }
    if (redirectTo) {
      router.push(redirectTo);
    } else {
      router.push('/profile');
    }
  } catch (err) {
    console.log('Login Error', err.message);
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
