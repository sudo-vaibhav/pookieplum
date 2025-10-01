import { Metadata } from "next"

export const metadata: Metadata = {
  title: "PookiePlum Chat - Stay Connected",
  description: "Private, secure messaging for couples",
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen bg-gray-50">
      {children}
    </div>
  )
}