import { useState, useEffect } from "react";
import { follow, unFollow, isFollowed } from "../../services/firebase";
import { motion } from "framer-motion";

const ProfileHeader = ({ account, uid, profilePicture, description }) => {
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
          className="rounded-full"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            !followState
              ? (follow(uid), setFollowState(true))
              : (unFollow(uid), setFollowState(false))
          }
          className={`${
            !followState
              ? "bg-blue-600 shadow-blue-600/30"
              : "bg-transparent shadow-transparent  "
          } mr-2 mb-2 w-28 rounded-lg border-2 border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white shadow-md transition-all hover:bg-blue-800`}
        >
          {!followState ? "Follow" : "Following"}
        </motion.button>
      </div>
      <h3 className="mt-2 text-xl text-slate-200"> {account}</h3>
      <p className="md mt-2 text-slate-200"> {description}</p>
    </div>
  );
};

export default ProfileHeader;
