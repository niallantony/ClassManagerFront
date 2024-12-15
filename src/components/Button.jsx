export function Button({onClick, text, type="button"}) {
    const handleClick = (e) => {
        e.preventDefault();
        onClick()
    }
    return (<button onClick={handleClick} type={type}>{text}</button>)

}