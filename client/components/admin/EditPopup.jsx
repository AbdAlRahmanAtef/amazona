import React from "react";

const EditPopup = ({ formData, setFormDate, handleSubmit, setIsEditing }) => {
  return (
    <div className=" flex items-center justify-center p-5 w-[100%] h-[100%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#101001c9]">
      <form
        className="w-[50%] p-5 h-fit bg-white shadow-lg rounded"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={formData?.name}
            onChange={(e) => setFormDate({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            value={formData?.email}
            onChange={(e) =>
              setFormDate({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="admin">Admin</label>
          <select
            value={formData?.isAdmin}
            onChange={(e) =>
              setFormDate({ ...formData, isAdmin: Boolean(e.target.value) })
            }
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="px-4 rounded-md text-white bg-red-500 hover:bg-red-600"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
          <button className="primary-button" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPopup;
