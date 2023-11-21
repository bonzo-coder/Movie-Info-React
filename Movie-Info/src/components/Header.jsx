import logo from '../assets/logo.png'
import React from 'react';


export default function Header (props) {
    
    const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

    return (
        <div className='searchBar'>

            <div className='logo'>
                <img src={logo} />
            </div>
            <div className='inputBox'>
                <input type="text" placeholder="Search"  ref={inputRef} onChange={ () => props.handleChange(event)} className="custom-input"/>
            </div>
            <h2> Filters</h2>
        </div>
    )
}