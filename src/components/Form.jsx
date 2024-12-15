export function Form({method, children}) {
    return (<form method={method}>
        {children}
    </form>)
}

export function TextInput({type="text", id, value, onChange, text, error}) {
    return(
        <>
        <label htmlFor={id}> {text}
            <input 
                id={id}
                name={id} 
                type={type} 
                value={value} 
                onChange={(event) => onChange(event.target.value)}
                />
        </label>
        <p>{error}</p>
        </>
    )
}