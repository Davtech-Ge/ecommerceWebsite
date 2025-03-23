import React, { useEffect, useState } from 'react'
import summaryApi from '../common'

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchCategoryProduct = async () => {
        setLoading(true)
        const response = await fetch(summaryApi.productCategories.url, {
            method : summaryApi.productCategories.method,
            credentials : "include"
        })
        const dataResponse = await response.json()

        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    
    
    useEffect(() => {
        fetchCategoryProduct()  
    }, [])
  return (
    <div className='container mx-auto p-4'>
       <div className='flex items-center gap-4 justify-between'>
       {
            categoryProduct.map((product, index) => {
                return (
                    <div>
                        <div className='w-20 h-20 rounded-full overflow-hidden'>
                            <img src={product?.productImage[0]} alt={product?.category} className='h-fit object-fill p-2 bg-white'/>
                        </div>
                    </div>
                )
            })
        }
       </div>
    </div>
  )
}

export default CategoryList