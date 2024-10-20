import React from 'react'
import { HiOutlineStar, HiStar } from 'react-icons/hi'
const DropDown = ({label, currencies,currency,setCurrency,favorites,handleFavorites}) => {
  const isFavorites=curr=>favorites.includes(curr)
    //console.log(currencies)
  return (
    <div className="relative inline-flex items-center">
    <label className="text-justify">{`${label}:`}</label>
    <select value={currency} onChange={(e)=>{setCurrency(e.target.value)}} className="w-40 h-7 m-2 p-1 bg-slate-100">
       <hr />
       {favorites?.map((currency) => (
            <option className="bg-gray-300" key={currency} value={currency}>
                {currency}
            </option>
        ))}
        {currencies?.filter((c) => !favorites.includes(c)).map((currency)=>{
          return (
          <option key={currency} value={currency}>
          {currency}
      </option>
          )
        }
      )
      }
           
        
    </select>
    <button onClick={()=>handleFavorites(currency)} className="absolute right-14  flex items-center text-sm leading-5 bg-transparent">
       { isFavorites(currency) ? <HiStar />:<HiOutlineStar />}
    </button>
</div>
  )
}

export default DropDown

