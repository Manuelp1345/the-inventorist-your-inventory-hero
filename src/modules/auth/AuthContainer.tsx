"use client";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface DataForms {
  login: {
    userName: string;
    password: string;
    send?: boolean;
  };
  register: {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    send?: boolean;
  };
  reset: {
    email: string;
    send: boolean;
  };
}

const initialErrorState = {
  login: {
    userName: "",
    password: "",
  },
  register: {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  reset: {
    email: "",
  },
};

const initialDataState = {
  login: {
    userName: "",
    password: "",
    send: false,
  },
  register: {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    send: false,
  },
  reset: {
    email: "",
    send: false,
  },
};

const AuthContainer = () => {
  const router = useRouter();
  const [authType, setAuthType] = React.useState<
    "login" | "register" | "reset"
  >("login");
  const [error, setError] = React.useState<string>("" as string);
  const [errors, setErrors] = React.useState(initialErrorState);
  const [data, setData] = React.useState<DataForms>(initialDataState);
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { userName: username, password } = data.login;
    if (username === "" || password === "") {
      setLoading(false);
      return setErrors({
        ...errors,
        login: {
          userName: "Username is required",
          password: "Password is required",
        },
      });
    }

    let reponse;
    try {
      reponse = await axios.post(
        "/api/auth/login",
        JSON.stringify({
          username,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      setLoading(false);

      setData({
        ...data,
        login: { ...data.login, send: true },
      });
      return setError((error as any)?.response?.data);
    }
    if (reponse.status === 200) {
      setLoading(false);

      setData({
        login: {
          userName: "",
          password: "",
          send: false,
        },
        register: {
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
        reset: {
          email: "",
          send: false,
        },
      });
      return router.push("/dashboard");
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    const { userName, email, password, confirmPassword } = data.register;
    if (password !== confirmPassword) {
      return setErrors({
        ...errors,
        register: {
          userName: "",
          email: "",
          password: "Password does not match",
          confirmPassword: "Password does not match",
        },
      });
    }
    if (userName === "") {
      setLoading(false);

      return setErrors({
        ...errors,
        register: {
          userName: "Username is required",
          email: "",
          password: "",
          confirmPassword: "",
        },
      });
    }
    if (email === "") {
      setLoading(false);

      return setErrors({
        ...errors,
        register: {
          userName: "",
          email: "Email is required",
          password: "",
          confirmPassword: "",
        },
      });
    }
    if (password === "") {
      setLoading(false);

      return setErrors({
        ...errors,
        register: {
          userName: "",
          email: "",
          password: "Password is required",
          confirmPassword: "",
        },
      });
    }
    if (confirmPassword === "") {
      setLoading(false);

      return setErrors({
        ...errors,
        register: {
          userName: "",
          email: "",
          password: "",
          confirmPassword: "Confirm Password is required",
        },
      });
    }

    let reponse;
    try {
      reponse = await axios.post(
        "/api/auth/register",
        JSON.stringify({
          username: userName,
          email,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      setLoading(false);

      setData({
        ...data,
        register: { ...data.register, send: true },
      });
      return setError((error as any)?.response?.data);
    }
    if (reponse.status === 200) {
      setLoading(false);

      setData({
        login: {
          userName: userName,
          password: password,
        },
        register: {
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
        reset: {
          email: "",
          send: false,
        },
      });

      return setAuthType("login");
    }
  };

  const handleReset = async () => {
    setLoading(true);
    const { email } = data.reset;
    let reponse;
    try {
      reponse = await axios.post(
        "/api/auth/reset-password",
        JSON.stringify({
          email,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      setLoading(false);

      return setError((error as any)?.response?.data);
    }

    if (reponse.status === 200) {
      setData({
        ...data,
        reset: { email: "", send: true },
      });
      setLoading(false);

      setTimeout(() => {
        setData({
          ...data,
          reset: { email: "", send: false },
        });
        setAuthType("login");
      }, 5000);
      return;
    }
  };

  useEffect(() => {
    setData(initialDataState);
    setErrors(initialErrorState);
    setError("");
  }, [authType]);

  return (
    <Box className=" w-full md:w-[50%] flex justify-center flex-col">
      {authType === "login" && (
        <>
          <Typography className="text-[24px] font-bold">Login</Typography>
          <Box className="flex flex-col gap-[16px] mt-[16px]">
            <TextField
              variant="standard"
              type="text"
              placeholder="Username"
              className="p-[8px] rounded-md bg-[#2E334D] text-white "
              value={data.login.userName}
              onChange={(e) => {
                setErrors({
                  ...errors,
                  login: { userName: "", password: "" },
                });

                setData({
                  ...data,
                  login: { ...data.login, userName: e.target.value },
                });
              }}
              InputProps={{
                sx: {
                  color: "#fff",
                  "&:after": { borderColor: "#ED4C4B" },
                  "&::placeholder": {
                    color: "#fff",
                  },
                },
              }}
              error={errors.login.userName !== ""}
              helperText={errors.login.userName}
            />
            <TextField
              variant="standard"
              type="password"
              placeholder="Password"
              className="p-[8px] rounded-md bg-[#2E334D] text-white"
              value={data.login.password}
              onChange={(e) => {
                setData({
                  ...data,
                  login: { ...data.login, password: e.target.value },
                });
              }}
              InputProps={{
                sx: {
                  color: "#fff",
                  "&:after": { borderColor: "#ED4C4B" },
                  "&::placeholder": {
                    color: "#fff",
                  },
                },
              }}
              error={errors.login.password !== ""}
              helperText={errors.login.password}
            />
            {data.login.send && (
              <Alert className="bg-color1 text-white" severity="error">
                {error}
              </Alert>
            )}
            <Button
              onClick={handleLogin}
              disabled={loading}
              className="p-[8px] rounded-md bg-color3 text-white"
            >
              {loading ? <CircularProgress color="inherit" /> : "Login"}
            </Button>

            <Typography className="text-[14px] text-center">
              Don&apos;t have an account?
              <br />
              <Button
                onClick={() => {
                  setAuthType("register");
                }}
                className="text-color3 p-0 m-0 "
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
                className="text-color3 p-0 m-0 "
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
            <TextField
              variant="standard"
              type="text"
              placeholder="Username"
              className="p-[8px] rounded-md bg-[#2E334D] text-white"
              value={data.register.userName}
              onChange={(e) => {
                setErrors({
                  ...errors,
                  register: {
                    userName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  },
                });
                setData({
                  ...data,
                  register: { ...data.register, userName: e.target.value },
                });
              }}
              InputProps={{
                sx: {
                  color: "#fff",
                  "&:after": { borderColor: "#ED4C4B" },
                  "&::placeholder": {
                    color: "#fff",
                  },
                },
              }}
              error={errors.register.userName !== ""}
              helperText={errors.register.userName}
            />
            <TextField
              variant="standard"
              type="email"
              placeholder="Email"
              className="p-[8px] rounded-md bg-[#2E334D] text-white"
              value={data.register.email}
              onChange={(e) => {
                setErrors({
                  ...errors,
                  register: {
                    userName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  },
                });
                setData({
                  ...data,
                  register: { ...data.register, email: e.target.value },
                });
              }}
              InputProps={{
                sx: {
                  color: "#fff",
                  "&:after": { borderColor: "#ED4C4B" },
                  "&::placeholder": {
                    color: "#fff",
                  },
                },
              }}
              error={errors.register.email !== ""}
              helperText={errors.register.email}
            />
            <TextField
              variant="standard"
              type="password"
              placeholder="Password"
              className="p-[8px] rounded-md bg-[#2E334D] text-white"
              value={data.register.password}
              onChange={(e) => {
                setErrors({
                  ...errors,
                  register: {
                    userName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  },
                });
                setData({
                  ...data,
                  register: { ...data.register, password: e.target.value },
                });
              }}
              InputProps={{
                sx: {
                  color: "#fff",
                  "&:after": { borderColor: "#ED4C4B" },
                  "&::placeholder": {
                    color: "#fff",
                  },
                },
              }}
              error={errors.register.password !== ""}
              helperText={errors.register.password}
            />
            <TextField
              variant="standard"
              type="password"
              placeholder="Confirm Password"
              className="p-[8px] rounded-md bg-[#2E334D] text-white "
              value={data.register.confirmPassword}
              onChange={(e) => {
                setErrors({
                  ...errors,
                  register: {
                    userName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  },
                });
                setData({
                  ...data,
                  register: {
                    ...data.register,
                    confirmPassword: e.target.value,
                  },
                });
              }}
              InputProps={{
                sx: {
                  color: "#fff",
                  "&:after": { borderColor: "#ED4C4B" },
                  "&::placeholder": {
                    color: "#fff",
                  },
                },
              }}
              error={errors.register.confirmPassword !== ""}
              helperText={errors.register.confirmPassword}
            />
            {data.register.send && (
              <Alert className="bg-color1 text-white" severity="error">
                {error}
              </Alert>
            )}
            <Button
              onClick={handleRegister}
              disabled={loading}
              className="p-[8px] rounded-md bg-color3 text-white"
            >
              {loading ? <CircularProgress color="inherit" /> : "Register"}
            </Button>

            <Typography className="text-[14px] text-center">
              Already have an account?
              <br />
              <Button
                onClick={() => {
                  setAuthType("login");
                }}
                className="text-color3 p-0 m-0 "
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
          <Typography className="text-[14px]">
            Enter your email to send a reset link
          </Typography>

          <Box className="flex flex-col gap-[16px] mt-[16px]">
            <TextField
              type="email"
              placeholder="Email"
              className="my-2 w-full bg-color1  rounded-md text-white [&>label]:text-white [&>div>fieldset]:border-color3 [&>div>input]:text-white"
              value={data.reset.email}
              onChange={(e) => {
                setError("");
                setData({
                  ...data,
                  reset: { ...data.reset, email: e.target.value },
                });
              }}
              InputProps={{
                sx: {
                  color: "#fff",
                  "&:after": { borderColor: "#ED4C4B" },
                  "&::placeholder": {
                    color: "#fff",
                  },
                },
              }}
              error={error !== ""}
              helperText={error}
            />
            {data.reset.send && (
              <Alert className="bg-color1 text-white" severity="success">
                A reset link sent to your email
              </Alert>
            )}
            <Button
              onClick={handleReset}
              disabled={loading}
              className="p-[8px] rounded-md bg-color3 text-white"
            >
              {loading ? <CircularProgress color="inherit" /> : "Reset"}
            </Button>

            <Typography className="text-[14px] text-center">
              Remembered your password?
              <br />
              <Button
                onClick={() => {
                  setAuthType("login");
                }}
                className="text-color3 p-0 m-0 "
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
