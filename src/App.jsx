import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import LeadForm from './components/LeadForm.jsx'
import ProductCategories from './components/ProductCategories.jsx'
import SocialSection from './components/SocialSection.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'

export default function App() {
  return (
    <div className="bg-slate-50 text-slate-800 font-sans min-h-screen pb-16 antialiased selection:bg-arbell-blue selection:text-white">
      <Header />
      <main>
        <Hero>
          <LeadForm />
        </Hero>
        <ProductCategories />
        <SocialSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
