import { createGlobalStyle } from "styled-components";
import reset from "react-style-reset";
import { darkenColorMixin, isDarkMixin } from "../../ui-components/mixins";

const Global = createGlobalStyle`
  ${reset};

  body {
    color: ${({ theme }) => theme.palette.text};
    background: ${({ theme }) => theme.palette.background};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  :root {
    --color-text: ${({ theme }) => theme.palette.text};
    --color-background: ${({ theme }) => theme.palette.background};
    --color-background-active: ${({ theme }) => darkenColorMixin(theme.palette.background, theme.darken.hover)};
    --color-background-hover: ${({ theme }) => darkenColorMixin(theme.palette.background, theme.darken.active)};
    --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  
  * {
    user-select: none;
    box-sizing: border-box;
    color-scheme: ${({ theme }) => (isDarkMixin(theme.palette.dark) ? "dark" : "light")};
  }
  
   a {
     text-decoration: none;
   }
`;

export default Global;
