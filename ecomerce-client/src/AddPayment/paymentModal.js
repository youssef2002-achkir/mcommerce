import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './paymentModal.css'; // Import your CSS file

Modal.setAppElement('#root');

function PaymentModal({ isOpen, onRequestClose, onPaymentSubmit, amount, ID }) {
  const [paymentRising, setPaymentRising] = useState('');
  const [cardId, setCardId] = useState('');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    setOrderId(ID);
    setPaymentRising(amount);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onPaymentSubmit(orderId, paymentRising, cardId);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Custom Modal" className="modal">
      <div className="modal-content">
        <h2 className="modal-title">Add Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label>Order Identifier:</label>
            <p>{orderId}</p>
          </div>
          <div className="modal-field">
            <label>Payment Rising:</label>
            <p>${paymentRising}</p>
          </div>
          <div className="modal-field">
            <label>Card ID:</label>
            <input
              type="text"
              value={cardId}
              onChange={(e) => setCardId(e.target.value)}
              className="modal-input"
            />
          </div>
          <button type="submit" className="modal-button">Submit Payment</button>
        </form>
      </div>
    </Modal>
  );
}

export default PaymentModal;
