import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/NoteCard/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";

import { useState } from "react";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const handleClose = () => {
    setOpenAddEditModal({
      isShown: false,
      type: "add",
      data: null,
    });
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-8">
          <NoteCard
            title="Devansh Kumar is here"
            date="3rd August 2024"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            tags="#Meeting"
            isPinned={false}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
          <NoteCard
            title="Devansh Kumar is here"
            date="3rd August 2024"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            tags="#Meeting"
            isPinned={false}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
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
          handleClose={handleClose}/>
      </Modal>
    </>
  );
};

export default Home;
