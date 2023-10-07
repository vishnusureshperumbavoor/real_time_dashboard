"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Dashboard from './Dashboard/Dashboard'
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Set the theme mode to "dark"
  },
});

export default function Home() {
  const mainStyle = {
    padding: 0, 
  };

  return (
    <main className={styles.main} style={mainStyle}>
      <ThemeProvider theme={darkTheme}>
        <Dashboard />
      </ThemeProvider>
    </main>
  );
}
