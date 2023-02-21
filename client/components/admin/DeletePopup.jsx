import React from "react";

const DeletePopup = ({ handleDelete, hidePopup, text, disabled }) => {
  return (
    <div className=" flex items-center justify-center p-5 w-[100%] h-[100%] fixed top-0 left-0 bg-[#101001c9]">
      <div className="flex flex-col gap-5 justify-between items-center shadow-lg w-[300px] h-fit p-5 bg-white rounded-md">
        <h1 className="title">Are You Sure</h1>
        <div className="flex justify-between items-center w-full">
          <button
            className="px-4 py-2 rounded-md text-white bg-red-400 hover:bg-red-500"
            onClick={hidePopup}
          >
            Cancel
          </button>
          <button
            disabled={disabled}
            className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-800"
            onClick={handleDelete}
          >
            {text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
