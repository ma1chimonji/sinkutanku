"use client";

// ルート（URL）が切り替わるたびに、ページ本文へ遷移アニメーションをかけるラッパーです。
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import styles from "./RouteTransition.module.css";

interface RouteTransitionProps {
    children: ReactNode;
}

export default function RouteTransition({ children }: RouteTransitionProps) {
    const pathname = usePathname();

    return (
        <div key={pathname} className={styles.page}>
            {children}
        </div>
    );
}
