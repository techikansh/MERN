import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/NoteCard/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import moment from "moment";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const navigate = useNavigate();
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  function editNote(noteDetails) {
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: noteDetails,
    });
  }

  const handleClose = () => {
    setOpenAddEditModal({
      isShown: false,
      type: "add",
      data: null,
    });
    getAllNotes();
  };

  async function getUserInfo() {
    try {
      const response = await axiosInstance.get("/auth/get-user");

      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status == 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        console.log("Something went wrong!!");
      }
    }
  }

  async function getAllNotes() {
    try {
      const response = await axiosInstance.get("/notes/get-all-notes");
      console.log(response.data);
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Something went wrong!!");
    }
  }

  async function deleteNote(noteId) {
    try {
      const response = await axiosInstance.delete(
        `/notes/delete-note/${noteId}`
      );
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        getAllNotes();
        toast.success(response.data.message || "Note deleted successfully");
      }
    } catch (error) {
      console.log("Something went wrong!!");
    }
  }

  async function pinSlashUnpinNote(noteId) {
    try {
      const response = await axiosInstance.put(`/notes/pin-note/${noteId}`);
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        getAllNotes();
        toast.success(
          response.data.message || "Note pinned/unpinned successfully"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        setAllNotes={setAllNotes}
        getAllNotes={getAllNotes}
      />

      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-8">
          {allNotes &&
            allNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={moment(note.createdOn).format("Do MMMM YYYY")}
                content={note.content}
                isPinned={note.isPinned}
                onEdit={() => {
                  editNote(note);
                }}
                onDelete={() => {
                  deleteNote(note._id);
                }}
                onPinNote={() => {
                  pinSlashUnpinNote(note._id);
                }}
              />
            ))}
        </div>
      </div>

      <button
        className="flex items-center justify-center bg-primary hover:bg-blue-700 w-14 h-14 absolute bottom-10 right-10 rounded-full"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: "null" });
        }}
      >
        <MdAdd className="text-white w-[90%] h-[90%]" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        contentLabel=""
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
        }}
        className="bg-white w-[40%] max-h-3/4 rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          handleClose={handleClose}
          getAllNotes={getAllNotes}
        />
      </Modal>

      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Home;
