// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        palette: {
            red: string;
            orange: string;
            yellow: string;
            green: string;
            mint: string;
            teal: string;
            cyan: string;
            blue: string;
            indigo: string;
            purple: string;
            pink: string;
            brown: string;
            background: string;
            text: string;
        }
    }
}
