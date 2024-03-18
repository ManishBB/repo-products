import React from "react";
import { useSelector } from "react-redux";

function ProfilePage() {
    const userData = useSelector((state) => state.auth.userData);
    console.log(userData);
    return (
        <div className="flex justify-center items-center mt-10">
            <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
                    <img
                        src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
                        alt="profile-picture"
                    />
                </div>
                <div className="p-6 text-center">
                    <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        {userData.email}
                    </h4>
                    <p className="block font-sans text-base  antialiased font-medium leading-relaxed bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                        {userData.role}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
