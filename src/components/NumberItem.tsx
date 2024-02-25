import React from "react";
import { DeleteIcon } from "../assets";

interface NumberItemProps {
  number: number;
  onDeleteClick: () => void;
}

const NumberItem: React.FC<NumberItemProps> = ({ number, onDeleteClick }) => {
  return (
    <div className="box app-number-box">
      <p className="mr-10">{number}</p>
      <button onClick={onDeleteClick} className="btn-delete">
        <img src={DeleteIcon} alt="Delete Number" />
      </button>
    </div>
  );
};

export default NumberItem;
