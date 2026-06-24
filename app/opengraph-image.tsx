import { ImageResponse } from "next/og";

export const alt = "Braided Digital - strony i sklepy dla małych marek";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        background: "#f4f0e8",
        color: "#191815",
        padding: "72px 80px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ width: 52, height: 52, border: "2px solid #97733c", transform: "rotate(45deg)" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, letterSpacing: 5 }}>BRAIDED</div>
          <div style={{ marginTop: 4, color: "#97733c", fontSize: 13, letterSpacing: 9 }}>DIGITAL</div>
        </div>
      </div>
      <div style={{ display: "flex", maxWidth: 920, flexDirection: "column" }}>
        <div style={{ fontSize: 78, lineHeight: .95, letterSpacing: -3 }}>
          Strony i sklepy dla małych marek.
        </div>
        <div style={{ marginTop: 28, color: "#6c685f", fontSize: 25 }}>
          Rękodzieło · lokalne usługi · małe firmy
        </div>
      </div>
      <div style={{ display: "flex", color: "#97733c", fontSize: 18, letterSpacing: 2 }}>
        WEB.MA-ATELIER.PL
      </div>
      <div style={{ position: "absolute", right: -250, top: -260, width: 660, height: 660, border: "2px solid rgba(151,115,60,.25)", borderRadius: "48%" }} />
      <div style={{ position: "absolute", right: -130, top: -140, width: 420, height: 420, border: "2px solid rgba(151,115,60,.18)", borderRadius: "50%" }} />
    </div>,
    size,
  );
}
