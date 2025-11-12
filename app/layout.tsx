import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://johnsalama.dev"
      : "http://localhost:3000"
  ),
  title: "John Salama | Software Engineer & Full-Stack Developer",
  description:
    "Software engineer with expertise in full-stack development (MERN Stack, React Native). Passionate about creating innovative solutions and delivering high-quality applications.",
  keywords: [
    "John Salama",
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "MERN Stack",
  ],
  authors: [{ name: "John Salama Beshay" }],
  creator: "John Salama Beshay",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://johnsalama.dev",
    title: "John Salama | Software Engineer & Full-Stack Developer",
    description:
      "Software engineer with expertise in full-stack development (MERN Stack, React Native). Passionate about creating innovative solutions and delivering high-quality applications.",
    siteName: "John Salama Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Salama | Software Engineer & Full-Stack Developer",
    description:
      "Software engineer with expertise in full-stack development (MERN Stack, React Native). Passionate about creating innovative solutions and delivering high-quality applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
