import { useBotpress } from './hooks/useBotpress';
import { Analytics } from "@vercel/analytics/react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Pricing from './components/Pricing';
import MPesaDonation from './components/MPesaDonation';
import Services from './components/Services';
import Contact from './components/Contact';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import CertificationBadge from './components/CertificationBadge';
import { init } from '@emailjs/browser';

// Initialize EmailJS with your public key
init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const paypalInitialOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
  components: "buttons",
  'enable-funding': 'paylater,venmo,card',
  'disable-funding': 'credit'
};

function App() {
  // Initialize Botpress
  useBotpress();

  return (
    <PayPalScriptProvider options={paypalInitialOptions}>
      <div className="min-h-screen bg-white">
        <Hero />
        <Services />
        <Skills />
        <Projects />
        <Pricing />
        <Contact />
        <Reviews />
        <MPesaDonation />
        <CertificationBadge />
        <Footer />
        <Analytics/>
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
