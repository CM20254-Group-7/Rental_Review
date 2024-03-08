// import { GeistSans } from 'geist/font/sans';
import './globals.css';
import NavBar from '@/components/Header/NavBar';
import Footer from '@/components/Footer/Footer';
import { NextPage } from 'next';
import React from 'react';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Rental Review',
  description: 'A place for tenants and landlords to work towards better living.',
};

const Layout: NextPage<{
  children: React.ReactNode;
}> = ({
  children,
}) => (
  <html lang='en'>
    <body className='bg-background text-foreground'>
      <main className='min-h-screen flex flex-col items-center'>
        <NavBar />
        {children}
        <Footer />
      </main>
    </body>
  </html>
);

export default Layout;
