import { create } from "zustand";
import axios from "axios";

const UploadStore = create((set) => ({
  FromData: { name: "", image: "" },
  FromDataReq: (name, value) => {
    set((state) => ({
      FromData: {
        ...state.FromData,
        [name]: value,
      },
    }));
  },

  UploadReqest: async (formData) => {
    let res = await axios.post("http://localhost:3000/imageUpload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data["status"] === "success";
  },
  ReadData: null,
  ReadReqest: async () => {

      let res = await axios.get("http://localhost:3000/ReadUserData", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(res['data']);
      if(res){
        set({ReadData:res['data']})
      }
  },
}));

export default UploadStore;
