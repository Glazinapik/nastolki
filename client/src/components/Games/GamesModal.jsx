import { useState } from "react";
import { Modal } from "react-bootstrap";

function GamesModal({ children, title, img, text }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span variant="primary" onClick={handleShow}>
        {children}
      </span>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className="oneGameModal">
            <div className="game-title">{title}</div>
            <div><img className='game-img' src={img} alt="" /></div>
            <div>{text}</div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default GamesModal;