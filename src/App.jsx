import { CountdownProvider } from "./context/CountdownContext";
import { Hero } from "./components/Hero";
import { SocialProof } from "./components/SocialProof";
import { ProblemSolution } from "./components/ProblemSolution";
import { HowItWorks } from "./components/HowItWorks";
import { ProductFeatures } from "./components/ProductFeatures";
import { Comparison } from "./components/Comparison";
import { EmotionalClose } from "./components/EmotionalClose";
import { Urgency } from "./components/Urgency";
import { OrderForm } from "./components/OrderForm";
import { Guarantee } from "./components/Guarantee";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { StickyBottomBar } from "./components/StickyBottomBar";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { ExitIntentModal } from "./components/ExitIntentModal";
import { SalesToast } from "./components/SalesToast";

export default function App() {
  return (
    <CountdownProvider>
      <div className="min-h-screen bg-white font-sans text-[#0A0A0A]">
        <main>
          <Hero />
          <ProblemSolution />
          <HowItWorks />
          <SocialProof />
          <EmotionalClose />
          <Comparison />
          <OrderForm />
          <ProductFeatures />
          <Guarantee />
          <Urgency />
          <FAQ />
        </main>
        <Footer />
        <StickyBottomBar />
        <WhatsAppButton />
        <ExitIntentModal />
        <SalesToast />
      </div>
    </CountdownProvider>
  );
}
