import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
// import { Toaster } from "@/components/ui/toaster"
import { Toaster } from 'sonner'
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AutoFlowX - Sistema de Gestión para Talleres Automotrices",
  description: "Optimiza las operaciones de tu taller automotriz con AutoFlowX",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning style={{ fontSize: "clamp(10px, 1.2vw, 13px)" }}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <Toaster closeButton position="bottom-right" richColors />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
