import React from 'react'
import { deleteProject } from '../../Utils/post'
import { toast } from 'react-toastify'

const ConfirmationBox = ({name,setFlag2,setUp,up}) => {
    let email=localStorage.getItem("email")
    const onConfirm=async(e)=>{
        let response=await deleteProject(email,name)
        if(response.status==200){
            toast.success("Project is Deleted Successfull",{
                autoClose:1200
            })
            setFlag2(false)
            setUp(!up)
        }else{
            toast.warning("You are not Authorize for it",{
                autoClose:1200
            })
            setFlag2(false)
        }
    }
    const onCancel=()=>{
        setFlag2(false)
    }
   let  message="Are you Sure to Delete this Project? "
  return (
    <>
    <div className="confirmation-popup-container">
      <div className="confirmation-popup">
        <p>{message}</p>
        <div className="confirmation-buttons">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default ConfirmationBox