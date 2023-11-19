


export default function Header (props) {
    
    return (
        <div>

            <h1>To jest header search</h1>
            <input onChange={ () => props.handleChange(event)}/>
        </div>
    )
}