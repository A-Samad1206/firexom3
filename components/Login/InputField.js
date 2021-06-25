import { ErrorMessage, Field } from 'formik';
import ErrorComponent from './ErrorComponent';

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
export default Input;
