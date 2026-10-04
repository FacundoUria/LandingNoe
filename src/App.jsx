import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import LeadForm from './components/LeadForm.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'
import HowToStart from './components/HowToStart.jsx'
import AboutUs from './components/AboutUs.jsx'
import ProductCategories from './components/ProductCategories.jsx'
import Faq from './components/Faq.jsx'
import SocialSection from './components/SocialSection.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'
import { SHOW_PRODUCTOS } from './config.js'

export default function App() {
  return (
    <div className="bg-slate-50 text-slate-800 font-sans min-h-screen pb-16 antialiased selection:bg-arbell-blue selection:text-white">
      <Header />
      <main>
        <Hero />
        <LeadForm />
        <WhyChooseUs />
        <HowToStart />
        <AboutUs />
        {SHOW_PRODUCTOS && <ProductCategories />}
        <Faq />
        <SocialSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
