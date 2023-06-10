import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import LoadingBar from '@/components/loading-bar/Loading-Bar'

import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <LoadingBar/>
          <Navbar/>
          {children}
          <Footer/>
        </div>
      </body>
    </html>
  )
}
