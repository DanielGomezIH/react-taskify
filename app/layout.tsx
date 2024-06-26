import { Poppins } from "next/font/google";
import { siteConfig } from '@/config/site';
import type { Metadata } from "next";
import "./globals.css";

const poppins = Poppins( {
  subsets: [ 'latin' ],
  weight: [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900'
  ]
} );;

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${ siteConfig.name }`
  },
  description: siteConfig.description,
  icons: [ {
    url: '/logo.svg',
    href: '/logo.svg'
  } ]
};

export default function RootLayout( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <html lang="en">
      <body className={ poppins.className }>{ children }</body>
    </html>
  );
}
