import './Slider.css'

export function Slider({children, height, width, visible}) {

    const totalWidth = width * children.length;
    const transX = (visible - 2) * width;

    return (<div className="slide-frame" style={{
        height:+height,
        width: +width,
        }}
        >
        <div className="slide-elements" style={{
            width: totalWidth,
            transform: `translateX(${transX}px)`,
        }}>
            {children.map((child) => {
                return (<div key={children.indexOf(child)} className="slide-element" style={{width:+width}}>
                    {child}
                    </div>)
                    }
            )}
        </div>
    </div>)
}