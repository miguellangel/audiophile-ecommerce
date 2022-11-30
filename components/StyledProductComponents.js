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
    flex-flow: row wrap;
    ${AnimMixin} .5s cubic-bezier(.175, .885, .32, 1.275) normal both;

    .closePopupContainer {
        position: absolute;
        width: clamp(0px, 15vmin, 56px);
        translate:0 0;
        top: clamp(0px, 80px, 5%);
        z-index: 3;
        background: rgba(255,255,255,0.5);
        border-radius: 3em;
        padding: 10px;
        backdrop-filter: blur(10px);

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
            background-position: center;
            background-repeat: no-repeat;
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
        display: flex;
        justify-content: center;
        width: 100%;
        z-index: var(--zI, 1);

        .pageContainer {
            background: white;
            width: max-content;
            height: clamp(115px, 15%, 30%);
            position: relative;
            bottom: 0;
            padding: 1.5em 3em;
            box-shadow: 0 -10px 3em -30px rgba(0,0,0,0.4);
            z-index: 1;
        }
        
       
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
    .gallery {
        width: 100%;
        height: clamp(0px,calc(100% - clamp(115px, 15%, 30%)),85%);
        display: flex;
        position: relative;
        

    
        .infoWrapper {
            @media (orientation: portrait) {
                --unit: vmax;

                flex-flow: column;

                .headerContainer {
                    transform: translateY(70%);

                    .header {
                        padding: 2vmin;
                        background-color: rgba(255,255,255,0.5);
                        backdrop-filter: blur(10px)brightness(1.2);
                        border-radius: 1em;
                    }

                }
                .specs {
                    --p: 0;

                    flex-flow: column nowrap;
                    align-items: start;
                    justify-content: center;
                    padding: 2vmin;
                    transform: translateY(5%);

                    .closeSpecsContainer {
                        align-self: center !important;
                    }
                }
            }
            display: flex;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            flex-flow: row wrap;
            width: 100%;
            height: 100%;
            

            .headerContainer {
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                flex: 1 1 0%;
                height: 100%;
                
                .header {
                    height: max-content;
                    position: relative;
                    top: 15%;
                    
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
                height: 100%;
                display: flex;
                flex-flow: column nowrap;
                padding: calc(clamp(0px,25vmin,180px) + 0px) clamp(0px,30vmin, 240px * var(--p, 1)) 0 0;
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
                    transition: 300ms;

                    button {
                        width: clamp(85px, 22vmin, 100px);

                    }
                    &.active {
                        button {
                            text-shadow: 0px -1px black;
                            border-color: white;
                            box-shadow: 0 0 1em 1em rgba(255,255,255,0.3), 2px 0 1px 1px rgba(0,0,0,0.5);
                        }

                        &+.specsContainer {
                            height: 100%;
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
                    z-index: 2;
                    transform: translateY(150%);

                    h1 {display: initial}

                    .tableItems {
                        display: flex;
                        flex-flow: row wrap;
                        gap: 1em;
                        overflow-y: scroll;
                        max-height: 70%;

                        .tableField {
                            display: flex;
                            flex-flow: row wrap;
                            flex: calc(50% - 3em);
                            border-bottom: 1px solid #c9c9c9;
                            justify-content: space-between;
                            padding: 0 1em;

                                
                            .fieldKey {
                                text-transform: capitalize;
                                font-weight: 600;
                            }
                            .fieldValue {}

                        }
                    }
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
