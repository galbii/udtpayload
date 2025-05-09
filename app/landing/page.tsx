// Redirect from /landing to / since the landing page is now served at the root
import { redirect } from 'next/navigation';

export default function LandingPage() {
  redirect('/');
} 