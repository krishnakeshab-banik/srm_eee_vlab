import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "EEE Learning Platform",
    description:
        "Interactive Electrical and Electronics Engineering experiments",
    generator: "v0.dev",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className="overflow-x-hidden dark"
            style={{ colorScheme: "dark" }}
        >
            <body
                className={`${inter.className} bg-black text-white overflow-x-hidden`}
                suppressHydrationWarning
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                >
                    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
                        {children}
                        <Toaster position="top-right" />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
