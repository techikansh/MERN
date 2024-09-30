import React, { useState } from "react";
import Modal from "react-modal";
import { MdDelete, MdCancel } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddEditNotes = ({ type, noteData, handleClose, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [error, setError] = useState("");

  const editNote = async () => {
    try {
        const response = await axiosInstance.put(`/notes/edit-note/${noteData._id}`, {
          title, content
        })

        if (response.data && response.data.note) {
          getAllNotes();
          handleClose();
          toast.success(response.data.message || "Note edited successfully");
        }
        else {
          setError(response.data.message);
        }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post ("/notes/add-note", {
        title, content
      });
      if (response.data && response.data.newNote) {
        getAllNotes();
        handleClose();
        toast.success(response.data.message || "Note added successfully");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleNotes = () => {
    if (title == "") {
      setError("Title can't be empty!");
      return;
    }
    if (content == "") {
      setError("Content can't be empty!");
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
