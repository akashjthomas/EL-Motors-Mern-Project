import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "./categoryform";
import { Modal } from "antd";


const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("false");

  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/addcatergory", {
        name,
      });
      if (data) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
    }
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    console.log("Selected Category:", selected);
    try {
        const { data } = await axios.put(`http://localhost:5000/api/updatecat/${selected._id}`, { name: updatedName });

     
        console.log(data);
      if (data) {
      
        toast.success(`${updatedName} is updated`);
        setVisible(false);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating category");
    }
  };
  
  //get all cat
  const getAllCategory = async () => {
    
    try {
      const { data } = await axios.get("http://localhost:5000/api/get-category");
      console.log("Response data:", data); // Log the response data
      if (data) {
        setCategories(data);
        console.log("Categories after setting in state:", data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  
  useEffect(() => {
    getAllCategory();
  }, []);

  

  return (
    <div>
      <div>
        <div className="row">
          <div className="col-md-9">
            <h1>Manage Category</h1>
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
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                      <button
                            className="btn btn-primary ms-2"
                            onClick={(e) => {
                            e.preventDefault();
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                              console.log("Edit button clicked");
                              console.log("Selected Category:", c)
                              
                            }}
                          >
                            Edit
                          </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal   onCancel={() => setVisible(false)}
              footer={null}
              open={visible}>
             <CategoryForm value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={updateCategory}/>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
