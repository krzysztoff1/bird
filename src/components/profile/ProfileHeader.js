import { useState, useEffect, useContext } from "react";
import { follow, unFollow, isFollowed } from "../../services/firebase";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/auth-context";
import { Link } from "react-router-dom";

const ProfileHeader = ({
  account,
  uid,
  profilePicture,
  description,
  following,
  followedBy,
}) => {
  const { t } = useTranslation();
  const authState = useContext(AuthContext);
  const [followState, setFollowState] = useState(false);

  useEffect(() => {
    if (uid !== authState.currentUser.uid) return;
    isFollowed(uid).then((res) => setFollowState(res));
  }, [uid]);

  return (
    <div className="relative mx-auto max-w-md px-3 pt-24 sm:max-w-full">
      <img
        src="https://images.unsplash.com/photo-1647587085908-1b88c44bcdd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
        alt="temporary cover"
        className="absolute top-0 right-0 left-0 z-0 h-28 w-full object-cover"
      />
      <div className="z-30 flex justify-between">
        <img
          src={profilePicture}
          width="60"
          height="60"
          alt="User avatar"
          className="z-20 h-20  w-20 rounded-full border-2 border-white object-cover dark:border-slate-900"
        />
        {authState.currentUser.uid === uid ? (
          <Link
            to="/flow/profile_setup"
            type="button"
            className={`
         text-md  z-20 h-min w-[8rem] 
        rounded-full border-[1px] border-slate-50/30 bg-white p-2 px-4 text-center font-medium text-black transition-all hover:bg-neutral-100 dark:border-black dark:bg-slate-900 dark:text-white
        `}
          >
            {t("fill_profile")}
          </Link>
        ) : (
          <button
            onClick={() =>
              !followState
                ? (follow(uid), setFollowState(true))
                : (unFollow(uid), setFollowState(false))
            }
            type="button"
            className={`${
              followState
                ? " border-slate-50/30 bg-slate-800  text-slate-50"
                : " border-white bg-white hover:bg-slate-200 dark:border-black"
            } text-md z-50 h-min w-[8rem] rounded-full border-[1px] p-2 px-4 font-medium transition-all
        `}
          >
            {!followState ? t("follow") : t("following")}
          </button>
        )}
      </div>
      <h3 className="mt-2 text-xl font-bold tracking-wide text-black dark:text-white">
        {account}
      </h3>
      <p className=" mt-1 text-black dark:text-white"> {description}</p>
      <p className="mt-1 mb-4 text-black dark:text-white/50">
        {followedBy && followedBy?.length !== 0 && (
          <>
            <b className="font-bold "> {followedBy.length} </b> {t("followers")}{" "}
            •{" "}
          </>
        )}
        {following && following?.length && (
          <>
            <b className="font-bold ">{following.length} </b> {t("following")}
          </>
        )}
      </p>
    </div>
  );
};

export default ProfileHeader;
