import React, { useState, useEffect } from "react";
import UserService from "../service/UserService";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.ourUsers);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Information</h2>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Name:</span> {profileInfo.name}
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Email:</span> {profileInfo.email}
      </p>
      <p className="text-gray-600 mb-4">
        <span className="font-semibold">City:</span> {profileInfo.city}
      </p>
      {profileInfo.role === "ADMIN" && (
        <Link
          to={`/update-user/${profileInfo.id}`}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Update This Profile
        </Link>
      )}
    </div>
  );
}

export default ProfilePage;
