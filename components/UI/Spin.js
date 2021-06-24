const Spin = () => (
  <div className="h-5 mr-1 w-5">
    <div className="relative">
      <div className="absolute inset h-5 w-5 bg-transparent border-4 border-gray-10 rounded-full " />
      <div className="absolute inset h-5 w-5 bg-transparent border-t-4 border-gray-400 rounded-full animate-spin" />
    </div>
  </div>
);
export default Spin;
