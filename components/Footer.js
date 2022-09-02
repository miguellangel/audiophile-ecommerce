import { useEffect } from 'react'
import facebookIcon from '/public/images/shared/desktop/icon-facebook.svg'
import twitterIcon from '/public/images/shared/desktop/icon-twitter.svg'
import instagramIcon from '/public/images/shared/desktop/icon-instagram.svg'


const Footer = () => {

	useEffect(() => {
	})

	return (
		<>
			<footer id="footer" role="contentinfo">
				<div className="columns-2-flex">
					<div className="col">
						<p>Audiophile is an all-in-one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of your personal audio. Come and visit our demo facility. We're open 7 days a week.</p>
						<p>Copyright 2021. All rights reserved</p>
					</div>
					<div className="col">
						<h3>audiophile</h3>
						<div id="link-icons">
							<a href="#facebook-link" style={{background: `url(${facebookIcon.src}) no-repeat`}}> </a>
							<a href="#twitter-link" style={{background: `url(${twitterIcon.src}) no-repeat`}}> </a>
							<a href="#instagram-link" style={{background: `url(${instagramIcon.src}) no-repeat`}}> </a>
						</div>
					</div>
				</div>
			</footer>
		</>
	)
}

export default Footer