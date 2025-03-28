import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import productCategory from '../helpers/productCategory'
import { FaCloudUploadAlt } from 'react-icons/fa'
import uploadImages from '../helpers/uploadImages'
import DisplayImage from './DisplayImage'
import { MdDelete } from 'react-icons/md'
import summaryApi from '../common'
import { toast } from 'react-toastify'

const AdminEditProduct = ({ onClose, ProductData, fetchData }) => {
    const [data, setData] = useState({
        ...ProductData,
        productName : ProductData?.productName,
        brandName : ProductData?.brandName,
        category : ProductData?.category,
        productImage : ProductData?.productImage,
        description : ProductData?.description,
        price : ProductData?.price,
        sellingPrice : ProductData?.sellingPrice
      })
      const [openFullScreen, setOpenFullScreen] = useState(false)
      const [fullScreenImage, setFullscreenImage] = useState('')
    
      const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
          return {
            ...prev,
            [name] : value
          }
        })
      }
    
      const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
       
    
        const uploadImageCloudinary = await uploadImages(file)
    
        setData((prev) => {
          return {
            ...prev,
            productImage : [ ...prev.productImage, uploadImageCloudinary.url]
          }
        })
    
        console.log("upload image", uploadImageCloudinary.url)
      }
    
      const handleDeleteProductImage = async (index) => {
        console.log("image index", index)
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)
    
        setData((prev)=> {
          return{
            ...prev,
            productImage : [...newProductImage]
          }
        })
      }
    
      /** Uploading products */
      const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(summaryApi.updateProducts.url, {
          method : summaryApi.updateProducts.method,
          credentials : 'include',
          headers : {
            "content-type" : 'application/json'
          },
          body : JSON.stringify(data)
        })
        
        const responseData = await response.json()
    
        if (responseData.success){
          toast.success(responseData?.message)
          onClose()
          fetchData()
        }
        if (responseData.error) {
          toast.error(responseData?.message)
        }
    
        setData(responseData)
        console.log("uploaded products", responseData)
    
    
      } 
  return (
    <div className='fixed bg-slate-200 bg-opacity-35 w-full h-full top-0 right-0 left-0 bottom-0 flex justify-center items-center'>
    <div className='bg-white p-4 w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
   
    <div className='flex justify-between items-center pb-3'>
         <h2 className='font-bold text-lg'> Edit Product</h2>
        <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
           <CgClose />
        </div>
    </div>

         <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
             <label htmlFor='productName'>Product Name :</label>
             <input 
               type='text'  
               id='productName' 
               placeholder='Product Name'
               name='productName' 
               value={data.productName} 
               onChange={handleOnChange} 
               className='p-1 bg-slate-100 border rounded'
               required
               />
             
             <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
             <input 
               type='text'  
               id='brandName' 
               placeholder='Brand Name' 
               name='brandName'
               value={data.brandName} 
               onChange={handleOnChange} 
               className='p-1 bg-slate-100 border rounded'
               required
               />

             <label htmlFor='category' className='mt-3'>Category :</label>
             <select value={data.category} name='category' onChange={handleOnChange} required className='p-1 bg-slate-100 border rounded'>
               <option value={""}>Select Category</option>
                {
                 productCategory.map((el, index) => {
                     return (
                       <option value={el.value} key={el.value+index}>{el.label}</option>
                     )
                 })
                } 
             </select>

             <label htmlFor='productImage' className='mt-3'>Product Image :</label>
             <label htmlFor='uploadImageInput'>
             <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                 <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                   <span className='text-4xl'>
                     <FaCloudUploadAlt />
                   </span>
                   <p className='text-sm'>Upload Product Image</p>
                   <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct}/>
                 </div>
             </div>
             </label>

             <div>
               {
                 data?.productImage[0] ? (
                   <div className='flex items-center gap-2'>
                     {
                       data.productImage.map((el, index) => {
                         return(
                           <div className='relative group'>
                             <img 
                               src={el} 
                               width={80} 
                               height={80} 
                               alt={el} 
                               className='bg-slate-100 border cursor-pointer'
                               onClick={() => {
                                 setOpenFullScreen(true)
                                 setFullscreenImage(el)
                               }}
                             />
                             <div className='absolute top-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                               <MdDelete />
                            </div>
                           </div>
                           
                         )
                       })
                     }
                   </div>
                 ) : (
                   <p className='text-red-500 text-sm'>*Upload Images </p>
                 )
               }
             </div>

             <label htmlFor='price' className='mt-3'>Price :</label>
             <div>
             <input 
               type='number'  
               id='price' 
               placeholder='Price' 
               value={data.price}
               name='price' 
               onChange={handleOnChange} 
               className='p-1 bg-slate-100 border rounded'
               required
               />
             </div>

             <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
             <input 
               type='number'  
               id='sellingPrice' 
               placeholder='Selling Price' 
               value={data.sellingPrice}
               name='sellingPrice' 
               onChange={handleOnChange} 
               className='p-1 bg-slate-100 border rounded'
               required
               />

             <label htmlFor='description' className='mt-3'>Description :</label>
             <textarea 
               className='bg-slate-100 h-20 border resize-none p-1'
               onChange={handleOnChange} 
               value={data.description}
               id='description' 
               name='description' 
               placeholder='Product Description'
               required
               ></textarea>

             <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Update Product</button>
         </form>
    </div>


    {/** Display image full screen */}
   <div>
     <div>
       {
         openFullScreen && (
           <DisplayImage onClose={() => setOpenFullScreen(false)} imgUrl={fullScreenImage}/>
         )
       }
       
     </div>
   </div>
 </div>
  )
}

export default AdminEditProduct