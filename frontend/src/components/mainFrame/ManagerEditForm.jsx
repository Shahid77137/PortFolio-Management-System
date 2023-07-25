import React from "react";
import { useState } from "react";
import { updateUser,isAdmin } from "../../Utils/post";
import { toast } from 'react-toastify';

const ManagerEditForm = ({MfirstName,MlastName,Mrole,MisActive,Mabout,MstartDate,Memail,setFlag,up,setUp}) => {
    const [firstName, setFirstName] = useState(MfirstName);
  const [lastName, setLastName] = useState(MlastName);
  const [role, setRole] = useState(Mrole);
  const [isActive, setIsActive] = useState(MisActive);
  const [about, setAbout] = useState(Mabout);
  const [startDate, setStartDate] = useState(MstartDate);
  const [email, setEmail] = useState(Memail);
  const back=()=>{setFlag(false)}
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    let obj={
        "firstName":firstName,
        "lastName":lastName,
        "role":role,
        "isActive":isActive,
        "about":about,
        "startDate":startDate,
        "email":email
    }
    let response=await updateUser(email,obj)
    if (response.status==200){
      toast.success("Manager is Updated Successfull",{autoClose:1200})
      setFlag(false)
      setUp(!up)
    }else {
      toast.warning("Something Went Wrong",{autoClose:1200})
      setFlag(false)
    }
    
  };

  return (
    <>
      <div className="popup-container">
        <div className="popup-form">
          <form onSubmit={handleSubmit}>
            <label>
              Manager First Name:
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label>
              Manager Last Name:
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <label>
              Email:
              <input type="text" value={email} readOnly />
            </label>
            <label>
              Start Date:
              <input type="text" value={startDate} readOnly />
            </label>
            <label>
              Role :
              <input type="text" value={role} readOnly />
            </label>
            <label>
              Assigned To:
              <select
                className="inputboxEditable"
                value={isActive}
                onChange={(e) => setIsActive(e.target.value)}
              >
                <option value={true}>Active</option>
                <option value={false}>Active</option>
                
              </select>
            </label>
            <label>
              About:
              <textarea
                className="inputboxEditable"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                minLength={5}
                required
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          <button onClick={back}>Go Back</button>
        </div>
      </div>
    </>
  );
};

export default ManagerEditForm;
