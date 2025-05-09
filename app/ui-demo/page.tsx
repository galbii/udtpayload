import { Metadata } from 'next';
import { UIDemo } from '@/app/components/examples/UIDemo';

export const metadata: Metadata = {
  title: 'UI Component Library | United Defense Tactical',
  description: 'Preview of the UI component library built with Tailwind CSS',
};

export default function UIDemoPage() {
  return <UIDemo />;
} 