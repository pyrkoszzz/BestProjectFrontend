import React, { useRef } from "react";
import { MdEdit } from "react-icons/md";

const HeroProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id, name, email, payload } = user;
  console.log(user)
  const fileInputRef = useRef(null);
  const defaultImage = "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1704449033~exp=1704449633~hmac=f9dc6a7445406c25f79048bf07c7e972bf297c35a3786f61aaf8b3ec0cfb4266"
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {

    }
  };

  return (
    <div className="bg-gray-100 h-80 w-full flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <img
            src={defaultImage}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-lostColor"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            hidden
            onChange={handleFileChange}
          />
          <button
            className="absolute bottom-1 right-1 bg-lostColor text-black p-2 rounded-full"
            onClick={handleEditClick}
          >
            <MdEdit className="w-4 h-4" />
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-1">{name}</h2>
        <p className="text-base text-gray-600">{email}</p>
      </div>
    </div>
  );
};

export default HeroProfile;
