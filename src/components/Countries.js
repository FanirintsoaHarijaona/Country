import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Countries = () => {
    const [data, setData] = useState([])
 //récupérer le nombre de pays voulus
    const [rangeValue,setRangeValue] = useState(36)

 //récupérer la valeur du continent séléctionné
    const [selectedContinent,setSelectedContinent] = useState("")

    const continents = ["Africa","America","Asia","Europe","Oceania"]

 //Quand le composant est monté ou mise en place, useEffect est appelée
    useEffect(()=>{
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((response)=>setData(response.data))
    },[])
// si on trouve pas un id pour lequel les propriété sont uniques, on utilise alors index
//il faut une clé qui soit unique pour chaque elt
    return (
        <div className='countries'>
            <ul className="radio-container">
                <input type="range" min="1" max="250" defaultValue={rangeValue} 
                onChange={(e)=>setRangeValue(e.target.value)} />
               
                {continents.map((continent)=>(
                    <li>
                        <input type="radio" id={continent} name="continents" 
                        onChange={(e)=>setSelectedContinent(e.target.id)}/>
                        <label htmlFor={continent}>{continent}</label>
                    </li>
               ))}

            </ul>
            <ul className='pays'>
               {
                data
                    .filter((country)=> country.continents[0].includes(selectedContinent))  
                    .sort((a,b)=>b.population - a.population)
                    .slice(0,rangeValue)
                    .map((country, index)=>
                   <Card key={index} country={country}/>
                )
               }
            </ul>
        </div>
    );
};

export default Countries;