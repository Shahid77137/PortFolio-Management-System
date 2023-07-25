import React from 'react'
import { useState,useEffect } from 'react';
import { showManagers,updateProject } from '../../Utils/post';
import { toast } from 'react-toastify';


const ProjectEditForm = ({name,status,stDate,edDate,disc,AssignedTo,setFlag,setUp,up}) => {
    const [projectName, setProjectName] = useState(name);
    const [endDate, setEndDate] = useState(edDate);
    const [startDate, setStartDate] = useState(stDate);
    const [statuss, setStatus] = useState(status);
    const [description, setDescription] = useState(disc);
    const [assigned, setAssigned] = useState(AssignedTo);
    const back=()=>{
        setFlag(false)
    }
    let email=localStorage.getItem("email")
    
    const [data, setData] = useState([]);
  const fetchProjects = async () => {
    return await showManagers(email);
  };

  useEffect(() => {
    fetchProjects().then((db) => {
      setData(db.data);
      console.log(data); // xx

      // Put the code that uses the data here
      // For example:
      // displayData(data);
    });
  }, []);
  console.log(data)
    
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      let email=localStorage.getItem("email")
         //   name,status,stDate,edDate,disc,AssignedTo,setFlag
      let obj={
        "old_projectId":name,
        "projectId":projectName,
        "startDate":startDate,
        "endDate":endDate,
        "status":statuss,
        "desc":description,
        "manager":assigned
      }
      let response=await updateProject(email,obj)
      console.log(response)
      if (response.status==200){
        toast.success("Project is Updated Successfull",{
            autoClose:1200
        })
        setFlag(false)
        setUp(!up)
      }else {
        toast.warning("Something Went Wrong Try again Later with another name",{
            autoClose:1200
        })
        setFlag(false)
      }
      
    };
  
    return (
      <div className="popup-container">
        <div className="popup-form">
          <form onSubmit={handleSubmit}>
            <label>
              Project Name:
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </label>
            <label>
              Start Date:
              <input
                type="text"
                value={startDate}
                readOnly
              />
            </label>
            <label>
              Status:
              <input
                type="text"
                value={statuss}
                readOnly
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </label>
            <label>
              Assigned To:
              <select className='inputboxEditable' value={assigned} onChange={(e) => setAssigned(e.target.value)}>
              <option value="Not Assigned">Not Assigned</option>
              {
                data.map((ele,ind)=>{
                    return(
                        <option value={ele.email}>{ele.email}</option>
                    )
                })
              }
              {/* Add more options if needed */}
            </select>
            </label>
            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                minLength={5}
                required
              />
            </label>
            <button type="submit">Submit</button>
            
          </form>
          <button onClick={back}>Go Back</button>
        </div>
      </div>
    );
}

export default ProjectEditForm