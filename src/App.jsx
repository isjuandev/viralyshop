import { CountdownProvider } from "./context/CountdownContext";
import { Hero } from "./components/Hero";
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
import { WhatsAppButton } from "./components/WhatsAppButton";
import { ExitIntentModal } from "./components/ExitIntentModal";
import { SalesToast } from "./components/SalesToast";

export default function App() {
  return (
    <CountdownProvider>
      <div className="min-h-screen bg-[var(--color-white)] font-sans text-[var(--color-body)]">
        <main>
          <Hero />
          <ProblemSolution />
          <HowItWorks />
          <EmotionalClose />
          <Comparison />
          <OrderForm />
          <ProductFeatures />
          <Guarantee />
          <Urgency />
          <FAQ />
        </main>
        <Footer />
        <ExitIntentModal />
        <SalesToast />
      </div>
    </CountdownProvider>
  );
}
