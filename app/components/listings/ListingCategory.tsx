'use client';

import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

const ListingCategory = ({
  icon: Icon,
  label,
  description
}: ListingCategoryProps) => {
  return ( 
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">
            {label}
          </h3>
          <p className="text-neutral-500 font-light">
            {description}
          </p>
        </div>
      </div>
    </div>
   );
}
 
export default ListingCategory;