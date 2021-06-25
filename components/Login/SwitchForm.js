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

export default SwitchForm;
