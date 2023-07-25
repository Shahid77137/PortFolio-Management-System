import React, { useState } from 'react'
import { updateResource } from '../../Utils/post'
import { toast } from 'react-toastify';

const EditResource = ({etitle,etype,elink,eisLocked,epassword,erid,setUp,up,setFlag}) => {
    const[title,setTitle]=useState(etitle)
    const[type,setType]=useState(etype)
    const[link,setLink]=useState(elink)
    const[isLocked,setIsLocked]=useState(eisLocked)
    const[password,setPassword]=useState(epassword)
    let email=localStorage.getItem("email")
    const onClose=()=>{
        setFlag(false)
    }
    const HandleUpdate=async(e)=>{
        e.preventDefault();
        let obj={
            title,type,link,isLocked,password
        }
        let response=await updateResource(email,erid,obj)
        if (response.status==200){
            toast.success("Manager is Updated Successfull",{autoClose:1200})
            setFlag(false)
            setUp(!up)
          }else {
            toast.warning("Something Went Wrong",{autoClose:1200})
            setFlag(false)
          }
    }
    return (
        <div className="resourcePopupContainer">
          <div className="resourceEdit">
            <h2>Edit Resource</h2>
            <div className="form-group">
              <label>Title:</label>
              <input type="text" value={title} onClick={(e)=>setTitle(e.target.value)} placeholder="Enter title" />
            </div>
            <div className="form-group">
              <label>Type:</label>
              <select value={type} onChange={(e)=>setType(e.target.value)}>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="document">Document</option>
                <option value="website">Website</option>
              </select>
            </div>
            <div className="form-group">
              <label>Link:</label>
              <input type="text" value={link} onClick={(e)=>setLink(e.target.value)} placeholder="Enter link" />
            </div>
            <div className="form-group">
              <label>Is Locked:</label>
              <input checked={isLocked} onClick={(e)=>setIsLocked(e.target.value)} type="checkbox" />
            </div>
            {<div className="form-group">
              <label>Password:</label>
              <input type="password" value={password} onClick={(e)=>setPassword(e.target.checked)} placeholder="Enter password" />
            </div>}
            <div className="buttons">
              <button onClick={onClose}>Cancel</button>
              <button onClick={HandleUpdate}>Save</button>
            </div>
          </div>
        </div>
      );
}

export default EditResource