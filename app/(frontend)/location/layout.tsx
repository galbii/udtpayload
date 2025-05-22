import { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | United Defense Tactical',
    default: 'Locations | United Defense Tactical',
  },
  description: 'Find a United Defense Tactical location near you for professional firearms training and tactical education.',
};

export default function LocationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 