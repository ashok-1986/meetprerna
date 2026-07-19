"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("GLOBAL ERROR:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ padding: "40px", fontFamily: "monospace", color: "#C4FF61", background: "#0D0D0D" }}>
          <h1>Global Error Caught</h1>
          <pre style={{ whiteSpace: "pre-wrap" }}>{error.message}</pre>
          <pre style={{ whiteSpace: "pre-wrap" }}>{error.stack}</pre>
          <button
            onClick={reset}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "#C4FF61",
              color: "#0D0D0D",
              border: "none",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}