import { GeistSans } from 'geist/font/sans'
import './globals.css'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Rental Review',
  description: 'A place for tenants and landlords to work towards better living.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen w-screen flex flex-col items-center">
          <NavBar/>
          {children}
          <Footer/>
        </main>
      </body>
    </html>
  )
}
