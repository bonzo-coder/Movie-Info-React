/* eslint-disable react/prop-types */
import logo from '../assets/logo.png'
import React from 'react';

export default function Header (props) {
    
    const inputRef = React.useRef(null);

    React.useEffect(() => {
        if (inputRef.current) {
        inputRef.current.focus();
        }
    }, []);

    function refreshPage() {
        window.location.reload(false);
      }

    return (
        <div className='searchBar'>
            <div className='logo' value='' onClick={refreshPage}>
                <img src={logo} />
            </div>
            <div className='inputs'>
                <div className='inputBox'>
                    <input type="text" placeholder="Search"  ref={inputRef} onChange={ () => props.handleChange(event)} className="custom-input"/>
                </div>
                <div className="custom-select">
                    <select className="select" onChange={() => props.handleSearchType(event)}>
                        <option value="movie">Movie</option>
                        <option value="person">Actor</option>
                    </select>
                </div>
            </div>
        </div>
    )
}