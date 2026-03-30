// Minimal root layout — this app is API-only.
// The Next.js App Router requires a layout.tsx at the root.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: "EduCycle API",
  description: "Backend API for the EduCycle platform",
};
