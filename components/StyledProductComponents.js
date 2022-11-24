import styled, {keyframes, css} from 'styled-components'


const SwingIn = keyframes`
    0% {
        -webkit-transform: rotateX(-100deg);
        transform: rotateX(-100deg);
        -webkit-transform-origin: top;
        transform-origin: top;
        opacity: 0
    }

    100% {
        -webkit-transform: rotateX(0deg);
        transform: rotateX(0deg);
        -webkit-transform-origin: top;
        transform-origin: top;
        opacity: 1;


    }
`
const SwingOut = keyframes`
    0% {
        -webkit-transform: rotateX(0deg);
        transform: rotateX(0deg);
        -webkit-transform-origin: top;
        transform-origin: top;
        opacity: 1
    }

    100% {
        -webkit-transform: rotateX(70deg);
        transform: rotateX(70deg);
        -webkit-transform-origin: top;
        transform-origin: top;
        opacity: 0
    }
`

const theme = {
    "in": SwingIn,
    "out": SwingOut
}

const AnimMixin = css`
    animation: ${props => props.theme}
`

const StyledPopup = styled.div`
    display: flex;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #191919;
    z-index: 5;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    ${AnimMixin} .5s cubic-bezier(.175, .885, .32, 1.275) normal both;

    .closePopupContainer {
        position: absolute;
        width: 3%;
        height: 3%;
        translate:0 0;
        top: 80px;
        z-index: 3;

        button {
            width: 100%;
            aspect-ratio: 1/1;
            background: rgba(0,0,0,0.05);
            border-radius: 3em;
            border: 1px solid white;
            color: black;
            border: 2px solid black;
            box-shadow: 0 0 5px 5px rgba(0,0,0,0.05);

            &:hover {
                background: radial-gradient(palevioletred, transparent)
            }
        }
    }

    .gallery {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
        
        .images {
            width: 100vw;
            height: 100vh;
            display: flex;
            z-index: -1;
            position: absolute;

            .imgLoader {
                width: 100%;
                height: 100%;
                position: absolute;
                display: none; /* wait for user action to load images */;
                z-index: -1;
                background-image: var(--bgURL, '');
                background-color: white;
                background-size: cover;
                transform-origin: left;
                transition: 750ms cubic-bezier(0.5, 0, 0.75, 0);

                &.unflip { transform: rotateY(90deg) }
                &.flip { transform: rotateY(-90deg) } 
                &.active {
                    display: unset;
                    z-index: 3;
                    order: 2;
            

                    &+* {
                        display: unset;
                        z-index: 2;
                        order: 3;

                        &+* {
                            display: unset;
                            z-index: 1;
                            order: 1;
                        }
                    }
                    &.flip {
                        z-index: 6;
                        transform: rotateY(-90deg);

                        &+* {
                            
                            z-index: 5;
                            &+* {
                                z-index: 4;
                            }
                        }
                    }
                }
            }
        }

        .page {
            
            background: white;
            width: max-content;
            position: absolute;
            bottom: 0;
            left: 35%;
            padding: 1.5em 3em;
            box-shadow: 0 -10px 3em -30px rgba(0,0,0,0.4);
            z-index: 1;
            
           
            button {
                
                background: transparent;
                border: 1px solid white;
                font-weight: 700;
                border-radius: 3em;
                padding: 1em;
                cursor: pointer;
                font-size: 22px;
                transition: 250ms;
                aspect-ratio: unset;
                
                &:hover {
                    scale: 1.5;
                }
                &.disabled {
                    color: grey;
                    cursor: not-allowed;
                    user-select: none;
                }
            }
            
        }
    
        .infoWrapper {
            @media (orientation: portrait) {
                --unit: vmax;

                flex-flow: column;

                .headerContainer {
                    padding-top: 10em;

                    .header {
                        padding: 2vmin;
                        background-color: rgba(255,255,255,0.5);
                        backdrop-filter: blur(10px)brightness(1.2);
                        border-radius: 1em;
                    }

                }
                .specs {
                    flex-flow: column nowrap;
                    align-items: start;
                    justify-content: center;
                    padding: 2vmin;

                    button {
                        
                        width: 12+var(--unit);
                        aspect-ratio: 2/1;
                    }
                }
            }
            display: flex;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            flex-flow: row wrap;
            width: 100%;
            height: inherit;

            .headerContainer {
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                flex: 1 1 0;
                
                .header {
                    height: max-content;
                    
                    .headerItems { 
                        display: flex;
                        flex-flow: column nowrap;
                        justify-content: center;
                        align-items: center;
                        background: rgba(255,255,255,0.5);
                        padding: 1em;
                        backdrop-filter: blur(10px)saturate(2);
                        border-radius: 1em;

                        * {margin: 0}
                    } 
                } 
              
            }
            .specs {
                position: relative;
                display: flex;
                flex-flow: column nowrap;
                padding: clamp(1vh, 15em, 20vh) clamp(1vw, 15em, 20vw) 0 0;
                justify-content: start;
                flex: 1 1 50%;
                gap: 2vh;
                
                .closeSpecsContainer {
                    background: rgba(255,255,255,0.5);
                    backdrop-filter: blur(10px)saturate(2);
                    align-self: end;
                    width: max-content;
                    padding: 1em;
                    border-radius: 1em;

                    button {
                        width: clamp(120px, 12vmin, 12vmax);

                    }
                    &.active {
                        &+.specsContainer {
                            background: white;
                            backdrop-filter: blur(10px);
                            transform-origin: top right;
                            transform: scale(1);
                        }  
                    }

                }
                .specsContainer {
                    position: relative;
                    background-color: rgba(255,255,255,0.5);
                    transition: 250ms;
                    width: 100%;
                    height: 100%;
                    border-radius: 1em 1em  0 0;
                    padding: 3em;
                    box-shadow: 0 -10px 2em -30px;
                    z-index: -1;
                    transform: translateY(100%);
                } 
                
            }

        }
        
    }
`

const Shake = keyframes`
	0%, 20% {transform: translate(0);}
	2%, 6%, 10%, 14% {transform: translateX(-10px)}
	4%, 8%, 12% {transform: translateX(10px)}
	16% {transform: translate(8px)}
	18% {transform: translate(-8px)}

`
const ShakingButton = styled.button`
	border: 1px solid #191919;
	color: #0f0f0f;
	background: transparent;
	border-radius: 3em;
	padding: 0.5em 1em;
	cursor: pointer;
	transition: 250ms;
	animation: ${Shake} 5s cubic-bezier(0.455, 0.030, 0.515, 0.955) infinite both;

	&:hover {
		border: 1px solid #fff;
		text-shadow: 0 0 1em #191919, 0 0 2em #191919, 0 0 3em #191919, 0 0 4em #191919;
		color: #fff;
		animation-play-state: paused;
	}
`
export {SwingIn, SwingOut, AnimMixin, StyledPopup, theme, Shake, ShakingButton}
