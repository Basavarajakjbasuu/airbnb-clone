import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import TripsClient from "./TripsClient";

const TripsPage = async () => {

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return(
      <ClientOnly>
        <EmptyState 
          title="Unauthorized"
          subtitle="Please Login"
        />
      </ClientOnly>
    )
  };

  const reservations = await getReservation({
    userId: currentUser.id
  });

  if (reservations.length === 0) {
    return(
      <ClientOnly>
        <EmptyState 
          title="No Trips"
          subtitle="You haven't booked any trips yet"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default TripsPage;
