export const initialValues = {
  firstName: 'First Name',
  lastName: 'Last Name',
  address1: 'Address One',
  address2: 'Address Two',
  company: 'Company',
  state: 'State',
  zipcode: 'Zipcode',
  country: 'Country',
  city: 'City',
  phNo: '9870645161',
  nameOnCard: 'Abdus',
  cardNumber: '4111111111',
  securityCode: '356',
  paymentMethod: 'atm',
  expirationMonth: '02',
  expirationYear: '2022',
};
export const initialValuesTwo = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  company: '',
  state: '',
  zipcode: '',
  country: '',
  city: '',
  phNo: '',
  paymentMethod: '',
};
export const payMethod = [
  {
    value: 'atm',
    src: 'https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png',
  },
  {
    value: 'paypal',
    src: 'https://www.sketchappsources.com/resources/source-image/PayPalCard.png',
  },
  {
    value: 'stripe',
    src: '/icons/stripe.png',
  },
];
export const validate = (values) => {
  let errors = {};
  if (!values.firstName) errors.firstName = 'First Name required';
  if (!values.lastName) errors.lastName = 'Last Name required';
  if (!values.address1) errors.address1 = 'Address required';
  if (!values.state) errors.state = 'State required';
  if (!values.zipcode) errors.zipcode = 'Zipcode required';
  if (!values.country) errors.country = 'Country Name required';
  if (!values.city) errors.city = 'City required';
  if (!values.state) errors.state = 'State required';
  if (!values.phNo) errors.phNo = 'Phone No. required';

  if (!values.paymentMethod)
    errors.paymentMethod = 'Payment Method is required';

  return errors;
};
