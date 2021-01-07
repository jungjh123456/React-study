import ReactDOM from 'react-dom';

const Modal = ({children}) => ReactDOM.createPortal(children, document.querySelector('#modal'));

export default Modal;

// <Modal><div>모달</div></Modal>