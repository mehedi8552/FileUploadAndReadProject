import React from "react";
import UploadStore from "../Store/UploadStore";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
const Home = () => {
  const navigate = useNavigate();
  const { FromData, FromDataReq, UploadReqest } = UploadStore();

  const SubmitFrom = async (e) => {
    e.preventDefault();
    try {
      const res = await UploadReqest(FromData);
      if (res) {
        toast("File uploaded successfully");
      }
      res ? navigate("/imageUpload") : toast.error("Something went wrong");
    } catch (err) {
        toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex justify-center pt-24">
      <div className="container h-5/6 w-5/6 p-16 m-10 rounded-md  bg-blue-400">
        <form className="container mt-4" onSubmit={SubmitFrom}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              placeholder="Enter name"
              value={FromData.name}
              onChange={(e) => FromDataReq("name", e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-white font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              name="image"
              placeholder="Choose file"
              onChange={(e) => FromDataReq("image", e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default Home;
