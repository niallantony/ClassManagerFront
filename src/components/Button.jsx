import './Button.css'

export function Button({onClick, text, type="button", main=false}) {
    const handleClick = (e) => {
        e.preventDefault();
        onClick()
    }
    return (<button onClick={handleClick} type={type} className={main ? 'main' : ''}>{text}</button>)

}