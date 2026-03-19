// アプリ全体の共通レイアウトを定義するファイルです。
// ここでヘッダー/フッター/全体テーマをまとめて適用します。
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import RouteTransition from "@/components/RouteTransition/RouteTransition";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { getCategoryList } from "@/lib/microcms";
import { SITE_URL } from "@/lib/site-config";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";

// ここでページ共通のSEO情報（title/description）を設定します。
export const metadata: Metadata = {
    title: {
        default: "Dfc — 政策をわかりやすく",
        template: "%s | Dfc",
    },
    description:
        "一般市民向けに政策や制度をわかりやすく再編集し、月1本で継続公開する政策解説メディアです。",
    metadataBase: new URL(SITE_URL),
    openGraph: {
        type: "website",
        locale: "ja_JP",
        siteName: "Dfc",
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // ヘッダーのカテゴリタブに使うデータを先に取得します。
    const categories = await getCategoryList();

    return (
        <html lang="ja" suppressHydrationWarning>
            <body>
                <ThemeRegistry>
                    {/* Header 内で useSearchParams を使うため Suspense で包みます */}
                    <Suspense fallback={null}>
                        <Header categories={categories} />
                    </Suspense>
                    {/* 各ページ固有の中身は children としてここに入ります */}
                    <RouteTransition>
                        <main>{children}</main>
                    </RouteTransition>
                    <Footer />
                </ThemeRegistry>
            </body>
        </html>
    );
}
