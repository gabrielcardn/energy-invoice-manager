"use client";
import Link from "next/link";
import styles from "./NavBar.module.css";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className={styles.nav}>
        <li>
          <Link
            className={pathname.includes("dashboard") ? styles.selected : styles.nonSelected}
            href="/dashboard"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className={pathname.includes("invoices") ? styles.selected : styles.nonSelected}
            href="/invoices"
          >
            Faturas
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
