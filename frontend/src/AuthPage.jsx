import React from "react";
import "./Auth.css";

const AuthPage = () => {
  return (
    <div className="auth-container">
      <div className="auth-background"></div>

      <div className="auth-wrapper">
        <div className="auth-box">
          {/* Header */}
          <header className="auth-header">
            <div className="auth-logo">
              <svg
                className="logo-icon"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                />
              </svg>
              <h1>FRA-SATYAPAN</h1>
            </div>
            <p>Welcome to AI-Powered FRA Atlas & Decision Support System</p>
          </header>

          {/* Tabs */}
          <div className="auth-tabs">
            <button className="tab">Sign In</button>
            <button className="tab active-tab">Sign Up</button>
          </div>

          {/* Form */}
          <div className="auth-form">
            {/* Role */}
            <div className="role-section">
              <p>Select your role:</p>
              <div className="role-options">
                <input defaultChecked id="role-tribal" name="role" type="radio" />
                <label htmlFor="role-tribal">Tribal Community Member</label>

                <input id="role-ngo" name="role" type="radio" />
                <label htmlFor="role-ngo">NGO / Researcher</label>

                <input id="role-gov" name="role" type="radio" />
                <label htmlFor="role-gov">Government Official</label>
              </div>
            </div>

            {/* Inputs */}
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />

            {/* Submit */}
            <button className="btn-primary">Sign Up</button>

            {/* Divider */}
            <div className="divider">
              <hr />
              <span>Or sign up with</span>
              <hr />
            </div>

            {/* Google button */}
            <button className="btn-google">
              <svg
                fill="currentColor"
                height="24"
                viewBox="0 0 256 256"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z"></path>
              </svg>
              Sign up with Google
            </button>
          </div>

          {/* Footer */}
          <footer className="auth-footer">
            <a href="#">Forgot Password?</a>
            <a href="#">Need Help?</a>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
