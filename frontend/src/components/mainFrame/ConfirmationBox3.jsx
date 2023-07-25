import React from 'react'
import { deleteResource } from '../../Utils/post'

import { toast } from 'react-toastify';

const ConfirmationBox3 = ({setFlag2,setUp,up,rid}) => {
  let email=localStorage.getItem("email")
    const onConfirm = async (e) => {
        let response = await deleteResource(email,rid);
        if (response.status == 200) {
          toast.success("Manager is Deleted Successfull", {
            autoClose: 1200,
          });
          setFlag2(false);
          setUp(!up);
        } else {
          toast.warning("You are not Authorize for it", {
            autoClose: 1200,
          });
          setFlag2(false);
        }
      };
      const onCancel = () => {
        setFlag2(false);
      };
      let message = "Are you Sure to Delete this Resource ? ";
      return (
        <>
          <div className="confirmation-popup-container">
            <div className="confirmation-popup">
              <p>{message}</p>
              <div className="confirmation-buttons">
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
              </div>
            </div>
          </div>
        </>
      );
}

export default ConfirmationBox3