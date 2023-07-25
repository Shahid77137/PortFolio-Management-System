import React from 'react'
import { showManagers } from '../../Utils/post';
import Manager from './Manager';
import { useState,useEffect } from 'react';


const ManagerDash = () => {
    let email = localStorage.getItem("email");
  const [data, setData] = useState([]);
  const [up,setUp]=useState(false)

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
  }, [up]);

  return (
    <>
      
      <div className="project-info-table">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>isActive</th>
              <th>About</th>
              <th>Start Date</th>
              <th>Email</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {data.map((elem,index)=>{
                
               return(<Manager
                index={index}
                firstName={elem.firstName}
                lastName={elem.lastName}
                role={elem.role}
                about={elem.about}
                startDate={elem.startDate}
                isActive={elem.isActive}
                email={elem.email}
                setUp={setUp}
                up={up}
              />)
            })}
          </tbody>
        </table>
      </div>
      {/* <CreateProject setUp={setUp} up={up}/> */}
    </>
  )
}

export default ManagerDash