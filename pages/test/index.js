import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'


const StyledWrapper = styled.div`
    margin-top: 80px;
    width: 100%;
    height: 100vh;
    background: white;
    padding: 5%:
`
const StyledButton = styled.button`
	font-family: "Poppins";
	font-weight: 300;
	font-size: inherit;
	background: transparent;
	color: #191919;
	padding: 0 2%;
	aspect-ratio: 2/1;
	cursor: pointer;
	transition: 250ms;
    position: relative;

    &:hover {
        background: transparent !important;
    }
`
const StyledBtnAnim = styled.div`
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    border: 1px solid #191919;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: 175ms;
    opacity: 0;
    border-radius: 3em;
    padding: 3%;

    ${StyledButton}:hover & {
        width: 100%;
        height: 100%;
        opacity: 1;
        
    }

`

const Test = () => {

    const router = useRouter()
    const pid = router.query.pid || []

    const wrapper = React.useRef()

    const handleClick = (e) => {
        e.currentTarget.classList.toggle('expand')
    }

    React.useEffect(() => {
    })
    
    return (
        <>
            <StyledWrapper ref= { wrapper }>
                <StyledButton onClick={ handleClick } secondary>
                    <StyledBtnAnim size={'100%'} opacity={1}/>
                    details +
                </StyledButton>
            </StyledWrapper>
        </>
    )
}

export default Test