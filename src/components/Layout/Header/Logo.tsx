import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/" className="py-3">
      <Image src="/logo-vertical.svg" alt="logo" height={50} width={154} priority />
    </LinkStyled>
  );
};

export default Logo;