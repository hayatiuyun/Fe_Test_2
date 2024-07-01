"use client";
import SignIn from "@/components/SignIn";
import { login } from "@/lib/actions";
import { Box } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col-reverse lg:flex-row w-full h-screen overflow-hidden bg-gray-100">
      <Box
        width={{
          xs: "100%",
          lg: "50%",
        }}
        height={{
          xs: "75%",
          lg: "100%",
        }}
      >
        <SignIn onSubmit={login} />
      </Box>
      <Box
        width={{
          xs: "100%",
          lg: "50%",
        }}
        height={{
          xs: "25%",
          sm: "45%",
          lg: "100%",
        }}
        flex={1}
        position="relative"
      >
        <Image
          src="/images/traffic.webp"
          alt="illustration"
          width={768}
          height={1280}
          priority
          className="object-cover w-full h-full"
        />
      </Box>
    </main>
  );
}
