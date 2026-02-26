
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kartikey Singh | Ethical Hacker • Web Dev • AI',
  description: 'Ultra-premium cyberpunk portfolio of Kartikey Singh - 17-year-old Ethical Hacker, Web Developer & AI Enthusiast from Mumbai',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: "'Fira Code', monospace",
        background: '#0A0A0A',
        color: '#ffffff',
        overflowX: 'hidden'
      }}>
        {children}
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html, body {
            font-family: 'Fira Code', monospace;
            background: #0A0A0A;
            color: #ffffff;
            overflow-x: hidden;
          }
          
          ::selection {
            background: rgba(0, 255, 65, 0.3);
            color: #00FF41;
          }
          
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #0A0A0A;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #00FF41;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #00FFFF;
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}</style>
      </body>
    </html>
  )
}
