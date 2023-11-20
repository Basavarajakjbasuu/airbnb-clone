import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import ReservationClient from "./ReservationClient";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";


const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser) {
    <ClientOnly>
      <EmptyState
        title="Unauthorized"
        subtitle="You must be signed in to view this page."
      />
    </ClientOnly>
  }
 
  const reservations = await getReservations({
    authorId: currentUser?.id
  });

  if(reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations"
          subtitle="You haven't made any reservations yet."
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default  ReservationsPage
