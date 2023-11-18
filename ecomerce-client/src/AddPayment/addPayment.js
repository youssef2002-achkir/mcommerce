// MainComponent.js
import React, { useEffect, useState } from 'react';
import PaymentModal from './paymentModal';
import { addPayment } from '../api/payament-service';
function AddPayment({orderIdentifier, rising, isPaid}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [paymentRising, setPaymentRising] = useState([]);
  const [orderIdi, setOrderIdi] = useState([]);
  
  useEffect( () => {
    setPaymentRising(rising);
    setOrderIdi(orderIdentifier);
  })

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handlePaymentSubmit = (orderId,pR, cardId) => {

    orderId = orderIdi;
    pR = paymentRising;
    console.log('Payment Details:',orderId, pR, cardId);

    addPayment(orderId, paymentRising, cardId);

    // Close the modal after submission
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}  disabled={isPaid}>Payment</button>
      <PaymentModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onPaymentSubmit={handlePaymentSubmit}
        amount={paymentRising}
        ID={orderIdi}
      />
    </div>
  );
}

export default AddPayment;
