import React from 'react';
import './ClaimStatusGrid.css'; // This will now contain styles for both navbar and grid

const mockClaimData = [
  {
    id: 1,
    claimantName: 'Aarav Kumar',
    coordinates: { lat: 13.0827, lon: 80.2707 },
    status: 'Approved',
  },
  {
    id: 2,
    claimantName: 'Priya Sharma',
    coordinates: { lat: 13.3409, lon: 77.5946 },
    status: 'Pending',
  },
  {
    id: 3,
    claimantName: 'Rohan Das',
    coordinates: { lat: 12.9716, lon: 77.5946 },
    status: 'Rejected',
  },
  {
    id: 4,
    claimantName: 'Sunita Devi',
    coordinates: { lat: 13.0000, lon: 80.2707 },
    status: 'Approved',
  },
  {
    id: 5,
    claimantName: 'Vikram Singh',
    coordinates: { lat: 12.8716, lon: 77.4946 },
    status: 'Pending',
  },
  {
    id: 6,
    claimantName: 'Anjali Mehta',
    coordinates: { lat: 13.1827, lon: 80.1707 },
    status: 'Approved',
  },
  {
    id: 7,
    claimantName: 'Suresh Patil',
    coordinates: { lat: 12.9545, lon: 77.3509 },
    status: 'Rejected',
  },
  {
    id: 8,
    claimantName: 'Meena Iyer',
    coordinates: { lat: 13.0878, lon: 80.2785 },
    status: 'Pending',
  },
  {
    id: 9,
    claimantName: 'Rajesh Gupta',
    coordinates: { lat: 12.9141, lon: 77.6369 },
    status: 'Approved',
  },
];

const ClaimStatusGrid = () => {
  return (
    // Use a React Fragment <> to return multiple elements
    <>
      {/* --- NAVBAR CODE STARTS HERE --- */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <svg
              className="logo-icon"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <h1 className="title">VANAMITRA</h1>
        </div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/map">FRA Atlas</a>
          <a href="/claims" className="active">
            Claims
          </a>
        </nav>
        <div className="header-right">
          <button className="icon-btn">🔔</button>
          <div
            className="avatar"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-15357138T5002-d1d0cf377fde?w=400&q=80")`,
            }}
          ></div>
        </div>
      </header>
      {/* --- NAVBAR CODE ENDS HERE --- */}

      {/* --- GRID CODE STARTS HERE --- */}
      <div className="claim-grid-container">
        {mockClaimData.map((claim) => (
          <div className="claim-card" key={claim.id}>
            <div className="map-display">
              <img src="/map-placeholder.png" alt={`Map view of claim`} />
            </div>
            <div className="card-content">
              <h3>{claim.claimantName}</h3>
              <p className="coordinates">
                Coordinates: {claim.coordinates.lat.toFixed(4)}, {claim.coordinates.lon.toFixed(4)}
              </p>
              <div className={`status-badge status-${claim.status.toLowerCase()}`}>
                {claim.status}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* --- GRID CODE ENDS HERE --- */}
    </>
  );
};

export default ClaimStatusGrid;