import { useState, useEffect } from "react";
import { isFollowed } from "../../services/firebase";
import { follow, unFollow } from "../../services/firebase";

const ProfileHeader = ({ account, uid, profilePicture }) => {
  const [followState, setFollowState] = useState(false);

  useEffect(() => {
    isFollowed(uid).then((res) => setFollowState(res));
  }, [uid]);

  return (
    <div className="rounded-box col-span-3 row-span-3 my-4 mx-auto grid w-72 flex-shrink-0 place-items-center items-center gap-4 place-self-start bg-slate-800 p-4 py-8 shadow-xl xl:mx-0 xl:w-full">
      <div tabIndex="0">
        <div className="online avatar">
          <div className="mask mask-squircle bg-base-content h-24 w-24 bg-opacity-10 p-px">
            <img
              src={profilePicture}
              width="94"
              height="94"
              alt="Avatar Tailwind CSS Component"
              className="mask mask-squircle"
            />
          </div>
        </div>
      </div>
      <div>
        <div tabIndex="0">
          <div className="text-center">
            <div className="text-lg font-extrabold">{account}</div>
            {/* <div className="text-base-content my-3 text-sm text-opacity-60">
              Strategic Art Manager
              <br /> Global Illustration Observer
              <br /> Business Alignment Developer
            </div> */}
          </div>
        </div>
        {/* <div className="mt-2 text-center">
            <div className="badge badge-ghost mx-1 bg-zinc-600">Design</div>
            <div className="badge badge-ghost mx-1 bg-zinc-600">Art</div>
            <div className="badge badge-ghost mx-1 bg-zinc-600">
              Illustration
            </div>
          </div> */}
      </div>
      <div tabIndex="0">
        <div className="btn-group">
          <button
            onClick={() =>
              !followState
                ? (follow(uid), setFollowState(true))
                : (unFollow(uid), setFollowState(false))
            }
            className={`btn ${!followState ? "btn-accent" : "btn-ghost"}`}
          >
            {!followState ? "Follow" : "following"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
