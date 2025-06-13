export const metadata = {
  title: "IP Risiko Scan",
  description: "Scanne IP-Adressen auf Abuse-Risiko"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, backgroundColor: "#000", color: "#fff", fontFamily: "Arial" }}>
        {children}
      </body>
    </html>
  );
}
