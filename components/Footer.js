import React from "react";
import styles from "@/styles/Footer.module.css";
import Link from "next/link";
import { PiGithubLogo, PiLinkedinLogo, PiTwitterLogo } from "react-icons/pi";

const Footer = () => {
	return (
		<div className={styles.main}>
			<div className={styles.footerText}>
				<div className={styles.dev}>
					<h3>Developed by </h3>
					<span className={styles.span}>
						<Link href="https://kincunico.dev">Kin Cunico </Link>
					</span>
				</div>
				<div className={styles.icons}>
					<Link
						target="_blank"
						href="https://github.com/kin-cunico"
						className={styles.github}
					>
						<PiGithubLogo />
					</Link>
					<Link
						target="_blank"
						href="https://www.linkedin.com/in/kincunicoen/"
						className={styles.linkedin}
					>
						<PiLinkedinLogo />
					</Link>
					<Link
						target="_blank"
						href="https://twitter.com/KinCunico"
						className={styles.twitter}
					>
						<PiTwitterLogo />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Footer;
