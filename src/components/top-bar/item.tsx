import React from "react";
import { BmeBox, BmeButton } from "bme-ui";
import { useMobile } from "../../hooks";
import { Link } from "../../atoms";

export interface TopBarItemProps {
  href: string;
  children: React.ReactNode;
}

export type TopBarItemType = React.FC<TopBarItemProps>;

const Component: React.FC<TopBarItemProps> = ({ href, children }) => {
  const isMobile = useMobile();

  return (
    <BmeBox margin={isMobile ? undefined : "no|xs"}>
      <Link href={href}>
        <BmeButton size="small" variant="background">
          {children}
        </BmeButton>
      </Link>
    </BmeBox>
  );
};

export default Component;
