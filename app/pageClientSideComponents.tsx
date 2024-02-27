"use client";

import Image from "next/image";
import styles from "@/app/page.module.css";
import React, { useState } from 'react';
import { CarType } from "./page";


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
  // console.log(displayValue)
  return (
    <div className={styles.DropDownContainer}>
      <label className={styles.Labels}>{carIdentifier}</label>
      <select defaultValue={displayValue} className={styles.DropDown} disabled={disabled} onChange={dropDownSetter}>
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
  let urlAppropriateMake = make.replaceAll(" ", "-")
  let urlAppropriateModel = model.replaceAll(" ", "-")
  
  return (
    <a href={"/" + urlAppropriateMake + "/" + urlAppropriateModel + "/" + year}>
      <button disabled={disabled} className={styles.NextButton}>
        Next
      </button>
    </a>
  )
}

export default  function SearchState({carTypes}: {carTypes: CarType[]}) {
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

  /* Filtering logic is done locally here to avoid db queries. Car model data is cached */

  function getMakes(cars: CarType[]) {
    const makes = cars.map((car) => car.make)
    const uniqueMakes = new Set(makes)
    return Array.from(uniqueMakes)
  }

  let MAKES = getMakes(carTypes)
  function getModels(cars : CarType[], make: string) {
    const modelsOfMake = cars.filter((car) => car.make === make)
    const uniqueModels = new Set(modelsOfMake.map((car) => car.model))
    return Array.from(uniqueModels)
  }
  let MODELS = getModels(carTypes, make)
  function getYears(cars: CarType[], make: string, model: string) {
    const yearsOfModel = cars.filter((car) => car.model === model && car.make === make)
    const uniqueYears = new Set(yearsOfModel.map((car) => String(car.year)))
    return Array.from(uniqueYears)
  }
  let YEARS = getYears(carTypes, make, model)

  return (
      <div className={styles.SearchElements}>
        <DropDown disabled={false} carIdentifier="Make" subOptions={MAKES} year={year} make={make} model={model} onYearChange={setYear} onMakeChange={setMake} onModelChange={setModel}/>
        <DropDown disabled={isModelDisabled} carIdentifier="Model" subOptions={MODELS} year={year} make={make} model={model} onYearChange={setYear} onMakeChange={setMake} onModelChange={setModel}/>
        <DropDown disabled={isYearDisabled} carIdentifier="Year" subOptions={YEARS} year={year} make={make} model={model} onYearChange={setYear} onMakeChange={setMake} onModelChange={setModel}/>
        <NextButton disabled={isNextDisabled} year={year} make={make} model={model}/>
      </div>
  )
}