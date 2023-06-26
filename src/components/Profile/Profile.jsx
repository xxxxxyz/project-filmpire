import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";

const Profile = () => {
  const { user } = useSelector(userSelector);
  return <>{user.username}</>;
};

export default Profile;
