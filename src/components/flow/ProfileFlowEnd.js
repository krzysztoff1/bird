import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { useTranslation } from "react-i18next";

const ProfileFlowEnd = () => {
  const { t } = useTranslation();
  const { currentUser } = useContext(AuthContext);

  return (
    <article className="flex h-full flex-col items-center justify-center">
      <h2 className="mt-2 text-2xl font-bold">
        {t("your_profile_has_been_updated")}
      </h2>
      <Link to={`/profile/${currentUser.uid}`}>
        <button
          type="submit"
          className="text-md mx-auto mt-4 mb-3 w-full max-w-xs rounded-full border-[1px] border-slate-50 bg-slate-50 px-4 py-2 font-medium text-black transition hover:bg-slate-200"
        >
          {t("show_profile")}
        </button>
      </Link>
    </article>
  );
};

export default ProfileFlowEnd;
