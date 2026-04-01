import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioGrid from "@/components/work/PortfolioGrid";

export const metadata = {
    title: "The Work | meet prerna — Artist & Creator",
    description: "The work of meet prerna — tattoo, illustration, painting, wall art, vitiligo, permanent makeup, and restoration. Commissions open.",
};

export default function WorkPage() {
    return (
        <>
            <Navbar />
            <main style={{ margin: 0, padding: 0 }}>
                <PortfolioGrid />
            </main>
            <Footer />
        </>
    );
}
