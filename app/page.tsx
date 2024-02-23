"use client";

import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from 'react';
import cachedData from "@/public/data";
import Link from "next/link";
import { unique } from "next/dist/build/utils";

const stateDefault = "Default"

function DropDown( {year, make, model, onYearChange, onMakeChange, onModelChange, disabled, carIdentifier, subOptions}: { year: string, make: string, model: string, onYearChange: React.Dispatch<React.SetStateAction<string>>, onMakeChange: React.Dispatch<React.SetStateAction<string>>, onModelChange: React.Dispatch<React.SetStateAction<string>>, disabled: boolean, carIdentifier: string, subOptions: string[] } ) {
  const whichDropDown = carIdentifier === "Year" ? year : (carIdentifier === "Make" ? make : model)
  let displayValue = (whichDropDown === stateDefault) ? carIdentifier : whichDropDown
  let dropDownSetter
 if (carIdentifier === "Make") {
    /* Make's onChange should set the make to the e.target.value, and then set the model and year to "" */
    dropDownSetter = (e: React.ChangeEvent<HTMLSelectElement>) => {onMakeChange(e.target.value), onModelChange(stateDefault) , onYearChange(stateDefault)}
  } else if (carIdentifier === "Model") {
    /* Model's onChange should set the model to the e.target.value and then set the year to ""*/
    dropDownSetter = (e: React.ChangeEvent<HTMLSelectElement>) => {onModelChange(e.target.value), onYearChange(stateDefault) }
  } else {
    /* Year's onChange should set the year to the e.target.value*/
    dropDownSetter = (e: React.ChangeEvent<HTMLSelectElement>) => {onYearChange(e.target.value)}
  }


  return (
    <div className={styles.DropDownContainer}>
      <label className={styles.Labels}>{carIdentifier}</label>
      <select className={styles.DropDown} disabled={disabled} onChange={dropDownSetter} value={displayValue}>
        <option disabled value={carIdentifier} key="disabled option">
          {carIdentifier}
        </option>
        {subOptions.map((subOption, index) => (
          <option value={subOption} key={subOption}>{subOption}</option>
        ))}
      </select>
      
    </div>
    
    
  )
}

/*TODO: find a better way to do keys for enumerations*/

function NextButton({disabled, year, make, model}: {disabled: boolean, year: string, make: string, model: string}) {
  return (
    <button disabled={disabled} className={styles.NextButton} onClick={() => {location.href= "/" + make + "/" + model + "/" + year;}}>
      Next
    </button>
  )
}

function SearchState() {
  /* Component made for holding the state (year, make, model)*/
  const [year, setYear] = useState(stateDefault);
  const [make, setMake] = useState(stateDefault);
  const [model, setModel] = useState(stateDefault);

  /* Logic for enabling/disabling the next button */
  let isModelDisabled = true;
  let isYearDisabled = true;
  let isNextDisabled = true;

  if (make === stateDefault) {
    isModelDisabled = true;
  } else {
    isModelDisabled = false;
  }

  if (model === stateDefault) {
    isYearDisabled = true;
  } else {
    isYearDisabled = false;
  }

  if (year === stateDefault){
    isNextDisabled = true
  } else {
    isNextDisabled = false
  }


  function getMakes(cars: {Year: number|string, Make: string, Model: string}[]) {
    const makes = cars.map((car) => car.Make)
    const uniqueMakes = new Set(makes)
    return Array.from(uniqueMakes)
  }
  let MAKES = getMakes(cachedData)
  function getModels(cars : {Year: number|string, Make: string, Model: string}[], make: string) {
    const modelsOfMake = cars.filter((car) => car.Make === make)
    const uniqueModels = new Set(modelsOfMake.map((car) => car.Model))
    return Array.from(uniqueModels)
  }
  let MODELS = getModels(cachedData, make)
  function getYears(cars: {Year: number|string, Make: string, Model: string}[], make: string, model: string) {
    const yearsOfModel = cars.filter((car) => car.Model === model && car.Make === make)
    const uniqueYears = new Set(yearsOfModel.map((car) => String(car.Year)))
    return Array.from(uniqueYears)
  }
  let YEARS = getYears(cachedData, make, model)

  return (
      <div className={styles.SearchElements}>
        <DropDown disabled={false} carIdentifier="Make" subOptions={MAKES} year={year} make={make} model={model} onYearChange={setYear} onMakeChange={setMake} onModelChange={setModel}/>
        <DropDown disabled={isModelDisabled} carIdentifier="Model" subOptions={MODELS} year={year} make={make} model={model} onYearChange={setYear} onMakeChange={setMake} onModelChange={setModel}/>
        <DropDown disabled={isYearDisabled} carIdentifier="Year" subOptions={YEARS} year={year} make={make} model={model} onYearChange={setYear} onMakeChange={setMake} onModelChange={setModel}/>
        <NextButton disabled={isNextDisabled} year={year} make={make} model={model}/>
      </div>
  )
}

export default function Home() {
  /* state is year, make, model*/
  return (
    <main className={styles.container}>
      <div className={styles.searchBox}>
        <div className={styles.title}>Search For A Vehicle</div>
        <SearchState />
      </div>
    </main>
  );
}

/* Test Data (no logic required whatsoever) */
// const YEARS = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"]
// const MAKES = ["Toyota", "Ford", "Tesla"]
// const MODELS = ["Camry", "Model S", "Model X"]