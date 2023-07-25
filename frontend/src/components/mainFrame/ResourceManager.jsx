import React, { useState,useEffect } from 'react'
import CreateResource from './CreateResource'
import { showResources } from '../../Utils/post';
import Resource from './Resource';


const ResourceManager = () => {
  let email = localStorage.getItem("email");
  const [data, setData] = useState([]);
  const [up,setUp]=useState(false)

  const fetchProjects = async () => {
    return await showResources(email);
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
  return(
  <>
      
      <div className="project-info-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Resource Type</th>
              <th>Link</th>
              <th>isLocked</th>
              <th>Password</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {data.map((elem,index)=>{
               return(<Resource
                index={index}
                title={elem.title}
                type={elem.type}
                link={elem.link}
                isLocked={elem.isLocked}
                password={elem.password}
                rid={elem.rid}
                setUp={setUp}
                up={up}
              />)
            })}
          </tbody>
        </table>
      </div>
      <CreateResource setUp={setUp} up={up}/>
    </>
    )
}

export default ResourceManager