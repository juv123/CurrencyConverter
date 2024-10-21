import React, { useEffect, useState } from 'react'
import DropDown from './DropDown';
import { HiArrowsRightLeft } from 'react-icons/hi2';

const CurrencyConverter = () => {
  const [currencies,setCurrency]=useState([]);
  const [fromCurrency,setFromCurrency]=useState("INR");
  const [toCurrency,setToCurrency]=useState("USD");
  const [amount,setAmount]=useState(0);
  const [convertedAmount,setConvertedAmount]=useState(0);
  const [converting,setConverting]=useState(false);
  const [favorites,setFavorites]=useState(JSON.parse(localStorage.getItem("favorites"))||["INR"]);
 const swapCurrency=()=>{
  setFromCurrency(toCurrency)
  setToCurrency(fromCurrency)
 }
 const handleFavorites=(currency)=>{
 let updatedFavorites=[...favorites]
 if(favorites.includes(currency)){
  updatedFavorites=updatedFavorites.filter((fav)=>fav!==currency)
}
else
{
  updatedFavorites.push(currency)
}
setFavorites(updatedFavorites)
localStorage.setItem("favorites",JSON.stringify(updatedFavorites))
 }
  const fetchCurrencies=async ()=>{
    try{
      const data=await fetch('https://api.frankfurter.app/currencies')
      const response=await data.json(); //object
      const response_array=Object.keys(response)
      console.log(response_array)
      setCurrency(response_array)
    }
   catch(error){
    console.log(error)
   }
   finally{
    setConverting(false);
   }
  }
  const convertCurrency=async()=>{
    if(!amount) return
    setConverting(true);
    try{
       console.log("amount"+amount)
      const data=await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
      const response=await data.json(); 
      console.log(response.rates[toCurrency]+" " +toCurrency)
      setConvertedAmount(response.rates[toCurrency]+" " +toCurrency)
      console.log(converting)
    }
   catch(error){
    console.log(error)
   }
   
  }
  useEffect(()=>{
    fetchCurrencies();

  },[])
  return (
    <div className='max-w-screen mx-auto my-10 p-5 rounded-lg shadow-md border border-gray-300 bg-white'>
    <h2 className='mb-5 text-3xl font-semibold text-orange-600'>Currency Converter</h2>
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-0 items-end'>
      
      <DropDown label="From" currencies={currencies} currency={fromCurrency} setCurrency={setFromCurrency} favorites={favorites} handleFavorites={handleFavorites}/>
      <div className='flex justify-center'>
        <button className='bg-gray-200 h-9 w-12' onClick={swapCurrency}>
          <HiArrowsRightLeft className='text-xl text-gray-700' />
        </button>
        </div>
      <DropDown label="To" currencies={currencies} currency={toCurrency} setCurrency={setToCurrency} favorites={favorites} handleFavorites={handleFavorites}/>
    </div>
    <div className='mt-4'>
      <label htmlFor='amount' className='block text-sm font-medium text-gray-700'>Amount:</label>
      <input type="number" onChange={(e)=>setAmount(e.target.value)} className='w-full shadow-sm h-[40px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2' />
    </div>
    <div className='flex justify-end mt-6'>
      <button onClick={convertCurrency} className={` text-sm bg-blue-500 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600  focus:ring-offset-4 hover:bg-green-500 ${converting?"animate-pulse":"animate-none"} `}>Convert</button>
    </div>
   <div className='text-right text-lg mt-4 text-violet-800 font-bold shadow-2xl'>
    Converted Amount :{convertedAmount} 
   </div>
</div>
  )
}

export default CurrencyConverter