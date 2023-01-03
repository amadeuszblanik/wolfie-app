import Link from "next/link";
import { useRouter } from "next/router";

const VALUES_TO_LEAVE = 0;

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

const Atom: React.FC<LinkProps> = ({ href, children }) => {
  const router = useRouter();
  const hrefPath = href.split("?")[VALUES_TO_LEAVE].split("#")[VALUES_TO_LEAVE];

  const isExternal = href.startsWith("http");

  if (hrefPath === router.pathname) {
    return <a href={href}>{children}</a>;
  }

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return <Link href={href}>{children}</Link>;
};

export default Atom;
