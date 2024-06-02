import { PuffLoader } from "react-spinners";

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <PuffLoader color="#fff" />
    </div>
  );
};

export default Spinner;
