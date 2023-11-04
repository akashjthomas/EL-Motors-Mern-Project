import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "./categoryform";
import { Modal } from "antd";


const CreateColor = () => {
  const [colors, setColors] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
 

  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/addcolor", {
        name,
      });
      if (data) {
        toast.success(`${name} is created`);
        getAllColor();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
    }
  };

 
  
  //get all cat
  const getAllColor = async () => {
    
    try {
      const { data } = await axios.get("http://localhost:5000/api/getcolor");
      console.log("Response data:", data); // Log the response data
      if (data) {
        setColors(data);
        console.log("colors after setting in state:", data?.colors);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  
  useEffect(() => {
    getAllColor();
  }, []);

  

  return (
    <div>
      <div>
        <div className="row">
          <div className="col-md-9">
            <h1>Manage Color</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {colors.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal   onCancel={() => setVisible(false)}
              footer={null}
              open={visible}>
             <CategoryForm 
                />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateColor;
