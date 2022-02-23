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
              alt="User avatar"
              className="rounded-full"
            />
          </div>
        </div>
      </div>
      <div>
        <div tabIndex="0">
          <div className="text-center">
            <div className="text-lg text-slate-100 font-extrabold">
              {account}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="">
          <button
            onClick={() =>
              !followState
                ? (follow(uid), setFollowState(true))
                : (unFollow(uid), setFollowState(false))
            }
            className={`${
              !followState
                ? "bg-blue-600 shadow-blue-600/30"
                : "bg-transparent shadow-transparent  "
            } w-28 text-white shadow-md border-2 border-blue-700 hover:bg-blue-800 transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
          >
            {!followState ? "Follow" : "Following"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
