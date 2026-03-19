"use client";

import SearchBox from "@/components/SearchBox/SearchBox";
import { REPO_URL, SITE_NAME } from "@/lib/site-config";
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

function HeaderContent({ categories = [] }: HeaderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const activeCategorySlug = searchParams.get("category") || "";
    const isHome = pathname === "/";
    const isReports = pathname === "/reports";
    const isReportDetail =
        pathname.startsWith("/reports/") && pathname !== "/reports";
    const showCategoryTabs = (isHome || isReports) && categories.length > 0;
    const tabValue = activeCategorySlug || "all";

    const handleCategoryChange = (
        _: React.SyntheticEvent,
        newValue: string
    ) => {
        if (newValue === "all") {
            router.push("/");
            return;
        }

        router.push(`/?category=${newValue}`);
    };

    if (isReportDetail) {
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
                <Link
                    href="/"
                    style={{
                        display: "inline-flex",
                        lineHeight: 1,
                        flexShrink: 0,
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gap: 0.15,
                        }}
                    >
                        <Typography
                            component="span"
                            sx={{
                                fontFamily: "var(--font-display)",
                                fontSize: { xs: "1rem", md: "1.15rem" },
                                fontWeight: 900,
                                letterSpacing: "0.08em",
                                color: "text.primary",
                            }}
                        >
                            {SITE_NAME}
                        </Typography>
                        <Typography
                            component="span"
                            sx={{
                                fontSize: "0.68rem",
                                letterSpacing: "0.06em",
                                color: "text.secondary",
                                textTransform: "uppercase",
                            }}
                        >
                            Portfolio mock site
                        </Typography>
                    </Box>
                </Link>

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
                        href={REPO_URL}
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
                        GitHub
                    </Typography>
                )}

                <Box sx={{ flex: 1 }} />

                {!isMobile && (
                    <Box sx={{ flexShrink: 0, width: 180 }}>
                        <SearchBox />
                    </Box>
                )}

                {isMobile && (
                    <>
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
                                            href={REPO_URL}
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
                                                primary="GitHub"
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
