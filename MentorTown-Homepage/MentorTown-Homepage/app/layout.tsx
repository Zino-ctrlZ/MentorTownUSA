import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white shadow-sm">
          <nav className="container mx-auto px-4 py-3">
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}

