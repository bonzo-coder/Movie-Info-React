import logo from '../assets/logo.png'
import React from 'react';

export default function Header (props) {
    
    const inputReference = React.useRef(null);

    React.useEffect(() => {
        inputReference.current.focus();
    }, [])

    return (
        <div className='searchBar'>

            <div className='logo'>
                <img src={logo} />
            </div>
            <div className='inputBox'>
                <input type="text" placeholder="Search"  ref={inputReference} onChange={ () => props.handleChange(event)}/>
            </div>
            <h2> Filters</h2>
        </div>
    )
}