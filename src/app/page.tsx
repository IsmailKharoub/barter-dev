import {
  Header,
  Hero,
  HowItWorks,
  Products,
  TradeTypes,
  Apply,
  Portfolio,
  FAQ,
  FooterCta,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <HowItWorks />
        <Products />
        <TradeTypes />
        <Apply />
        <Portfolio />
        <FAQ />
        <FooterCta />
        <Footer />
      </main>
    </>
  );
}
