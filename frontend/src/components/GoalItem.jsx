import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goal-slice";
import { FaEdit } from "react-icons/fa";
import { modalActions, openModal } from "../features/modal/modal-slice";

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(modalActions.setContent(goal));
    dispatch(openModal());
  };

  return (
    <>
      <div className="goal">
        <div className="">
          {new Date(goal.createdAt).toLocaleString("en-US")}
        </div>
        <h2>{goal.text}</h2>
        <button
          onClick={() => dispatch(deleteGoal(goal._id))}
          className="close"
        >
          X
        </button>
        <button onClick={() => handleEdit()} className="edit">
          <FaEdit />
        </button>
      </div>
    </>
  );
};

export default GoalItem;
