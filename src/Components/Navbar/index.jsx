import React from "react";
import { Navbar, Typography } from "@material-tailwind/react";
import Logout from "./logoutModal";
import { useState } from "react";

export function ComplexNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none !p-0 lg:pr-8 lg:pl-6 lg:py-4">
      <div className="relative mx-auto flex px-3 items-center justify-between text-blue-gray-900 bg-[#F7941D]">
        <Typography
          variant="h5"
          className="text-sm md:text-base lg:text-lg"
        ></Typography>
        <Typography
          variant="h5"
          className="text-sm text-white md:text-base lg:text-lg"
        >
          Join Us
        </Typography>
        <Typography
          variant="h5"
          className="text-sm text-white md:text-base lg:text-lg flex items-center"
        >
          <img src="/images/store.svg" alt="" className="w-5" /> Store
        </Typography>
        <Typography
          variant="h5"
          className="text-sm text-white md:text-base lg:text-lg flex items-center"
        >
          <img src="/images/group.svg" alt="" className="w-5" /> Plans
        </Typography>
        <div className="w-28 h-14 overflow-hidden">
          <img
            src="/images/logo.svg"
            className="w-full h-full object-cover"
            alt="Logo"
          />
        </div>
        <Typography
          variant="h5"
          className="text-sm text-white md:text-base lg:text-lg"
        >
          Comics
        </Typography>
        <Typography
          variant="h5"
          className="text-sm text-white md:text-base lg:text-lg"
        >
          Podcasts
        </Typography>
        <Typography
          variant="h5"
          className="text-sm text-white md:text-base lg:text-lg"
        >
          Audio Comics
        </Typography>

        <div className="flex gap-3 items-center">
          <img
            src="/images/profileBlue.svg"
            alt=""
            className="w-6 h-6 md:w-7 md:h-7"
          />
          <Logout isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <div className="relative mx-auto p-3 flex items-center justify-between text-blue-gray-900">
        <Typography variant="h5" className="text-sm md:text-base lg:text-lg">
          Home
        </Typography>
        <Typography variant="h5" className="text-sm md:text-base lg:text-lg">
          Friends
        </Typography>
        <Typography variant="h5" className="text-sm md:text-base lg:text-lg">
          Groups
        </Typography>
        <Typography variant="h5" className="text-sm md:text-base lg:text-lg">
          Products
        </Typography>

        <div className="flex gap-3 items-center">
          <img
            src="/images/email.svg"
            alt=""
            className="w-6 h-6 md:w-7 md:h-7"
          />
          <img
            src="/images/bell.svg"
            alt=""
            className="w-5 h-5 md:w-6 md:h-6"
          />
          <img
            src="/images/profile.svg"
            alt=""
            className="w-6 h-6 md:w-7 md:h-7"
          />
        </div>
      </div>
    </Navbar>
  );
}
