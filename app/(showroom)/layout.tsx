import { PortalProvider } from "@/components/showroom/PortalTransition";

export default function ShowroomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#F8F9FC" }}>
      {/* Subtle floating orbs for depth */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Blue orb — top left */}
        <div
          className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(45,97,240,0.08) 0%, transparent 70%)",
            animation: "orb-float-1 20s ease-in-out infinite",
          }}
        />
        {/* Pink orb — top right */}
        <div
          className="absolute -right-32 top-10 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,162,225,0.07) 0%, transparent 70%)",
            animation: "orb-float-2 25s ease-in-out infinite",
          }}
        />
        {/* Lime orb — center bottom */}
        <div
          className="absolute left-1/3 top-2/3 h-[450px] w-[450px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(166,211,15,0.06) 0%, transparent 70%)",
            animation: "orb-float-3 30s ease-in-out infinite",
          }}
        />
        {/* Navy orb — bottom right */}
        <div
          className="absolute -bottom-32 right-1/4 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(2,11,96,0.05) 0%, transparent 70%)",
            animation: "orb-float-2 22s ease-in-out infinite reverse",
          }}
        />
      </div>
      <div className="relative z-10">
        <PortalProvider>{children}</PortalProvider>
      </div>
    </div>
  );
}
