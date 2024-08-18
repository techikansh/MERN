import React, { useState } from "react";
import Modal from "react-modal";
import { MdDelete, MdCancel } from "react-icons/md";

const AddEditNotes = ({ type, data, handleClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const editNote = async () => {};
  const addNewNote = async () => {};

  const handleNotes = () => {
    
    if (title == "") {
      setError("Title can't be empty*");
      return;
    }
    if (content == "") {
      setError("Content can't be empty*");
      return;
    }
    setError("");

    if (type === "edit") editNote();
    if (type === "add") addNewNote();
  };

  return (
    <div className="relative">
      <button
        className="w-8 h-8 absolute -top-5 -right-5 hover:text-primary text-slate-500"
        onClick={handleClose}
      >
        <MdCancel className="w-[90%] h-[90%]" />
      </button>

      <div className="flex flex-col gap-2">
        <label htmlFor="">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 bg-slate-50 outline-none p-1 px-2"
          placeholder="Go to the Gym..."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="">Content</label>
        <textarea
          name=""
          id=""
          rows="10"
          placeholder="Content goes here..."
          className="text-sm text-slate-950 bg-slate-50 p-2 outline-none"
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        />
      </div>

      {/* To Do: Add Tags Func Later... */}
      {/* <div className="mt-3">
            <label htmlFor="">Tags</label>
        </div> */}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        className="w-full text-white bg-primary hover:bg-blue-700 p-3 rounded-lg mt-3"
        onClick={handleNotes}
      >
        Add
      </button>
    </div>
  );
};

export default AddEditNotes;
