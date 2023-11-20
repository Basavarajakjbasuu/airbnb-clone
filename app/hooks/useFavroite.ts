import axios from "axios";

import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import useLoginModal from "./useLoginModal";
import { safeUser } from "../types";

interface IUseFavorite {
  listingId: string;
  currentUser?: safeUser | null;
}

const useFavorite = ({
  listingId,
  currentUser
}: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);

  },[currentUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if(!currentUser) {
      loginModal.onOpen();
      return;
    }

    try {
      let request;

      if(hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      }else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success("Success!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  },[
    currentUser,
    hasFavorited,
    listingId,
    loginModal,
    router
  ]);

  return {
    hasFavorited,
    toggleFavorite
  }
}

export default useFavorite;
