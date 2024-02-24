import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import homeIcon from '../../public/HomeIcon.png';
import Link from 'next/link';
// import cachedCarReviews from "@/public/CarReviews";
import { assert } from 'console';
import Database from 'better-sqlite3';

const dbPath = './public/carsSqlite.db';

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
  const make = urlSegments[0].replaceAll("-", " ");
  const model = urlSegments[1].replaceAll("-", " ");
  const year = urlSegments[2];
  // const car = cachedCarReviews.find(element => element.Make === make && element.Model === model && element.Year === parseInt(year));
  
  const db = new Database(dbPath);

  const testQuery = "SELECT * FROM cars WHERE Make = 'Audi';";

  // Execute the query to fetch table names
  // const tableNames = db.prepare(testQuery).all();
  // console.log(tableNames)
  
  const reviewQuery = `SELECT Review FROM cars WHERE Year = ${year} AND Make = '${make}' AND Model = '${model}';`
  console.log(reviewQuery)
  const carReviewResult: unknown = db.prepare(reviewQuery).get();
  let reviewText = "Could Not Find Review";
  if (typeof carReviewResult === 'object' && carReviewResult !== null) {
    if ("Review" in carReviewResult) {
      if (typeof(carReviewResult["Review"]) === "string") {
        // Safely access properties of carReview
        reviewText = carReviewResult["Review"]
        console.log(reviewText)
      }
    }
  } else {
      // Handle unexpected data format
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