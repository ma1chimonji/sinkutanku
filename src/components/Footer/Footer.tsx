// サイト共通フッターです。
// 最低限のナビリンクとコピーライトを表示します。
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <nav className={styles.footerNav}>
                    <Link href="/" className={styles.footerLink}>
                        ホーム
                    </Link>
                </nav>

                <p className={styles.footerCopy}>
                    © {new Date().getFullYear()} Dfc. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
