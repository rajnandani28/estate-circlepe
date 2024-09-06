import React, { useState } from 'react';
import './PropertyRentalFlow.css';

const PropertyCard = ({ name, location, price, imageUrl, onSelect }) => (
  <div className="property-card" onClick={onSelect}>
    <img src={imageUrl} alt={name} className="property-image" />
    <div className="property-details">
      <h3 className="property-name">{name}</h3>
      <p className="property-location">{location}</p>
      <p className="property-price">₹ {price}<span className="price-period">/month</span></p>
    </div>
  </div>
);

const PropertyRentalFlow = () => {
  const [step, setStep] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    rentAmount: 0,
    securityDeposit: 0,
    totalAmount: 0
  });

  const properties = [
    { id: 1, name: "Sky Dandelions Apartment", location: "Sector 58, Gurgaon", price: "22,000", imageUrl: "https://dandelion-apartments-stabu.rigatophotels.com/data/Images/450x450w/10358/1035819/1035819553/riga-dandelion-apartments-stabu-image-1.JPEG" },

    { id: 2, name: "Wings Tower", location: "Sector 67, Gurgaon", price: "17,000", imageUrl: "https://dandelionrealestate.com/wp-content/uploads/2022/03/luxury-apartment-podgorica-3-525x328.jpg" },
    
    { id: 3, name: "Wayside Modern House", location: "Sector 80, Gurgaon", price: "15,000", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK77EfhbN5i2WVLZQ2QApIdOFI0WujseD0bZZyafKh6CDRpCQCmsYDT5pW2m4RjFw2cO4&usqp=CAU" },
  ];

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setStep(2);
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    const rentAmount = parseInt(selectedProperty.price.replace(',', '')) * period;
    const securityDeposit = rentAmount;
    setPaymentDetails({
      rentAmount,
      securityDeposit,
      totalAmount: rentAmount + securityDeposit
    });
    setStep(3);
  };

  const renderStep1 = () => (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <button className="back-button">&#x1F50D;</button>
          <h2 className="header-title">Search results</h2>
          <button className="back-button">&#x1F4E2;</button>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="gurgaon" className="search-input" />
          <span className="search-icon">&#x1F50D;</span>
        </div>
      </div>
      <div className="property-list">
        {properties.map(property => (
          <PropertyCard key={property.id} {...property} onSelect={() => handlePropertySelect(property)} />
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <button className="back-button" onClick={() => setStep(1)}>&#x2190;</button>
          <h2 className="header-title">Transaction review</h2>
        </div>
        <PropertyCard {...selectedProperty} />
        <div className="period-selection">
          <h3>Select Period</h3>
          <div>
            {[3, 6, 12].map(months => (
              <button
                key={months}
                className={`period-button ${selectedPeriod === months ? 'active' : ''}`}
                onClick={() => handlePeriodSelect(months)}
              >
                {months} months
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <button className="back-button" onClick={() => setStep(2)}>&#x2190;</button>
          <h2 className="header-title">Payment Details</h2>
        </div>
        <div className="payment-details">
          <div className="payment-row">
            <span>Rental amount</span>
            <span>₹ {paymentDetails.rentAmount.toLocaleString()}</span>
          </div>
          <div className="payment-row">
            <span>Security deposit</span>
            <span>₹ {paymentDetails.securityDeposit.toLocaleString()}</span>
          </div>
          <div className="payment-row payment-total">
            <span>Total</span>
            <span>₹ {paymentDetails.totalAmount.toLocaleString()}</span>
          </div>
        </div>
        <button className="action-button" onClick={() => setStep(4)}>
          Pay with CirclePe
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <button className="back-button" onClick={() => setStep(3)}>&#x2190;</button>
          <h2 className="header-title">Confirmation</h2>
        </div>
        <div className="confirmation">
          <div className="confirmation-icon">✓</div>
          <h3 className="confirmation-title">You're all set!</h3>
          <p className="confirmation-message">Your payment has been processed successfully.</p>
          <button className="action-button" onClick={() => setStep(1)}>
            Done
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
    </div>
  );
};

export default PropertyRentalFlow;