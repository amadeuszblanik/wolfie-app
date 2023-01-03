import Link from "next/link";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

const Atom: React.FC<LinkProps> = ({ href, children }) => {
  const isExternal = href.startsWith("http");

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
