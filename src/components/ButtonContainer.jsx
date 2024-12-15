export function ButtonContainer({visible=true, children}){
    return (<div className={
        visible ?
        'button-container' :
        'button-container hidden'
    }>
        {children}
    </div>)
}