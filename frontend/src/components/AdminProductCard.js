import React, { useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import AdminEditProduct from './AdminEditProduct'
import displayNairaCurrency from '../helpers/displayCurrency'

const AdminProductCard = ({ data, fetchData }) => {
    const [editProduct, setEditproduct] = useState(false)
  return (
    <div  className='bg-white p-4 rounded'>
            <div className='w-40'>
            <div className='w-32 h-32 flex justify-center items-center'>
            <img src={data?.productImage[0]} alt={data.productImage} width={120} height={120} className='mx-auto object-fill h-full'/>
            </div>
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
         <div>
            <p className='font-semibold'>
                {
                    displayNairaCurrency(data.sellingPrice)
                }
            </p>

            <div className='w-fit ml-auto p-2 hover:bg-green-600 rounded-full hover:text-white bg-green-100 cursor-pointer' onClick={() => setEditproduct(true)}>
                <MdModeEditOutline />
            </div>
         </div>

         </div>

            <div>
                {
                    editProduct && (
                        <AdminEditProduct ProductData={data} fetchData={fetchData} onClose={() => setEditproduct(false)}/>
                    )
                }
            </div>
        
    </div>
  )
}

export default AdminProductCard