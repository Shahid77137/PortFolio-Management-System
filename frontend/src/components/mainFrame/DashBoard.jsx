import React, { useState,useEffect } from "react";
import { showProjects } from "../../Utils/post";
import Project from "./Project";
import { toast } from "react-toastify";
import CreateProject from "./CreateProject";

const DashBoard = () => {
  let email = localStorage.getItem("email");
  const [data, setData] = useState([]);
  const [up,setUp]=useState(false)

  const fetchProjects = async () => {
    return await showProjects(email);
  };

  useEffect(() => {
    fetchProjects().then((db) => {
      setData(db.data);
      console.log(data); // xx

      // Put the code that uses the data here
      // For example:
      // displayData(data);
    });
  }, [up]);
  
  //   if (data.length != 0) {
  //     toast.warn("Projects Not Found", { autoClose: 1200 });
  //   } else {
  //     toast.success("Work Hard");
  //   }

  return (
    <>
      
      <div className="project-info-table">
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Project Status</th>
              <th>Project Start Date</th>
              <th>Project End Date</th>
              <th>Assigned To</th>
              <th>Description</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {data.map((elem,index)=>{
               return(<Project
                index={index}
                name={elem.projectId}
                status={elem.status}
                stDate={elem.startDate}
                edDate={elem.endDate}
                disc={elem.desc}
                AssignedTo={elem.manager}
                setUp={setUp}
                up={up}
              />)
            })}
          </tbody>
        </table>
      </div>
      <CreateProject setUp={setUp} up={up}/>
    </>
  );
};

export default DashBoard;
