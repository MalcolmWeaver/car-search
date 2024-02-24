import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import homeIcon from '../../public/HomeIcon.png';
import Link from 'next/link';
import cachedCarReviews from "@/public/CarReviews";
import { assert } from 'console';

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

function Breadcrumbs({urlSegments}: {urlSegments: string[]} ) {
  return (
    <div className={styles.breadcrumbsContainer}>
      <a href='/'>Home</a>
      {urlSegments.map((seg, index) => (
        <div key={seg}>
          <span>
            {">"}
          </span>
          <a href={'/' + urlSegments.slice(0, index + 1).join('/')}>
            {seg}
          </a>
        </div>
      ))}
    </div>
  )
}

function Reviews({urlSegments}: {urlSegments: string[]}) {
  assert(urlSegments.length === 3, "Invalid URL")
  const make = urlSegments[0];
  const model = urlSegments[1];
  const year = urlSegments[2];
  const car = cachedCarReviews.find(element => element.Make === make && element.Model === model && element.Year === parseInt(year));
  /* TODO: fix for tesla model s */
  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsTitle}>Reviews</div>
      <div className={styles.reviewsText}>{car?.Review}</div>
    </div>
  )
}


export default function CarPage({ params }: { params: { slug: string[] } }) {
    return (
        <body style={{margin: 0 + "px"}}>
            {/* TODO: find better way to remove margin */}
            <Navbar />
            <Breadcrumbs urlSegments={params.slug}/>
            <div className={styles.pageTitle}>Car Page:{params.slug.map((seg) => (" "  +seg))}</div>
            <Reviews urlSegments={params.slug}/>
            
        </body>
    );
    
}