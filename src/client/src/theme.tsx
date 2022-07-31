import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
    interface DefaultTheme {
        themeColor: string,
        gray: string,
        white: string,
        buttonPadding: string
    }
}
export const theme: DefaultTheme = {
    themeColor: "#003300",
    gray: "#ACAFB2",
    white: "#ffffff",
    buttonPadding: "8px 15px"
}