import {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import styles from '/styles/products.module.scss'
import styled from 'styled-components'


const StyledFilterButton = styled.div`
	display: flex;
	background: white;
	flex-flow: row nowrap;
	cursor: pointer;
	box-shadow: 0px 0px 1em -5px #c9c9c9;
	border-radius: 3em;
	justify-content: space-between;
	align-items: center;
	gap: 3px;
	margin: 3px 0;

	& > * {
		padding: 0.5em 1em;
	}

	p {
		width: 70%;
		flex: 1 1 70%;
		margin: 0;
		height: min-content;
		user-select: none;
		overflow: hidden;
		max-height: 50px;
		white-space: nowrap;
	}
	button {
		border:none;
		width: clamp(5px, 30%, 50px);
		height: 110%;
		background: transparent;
		border-radius: 0 3em 3em 0;
		box-shadow: inset 0px 0px 1px rgba(0,0,0, 0.1);
		transition: 128ms;
		cursor: pointer;
		text-align: center;

		&:hover {
			//background: palevioletred;
			box-shadow: inset 0px 0px 1em 1px palevioletred;
			text-shadow: 0px 0px 1em red;
			color: red;
		}
	}
`

const Sidebar = ({ receiveRef, filters }) => {

    const [mount, setMount] = useState()
    const [selection, setSelection] = useState([])


    let expand = (div) => {
        /* use class-driven transition to rotate the caret */
        var caret = div.previousSibling.lastChild
        caret.classList.toggle(styles.expand)

        /* let the non-styled child's height be used 
        instead of the max-height transition method -- which has a huge delay  */

        if (div.clientHeight) {
            div.style.height = 0;
        } else {
            div.style.height = `${div.firstChild.clientHeight}px`;
        }

    }

    let handleSelection = (e, ref) => {

        var target;
        ref ? (target = ref) : (target = e.target)

        let formFieldsets = document.querySelectorAll(`.${styles['filter-items']} > form > fieldset`)
        formFieldsets.forEach((item, index) => {
            item.setAttribute('disabled', '')
        })

        let fx = function () {
            formFieldsets.forEach((item, index) => {
                item.removeAttribute('disabled')
            })

        }
        setTimeout(fx, 250)

        if (target.checked) setSelection(prev => [...prev, { filter: target.value, ref: target }])
        else setSelection(selection.filter(item => item.filter != target.value))

    }

    let handleRemoveFilter = (e) => {
        let filterName = e.target.previousElementSibling.textContent
        let ref = selection.filter(item => item.filter === filterName)[0].ref
        ref.checked = false;
        handleSelection(null, ref)
    }
    useEffect(() => {
        receiveRef().then(value => setMount(value.current))

    })

    return (
        <aside aria-label="filters-sidebar" className={ styles.sidebar }>
            { Object.keys(filters).map(i =>
                // <Filter key={i} item={i} values={filters[i]} />
                <div key={ i } className={ `${styles.filter}` } id={ styles[i] }>
                    <button className={ styles['filter-header'] } onClick={ (e) => expand(e.currentTarget.nextSibling) }>
                        <p>{ i.toUpperCase() }</p><span>▼</span>
                    </button>
                    <div className={ styles['filter-items'] }>
                        <form action="" style={ { display: 'flex', flexDirection: 'column', padding: '0 3%' } }>
                            <fieldset>
                                { filters[i].map((i) =>
                                    <label key={ `${i}-label` }>
                                        <input onInput={ handleSelection } type="checkbox" key={ i } name={ i } value={ i } />{ `${i}\n` }
                                    </label>)
                                }
                            </fieldset>
                        </form>
                    </div>
                </div>
            ) }
            { mount &&
                ReactDOM.createPortal(
                    selection.map(item =>
                        <StyledFilterButton key={ item.filter } className={ styles.btnWrapper }>
                            <p className={ styles.btnLabel }>{ item.filter }</p>
                            <button onClick={ handleRemoveFilter } className={ styles['btn-removeFilter'] }>x</button>
                        </StyledFilterButton>
                    )
                    , mount)
            }
        </aside>
    )
}

export default Sidebar