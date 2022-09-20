// .storybook/preview.js

import { ThemeProvider } from 'styled-components';
import { addDecorator } from '@storybook/react';
import { withThemes } from '@react-theming/storybook-addon';

import Theme from '../src/settings/theme';
import {GlobalStyles} from "../src/component/styles";

import { setIntlConfig, withIntl } from 'storybook-addon-intl';

import en_GB from "../lang/en-GB.json";
import pl_PL from "../lang/pl-PL.json";

// Provide your messages
const messages = {
    en: en_GB,
    pl: pl_PL
};

// Provide your formats (optional)
const formats = {
    'en': {
        'date': {
            'year-only': {
                'year': '2-digit',
            },
        },
    },
    'de': {
        'date': {
            'year-only': {
                'year': 'numeric',
            },
        },
    },
};

const getMessages = (locale) => messages[locale];
const getFormats = (locale) => formats[locale];

setIntlConfig({
    locales: ['en', 'pl'],
    defaultLocale: 'en',
    getMessages,
    getFormats,
});

const providerFn = ({ theme, children }) => {
    return <ThemeProvider theme={theme}>
        <GlobalStyles/>
        {children}
    </ThemeProvider>;
};


export const onThemeSwitch = context => {
    const { theme } = context;
    console.debug('onThemeSwitch', theme);

    const color = theme.palette.text;
    const background = theme.palette.background;
    const parameters = {
        color: {
            default: color,
        },
        backgrounds: {
            default: background,
        },
    };
    return {
        parameters,
    };
};

addDecorator(withThemes(ThemeProvider, [Theme.light, Theme.dark], { providerFn, onThemeSwitch }));
addDecorator(withIntl);
