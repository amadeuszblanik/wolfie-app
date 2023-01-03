import React from "react";
import Image from "next/image";
import { BmeBox } from "bme-ui";
import Link from "../link";
import { useMobile } from "../../hooks";

interface BrandProps {
  withLink?: boolean;
  withName?: boolean | "auto";
}

const LOGO_SIZE = 42;

const Atom: React.FC<BrandProps> = ({ withLink, withName }) => {
  const isMobile = useMobile();

  const displayName = withName === "auto" ? !isMobile : withName;

  const Content = () => (
    <BmeBox alignY="center">
      <Image src="/logo.svg" width={LOGO_SIZE} height={LOGO_SIZE} alt="Logo" />
      {displayName && <BmeBox margin="no|no|no|xs">Wolfie.app</BmeBox>}
    </BmeBox>
  );

  if (withLink) {
    return (
      <Link href="/">
        <Content />
      </Link>
    );
  }

  return <Content />;
};

Atom.defaultProps = {
  withLink: false,
  withName: "auto",
};

export default Atom;
