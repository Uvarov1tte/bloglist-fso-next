import "@/app/globals.css"
import AuthSessionProvider from "@/app/components/SessionProvider"
import NavBar from "@/app/components/NavBar"
import { NotificationProvider } from "@/app/components/NotificationContext"
import Notification from "@/app/components/Notification"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            <main>{children}</main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}