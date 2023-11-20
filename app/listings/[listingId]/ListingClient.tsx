'use client';

import axios from "axios";
import toast from "react-hot-toast";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Reservation } from "@prisma/client";
import { Range } from "react-date-range";

import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";

import { SafeListing, safeUser } from "@/app/types";

import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import ListingReservation from "@/app/components/listings/ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}

interface ListingClientProps {
  reservations?: Reservation[];
  listing: SafeListing & {
    user: safeUser
  };
  currentUser?: safeUser | null;
}

const ListingClient = ({
  listing,
  reservations = [],
  currentUser
}: ListingClientProps) => {

  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  },[reservations]);

  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  },[listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if(!currentUser) {
      loginModal.onOpen();
      return;
    }

    setIsLoading(true);

    axios.post('/api/reservations', { 
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing.id
    })
    .then(() => {
      toast.success('Reservation created successfully');
      setDateRange(initialDateRange);
      //Redirect to trips
      router.refresh();
    })
    .catch((error) => { 
      toast.error(error.message);
    });
    setIsLoading(false);
  },[
    totalPrice,
    dateRange,
    listing.id,
    currentUser,
    router,
    loginModal
  ]);

  useEffect(() => {
    if(dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

      if(dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  
  }, [dateRange, listing.price]);
  

  return ( 
    <Container>
      <div 
        className="
          max-w-screen-lg
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.loactionValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo 
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.loactionValue}
            />

            <div 
              className="
                order-first
                mb-10
                md:order-last
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabledDates={disabledDates}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
   );
}
 
export default ListingClient;
