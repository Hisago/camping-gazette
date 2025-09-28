import "./globals.css";
import Layout from "@/components/Layout";

export const metadata = {
  title: "Camping Gazette",
  description: "La gazette du camping avec activités, snack et infos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
