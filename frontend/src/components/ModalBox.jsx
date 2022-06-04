import { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { updateGoal } from "../features/goals/goal-slice";
import { modalActions } from "../features/modal/modal-slice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
  },
};

const ModalBox = () => {
  const dispatch = useDispatch();
  let subtitle;

  const { open, goalDatail } = useSelector((state) => state.modal);
  const [text, setText] = useState(null);

  const afterOpenModal = () => {
    subtitle.style.color = "#f00";
    subtitle.style.textAlign = "center";
  };

  const closeModal = () => {
    dispatch(modalActions.closeModal());
  };
  const save = () => {
    dispatch(updateGoal({ text: text, id: goalDatail._id }));
    closeModal();
    setText(null);
  };
  return (
    <div>
      <Modal
        isOpen={open}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit Goal</h2>
        <input
          className="input_modal"
          type="text"
          value={text === null ? goalDatail?.text : text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="btn_save" onClick={save}>
          Save
        </button>
        <button className="btn_close" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ModalBox;
