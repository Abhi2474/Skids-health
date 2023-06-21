import React, { useContext, useEffect, useRef, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { MyContext } from "../context/MyContext";

const Template = ({ user }) => {
  const ref = useRef(null);
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const { data, setData, isEdit, setIsEdit, editData, setEditData } =
    useContext(MyContext);

  useEffect(() => {
    const handler = (e) => {
      if (!ref?.current.contains(e.target)) {
        setIsBoxOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleDelete = (id) => {
    setData(
      data.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const handleEdit = (dt) => {
    setIsEdit(true);
    setEditData(dt);
  };

  const handleBox = () => {
    setIsBoxOpen(true);
  };

  return (
    <>
      <div
        key={user.id}
        className="flex items-center justify-center my-4 h-40 relative mx-auto shadow-lg"
      >
        <ul className="flex flex-col items-start justify-between bg-gradient-to-tr from-blue-200 to-blue-500 py-6 px-10 my-2 w-80 h-40 rounded ">
          <HiOutlineDotsHorizontal
            onClick={() => handleBox()}
            className="absolute right-4 top-4 cursor-pointer text-xl"
          />
          <li>
            Username: <b>{user.username}</b>
          </li>
          <li>
            Email: <b>{user.email}</b>
          </li>
          <li>
            Phone: <b>{user.phone}</b>
          </li>
        </ul>
        <div
          ref={ref}
          className={`absolute  bg-white ${
            !isBoxOpen ? "hidden" : ""
          } rounded h-1/2 w-1/4 right-4 top-9 flex items-center justify-center flex-col p-0`}
        >
          <button
            className="flex items-center mb-2 cursor-pointer"
            onClick={() => {
              handleDelete(user.id);
            }}
          >
            <RiDeleteBin6Line className="mx-1" />
            Delete
          </button>
          <button
            onClick={() => handleEdit(user)}
            className="flex items-center"
          >
            <AiFillEdit className="mx-1" />
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default Template;
