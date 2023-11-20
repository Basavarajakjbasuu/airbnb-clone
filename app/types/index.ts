import { Listing, User } from '@prisma/client';

export type safeListing = Omit<
  Listing,
  'createdAt'
> & {
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
 }


export type safeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
}
