import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const getDataFromLocalStorage = () => {
    const savedData = localStorage.getItem("add");
    return savedData ? JSON.parse(savedData) : [];
  };
  // State
  const [data, setData] = useState(getDataFromLocalStorage);

  const [editIndex, setEditIndex] = useState();
  const [isEditData, setIsEditData] = useState(false);
  const inputObjData = useRef();

  useEffect(() => {
    localStorage.setItem("add", JSON.stringify(data));
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let inputData = inputObjData.current.value;
    inputObjData.current.value = "";

    if (isEditData) {
      const updatedData = [...data];
      updatedData[editIndex] = inputData;
      setData(updatedData);
      setIsEditData(false);
    } else {
      setData([...data, inputData]);
    }
  };

  const handleEdit = (index) => {
    const editData = data[index];
    inputObjData.current.value = editData;
    setIsEditData(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const deleteData = data.filter((_, id) => id !== index);
    setData(deleteData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-xl font-bold mb-4 text-center">Input Form</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Text"
            autoFocus
            required
            ref={inputObjData}
            className="border border-gray-300 p-2 rounded w-full mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
          >
            {isEditData ? "Edit" : "Submit"}
          </button>
        </form>
        <div className="mt-4">
          {data.map((e, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <div>
                <p>{e}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-500 hover:underline border-[2px] px-4 py-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:underline border-[2px] px-4 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
