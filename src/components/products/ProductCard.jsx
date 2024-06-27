import React from 'react'
import CupiceCream from '../../assets/cupicream.jpeg';
import '../../index.css'
const ProductCard = () => {
  return (
    <div className='bg-gray-100 flex item-center justify-center'>
        <div className='card'>

            <img src={CupiceCream} 
            alt='cup-ice'
            className="w-full h-full object-cover"
            />


            <div className='p-5  flex-col  gap-3'>
            {/* Badges */}

            <span
            
      className='px-3 py-1 rounded-full text-xs bg-gray-100'
      style={{
        fontFamily: '"Readex Pro", sans-serif',
        fontOpticalSizing: 'auto',
        fontWeight: 400, 
        fontStyle: 'normal',
        fontVariationSettings: '"HEXP" 0'
      }}
    >
      Stock Ready
    </span>
                <span className='px-3 py-1 rounded-full text-xs  bg-gray-100'>Official Store</span>
            </div>
        </div>
    </div>
  )
}

export default ProductCard