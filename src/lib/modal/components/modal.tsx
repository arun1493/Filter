import React from 'react';
import {createPortal} from 'react-dom';
import {ModalBackdrop, ModalContent} from './atoms';

const modalRoot = document.getElementById('modal');

interface Props {
    show: boolean;
    close: () => void;
}

class Modal extends React.Component<Props, {}> {
    private readonly element: HTMLDivElement;

    constructor(props: Props | Readonly<Props>) {
        super(props);
        // We create an element div for this modal
        this.element = document.createElement('div');
    }

    componentDidMount() {
        if (modalRoot) {
            modalRoot.appendChild(this.element);
        }
    }

    /**
     * We remove the created div when this Modal Component is unmounted
     * Used to clean up the memory to avoid memory leak
     */
    componentWillUnmount() {
        if (modalRoot) {
            modalRoot.removeChild(this.element);
        }
    }

    render() {
        const {show, close, children} = this.props;
        return show ? createPortal(<ModalBackdrop onClick={close}>
            <ModalContent
                onClick={e => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                {children}
            </ModalContent>
        </ModalBackdrop>, this.element) : null;
    }
}

export default Modal;