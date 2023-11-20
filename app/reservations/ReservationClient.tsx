"use client";

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, safeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface ReservationClientProps {
  reservations: SafeReservation[];
  currentUser: safeUser | null;
 }

const ReservationClient = ({
  reservations,
  currentUser
}: ReservationClientProps) => {

  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const onCancel = useCallback((id: string ) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success("Reservation cancelled successfully.");
      router.refresh();
    })
    .catch(() => {
      toast.error("Something went wrong.");
    })
    .finally(() => {
      setDeletingId(null);  
    });

  },[router]);

  return ( 
    <Container>
      <Heading
        title="Your reservations"
        subTitle="View your reservations here."
      />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest Reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default ReservationClient;
