import "./App.scss";
import Nav from './Nav.js'
import { useRef } from 'react'

const App = () => {

	let notNav = useRef(null)

	return (
		<>
			<Nav notNav={notNav}/>
			<div id="showcase" ref={notNav}>
				<div className="productItem">
					<h6>NEW PRODUCT</h6>
					<h1>XX99 MARK II HEADPHONES</h1>
					<p>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
					<button id="productItemButton">SEE PRODUCT</button>
				</div>
			</div>
			<div id="content"></div>
			<div id="footer"></div>
			
		</>
	)
}

export default App;