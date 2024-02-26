import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import homeIcon from '@/public/HomeIcon.png';
import Link from 'next/link';
import { assert } from 'console';
import Database from 'better-sqlite3';
import { getItemFromDB } from '@/app/utils';
import { url } from 'inspector';

const findFailMsg = "Failed to find item from database";
const dbPath = './public/carsSqlite.db';
/* todo: from utils */

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
  
  const make = urlSegments[0].replaceAll("-", " ");
  const model = urlSegments[1].replaceAll("-", " ");
  const year = urlSegments[2];

  const reviewQuery =
    `SELECT Review FROM cars
    WHERE Year = ${year} 
    AND Make = '${make}' 
    AND Model = '${model}';`;

  
  const carReviewResult = getItemFromDB(reviewQuery);

  let reviewText = findFailMsg;
  
  if (typeof carReviewResult === 'object' && carReviewResult !== null) {
    if ("Review" in carReviewResult) {
      if (typeof(carReviewResult["Review"]) === "string") {
        reviewText = carReviewResult["Review"]
      }
    }
  } else {
      console.log('Unexpected data format for car:', make, model, year);
  }

  return (
    <div className={styles.reviewsContainer}>
      <div className={styles.reviewsTitle}>Reviews</div>
      <div className={styles.reviewsText}>{reviewText}</div>
    </div>
  )
}


export default function CarPage({ params }: { params: { slug: string[] } }) {
    // convert url friendly name to space separated
    const urlSegments = params.slug
    if(urlSegments.length !== 3){
      return <div>Invalid Car Page</div>
    }
    const fullName = params.slug.map(slug => slug.replace(/-/g, " ")).join(' ')

    return (
        <body style={{margin: 0 + "px"}}>
            {/* TODO: find better way to remove margin */}
            <Navbar />
            <Breadcrumbs urlSegments={params.slug}/>
            <div className={styles.pageTitle}>Car Page: {fullName}</div>
            <Reviews urlSegments={params.slug}/>  
        </body>
    );
    
}