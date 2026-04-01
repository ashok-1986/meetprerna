"use client";

import { motion } from "framer-motion";
import LineReveal from "@/components/ui/LineReveal";

export default function ContactSection() {
    return (
        <section
            style={{
                background: "#0D0D0D",
                minHeight: "100vh",
                padding: "160px 24px 120px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div style={{ width: "100%", maxWidth: "720px", margin: "0 auto" }}>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "80px" }}>
                    <LineReveal
                        text="Let's make something."
                        tag="h1"
                        delay={0.1}
                        style={{
                            fontFamily: "'Times New Roman', serif",
                            fontSize: "clamp(3rem, 6vw, 5rem)",
                            fontWeight: 700,
                            color: "#FDFFE9",
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                            margin: "0 0 16px 0",
                        }}
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        style={{
                            fontFamily: "Lato, sans-serif",
                            fontSize: "0.8rem",
                            letterSpacing: "0.2em",
                            color: "#C4FF61",
                            textTransform: "uppercase",
                            margin: 0,
                        }}
                    >
                        Commissions · Collaborations · Conversations
                    </motion.p>
                </div>

                {/* Path 1: Fillout Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    style={{ marginBottom: "80px" }}
                >
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                        <h2 style={{
                            fontFamily: "'Times New Roman', serif",
                            fontSize: "2rem",
                            color: "#FDFFE9",
                            fontWeight: 400,
                            margin: "0 0 8px 0"
                        }}>
                            Start a commission
                        </h2>
                        <p style={{
                            fontFamily: "Lato, sans-serif",
                            fontSize: "0.9rem",
                            color: "rgba(253,255,233,0.5)",
                            margin: 0
                        }}>
                            Prerna responds within 48 hours.
                        </p>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            height: "700px",
                            background: "#111111",
                            borderRadius: "8px",
                            border: "1px solid rgba(253,255,233,0.05)",
                            overflow: "hidden"
                        }}
                    >
                        {/* Standard Fillout iframe embed */}
                        <iframe
                            src="https://meetprerna.fillout.com/book"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            title="Commission Form"
                            style={{ border: "none" }}
                        />
                    </div>
                </motion.div>

                {/* Bottom Paths: WhatsApp & Email */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "64px",
                        borderTop: "1px solid rgba(253,255,233,0.05)",
                        paddingTop: "64px",
                    }}
                >
                    {/* Path 2: WhatsApp */}
                    <div style={{ textAlign: "center" }}>
                        <p style={{
                            fontFamily: "Lato, sans-serif",
                            fontSize: "0.9rem",
                            color: "rgba(253,255,233,0.5)",
                            margin: "0 0 16px 0",
                        }}>
                            Have a quick question?
                        </p>
                        <a
                            href="https://api.whatsapp.com/send?phone=917738147935&text=Hi Prerna, I have a question about commissioning work."
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontFamily: "Lato, sans-serif",
                                fontSize: "0.75rem",
                                letterSpacing: "0.15em",
                                color: "#C4FF61",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                padding: "12px 32px",
                                border: "1px solid rgba(196,255,97,0.3)",
                                borderRadius: "100px",
                                display: "inline-block",
                                transition: "background 0.3s, color 0.3s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#C4FF61";
                                e.currentTarget.style.color = "#1A1A1A";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "#C4FF61";
                            }}
                        >
                            Message on WhatsApp
                        </a>
                    </div>

                    {/* Path 3: Collaboration */}
                    <div style={{ textAlign: "center" }}>
                        <a
                            href="mailto:prerna@meetprerna.com"
                            style={{
                                fontFamily: "Lato, sans-serif",
                                fontSize: "0.7rem",
                                letterSpacing: "0.1em",
                                color: "rgba(253,255,233,0.3)",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                transition: "color 0.3s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#FDFFE9")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,255,233,0.3)")}
                        >
                            Press & collaborations
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
