import React, { useState } from 'react';
import { createResource as cr } from '../../Utils/post';
import { toast } from 'react-toastify';
const CreateResource = ({setUp,up}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [link, setLink] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [password, setPassword] = useState('');
  let email=localStorage.getItem("email")
    const HandleSubmit=async()=>{
       let obj={
            title,type,link,isLocked,password
        }
       let response=await cr(email,obj)
        if (response.status==200){
            toast.success("Resource is Added Successfull",{
                autoClose:1200
            })
            setUp(!up)
          }else {
            toast.warning("Something Went Wrong Try again Later with another name",{
                autoClose:1200
            })
        }
    }

  return (
    <div className="unique-form"> {/* Parent div with unique class name */}
        <label htmlFor="projectName">Title</label>
      <input
        
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      {/* Dropdown menu for type */}
      <label htmlFor="projectName">Type Of Content</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Select Type</option>
        <option value="document">Document</option>
        <option value="video">Video</option>
        <option value="audio">Audio</option>
        <option value="website">Website</option>
      </select>
      <label htmlFor="projectName">Provide the Link</label>
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Link"
      />

      <input
        type="checkbox"
        checked={isLocked}
        onChange={(e) => setIsLocked(e.target.checked)}
      />
      <label>Is Locked</label>

      {isLocked && (
        <input
          className="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      )}

      {/* Optional submit button */}
      <button onClick={HandleSubmit} type="submit">Submit</button>
    </div>
  );
};

export default CreateResource;
