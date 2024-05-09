"use client";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

const AuthContainer = () => {
  const [authType, setAuthType] = React.useState<
    "login" | "register" | "reset"
  >("login");

  return (
    <Box className=" w-full md:w-[50%] flex justify-center flex-col">
      {authType === "login" && (
        <>
          <Typography className="text-[24px] font-bold">Login</Typography>
          <Box className="flex flex-col gap-[16px] mt-[16px]">
            <input
              type="text"
              placeholder="Username"
              className="p-[8px] rounded-md bg-[#2E334D] text-white"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-[8px] rounded-md bg-[#2E334D] text-white"
            />
            <button className="p-[8px] rounded-md bg-[#ED4C4B] text-white">
              Login
            </button>

            <Typography className="text-[14px] text-center">
              Don&apos;t have an account?
              <br />
              <Button
                onClick={() => {
                  setAuthType("register");
                }}
                className="text-[#ED4C4B] p-0 m-0 "
              >
                Register
              </Button>
            </Typography>

            <Typography className="text-[14px] text-center ">
              Forgot your password? <br />
              <Button
                onClick={() => {
                  setAuthType("reset");
                }}
                className="text-[#ED4C4B] p-0 m-0 "
              >
                Reset
              </Button>
            </Typography>
          </Box>
        </>
      )}
      {authType === "register" && (
        <>
          <Typography className="text-[24px] font-bold">Register</Typography>
          <Box className="flex flex-col gap-[16px] mt-[16px]">
            <input
              type="text"
              placeholder="Username"
              className="p-[8px] rounded-md bg-[#2E334D] text-white"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-[8px] rounded-md bg-[#2E334D] text-white"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-[8px] rounded-md bg-[#2E334D] text-white"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-[8px] rounded-md bg-[#2E334D] text-white"
            />
            <button className="p-[8px] rounded-md bg-[#ED4C4B] text-white">
              Register
            </button>

            <Typography className="text-[14px] text-center">
              Already have an account?
              <br />
              <Button
                onClick={() => {
                  setAuthType("login");
                }}
                className="text-[#ED4C4B] p-0 m-0 "
              >
                Login
              </Button>
            </Typography>
          </Box>
        </>
      )}
      {authType === "reset" && (
        <>
          <Typography className="text-[24px] font-bold">
            Reset Password
          </Typography>
          <Box className="flex flex-col gap-[16px] mt-[16px]">
            <input
              type="email"
              placeholder="Email"
              className="p-[8px] rounded-md bg-[#2E334D] text-white"
            />
            <button className="p-[8px] rounded-md bg-[#ED4C4B] text-white">
              Reset
            </button>

            <Typography className="text-[14px] text-center">
              Remembered your password?
              <br />
              <Button
                onClick={() => {
                  setAuthType("login");
                }}
                className="text-[#ED4C4B] p-0 m-0 "
              >
                Login
              </Button>
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AuthContainer;
