import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = "Joel C. Escareal II — Civil Engineer | Structural Engineering Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#10233F",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 12,
              border: "2px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            JE
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 700 }}>{profile.name}</div>
            <div style={{ fontSize: 24, color: "#A9CBEE" }}>{profile.title}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 60, fontWeight: 800, lineHeight: 1.1 }}>
          <div>Engineering Structures.</div>
          <div style={{ color: "#A9CBEE" }}>Developing Infrastructure.</div>
          <div>Delivering Lasting Impact.</div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 22, color: "rgba(255,255,255,0.75)" }}>
          {profile.credentials.map((c) => (
            <div key={c} style={{ display: "flex", padding: "8px 18px", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 999 }}>
              {c}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
