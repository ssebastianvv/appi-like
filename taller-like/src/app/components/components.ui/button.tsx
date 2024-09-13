import React from "react";
import { IbuttonProps } from "../../ui/Ibutton";

const Button: React.FC<IbuttonProps> = ({ onClick, label, className }) => {
  return (
    <button type="submit" onClick={onClick} className={className}>
      {label}
    </button>
  );
};

export default Button;