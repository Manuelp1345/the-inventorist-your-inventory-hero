import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Box className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-br from-[#1E2334] via-[#411D28] to-[#ED4C4B] text-white">
      <Typography className="text-center font-bold text-[44px]">
        The Inventorist
      </Typography>
      <Typography className="text-center text-[20px]">
        Your Inventory Hero
      </Typography>

      <Box className="w-full flex justify-between items-center px-[2.5vw] mt-[16px] gap-[10vw]">
        <Box className="w-[50%] flex justify-center"></Box>
        <Box className="w-[50%] flex justify-center flex-col">
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
              Don&apos;t have an account?&nbsp;
              <a href="#" className="text-[#ED4C4B]">
                Register
              </a>
            </Typography>

            <Typography className="text-[14px] text-center ">
              Forgot your password? &nbsp;
              <a href="#" className="text-[#ED4C4B] ">
                Reset
              </a>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
