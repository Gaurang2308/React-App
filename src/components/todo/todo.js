import React, { useEffect, useState } from "react";
import "./todo.css";
import { GiNotebook } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";

// import Edit from ".."

const Todo = () => {
  const getlocacstorageItem = () => {
    let list = localStorage.getItem("Data");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };
  const [currelm, setCurrelm] = useState(getlocacstorageItem());
  const [editindex, setEditindex] = useState();
  const [invalue, setInvalue] = useState();
  console.log(invalue);
  const [filteredData, setFilteredData] = useState([]);
  const [filtervalue, setFilteredvalue] = useState("");
  console.log(currelm);
  useEffect(() => {
    localStorage.setItem("Data", JSON.stringify(currelm));
  }, [currelm]);
  const submitHandler = (e) => {
    if (!invalue.trim()) {
      alert("plz fill the data");
    } else if (editindex !== undefined && invalue !== null) {
      let dummy = currelm;
      dummy[editindex] = invalue;
      setCurrelm(dummy);
      setEditindex(undefined);
      setInvalue("");
      setFilteredvalue("");
      setFilteredData([]);
    } else {
      setCurrelm([...currelm, invalue]);
      setInvalue("");
      setEditindex(undefined);
      setFilteredvalue("");
      setFilteredData([]);
    }
  };

  const deleteitem = (index) => {
    debugger;
    const updatedFields = [...currelm];
    updatedFields.splice(index, 1);
    setCurrelm(updatedFields);
    setFilteredData(filteredData.filter((item, idx) => idx !== index));
  };

  const Edititem = (index) => {
    debugger;
    setEditindex(index);
    setInvalue(currelm[index]);
  };

  const filterdata = (e) => {
    const inputValue = e.target.value;
    setFilteredvalue(inputValue);

    const filtered = currelm.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const removeAllItems = () => {
    setCurrelm([]);
    setFilteredData([]); // Reset filteredData as well
  };
  return (
    <>
      <div className="container">
        <div className="d-flex flex-row justify-content-center gap-2  mt-5 mx-auto">
          <div className="input-group h-25 w-auto">
            <span className="input-group-text">
              <GiNotebook />
            </span>

            <input
              type="text"
              className="form-control"
              value={invalue}
              aria-label="Amount (to the nearest dollar)"
              onChange={(e) => {
                setInvalue(e.target.value);
              }}
            />

            <span className="input-group-text">
              {editindex ? (
                <i
                  className="fa fa-solid fa-edit"
                  style={{ fontSize: "20px" }}
                  onClick={() => submitHandler()}
                ></i>
              ) : (
                <i
                  className="fa fa-solid fa-plus add-btn"
                  onClick={() => submitHandler()}
                ></i>
              )}
            </span>
          </div>
          <div className=" w-auto">
            <button
              type="button"
              className="btn btn-danger"
              onClick={removeAllItems}
            >
              Remove All
            </button>
          </div>

          <div className="input-group h-25 w-auto">
            <span className="input-group-text">
              <IoSearch />
            </span>

            <input
              type="text"
              className="form-control"
              value={filtervalue}
              onChange={filterdata}
            />
          </div>
        </div>
      </div>
      <div className="container ">
        <div className=" mt-5 d-flex flex-row flex-wrap">
          {filteredData.length > 0
            ? filteredData.map((item, index) => (
                <div className=" eachItem mx-1 my-1" key={index}>
                  <p>{item}</p>
                  <div className="todo-btn ">
                    <i
                      className="fa fa-solid fa-edit"
                      onClick={() => Edititem(index)}
                    ></i>
                    <i
                      className="fa fa-solid fa-trash"
                      onClick={() => deleteitem(index)}
                    ></i>
                  </div>
                </div>
              ))
            : currelm.map((item, index) => (
                <div className=" eachItem mx-1 my-1" key={index}>
                  <p>{item}</p>
                  <div className="todo-btn">
                    <i
                      className="fa fa-solid fa-edit"
                      onClick={() => Edititem(index)}
                    ></i>
                    <i
                      className="fa fa-solid fa-trash"
                      onClick={() => deleteitem(index)}
                    ></i>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Todo;
