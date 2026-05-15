import { CountdownProvider } from "./context/CountdownContext";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SocialProof } from "./components/SocialProof";
import { TrustBadges } from "./components/TrustBadges";
import { ProblemSolution } from "./components/ProblemSolution";
import { HowItWorks } from "./components/HowItWorks";
import { ProductFeatures } from "./components/ProductFeatures";
import { Comparison } from "./components/Comparison";
import { Urgency } from "./components/Urgency";
import { OrderForm } from "./components/OrderForm";
import { Guarantee } from "./components/Guarantee";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { StickyBottomBar } from "./components/StickyBottomBar";
import { WhatsAppButton } from "./components/WhatsAppButton";

export default function App() {
  return (
    <CountdownProvider>
      <div className="min-h-screen bg-white font-sans text-[#0A0A0A]">
        <AnnouncementBar />
        <Header />
        <main>
          <Hero />
          <SocialProof />
          <TrustBadges />
          <ProblemSolution />
          <HowItWorks />
          <ProductFeatures />
          <Comparison />
          <Urgency />
          <OrderForm />
          <Guarantee />
          <FAQ />
        </main>
        <Footer />
        <StickyBottomBar />
        <WhatsAppButton />
      </div>
    </CountdownProvider>
  );
}
