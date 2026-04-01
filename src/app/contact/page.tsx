import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/contact/ContactSection";

export const metadata = {
    title: "Contact | meet prerna — Artist & Creator",
    description: "Start a commission with meet prerna. Artist & Creator based in Mumbai. Responds within 48 hours.",
};

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main style={{ margin: 0, padding: 0 }}>
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
