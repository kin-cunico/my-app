import React from "react";
import styles from "@/styles/Navbar.module.css";
import Link from "next/link";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<Link href="/">
				<h1 className={styles.h1}>Luminae Wikia</h1>
			</Link>
			<ul className={styles.linkList}>
				<Link href="#fauna">
					<li className={styles.link}>FAUNA</li>
				</Link>
				<Link href="#flora">
					<li className={styles.link}>FLORA</li>
				</Link>
				<Link href="#map">
					<li className={styles.link}>MAP</li>
				</Link>
				<Link
					target="_blank"
					href="/contact"
				>
					<li className={styles.link}>CONTACT</li>
				</Link>
			</ul>
		</nav>
	);
};

export default Navbar;
