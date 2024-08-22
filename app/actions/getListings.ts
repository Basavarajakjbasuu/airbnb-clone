import prisma from '@/app/libs/prismadb';

export interface Listing {
  userId?: string;
 }

export default async function getListings( params: Listing ) {
  try {
    const userId = params?.userId;

    let query: any = {};

    if(userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeListings = listings.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
    
  } catch (error: any) {
    throw new Error(error);
  }
}
