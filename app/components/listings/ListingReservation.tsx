'use client';

import { Range } from 'react-date-range';
import Calender from '../inputs/Calender';
import Button from '../Button';

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabledDates?: Date[];
  disabled?: boolean;
}

const ListingReservation = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabledDates,
  disabled 
}: ListingReservationProps) => {
  return ( 
    <div 
      className="
        bg-white
        rounded-xl
        border-[1px]
        border-neutral-200
        overflow-hidden
      "
    >
      <div className="flex flex-row items-center gap-1 p-4">
        <p className="text-2xl font-semibold">$ {price}</p>
        <span className='font-light text-neutral-600'>night</span>
      </div>
      <hr />

      <Calender
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button
          disabled={disabled}
          label='Reserve'
          onClick={onSubmit}
        />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <p className="">Total</p>
        <strong>$ {totalPrice}</strong>
      </div>
    </div>
  );
}
 
export default ListingReservation;
