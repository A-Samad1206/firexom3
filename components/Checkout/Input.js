import { ErrorMessage, Field } from 'formik';

const Input = ({ name, placeholder, className, label }) => {
  const clsName = `mt-2 w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors `;
  return (
    <div className="mb-3">
      {label && <label className="font-bold text-sm mb-2 ml-1">{label}</label>}

      <Field
        type="text"
        className={className ? `${clsName} ${className}` : clsName}
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component={ErrorComponent} />
    </div>
  );
};
export default Input;
const ErrorComponent = ({ children }) => (
  <div className="span text-red-500 text-sm h-6 ml-2">{children}</div>
);
