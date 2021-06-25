export const initialValues = {
  nameOnCard: 'John Doe',
  cardNumber: '4111 1111 1111 1111',
  cvv: '123',
  expirationMonth: '02',
  expirationYear: '2021',
};
export const validation = (values) => {
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
