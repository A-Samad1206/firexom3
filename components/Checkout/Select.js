import { Field } from 'formik';

const Select = ({ name, data }) => (
  <Field
    as="select"
    className=" 
          w-full
          px-3
          py-2
          mb-1
          mx-2
          border-2 border-gray-200
          rounded-md
          focus:outline-none
          focus:border-indigo-500
          transition-colors
          cursor-pointer
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
export default Select;
