import { Box, Typography } from "@mui/material";
import Image from "next/image";
import hero from "./assets/img/hero.png";
import AuthContainer from "@/modules/auth/AuthContainer";

export default function Home() {
  return (
    <Box className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-br from-[#1E2334] via-[#411D28] to-[#ED4C4B] text-white">
      <Typography className="text-center font-bold text-[44px]">
        The Inventorist
      </Typography>
      <Typography className="text-center text-[20px] mb-[20px]">
        Your Inventory Hero
      </Typography>

      <Box className="w-full sm:mt-[20px] flex justify-normal md:justify-between items-center md:px-[2.5vw] mt-[16px] md:gap-[10vw]">
        <Box className=" hidden md:w-[50%] md:flex justify-center">
          <Image
            src={hero}
            className="rounded-full bg-[#626470] p-[2px]"
            alt="The Inventorist"
            width={600}
            height={600}
          />
        </Box>
        <AuthContainer />
      </Box>
    </Box>
  );
}
