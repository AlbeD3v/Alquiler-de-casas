export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-arena/30 via-background to-arena/30 p-4">
      {children}
    </div>
  );
}
