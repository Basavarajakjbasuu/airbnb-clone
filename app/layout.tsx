import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { Navbar } from './components/navbar/Navbar'
import RegisterModel from './components/modals/RegisterModel'
import ToasterProvider from './providers/ToasterProvider'

const nunito = Nunito({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Holiday Homes & Apartment Rentals - Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <RegisterModel />
        <Navbar />  
        {children}
      </body>
    </html>
  )
}
