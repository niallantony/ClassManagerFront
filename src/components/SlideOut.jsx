import './SlideOut.css'

export function SlideOut({children, hidden=true, width="400",}) {
    return (
        <div 
            className={ hidden ? 'slide-out hidden' : 'slide-out'}
            style={{width: width}}
            >
            {children}
        </div>
    )
}