import logo from '../assets/logo.png'


export default function Header (props) {
    
    return (
        <div className='searchBar'>

            <div className='logo'>
                <img src={logo} />
            </div>
            <div className='inputBox'>
                <input onChange={ () => props.handleChange(event)}/>
            </div>
            <h2> Filters</h2>
        </div>
    )
}