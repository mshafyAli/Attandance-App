import React from "react";
import { FaUserGraduate, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

const Students = () => {
  return (
    <div className="flex ">
      {/* left side */}
      <div className="w-[459px] h-[100vh] bg-white">
        <h1 className="text-3xl font-bold text-center my-12">Logo</h1>
        <div className="flex my-6">
          <FaUserGraduate className="text-5xl text-center w-[25px] h-[30pxpx] mx-4 " />
          <Link to="">
            <h1 className="text-2xl font-semibold text-center ">Students</h1>
          </Link>
        </div>
        <div className="flex ">
          <FaClipboardList className="text-5xl text-center w-[25px] h-[30px] mx-4" />
          <Link to="">
            <h1 className="text-2xl font-semibold text-center ">Attandance</h1>
          </Link>
        </div>
        <Link to="/signout">
          <h1 className="text-2xl font-semibold mx-[20%] mt-[350px]">Logout</h1>
        </Link>
      </div>

      {/* right Side */}

      <div className="bg-slate-300 w-[100%] h-[100vh]">
        <div className="flex justify-between items-center my-12 mx-12">
          <div className="flex ">
            <FaUserGraduate className="text-5xl text-center w-[25px] h-[30pxpx] mx-4 " />
            <Link to="">
              <h1 className="text-3xl font-bold text-center ">Students</h1>
            </Link>
          </div>
          <div>
            <Link to={'/addstudents'}>
              <button className="bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-80">
                Add Students
              </button>
            </Link>
          </div>
        </div>
        {/* students Information */}
        <div className="mx-12">
          <div className="w-[1142px] h-[76px] rounded-lg bg-slate-700 flex items-center justify-evenly text-white">
            <div className="">id</div>
            <div>profile img</div>
            <div>Name</div>
            <div>Course Name</div>
            <div>Password</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
