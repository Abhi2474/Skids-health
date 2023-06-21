import React, { useContext, useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { MyContext } from "../context/MyContext";

const EditForm = () => {
  const ref = useRef(null);
  const { data, setData, isEdit, setIsEdit, editData } = useContext(MyContext);

  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    phone: "",
  });

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setFormData(editData);
  }, [editData]);

  useEffect(() => {
    const handler = (e) => {
      if (!ref?.current.contains(e.target)) {
        setIsEdit(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.username || !formData.phone) {
      setErrMsg("* All Fields are mandatory");
    } else {
      setErrMsg("");
      setIsEdit(false);
      let findUserIndex = data.findIndex((item) => item.id === editData.id);
      let newDat = [...data];
      newDat.splice(findUserIndex, 1, formData);
      setData(newDat);
    }
  };

  const handleChange = (e) => {
    setErrMsg("");

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        ref={ref}
        className={`p-0 w-full h-full bg-transparent ${
          isEdit ? "" : "hidden"
        } absolute z-40`}
      >
        <form onSubmit={handleSubmit} className="w-2/5 mx-auto shadow-xl ">
          <fieldset className="flex flex-col items-center  bg-gradient-to-r from-[#2C3333] to-[#0E8388] rounded-md py-10 relative">
            <RxCross1
              onClick={() => setIsEdit(false)}
              className="absolute top-3 right-3 cursor-pointer text-xl hover:text-2xl"
            />
            <h1 className="text-[#05BFDB] font-bold mt-0 text-4xl pb-4 text-center">
              User {editData.username}
            </h1>
            <input
              type="text"
              name="username"
              placeholder="User Name"
              value={formData.username}
              onChange={handleChange}
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
      </div>
    </>
  );
};

export default EditForm;
