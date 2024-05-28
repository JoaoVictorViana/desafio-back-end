import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Flex, Grid } from '@/components/Core/Display'
import { StandarSidebar } from '@/components/Features/Sidebar'
import { QueryProvider } from '@/components/Core/Query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sys.SO',
  description: 'Desafio Back-end',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Flex as="main" className="w-screen h-screen overflow-hidden">
          <StandarSidebar />
          <Grid as="section" className="w-full h-screen overflow-auto">
            <QueryProvider>{children}</QueryProvider>
          </Grid>
        </Flex>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  )
}
