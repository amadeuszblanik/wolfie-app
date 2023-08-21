import sanitizeHtml from "sanitize-html";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { LayoutLanding } from "../src/layouts";

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedAttributes: {
    a: ["href", "name", "target"],
    img: ["src"],
    div: ["id"],
  },
};

const StyledContent = styled.div`
  line-height: 1.2;
  white-space: pre-line;

  a {
    color: ${({ theme }) => theme.colors.primary};
  }
  b,
  strong {
    font-weight: 600;
  }
  i {
    font-style: italic;
  }
  [id] {
    font-size: 1.5rem;
  }
`;

export default function Page({ html }: { html: string }) {
  const intl = useIntl();

  return (
    <LayoutLanding>
      <StyledContent dangerouslySetInnerHTML={{ __html: html || intl.formatMessage({ id: "common.error_message" }) }} />
    </LayoutLanding>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`https://api.wolfie.app/v2/public/gdpr`);
    const data = await res.json();

    const html = sanitizeHtml(data.content, SANITIZE_OPTIONS);

    return { props: { html } };
  } catch (error) {
    console.error(error);

    return { props: { html: null } };
  }
}
