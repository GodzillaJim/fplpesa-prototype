import "@src/styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import { initializeApp } from "@firebase/app";
import AuthManager from "@src/context/Auth";
import { config } from "@src/helpers/auth";

export default function App({ Component, pageProps }: AppProps) {
  const theme = useTheme();
  initializeApp(config);

  return (
    <AuthManager>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthManager>
  );
}
