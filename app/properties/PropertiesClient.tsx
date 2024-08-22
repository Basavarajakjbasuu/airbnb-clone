'use client';

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, safeUser } from "../types";

import Container from "../components/Container";
import Heading from "../components/Heading";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesProps {
  listings: SafeListing[];
  currentUser: safeUser | null; 
}

const PropertiesClient = ({ currentUser, listings  }: PropertiesProps) => {

  const router = useRouter();

  const [deletingId, setDeletingId] = useState<string | null>('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`)
    .then(() => {
      toast.success('Listing deleted');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error);
    })
    .finally(() => {
      setDeletingId('');
    });

  }, [router])
  return ( 
      <Container>
        <Heading
          title="Properties"
          subTitle="Manage your properties"
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Delete Property" 
            />
           ))}
        </div>
      </Container>
   );
}
 
export default PropertiesClient;
