import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";

import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoriteClient from "./FavoriteClient";

const ListingPage = async () => {

  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if(listings.length === 0) {
    return ( 
      <ClientOnly>
        <EmptyState
          title="No Favorites Yet"
          subtitle="Click on the heart icon to save your favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoriteClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>

  )
 
}
 
export default ListingPage;
