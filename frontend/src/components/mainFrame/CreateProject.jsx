import React from 'react'
import { useState } from 'react';
import { addProject} from '../../Utils/post';
import { toast } from 'react-toastify';

const CreateProject = ({setUp,up}) => {
    const [projectName, setProjectName] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      let email=localStorage.getItem("email")
      let obj={
        "projectId":projectName,
        "endDate":endDate,
        "desc":description
      }
      let response= await addProject(email,obj)
      if (response.status==201){
        toast.success("Project is Added Successfull",{
            autoClose:1200
        })
        setUp(!up)
      }else {
        toast.warning("Something Went Wrong Try again Later with another name",{
            autoClose:1200
        })
    }

      // Your logic to handle form submission goes here
      // For example, you can send the form data to the server
    };
  
    return (
        <>
      <div className="new-project-form">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="projectName">Project Name</label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      </>
    );
  
}

export default CreateProject