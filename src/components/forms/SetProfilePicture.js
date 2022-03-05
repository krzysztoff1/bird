import { useState, useRef } from "react";
import { setUserPhoto } from "../../services/firebase";

const SetProfilePicture = (toggle) => {
  const [file, setFile] = useState();
  const fileRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setUserPhoto(file);
        toggle(false);
      }}
    >
      {file ? (
        <div className="flex items-center">
          <img
            src={URL.createObjectURL(file)}
            className="mr-4 h-20 w-20 rounded-full object-cover"
            alt="profile preview"
          />
          <p className="text-slate-100">Profile picture preview</p>
        </div>
      ) : null}
      <div className="my-4 flex justify-center">
        <button
          type="button"
          className="flex rounded-md px-2 py-3 text-slate-100 hover:bg-slate-800"
          onClick={() => fileRef.current.click()}
        >
          <span className="mr-2 hover:underline">Select photo</span>
          <svg
            className="h-6 w-6"
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <input
          ref={fileRef}
          onChange={handleFileChange}
          multiple={false}
          type="file"
          hidden
        />
      </div>
      <button
        type="submit"
        className="text-md mt-4 mb-3 w-full rounded-full border-[1px] border-slate-50 bg-slate-50 py-2 font-medium transition hover:bg-slate-200"
      >
        Change profile picture
      </button>
    </form>
  );
};

export default SetProfilePicture;
