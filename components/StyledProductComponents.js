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
            color: white;
            box-shadow: 0 0 5px 5px rgba(0,0,0,0.05);

            &:hover {
                background: radial-gradient(palevioletred, transparent)
            }
        }
    }
    .images {
        width: 100vw;
        height: 100vh;
        display: flex;
        z-index: -1;

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
    .gallery {
        width: 100%;
        height: 100%;
        display: flex;

        .productOptions {
            position: absolute;
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            top: 20%;
            left: 8%;
            background-color: rgba(255,255,255,0.5);
            backdrop-filter: blur(4px);
            padding: 3em;
            
            .header { 
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;

                * {margin: 0}
            }
        }
        .specs {
            position: absolute;
            top: 20%;
            right: 15%;
            background: rgba(255,255,255,0.55);
            padding: 2em;
            border-radius: 0.5em;
            backdrop-filter: blur(5px);

            button {
                &.active {
                    &+.vertical {
                        background: red;
                        width: 100px;
                        height: 100px;
                    }  
                }
            }
            .vertical {
                display: flex;
                transition: 250ms;
                height: 0;
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
