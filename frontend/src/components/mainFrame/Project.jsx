import React from "react";
import ProjectEditForm from "./ProjectEditForm";
import { useState } from "react";
import ConfirmationBox from "./ConfirmationBox";

const Project = ({name,status,stDate,edDate,disc,AssignedTo,setUp,up}) => {
  const [flag,setFlag]=useState(false)
  const [flag2,setFlag2]=useState(false)

  const HandleEditProject=({name,status,stDate,edDate,disc,AssignedTo})=>{
    
    setFlag(true)
    
  }
  const HandleDeleteProject=({name})=>{
    
    setFlag2(true)
    
  }
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{status}</td>
        <td>{stDate}</td>
        <td>{edDate}</td>
        
        <td>{AssignedTo ? AssignedTo : "Not Assigned"}</td>
        <td>{disc}</td>
        <td>
          <span className="operation-icon" onClick={HandleEditProject}>Edit</span>
          <span className="operation-icon" onClick={HandleDeleteProject} >Delete</span>
        </td>
      </tr>
      {flag && <ProjectEditForm name={name}
       status={status} 
       stDate={stDate} 
       edDate={edDate} disc={disc} 
       AssignedTo={AssignedTo ? AssignedTo :"Not Assigned"} 
       setFlag={setFlag}
       setUp={setUp}
       up={up}
        
       />}
       {
        flag2 && <ConfirmationBox
          name={name}
          setFlag2={setFlag2}
          setUp={setUp}
          up={up}
        />
       }

    </>
  );
};

export default Project;
