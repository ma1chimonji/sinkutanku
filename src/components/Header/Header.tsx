"use client";

// サイト共通ヘッダーです。
// 画面サイズと現在のURLに応じて表示を切り替えます。
import SearchBox from "@/components/SearchBox/SearchBox";
import type { Category } from "@/types/types";
import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface HeaderProps {
    categories?: Category[];
}

const LAB_INTRO_URL = "https://dfchanges.site";

function HeaderContent({ categories = [] }: HeaderProps) {
    // クライアント側ナビゲーション制御
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [drawerOpen, setDrawerOpen] = useState(false);

    // どのページにいるかでヘッダー表示を変える
    const activeCategorySlug = searchParams.get("category") || "";
    const isHome = pathname === "/";
    const isReports = pathname === "/reports";
    const isReportDetail =
        pathname.startsWith("/reports/") && pathname !== "/reports";
    const showCategoryTabs = (isHome || isReports) && categories.length > 0;

    const tabValue = activeCategorySlug || "all";

    // ヘッダータブクリック時の遷移
    const handleCategoryChange = (
        _: React.SyntheticEvent,
        newValue: string
    ) => {
        if (newValue === "all") {
            router.push("/");
        } else {
            router.push(`/?category=${newValue}`);
        }
    };

    if (isReportDetail) {
        // レポート詳細ページでは、簡素な画像ヘッダーだけ表示
        return (
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    bgcolor: "background.paper",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Toolbar
                    sx={{
                        width: "100%",
                        px: { xs: 1.5, md: 2.5 },
                        justifyContent: "center",
                        minHeight: { xs: 60, md: 72 },
                    }}
                >
                    <Image
                        src="/header-report-banner.svg"
                        alt="コラム / レポート"
                        width={620}
                        height={96}
                        priority
                        style={{
                            height: "clamp(2.2rem, 5vw, 3rem)",
                            width: "auto",
                        }}
                    />
                </Toolbar>
            </AppBar>
        );
    }

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                bgcolor: "background.paper",
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        >
            <Toolbar
                sx={{
                    maxWidth: "var(--content-max)",
                    width: "100%",
                    mx: "auto",
                    px: { xs: 2, md: 3 },
                    gap: 1.5,
                    minHeight: { xs: 56, md: 64 },
                }}
            >
                {/* ロゴ（左寄せ） */}
                <Link
                    href="/"
                    style={{ display: "inline-flex", lineHeight: 0, flexShrink: 0 }}
                >
                    <Image
                        src="/dfc-logo.png"
                        alt="Design for Changes"
                        width={1702}
                        height={454}
                        priority
                        style={{
                            height: "clamp(1.9rem, 3vw, 2.8rem)",
                            width: "auto",
                        }}
                    />
                </Link>

                {/* カテゴリタブ（デスクトップ） */}
                {showCategoryTabs && !isMobile && (
                    <Tabs
                        value={tabValue}
                        onChange={handleCategoryChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        sx={{
                            flex: "1 1 auto",
                            minWidth: 0,
                            maxWidth: "100%",
                            minHeight: 48,
                            "& .MuiTabs-scroller": {
                                overflowX: "auto !important",
                            },
                            "& .MuiTabs-flexContainer": {
                                flexWrap: "nowrap",
                            },
                            "& .MuiTab-root": {
                                minHeight: 48,
                                textTransform: "none",
                                fontWeight: 500,
                                fontSize: "0.9rem",
                            },
                        }}
                    >
                        <Tab label="全て" value="all" />
                        {categories.map((cat) => (
                            <Tab key={cat.id} label={cat.name} value={cat.slug} />
                        ))}
                    </Tabs>
                )}

                {/* 区切り線（タブとナビリンクを視覚分離） */}
                {showCategoryTabs && !isMobile && (
                    <Box
                        sx={{
                            height: 24,
                            width: "1px",
                            bgcolor: "divider",
                            flexShrink: 0,
                        }}
                    />
                )}
                {!isMobile && (
                    <Typography
                        component={Link}
                        href={LAB_INTRO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            fontSize: "0.9rem",
                            fontWeight: 500,
                            color: "text.secondary",
                            textDecoration: "none",
                            flexShrink: 0,
                            "&:hover": { color: "primary.main" },
                        }}
                    >
                        研究室紹介
                    </Typography>
                )}

                {/* スペーサー（ナビと検索を分離） */}
                <Box sx={{ flex: 1 }} />

                {/* 検索ボックス（右端に孤立配置） */}
                {!isMobile && (
                    <Box sx={{ flexShrink: 0, width: 180 }}>
                        <SearchBox />
                    </Box>
                )}

                {/* モバイルメニュー */}
                {isMobile && (
                    <>
                        {/* モバイル時はハンバーガー + Drawerメニュー */}
                        <IconButton
                            onClick={() => setDrawerOpen(true)}
                            sx={{ color: "text.secondary" }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={() => setDrawerOpen(false)}
                        >
                            <Box sx={{ width: 260, pt: 2 }}>
                                <Box sx={{ px: 2, pb: 2 }}>
                                    <SearchBox />
                                </Box>
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            component={Link}
                                            href="/"
                                            onClick={() => setDrawerOpen(false)}
                                        >
                                            <ListItemText primary="ホーム" />
                                        </ListItemButton>
                                    </ListItem>
                                    {categories.map((cat) => (
                                        <ListItem key={cat.id} disablePadding>
                                            <ListItemButton
                                                component={Link}
                                                href={`/?category=${cat.slug}`}
                                                onClick={() => setDrawerOpen(false)}
                                                sx={{ pl: 4 }}
                                            >
                                                <ListItemText
                                                    primary={cat.name}
                                                    primaryTypographyProps={{
                                                        fontSize: "0.9rem",
                                                    }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                    <ListItem disablePadding sx={{ mt: 1 }}>
                                        <ListItemButton
                                            component={Link}
                                            href={LAB_INTRO_URL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => setDrawerOpen(false)}
                                            sx={{
                                                borderTop: "1px solid",
                                                borderColor: "divider",
                                                pt: 1.25,
                                            }}
                                        >
                                            <ListItemText
                                                primary="研究室紹介"
                                                primaryTypographyProps={{
                                                    fontSize: "0.8rem",
                                                    color: "text.secondary",
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Box>
                        </Drawer>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default function Header({ categories }: HeaderProps) {
    return <HeaderContent categories={categories} />;
}
