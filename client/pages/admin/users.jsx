import DeletePopup from "components/admin/DeletePopup";
import EditPopup from "components/admin/EditPopup";
import axios from "axios";
import Head from "next/head";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "@/components/admin/Sidebar";

const Users = ({ data }) => {
  const [users, setUsers] = useState(data);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({});
  // console.log(users);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    const { data } = await axios.patch(
      `http://localhost:5000/users/update/${formData._id}`,
      formData
    );

    setLoading(false);
    setUsers(data);
    setIsEditing(false);

    toast.success("User updated successfully");
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const { data } = await axios.delete(
      `http://localhost:5000/users/${currentId}`
    );

    setUsers(data.users);
    setLoading(false);
    setIsDeleting(false);

    toast.success("User deleted successfully");
  };

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <div className="flex items-start">
        <Sidebar activeStep={2} />
        {isEditing && (
          <EditPopup
            formData={formData}
            setFormDate={setFormData}
            handleSubmit={handleSubmit}
            setIsEditing={setIsEditing}
          />
        )}

        {isDeleting && (
          <DeletePopup
            hidePopup={() => setIsDeleting(false)}
            handleDelete={handleDelete}
          />
        )}

        <div className="p-4 m-auto mt-0 overflow-x-auto md:col-span-3">
          <h1 className="title">Users</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">ID</th>
                  <th className="p-5 text-left">NAME</th>
                  <th className="p-5 text-left">EMAIL</th>
                  <th className="p-5 text-left">ADMIN</th>
                  <th className="p-5 text-left">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className=" p-5 ">{user._id.substring(20, 24)}</td>
                    <td className=" p-5 ">{user.name}</td>
                    <td className=" p-5 ">{user.email}</td>
                    <td className=" p-5 ">{user.isAdmin ? "YES" : "NO"}</td>
                    <td className=" p-5 ">
                      <div className="flex gap-2">
                        <button
                          className="default-button"
                          onClick={() => {
                            setIsEditing(true);
                            setFormData({
                              _id: user._id,
                              name: user.name,
                              email: user.email,
                              isAdmin: user.isAdmin,
                            });
                          }}
                        >
                          Edit
                        </button>
                        &nbsp;
                        <button
                          type="button"
                          className="px-4 rounded-md text-white bg-red-500 hover:bg-red-600"
                          onClick={() => {
                            setIsDeleting(true);
                            setCurrentId(user._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get("http://localhost:5000/users");

  return {
    props: {
      data: data,
    },
  };
};

Users.auth = true;
export default Users;
