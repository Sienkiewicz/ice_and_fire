import '../styles/globals.css'
import type { AppProps /*, AppContext */ } from 'next/app'
import { CssBaseline } from '@material-ui/core'
import NextNprogress from 'nextjs-progressbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <NextNprogress
        color='white'
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
