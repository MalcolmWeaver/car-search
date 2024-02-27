import styles from "@/app/page.module.css";
import SearchState from "./pageClientSideComponents";
import { getCars  } from "@/app/utils";

export type CarType = { year: string | number;
                make: string; 
                model: string; };

export default async function Home() {
  /* Data For Home Search */
  const carsResponse = await getCars();
  const cars = carsResponse.rows

  
  let typedCars: CarType[] = [];
  
  if (Array.isArray(cars)){
    cars.map((car: any) => {
      if (typeof (car.year === 'string' || typeof car.year === 'number') 
          && typeof car.make === 'string' && typeof car.model === 'string') {
        typedCars.push({year: car.year, make: car.make, model: car.model});
      }
    })
  } else {
      console.error('Invalid car types data structure.');
  }
    
  return (
    <main className={styles.container}>
      <div className={styles.searchBox}>
        <div className={styles.title}>Search For A Vehicle</div>
        <SearchState carTypes={typedCars}/>
      </div>
    </main>
  );
}

/* Test Data (no logic required whatsoever) */
// const YEARS = ["2010", "2011", "2012", "2013", "2014", "2015", "2016",
//                "2017", "2018", "2019", "2020", "2021", "2022", "2023",
//                "2024", "2025", "2026", "2027", "2028", "2029", "2030"]
// const MAKES = ["Toyota", "Ford", "Tesla"]
// const MODELS = ["Camry", "Model S", "Model X"]