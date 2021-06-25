const PaymentDetail = ({ paymentDetails }) => (
  <div>
    <div className="text-xl font-semibold py-4 ">Payment Details</div>
    <div className="flex items-center justify-between ">
      <div>Card Type</div>
      <div>Visa</div>
    </div>
    <div className="flex items-center justify-between ">
      <div>Card Name</div>
      <div>{paymentDetails.nameOnCard}</div>
    </div>
    <div className="flex items-center justify-between ">
      <div>Card Number</div>
      <div>{paymentDetails.cardNumber}</div>
    </div>
    <div className="flex items-center justify-between ">
      <div>Expire Date</div>
      <div>
        {paymentDetails.expirationMonth}/{paymentDetails.expirationYear}
      </div>
    </div>
  </div>
);
export default PaymentDetail;
