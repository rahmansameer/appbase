import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import CookieConsent from "@/components/CookieConsent";

export const metadata = {
  title: "Appbase — Discover, Compare & Choose Better Software",
  description: "Discover and compare the best software tools",

  openGraph: {
    title: "Appbase — Discover, Compare & Choose Better Software",
    description:
      "Discover, compare, and explore the best software, tools, and digital products across categories, with insights to help you make better decisions.",
    images: ["/og.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Appbase — Discover, Compare & Choose Better Software",
    description:
      "Discover, compare, and explore the best software, tools, and digital products across categories, with insights to help you make better decisions.",
    images: ["/og.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <BackToTop />
      <CookieConsent />
    </>
  );
}
