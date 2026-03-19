"use client";

// Material UI（MUI）のテーマ設定です。
// 色・フォント・角丸など、サイト全体の見た目の基準をここで決めます。
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import type { ReactNode } from "react";

const theme = createTheme({
    palette: {
        background: {
            default: "#ffffff",
            paper: "#ffffff",
        },
        primary: {
            main: "#ea5413",
            light: "#f0743d",
            dark: "#c64610",
        },
        text: {
            primary: "#0f172a",
            secondary: "#334155",
        },
        divider: "#e2e8f0",
    },
    typography: {
        fontFamily: '"Zen Maru Gothic", sans-serif',
    },
    shape: {
        borderRadius: 4,
    },
});

export default function ThemeRegistry({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
