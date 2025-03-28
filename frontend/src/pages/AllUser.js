import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment';
import { MdModeEdit } from "react-icons/md"
import ChangeUserRole from '../components/ChangeUserRole'

const AllUser = () => {
   const [allUsers, setAllUsers] = useState([])
   const [openUpdateRoles, setOpenUpdateRoles] = useState(false)
   const [updateUserDetails, setUpdateUserDetails] = useState({
    name : "",
    email : "",
    role : "",
    _id: ""
   })

   const fetchAllUsers = async () => {
    const fetchData = await fetch(summaryApi.allUser.url, {
        method : summaryApi.allUser.method,
        credentials: "include"
    })

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setAllUsers(dataResponse.data)
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }

   }

   useEffect(() => {
    fetchAllUsers()
   }, [])

  return (
    <div className='bg-slate-200 p-4'>
      <table className='w-full userTable'>
          <thead>
              <tr className='bg-black text-white'>
                <th>s/n</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
          </thead>

          <tbody>
              {
                allUsers.map((el, index) => {
                  return (
                    <tr>
                      <td>{index+1}</td>
                      <td>{el?.name}</td>
                      <td>{el?.email}</td>
                      <td>{el?.role}</td>
                      <td>{moment(el?.createdAt).format("ll")}</td>
                      <td>
                       <button 
                        className='bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white'
                         onClick={() => {
                          setUpdateUserDetails(el)
                          setOpenUpdateRoles(true)
                        }}
                         >
                       <MdModeEdit />
                       </button>
                      </td>
                    </tr>
                  )
                })
              }
          </tbody>
      </table>
          {
            openUpdateRoles && (
              <ChangeUserRole 
                onClose={() => setOpenUpdateRoles(false)}
                name={updateUserDetails.name}
                email={updateUserDetails.email}
                role={updateUserDetails.role}
                userId={updateUserDetails._id}
                callFunc={fetchAllUsers}
              />
            )
          }
    </div>
  )
}

export default AllUser