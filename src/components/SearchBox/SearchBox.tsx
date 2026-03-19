"use client";

// ヘッダーで使う検索ボックスです。
// 入力したキーワードを /reports?q=... に渡して一覧検索します。
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBox() {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            // 検索結果ページへ移動
            router.push(`/?q=${encodeURIComponent(query.trim())}`);
            // 送信後に入力欄をクリア
            setQuery("");
        }
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            elevation={0}
            sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                px: 0.5,
                py: 0.25,
            }}
        >
            <InputBase
                placeholder="検索…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ ml: 0.5, flex: 1, fontSize: "0.8rem" }}
            />
            <IconButton type="submit" size="small" sx={{ p: 0.5 }}>
                <SearchIcon fontSize="small" />
            </IconButton>
        </Paper>
    );
}
