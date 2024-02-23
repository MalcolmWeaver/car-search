import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import homeIcon from '../../public/HomeIcon.png';
import Link from 'next/link';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarText}>
        Pierce Car Search
      </div>
      <div className={styles.navbarIconContainer}>
      <Link href="/">
        <Image className={styles.navbarIcon} src={homeIcon} alt="Home Icon" />
      </Link>
      </div>
    </nav>
  );
}


export default function CarPage({ params }: { params: { slug: string } }) {
    return (
        <body style={{margin: 0 + "px"}}>
            {/* TODO: find better way to remove margin */}
            <Navbar />
            <div>Car Page: {params.slug}</div>
        </body>
    );
    
}