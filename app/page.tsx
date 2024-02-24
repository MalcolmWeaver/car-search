import styles from "@/app/page.module.css";
import SearchState from "./pageClientSideComponents";
import { getAndCacheItemsFromDB } from "@/app/utils";

export default function Home() {
  
  /* Data For Home Search */
  const carKeysQuery = `SELECT Year, Make, Model FROM cars`
  const carTypesResult = getAndCacheItemsFromDB(carKeysQuery)

  let typedCarTypes: CarType[] = [];
  type CarType = { Year: string | number; Make: string; Model: string; };
  if (Array.isArray(carTypesResult) && carTypesResult.every((car: any) => typeof car.Year === 'string' || typeof car.Year === 'number')) {
      typedCarTypes = carTypesResult as CarType[];
  } else {
      console.error('Invalid car types data structure.');
  }
    
  return (
    <main className={styles.container}>
      <div className={styles.searchBox}>
        <div className={styles.title}>Search For A Vehicle</div>
        <SearchState carTypes={typedCarTypes}/>
      </div>
    </main>
  );
}

/* Test Data (no logic required whatsoever) */
// const YEARS = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"]
// const MAKES = ["Toyota", "Ford", "Tesla"]
// const MODELS = ["Camry", "Model S", "Model X"]