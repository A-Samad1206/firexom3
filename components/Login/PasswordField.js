import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import Input from './InputField';
import { useState } from 'react';
const PasswordField = ({ props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
  );
};

export default PasswordField;
