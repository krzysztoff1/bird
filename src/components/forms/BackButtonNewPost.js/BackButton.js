import { useNavigate } from "react-router";

const BackButton = ({ text, toggleModal }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => (!text ? navigate("/") : toggleModal(true))}
      className="p-3 font-bold text-slate-100"
    >
      <svg
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default BackButton;
