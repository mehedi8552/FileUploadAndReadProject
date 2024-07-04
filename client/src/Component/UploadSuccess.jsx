import React, { useEffect } from "react";
import { useMemo } from "react";
import UploadStore from "../Store/UploadStore";
import { Link } from "react-router-dom";
const UploadSuccess = () => {
  useEffect(() => {
    ReadReqest();
  }, []);
  const { ReadReqest, ReadData } = UploadStore();

  const images = useMemo(() => {
    if (!ReadData) {
      return [];
    }
    return ReadData.map((data) => ({
      name: data.name,
      image: `data:image/png;base64,${data.image}`,
    }));
  }, [ReadData]);

  return (
    <div className="bg-blue-300">
      <h1 className="font-bold text-3xl text-center pt-10">
        File Uploaded Successfully
      </h1>
      <div class="grid grid-cols-4 gap-4 pt-20 px-64 rounded-md">
        {images.map((data) => (
          <div class="max-w-sm rounded-xl bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800">
            <a href="#">
              <img class="rounded-t-lg" src={data.image} alt="" />
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {data.name}
                </h5>
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center py-10">
        <Link
          class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          to={"/"}
        >
          Upload Again
        </Link>
      </div>
    </div>
  );
};

export default UploadSuccess;
