import Head from "next/head";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/geist" />
      </Head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
