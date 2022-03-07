import { useState, useEffect } from "react";
import { follow, unFollow, isFollowed } from "../../services/firebase";
import { useTranslation } from "react-i18next";

const ProfileHeader = ({
  account,
  uid,
  profilePicture,
  description,
  following,
  followedBy,
}) => {
  const { t } = useTranslation();
  const [followState, setFollowState] = useState(false);

  useEffect(() => {
    isFollowed(uid).then((res) => setFollowState(res));
  }, [uid]);

  return (
    <div className="mx-auto max-w-md px-3 pt-24">
      <div className="flex justify-between">
        <img
          src={profilePicture}
          width="60"
          height="60"
          alt="User avatar"
          className="h-20 w-20 rounded-full object-cover"
        />
        {}

        <button
          onClick={() =>
            !followState
              ? (follow(uid), setFollowState(true))
              : (unFollow(uid), setFollowState(false))
          }
          type="button"
          className={`${
            followState
              ? " border-slate-50/30  text-slate-50"
              : " border-slate-50 bg-slate-50 hover:bg-slate-200"
          } text-md h-min w-[8rem] rounded-full border-[1px] p-2 px-4 font-medium transition-all
          `}
        >
          {!followState ? t("follow") : t("following")}
        </button>
      </div>
      <h3 className="mt-2 text-xl text-slate-200"> {account}</h3>
      <p className="md mt-2 text-slate-200"> {description}</p>
      <p className="text-slate-900 dark:text-slate-500">
        {followedBy?.length !== 0 && (
          <>
            <b className="font-bold text-slate-200"> {followedBy.length} </b>{" "}
            {t("followers")} •{" "}
          </>
        )}
        {following?.length && (
          <>
            <b className="font-bold text-slate-200">{following.length} </b>{" "}
            {t("following")}
          </>
        )}
      </p>
    </div>
  );
};

export default ProfileHeader;
