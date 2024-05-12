import { Box, Typography } from "@mui/material";
import Image from "next/image";
import hero from "./assets/img/hero.png";
import LogoWithBg from "./assets/img/logo-without-background.webp";

import AuthContainer from "@/modules/auth/AuthContainer";

export default function Home() {
  return (
    <Box className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-br from-color1 via-color2 to-color3 text-white">
      <Box className="flex flex-col justify-center items-center ">
        <Box className="flex flex-col md:flex-row justify-center items-center gap-[10px] ">
          <Image
            src={LogoWithBg}
            className="  p-[2px]"
            alt="The Inventorist"
            width={50}
            height={50}
          />
          <Typography className="text-center font-bold text-[44px]">
            The Inventorist
          </Typography>
        </Box>
        <Typography className="text-center text-[20px] mb-[20px]">
          Your Inventory Hero
        </Typography>
      </Box>

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
