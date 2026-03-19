import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import RouteTransition from "@/components/RouteTransition/RouteTransition";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { getCategoryList } from "@/lib/microcms";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: {
        default: `${SITE_NAME} Portfolio Mock`,
        template: `%s | ${SITE_NAME}`,
    },
    description:
        "microCMS運用を想定していた政策系サイトを、仮データで静的公開したポートフォリオ用デモです。",
    metadataBase: new URL(SITE_URL),
    openGraph: {
        type: "website",
        locale: "ja_JP",
        siteName: SITE_NAME,
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const categories = await getCategoryList();

    return (
        <html lang="ja" suppressHydrationWarning>
            <body>
                <ThemeRegistry>
                    <Suspense fallback={null}>
                        <Header categories={categories} />
                    </Suspense>
                    <RouteTransition>
                        <main>{children}</main>
                    </RouteTransition>
                    <Footer />
                </ThemeRegistry>
            </body>
        </html>
    );
}
