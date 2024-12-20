import styled from 'styled-components';

const SlideFrame = styled.div`
    z-index: 9;
    overflow: hidden;
    transition: height 1s;
`

const SlideElements = styled.div`
    z-index: 0;
    overflow: hidden;
    display: flex;
    transition: transform 1s ;
`

const SlideElement = styled.div`
    padding: 1rem;
    display:flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    justify-content: start;
`

export function Slider({children, height, width, visible}) {

    const totalWidth = width * children.length;
    const transX = (visible - 2) * width;

    return (<SlideFrame style={{
        height:+height,
        width: +width,
        }}
        >
        <SlideElements style={{
            width: totalWidth,
            transform: `translateX(${transX}px)`,
        }}>
            {children.map((child) => {
                return (<SlideElement key={children.indexOf(child)} style={{width:+width}}>
                    {child}
                    </SlideElement>)
                    }
            )}
        </SlideElements>
    </SlideFrame>)
}
