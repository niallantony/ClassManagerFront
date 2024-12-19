import './Modal.css'

export function Modal({children}) {

    return(
        <dialog open="true">
            {children}
        </dialog>
    )
}