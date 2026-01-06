import type { ReactNode } from "react";
import "../styles/globals.css";
import { Providers } from "./providers";

import { Zen_Kaku_Gothic_New } from "next/font/google";

const gothic = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-vilo-gothic",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${gothic.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
