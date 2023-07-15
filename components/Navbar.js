import React, { useRef } from "react";
import styles from "@/styles/Navbar.module.css";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
	const navRef = useRef();
	const showNavbar = () => {
		navRef.current.classList.toggle(`${styles.responsive_nav}`);
	};
	return (
		<header className={styles.smallHeader}>
			<button
				onClick={showNavbar}
				className={`${styles.nav_btn} ${styles.nav_close_btn}`}
			>
				<FaBars />
			</button>
			<nav
				className={styles.navbar}
				ref={navRef}
			>
				<Link href="/">
					<h1 className={styles.h1}>Luminae Wikia</h1>
				</Link>
				<Link href="/">
					<li className={styles.link}>HOME</li>
				</Link>
				<Link href="/#fauna">
					<li className={styles.link}>FAUNA</li>
				</Link>
				<Link href="/#flora">
					<li className={styles.link}>FLORA</li>
				</Link>
				<Link href="/#map">
					<li className={styles.link}>MAP</li>
				</Link>
				<Link
					target="_blank"
					href="/contact"
				>
					<li className={styles.link}>CONTACT</li>
				</Link>
			</nav>
		</header>
	);
};

export default Navbar;
