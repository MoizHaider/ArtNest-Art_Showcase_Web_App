"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function ProfileDataInputSection({ type }) {
  
  const [profileImgUrl, setProfileImgUrl] = useState();
  const [backgroundImgUrl, setBackgroundImgUrl] = useState();
  const [profileImg, setProfileImg] = useState();
  const [backgroundImg, setBackgroundImg] = useState();
  const router = useRouter();

  let email;
  let _id;

  useEffect(()=>{
    email = localStorage.getItem("email");
    _id = localStorage.getItem("_id");
  },[])

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/create-user-details`,
        {
          method: "post",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // throw an http error if a status code of 400 and 500 is found
      }
      localStorage.removeItem("email"); //In fetch req if there is an http error these lines will run,
      localStorage.removeItem("_id"); // but if a network error then these line will not run and catch block will execute
      router.replace("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const onProfileImgChangeHandler = (event) => {
    const img = event.target.files[0];
    setProfileImg(img);
    setProfileImgUrl(URL.createObjectURL(img));
  };

  const onBackgroundImgChangeHandler = (event) => {
    const img = event.target.files[0];
    setBackgroundImg(img);
    setBackgroundImgUrl(URL.createObjectURL(img));
  };

  return (
    <>
      <div className="bg-secondary  h-[100vh] flex items-center">
        <form
          onSubmit={onSubmitHandler}
          className="max-w-screen-md h-full sm:h-auto mx-auto p-10 bg-primary shadow-md sm:rounded-lg sm:mt-8"
        >
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
            <div className="w-full sm:w-1/2 sm:pr-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-text"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                className="mt-1 p-2 w-full border border-gray-300 focus:outline-none focus:border-accent rounded-full"
              />
            </div>
            <div className="w-full sm:w-1/2 sm:pl-4">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-text"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                className="mt-1 p-2 w-full border border-gray-300 rounded-full focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="mb-4 flex flex-col xs:flex-row xs:items-center">
            <div className="w-1/2 xs:pr-4">
              <label
                htmlFor="profileImg"
                className="block text-sm font-semibold text-text mt-2"
              >
                Profile Image
              </label>
              <input
                type="file"
                name="profileImg"
                onChange={onProfileImgChangeHandler}
                className="mt-1 mb-2 w-full focus:outline-none"
              />
              {profileImgUrl && (
                <Image
                  width={20}
                  height={20}
                  src={profileImgUrl}
                  alt="Profile Preview"
                  className="w-20 h-20 object-cover mt-2 rounded-[10px]"
                />
              )}
            </div>

            <div className="w-1/2 xs:pl-4">
              <label
                htmlFor="backgroundImg"
                className="block text-sm font-semibold text-text mt-2"
              >
                Background Image
              </label>
              <input
                type="file"
                name="backgroundImg"
                onChange={onBackgroundImgChangeHandler}
                className="mt-1 mb-2 w-full focus:outline-none"
              />
              {backgroundImgUrl && (
                <Image
                  width={20}
                  height={20}
                  src={backgroundImgUrl}
                  alt="Background Preview"
                  className="w-20 h-20 object-cover mt-2 rounded-[10px]"
                />
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="about"
              className="block text-sm font-semibold text-text"
            >
              About
            </label>
            <textarea
              name="about"
              placeholder="Write a brief description (max 150 characters)"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-accent"
            ></textarea>
          </div>

          <input type="hidden" name="_id" value={_id} />

          <button
            type="submit"
            className="bg-primary hover:bg-accent text-text hover:text-primary rounded-full py-2 px-4 hover:bg-opacity-80 focus:outline-none"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default ProfileDataInputSection;
