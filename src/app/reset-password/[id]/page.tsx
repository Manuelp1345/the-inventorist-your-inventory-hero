"use client";
import { Alert, Box, Button, Input, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import logo from "../../assets/img/logo-without-background.webp";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function Home({ params }: { params: { id: string } }) {
  const route = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState({
    id: params.id,
    password: "",
    confirmPassword: "",
    token: token,
  });

  const resetPassword = async () => {
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }
    let response;
    try {
      response = await axios.patch("/api/auth/reset-password", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error: any) {
      if (error.response?.status === 401) {
        return route.push("/");
      }
      return alert(error.response?.data);
    }
    setUpdate(true);

    return setTimeout(() => {
      route.push("/");
    }, 3000);
  };

  return (
    <Box className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-br from-color1 via-color2 to-color3 text-white">
      <Box className="flex flex-col justify-center items-center ">
        <Box className="flex flex-col md:flex-row justify-center items-center gap-[10px] ">
          <Image
            src={logo}
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

      <Box className="w-full flex flex-col items-center mt-[16px] ">
        <Typography className="text-[24px] font-bold">
          Reset Your Password
        </Typography>
        <Box className="flex flex-col gap-[16px] mt-[16px]  md:w-[30%]">
          <Input
            type="password"
            placeholder="Password"
            className="p-[8px] rounded-md bg-[#2E334D] text-white w-[100%]"
            sx={{
              "&:after": { borderColor: "#ED4C4B" },
            }}
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            className="p-[8px] rounded-md bg-[#2E334D] text-white  w-[100%]"
            sx={{
              "&:after": { borderColor: "#ED4C4B" },
            }}
            value={data.confirmPassword}
            onChange={(e) =>
              setData({ ...data, confirmPassword: e.target.value })
            }
          />
          {update && (
            <Alert className="bg-color1 text-white" severity="success">
              Password Updated Successfully
            </Alert>
          )}
          <Button
            onClick={resetPassword}
            className="p-[8px] rounded-md bg-color3 text-white"
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
