import { createGlobalStyle } from "styled-components";
import reset from "react-style-reset";
import { darkenColorMixin, isDarkMixin } from "../../ui-components/mixins";

const Global = createGlobalStyle`
  ${reset};

  body {
    color: ${({ theme }) => theme.palette.text};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background: ${({ theme }) => theme.palette.background};
  }

  :root {
    --color-text: ${({ theme }) => theme.palette.text};
    --color-background: ${({ theme }) => theme.palette.background};
    --color-background-active: ${({ theme }) => darkenColorMixin(theme.palette.background, theme.darken.hover)};
    --color-background-hover: ${({ theme }) => darkenColorMixin(theme.palette.background, theme.darken.active)};
    --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --placeholder-width: 100px;
    --placeholder-height: 100%;
    --placeholder-offset-y: 0;
    --button-radius: ${({ theme }) => theme.borderRadius};
  }
  
  * {
    box-sizing: border-box;
    user-select: none;
    color-scheme: ${({ theme }) => (isDarkMixin(theme.palette.dark) ? "dark" : "light")};
  }
  
   a {
     text-decoration: none;
   }
`;

export default Global;
