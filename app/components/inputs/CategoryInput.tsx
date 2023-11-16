'use client'

import { IconType } from "react-icons";

interface CategoryInputsProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}


const CategoryInput = ({
  icon: Icon,
  label,
  onClick,
  selected
}:CategoryInputsProps) => {
  return (  
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl
        border-2
        p-2
        flex
        flex-col
        gap-2
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
    > 
      <Icon size={30} />
        <div className="font-semibold">
          {label}
        </div>
      </div>
  );
}
 
export default CategoryInput;