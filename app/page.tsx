"use client";

import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from 'react';

const stateDefault = "Default"

function DropDown( {year, make, model, onYearChange, onMakeChange, onModelChange, disabled, carIdentifier, subOptions}: { year: string, make: string, model: string, onYearChange: React.Dispatch<React.SetStateAction<string>>, onMakeChange: React.Dispatch<React.SetStateAction<string>>, onModelChange: React.Dispatch<React.SetStateAction<string>>, disabled: boolean, carIdentifier: string, subOptions: string[] } ) {
  const whichDropDown = carIdentifier === "Year" ? year : (carIdentifier === "Make" ? make : model)
  let displayValue = (whichDropDown === stateDefault) ? carIdentifier : whichDropDown
  // console.log("State: year " + year + " make " + make + " model " + model + "\n")
  // console.log(displayValue)
  let dropDownSetter
  /* TODO: logic to make the setter of year cause others to become disabled*/
  if (carIdentifier === "Year") {
    /* The onChange should set the year to the e.target.value, and then set the make and model to "" */
    dropDownSetter = (e: React.ChangeEvent<HTMLSelectElement>) => {onYearChange(e.target.value), onMakeChange(stateDefault), onModelChange(stateDefault)}
  } else if (carIdentifier === "Make") {
    /* The onChange should set the make to the e.target.value, and then set the model to "" */
    dropDownSetter = (e: React.ChangeEvent<HTMLSelectElement>) => {onMakeChange(e.target.value), onModelChange(stateDefault)}
  } else {
    /* The onChange should set the model to the e.target.value */
    dropDownSetter = (e: React.ChangeEvent<HTMLSelectElement>) => onModelChange(e.target.value)
  }
  
  return (
    <select disabled={disabled} onChange={dropDownSetter} value={displayValue}>
      <option disabled value={carIdentifier} key="disabled option">
        {carIdentifier}
      </option>
      {subOptions.map((subOption, index) => (
        <option value={subOption} key={subOption}>{subOption}</option>
      ))}
    </select>
  )
}

/*TODO: find a better way to do keys for enumerations*/

function NextButton({year, make, model}: {year: string, make: string, model: string}) {
  return (
    <button>Next</button>
  )
}

function SearchState() {
  /* Component made for holding the state (year, make, model)*/
  const [year, setYear] = useState(stateDefault);
  const [make, setMake] = useState(stateDefault);
  const [model, setModel] = useState(stateDefault);

  /* Logic for enabling/disabling the next button */
  let isMakeDisabled = true;
  let isModelDisabled = true;

  if (year === stateDefault) {
    isMakeDisabled = true;
  }  else {
    isMakeDisabled = false;
  }

  if (make === stateDefault) {
    isModelDisabled = true;
  } else {
    isModelDisabled = false;
  }

  /* TODO: add logic to filter makes by year */
  /* TODO: add logic to filter models by year and make */

  return (
    <div className="SearchElements">
      <DropDown disabled={false} carIdentifier="Year" subOptions={YEARS} year={year} make={make} model={model} onYearChange={setYear} onMakeChange={setMake} onModelChange={setModel}/>
      <DropDown disabled={isMakeDisabled} carIdentifier="Make" subOptions={MAKES} year={year} make={make} model={model} onYearChange={setYear} onMakeChange={setMake} onModelChange={setModel}/>
      <DropDown disabled={isModelDisabled} carIdentifier="Model" subOptions={MODELS} year={year} make={make} model={model} onYearChange={setYear} onMakeChange={setMake} onModelChange={setModel}/>
      <NextButton year={year} make={make} model={model}/>
    </div>
  )
}

export default function Home() {
  /* state is year, make, model*/
  return (
    <main className={styles.main}>
      <div className="top-title">Search For A Vehicle</div>
      <SearchState />
    </main>
  );
}

/* Test Data (no logic whatsoever) */
const YEARS = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"]
const MAKES = ["Toyota", "Ford", "Tesla"]
const MODELS = ["Camry", "Model S", "Model X"]
/* const MAKES: */
/* Option 1: all car model date, use a linear search function */
/* Option 2: use a tree/hash table data structure */

/* const MODELS*/