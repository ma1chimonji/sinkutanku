import { REPO_URL, SITE_NAME } from "@/lib/site-config";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <p className={styles.footerBrand}>
                    {SITE_NAME} <span className={styles.footerBrandAccent}>demo</span>
                </p>

                <nav className={styles.footerNav}>
                    <Link href="/" className={styles.footerLink}>
                        ホーム
                    </Link>
                    <Link
                        href={REPO_URL}
                        className={styles.footerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </Link>
                </nav>

                <p className={styles.footerCopy}>
                    © {new Date().getFullYear()} {SITE_NAME}. Portfolio mock site.
                </p>
            </div>
        </footer>
    );
}
