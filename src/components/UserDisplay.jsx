import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MyContext } from "../context/MyContext";
import Template from "./Template";

const UserDisplay = () => {
  const { data } = useContext(MyContext);

  return (
    <>
      <div className="pb-20 grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 w-4/5 mx-auto my-5">
        {data?.length ? (
          data.map((user) => {
            return <Template key={user.id} user={user} />;
          })
        ) : (
          <h1 className="font-serif text-4xl  my-4">Create User First</h1>
        )}
      </div>
    </>
  );
};

export default UserDisplay;
