import Header from '../Header';
import Footer from '../Footer';

const index = ({ children }) => {
  return (
    <div
      id="wrapper "
      className="transition-all     duration-800 text-gray-600 flex flex-col  max-w-[100vw]  min-h-screen"
    >
      <Header />
      <div className="container mx-auto flex-grow px-0 py-8">{children}</div>

      <Footer />
    </div>
  );
};

export default index;
