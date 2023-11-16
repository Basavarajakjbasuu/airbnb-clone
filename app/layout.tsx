import './globals.css'
import type { Metadata } from 'next'

import { Nunito } from 'next/font/google'
import { Navbar } from './components/navbar/Navbar'

import RegisterModel from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal'

import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'

const nunito = Nunito({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Holiday Homes & Apartment Rentals - Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <RentModal />
        <RegisterModel />
        <LoginModal />
        <Navbar currentUser={currentUser}/>  
        {children}
      </body>
    </html>
  )
}
