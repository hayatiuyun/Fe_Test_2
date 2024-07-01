"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import CustomTextField from "../styled/TextField";
import Image from "next/image";
interface LoginFormProps {
  onSubmit: (data: LoginFormInputs) => void;
}

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    try {
      // Simulate API call or any async operation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(data);
      //   showToast({ title: 'Logged in successfully!', type: 'success' });
    } catch (error) {
      //   showToast({ title: 'Failed to log in!', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  console.log(errors);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width={"100%"}
      height={"100%"}
      my="auto"
      px={2}
      py={{
        xs: 5,
        md: 0,
      }}
      position="relative"
    >
      <div className="absolute aspect-square h-[180%] -translate-x-[10%] translate-y-48 rounded-full bg-[radial-gradient(#6633cc22_0%,_#3399ff56_32%,_#3399ff00_60%)] opacity-75"></div>
      <div className="absolute aspect-square h-[80%] -translate-y-48 translate-x-[180%]  rounded-full bg-[radial-gradient(#5526bacc_0%,_#5526ba88_30%,_transparent_90%)] opacity-30"></div>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        maxWidth={576}
        marginBottom={5}
      >
        <div className="w-full flex items-start mx-auto">
          <Image src="/logo-vertical.svg" alt="logo" width={200} height={100} />
        </div>
      </Box>

      <Paper
        display="flex"
        flexDirection="column"
        width="100%"
        maxWidth={576}
        height={{
          xs: "100%",
          sm: "auto",
        }}
        gap={2}
        padding={{
          xs: 2,
          sm: 4,
        }}
        component={Box}
        borderRadius={8}
        boxShadow="none"
        position="relative"
        zIndex={500}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(8px)",
          boxShadow: "none",
          border: ".5px solid #BBB",
          borderRadius: 4,
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <Box mb={2}>
        <Typography variant="h3" textAlign="left">
          Sign In
        </Typography>
        <Typography variant="body1" textAlign="left" mt={1}>
          Sign in to your account to continue
        </Typography>
        </Box>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="w-full flex flex-col gap-2"
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="h6">Username</Typography>
            <CustomTextField
              placeholder="Username"
              type="text"
              error={errors.username !== undefined}
              {...register("username", {
                required: "Username is required",
              })}
              sx={{
                mt: 1,
              }}
            />
            <span className="text-red-500 text-sm h-6">
              {errors.username?.message}
            </span>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography variant="h6">Password</Typography>
            <CustomTextField
              placeholder="Password"
              type="password"
              error={errors.password?.message !== undefined}
              {...register("password", {
                required: "Password is required",
              })}
              sx={{
                mt: 1,
              }}
            />
            <span className="text-red-500 text-sm h-4">
              {errors.username?.message}
            </span>
          </Box>
          <Button
            disabled={isLoading}
            sx={{
              mt: 2,
            }}
            variant="contained"
            type="submit"
            fullWidth
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
