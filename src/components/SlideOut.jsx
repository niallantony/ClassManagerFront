import './SlideOut.css'

export function SlideOut({children, hidden=true}) {
    return (
        <div className={ hidden ? 'slide-out hidden' : 'slide-out'}>
            {children}
        </div>
    )
}