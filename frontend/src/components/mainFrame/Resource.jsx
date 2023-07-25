import React from "react";
import { useState } from "react";
import EditResource from "./EditResource";
import ConfirmationBox3 from "./ConfirmationBox3";

const Resource = ({
  title,
  type,
  link,
  isLocked,
  password,
  up,
  setUp,
  rid,
}) => {
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const HandleEditResouce = () => {
    setFlag(true);
  };
  const HandleDeleteResource = () => {
    setFlag2(true);
  };
  return (
    <>
      <tr>
        <td>{title}</td>
        <td>{type}</td>
        <a href={link}><td>link</td></a>
        <td>{isLocked ? "Locked" : "Unlocked"}</td>

        <td>{isLocked ? password : "Unlocked"}</td>

        <td>
          <span className="operation-icon" onClick={HandleEditResouce}>
            Edit
          </span>
          <span className="operation-icon" onClick={HandleDeleteResource}>
            Delete
          </span>
        </td>
      </tr>
      {/* {etitle,etype,elink,eisLocked,epassword,erid,setUp,up} */}
      {flag && <EditResource 
        etitle={title} etype={type} elink={link} epassword={password} erid={rid} setUp={setUp} up={up} setFlag={setFlag}
      />}
      {flag2 && <ConfirmationBox3 setFlag2={setFlag2} setUp={setUp} up={up} rid={rid} />}

    </>
  );
};

export default Resource;
