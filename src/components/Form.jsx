export function Form({method, children}) {
    return (<form method={method}>
        {children}
    </form>)
}

export function TextInput({type="text", id, value, onChange, text, error}) {
    return(
        <>
        <label htmlFor={id}> {text}
        </label>
        <input 
            id={id}
            name={id} 
            type={type} 
            value={value} 
            onChange={(event) => onChange(event.target.value)}
            />
        <p className="error">{error}</p>
        </>
    )
}

export function TableTextInput({type="text", id, value, onChange, text, error}) {
    return(
        <div>
            <label htmlFor={id}> {text}
            </label>
            <input 
            id={id}
            name={id} 
            type={type} 
            value={value} 
            onChange={(event) => onChange(event.target.value)}
            />
            <p className="error">{error}</p>
        </div>
    )
}