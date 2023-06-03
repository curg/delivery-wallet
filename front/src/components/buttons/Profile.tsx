import Image from "next/image";
import React from "react";

const Profile = () => {
  return (
    <div className="items-center flex">
      <Image src={"/mockProfile.png"} alt="Profile" width={30} height={30} />
    </div>
  );
};

export default Profile;
