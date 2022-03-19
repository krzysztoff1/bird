import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const ProfileFlowEnd = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <article className="flex h-full flex-col items-center justify-center">
      <h2 className="mt-2 text-2xl font-bold">
        Twój profil jest zaktualizowany
      </h2>
      <Link to={`/profile/${currentUser.uid}`}>
        <button
          type="submit"
          className="text-md mx-auto mt-4 mb-3 w-full max-w-xs rounded-full border-[1px] border-slate-50 bg-slate-50 py-2 font-medium text-black transition hover:bg-slate-200"
        >
          Wyświetl profil
        </button>
      </Link>
    </article>
  );
};

export default ProfileFlowEnd;
