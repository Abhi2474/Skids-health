import React, { useState } from "react";
import users from "./data/users.json";
import { MyContext } from "./context/MyContext";
import { Form, UserDisplay, EditForm } from "./components";
import { BsGithub } from "react-icons/bs";

function App() {
  const [data, setData] = useState(users);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});

  return (
    <>
      <MyContext.Provider
        value={{ data, setData, editData, setEditData, isEdit, setIsEdit }}
      >
        <header>
          <h1 className="lg:text-4xl sm:text-2xl text-center my-4 font-bold text-cyan-700">
            Assignment by SKIDS Health 📃
          </h1>
        </header>
        <Form />
        <EditForm />
        <UserDisplay />
        <hr />
        <footer className="lg:text-2xl sm:text-xl flex items-center justify-center mt-10 pb-10 ">
          Created by <BsGithub className="mx-2" />{" "}
          <a
            href="https://github.com/Abhi2474"
            className="underline text-cyan-700 hover:text-cyan-500 font-serif"
            target="_blank"
          >
            Abhishek Gauttam
          </a>
        </footer>
      </MyContext.Provider>
    </>
  );
}

export default App;
