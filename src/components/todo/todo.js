import React, { useEffect, useState } from "react";
import "./todo.css";
// import { GiNotebook } from "react-icons/gi";
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
  const [editindex, setEditindex] = useState(null);
  const [invalue, setInvalue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filtervalue, setFilteredvalue] = useState("");

  useEffect(() => {
    localStorage.setItem("Data", JSON.stringify(currelm));
    console.log("hello");
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
    const updatedFields = [...currelm];
    updatedFields.splice(index, 1);
    setCurrelm(updatedFields);
  };

  const Edititem = (index) => {
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
  return (
    <div className="main">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "600px",
        }}
      >
        <div className="input-container">
          {/* <GiNotebook style={{ fontSize: "20px", marginRight: "10px" }} /> */}
          <input
            type="text"
            value={invalue}
            style={{
              border: "none",
              width: "100%",
              height: "40px",
              fontSize: "16px",
            }}
            onChange={(e) => {
              setInvalue(e.target.value);
            }}
          ></input>

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
        </div>
        <div className="input-container">
          <IoSearch style={{ fontSize: "20px", marginRight: "10px" }} />
          <input
            type="text"
            value={filtervalue}
            style={{
              border: "none",
              width: "100%",
              height: "40px",
              fontSize: "16px",
            }}
            onChange={filterdata}
          ></input>
        </div>
        <div className="btn-removeall">
          <button
            className="rm-btn"
            onClick={() => {
              setCurrelm([]);
            }}
          >
            Clear All
          </button>
        </div>

        {filteredData.length > 0
          ? filteredData.map((item, index) => (
              <div
                key={index}
                style={{
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <div className="eachItem">
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
              </div>
            ))
          : currelm.map((item, index) => (
              <div
                key={index}
                style={{
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <div className="eachItem">
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
              </div>
            ))}
      </div>
    </div>
  );
};

export default Todo;
