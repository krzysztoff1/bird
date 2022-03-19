import { useState, useContext } from "react";
import { setUserDescription } from "../../../services/firebase";
import { ProfileFlowContext } from "../../../context/profileFlow-context";
import { AuthContext } from "../../../context/auth-context";

const SetDescription = () => {
  const authState = useContext(AuthContext);
  const [text, setText] = useState();
  const { state, dispatch } = useContext(ProfileFlowContext);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setUserDescription(text);
        dispatch({
          type: 1,
          payload: { ready: true, progress: 25 },
        });
      }}
      className="flex h-full flex-col justify-between"
    >
      <main>
        <h2 className="mt-2 text-2xl font-bold">
          Napisz coś o sobie Jakie są Twoje znaki rozpoznawcze?
        </h2>
        <p className="mb-4 opacity-80">Podejdź do tego na wesoło.</p>
        <textarea
          onChange={(e) => setText(e.target.value)}
          id="message"
          rows="4"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder={
            authState.userData.description
              ? authState.userData.description
              : "Write something"
          }
        />
      </main>
      <button
        disabled={text?.length !== 0 ? false : true}
        type="submit"
        className={`${
          text
            ? " cursor-pointer bg-white text-black hover:bg-slate-200"
            : "cursor-not-allowed border-slate-400/30 bg-slate-500/30 text-white"
        } text-md mx-auto mt-4 mb-3 w-full max-w-xs rounded-full border-[1px] border-slate-50 py-2 font-medium  transition`}
      >
        Set description
      </button>
    </form>
  );
};

export default SetDescription;
