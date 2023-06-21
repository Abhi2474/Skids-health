import React, { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MyContext } from "../context/MyContext";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineUserAdd } from "react-icons/ai";

const Form = () => {
  const ref = useRef(null);
  const { data, setData } = useContext(MyContext);

  const [formData, setFormData] = useState({
    id: uuidv4(),
    username: "",
    email: "",
    phone: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.username || !formData.phone) {
      setErrMsg("* All Fields are mandatory");
    } else {
      setErrMsg("");
      setFormData({
        id: "",
        username: "",
        email: "",
        phone: "",
      });
      setData([...data, formData]);
    }
  };

  const handleDialogBox = () => {
    ref.current.showModal();
  };

  const dialogClose = () => {
    ref.current.close();
  };

  const handleChange = (e) => {
    setErrMsg("");
    setFormData({ ...formData, id: uuidv4(), [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        onClick={handleDialogBox}
        className="bg-gradient-to-r from-blue-300 to-blue-400 rounded py-2 flex items-center w-4/5 mx-auto justify-center mt-10 font-bold text-xl hover:text-gray-700 border border-white hover:border-b hover:border-b-black shadow-md"
      >
        <AiOutlineUserAdd className="mr-2" /> Create User
      </button>
      <dialog ref={ref} id="modal" className="p-0 w-full bg-transparent ">
        <form onSubmit={handleSubmit} className="w-2/5 mx-auto shadow-xl ">
          <fieldset className="flex flex-col items-center  bg-gradient-to-r from-[#2C3333] to-[#0E8388] rounded-md py-10 relative">
            <RxCross1
              onClick={dialogClose}
              className="absolute top-3 right-3 cursor-pointer text-xl hover:text-2xl"
            />
            <h1 className="text-[#05BFDB] font-bold mt-0 text-4xl pb-4 text-center">
              User Form
            </h1>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              minLength={3}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email Address"
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              placeholder="Phone Number"
              maxLength={10}
              minLength={10}
              onChange={handleChange}
            />
            <button
              className="py-2 px-4 font-bold text-sm bg-[#643843] text-white rounded-md w-1/2 my-2 hover:bg-[#99627A] hover:text-[#3b181f]"
              type="submit"
            >
              Submit
            </button>
            {errMsg ? (
              <div className="text-red-900 font-bold">{errMsg}</div>
            ) : (
              ""
            )}
          </fieldset>
        </form>
      </dialog>
    </>
  );
};

export default Form;
