import './global.css'
import { constructMetadata } from './lib/utils'
import { RootProvider } from 'fumadocs-ui/provider'
import type { ReactNode } from 'react'
import { DocsLayout } from 'fumadocs-ui/layout'
import { baseOptions } from './layout.config'
import { source } from './source'

export const metadata = constructMetadata();

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='font-sansSerif'>
        <RootProvider>
          <DocsLayout tree={source.pageTree} {...baseOptions}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
