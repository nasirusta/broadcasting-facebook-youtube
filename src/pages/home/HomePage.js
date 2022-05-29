import { FacebookConnect } from "../../components";

const HomePage = () => {
  return (
    <div className="w-full">
      <div className="block h-full w-full text-center">
        <div className="w-full h-auto grid grid-cols-1 gap-2">
          <FacebookConnect />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
