export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="legal-page-wrapper min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 text-gray-700">
      {children}
    </div>
  )
}