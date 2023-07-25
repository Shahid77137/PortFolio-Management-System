import React from "react";
import { useState,useEffect } from "react";
import ConfirmationBox2 from "./ConfirmationBox2";
import ManagerEditForm from "./ManagerEditForm";

const Manager = ({
  firstName,
  lastName,
  role,
  isActive,
  about,
  startDate,
  email,
  up,
  setUp
}) => {
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const HandleEditManager = () => {setFlag(true)};
  const HandleDeleteManager = () => {setFlag2(true)};
  return (
    <>
      <tr>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{role}</td>
        <td>{isActive ? "Active" : "Inactive"}</td>

        <td>{about}</td>
        <td>{startDate}</td>
        <td>{email}</td>
        <td>
          <span className="operation-icon" onClick={HandleEditManager}>
            Edit
          </span>
          <span className="operation-icon" onClick={HandleDeleteManager}>
            Delete
          </span>
        </td>
      </tr>
      {flag && <ManagerEditForm
        MfirstName={firstName}
        MlastName={lastName}
        Mrole={role}
        MisActive={isActive}
        Mabout={about}
        MstartDate={startDate}
        Memail={email}
        setUp={setUp}
        up={up}
        setFlag={setFlag}
      />}
      {flag2 && <ConfirmationBox2 email={email} setUp={setUp} up={up} setFlag2={setFlag2} /> }
    </>
  );
};

export default Manager;
