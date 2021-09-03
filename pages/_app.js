import '../styles/globals.scss'
import Layout from '../components/layout'
import { createGlobalStyle, ThemeProvider } from 'styled-components'


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const theme = {
	colors: {
		primary: '#191919', 
		secondary: '#d87c49',
		textPrimary: 'white',
	},
}

const MyApp = ({ Component, pageProps }) => {

	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme= { theme }>
				<Layout>
					
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</>

	)
}


/* Only uncomment this method if you have blocking data requirements for
every single page in your application. This disables the ability to
perform automatic static optimization, causing every page in your app to
be server-side rendered. */

/* MyApp.getInitialProps = async (appContext) => {
	// calls page's `getInitialProps` and fills `appProps.pageProps`
	const appProps = await App.getInitialProps(appContext);

	return { ...appProps }
} */

export default MyApp
