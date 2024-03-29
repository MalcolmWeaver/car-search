import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import homeIcon from '@/public/HomeIcon.png';
import Link from 'next/link';
import { getReview, getLatestYear } from '@/app/utils';
import { url } from 'inspector';

const findFailMsg = "Failed to find item from database";
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

async function Reviews({urlSegments}: {urlSegments: string[]}) {
  
  const make = urlSegments[0].replaceAll("-", " ");
  const model = urlSegments[1].replaceAll("-", " ");
  const year = urlSegments[2];

  const carReviewResult = await getReview(year, make, model);

  let reviewText = findFailMsg;
  
  if (typeof carReviewResult === 'object' && carReviewResult !== null) {
    if ("review" in carReviewResult) {
      if (typeof(carReviewResult["review"]) === "string") {
        reviewText = carReviewResult["review"]
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


export default async function CarPage({ params }: { params: { slug: string[] } }) {
    // convert url friendly name to space separated
    const urlSegments = params.slug
    let fullName = ""
    let urlSegmentList = []
    if(urlSegments.length !== 3 && urlSegments.length !== 2) {
      return <div>Invalid Car Page</div>
    }
    if(urlSegments.length === 2) {
      const fullNameArray = params.slug.map(slug => slug.replace(/-/g, " "));
      console.log(fullNameArray)
      const year = await getLatestYear(fullNameArray[0], fullNameArray[1]);
      fullName = year + " " + fullNameArray[0] + " " + fullNameArray[1];
      urlSegmentList = params.slug
      urlSegmentList.push(year.toString());
      console.log(urlSegmentList)
    }
    else{
      fullName = params.slug.map(slug => slug.replace(/-/g, " ")).join(' ')
      urlSegmentList = params.slug
      console.log(urlSegmentList)
    }
    console.log(fullName)

    return (
        <body style={{margin: 0 + "px"}}>
            {/* TODO: find better way to remove margin */}
            <Navbar />
            <Breadcrumbs urlSegments={params.slug}/>
            <div className={styles.pageTitle}>Car Page: {fullName}</div>
            <Reviews urlSegments={urlSegmentList}/>  
        </body>
    );
    
}