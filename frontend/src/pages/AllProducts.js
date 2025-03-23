import { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import summaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProducts] = useState(false);
  const [allProducts, setAllProducts] = useState([])

  const fetchAllProducts = async () => {
    const response = await fetch(summaryApi.allProducts.url, {
      method: summaryApi.allProducts.method,
      credentials : "include"
    })

    const dataResponse = await response.json()

    setAllProducts(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <div >
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
         <h1 className='font-bold text-lg'>All Products</h1>
         <button className=' border-2 border-red-600 rounded-full py-2 px-3 text-red hover:bg-red-600 hover:text-white transition-all' onClick={() => setOpenUploadProducts(true)}>Upload Products</button>    
      </div>
         {/** all Products */}
        <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
            {
              allProducts.map((product, index) => {
                return (
                  <div>
                    < AdminProductCard  data={product} key={index+allProducts} fetchData={fetchAllProducts}/>
                  </div>
                )
              })
            }
        </div>


             {/* *upload products components */}
        {
          openUploadProduct && (
              
                <UploadProduct onClose={() => setOpenUploadProducts(false)} fetchData={fetchAllProducts}/>
          )
        }
      
    </div>
  )
}

export default AllProducts