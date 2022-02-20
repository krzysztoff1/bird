import ProfileHeader from "../components/profile/ProfileHeader";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { isFollowed } from "../services/firebase";
import { getUserByUid } from "../services/firebase";

const Profile = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState();

  useEffect(() => {
    getUserByUid(uid).then((res) => setUserData(res));
  }, [uid]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ProfileHeader
        profilePicture={userData.googleProfilePicture}
        account={userData.name}
        uid={uid}
      />
    </>
  );
};
export default Profile;
