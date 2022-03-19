import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../../context/auth-context";
import { ProfileFlowContext } from "../../../context/profileFlow-context";
import { setUserPhoto } from "../../../services/firebase";

const SetProfilePicture = (toggle) => {
  const authState = useContext(AuthContext);
  const { state, dispatch } = useContext(ProfileFlowContext);
  const [file, setFile] = useState();
  const fileRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const setPicture = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUserPhoto(file);
    dispatch({
      type: 0,
      payload: { ready: true, progress: 0 },
    });
  };

  return (
    <form
      onSubmit={setPicture}
      className="flex h-full w-full flex-col justify-between"
    >
      <main>
        <h2 className="mt-2 text-2xl font-bold">
          Napisz coś o sobie Jakie są Twoje znaki rozpoznawcze?
        </h2>
        <p className="mb-4 opacity-80">Podejdź do tego na wesoło.</p>

        <div className="relative mx-auto w-48">
          <img
            onClick={() => fileRef.current.click()}
            src={
              file
                ? URL.createObjectURL(file)
                : authState.userData?.profilePicture
                ? authState.userData.profilePicture
                : "https://www.thehindu.com/sci-tech/technology/internet/article17759222.ece/alternates/FREE_435/02th-egg-person"
            }
            className="mx-auto mb-2 h-48 w-48 rounded-full border border-slate-200/30 object-cover"
            alt="profile preview"
          />
          <div
            className={`absolute top-0 z-30 flex h-full w-full items-center justify-center bg-slate-900/30 opacity-0 transition hover:opacity-100`}
          >
            <button
              type="button"
              className="flex text-slate-100"
              onClick={() => fileRef.current.click()}
            >
              <span className="mr-2">Select photo</span>
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
          </div>
        </div>
      </main>
      <button
        type="submit"
        className="text-md mx-auto mt-4 mb-3 w-full max-w-xs rounded-full border-[1px] border-slate-50 bg-slate-50 py-2 font-medium text-black transition hover:bg-slate-200"
      >
        Set new profile picture
      </button>
      <input
        ref={fileRef}
        onChange={handleFileChange}
        multiple={false}
        type="file"
        hidden
      />
    </form>
  );
};

export default SetProfilePicture;
