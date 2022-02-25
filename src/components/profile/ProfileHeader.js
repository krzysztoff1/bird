import { useState, useEffect } from "react";
import { follow, unFollow, isFollowed } from "../../services/firebase";
import { motion } from "framer-motion";

const ProfileHeader = ({ account, uid, profilePicture }) => {
  const [followState, setFollowState] = useState(false);

  useEffect(() => {
    isFollowed(uid).then((res) => setFollowState(res));
  }, [uid]);

  return (
    <div className="max-w-md mx-auto pt-24">
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
          } w-28 text-white shadow-md border-2 border-blue-700 hover:bg-blue-800 transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
        >
          {!followState ? "Follow" : "Following"}
        </motion.button>
      </div>
      <h3 className="text-slate-200 text-xl mt-2"> {account}</h3>
    </div>
  );
};

export default ProfileHeader;
