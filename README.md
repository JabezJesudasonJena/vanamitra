# Rural Project

## Project Document: Vanamitra

### 1. Project Title  
**FRA-SATYAPAN: AI-Powered Atlas and Decision Support System for Forest Rights Act Implementation.**  

### 2. Vision Statement  
To ensure social justice for India's forest-dwelling communities through a transparent, evidence-based, and AI-driven platform that accelerates and validates the implementation of the Forest Rights Act (FRA).  

### 3. Problem Statement  
This project directly addresses **SIH12508**: "Development of AI-powered FRA Atlas and WebGIS-based Decision Support System (DSS) for Integrated Monitoring of Forest Rights Act (FRA) Implementation."  

The core challenge is that the FRA implementation process is often slow, disputed, and lacks objective, scientific evidence to verify historical land claims made by tribal communities. This leads to the wrongful rejection of legitimate claims and erodes trust. Our platform aims to solve this by providing tools for evidence-based verification, transparent monitoring, and intelligent decision support.  

### 4. Proposed Solution  
FRA-SATYAPAN is a multi-layered platform that combines a WebGIS Atlas for officials with a mobile app for community engagement. Its core innovation lies in using AI to analyze historical satellite data to verify claims, blockchain to secure community-reported evidence, and machine learning to provide predictive insights for better decision-making.  

### 5. Core Features  

#### Web Platform for Officials  
- **Interactive FRA Atlas:** A dynamic WebGIS map displaying all land parcels with their current status (Claimed, Approved, Rejected).  
- **Centralized Claims Management:** A dashboard to track and manage the entire lifecycle of each land claim.  
- **Secure Document Repository:** A system to digitally store and manage all legal documents associated with each claim.  
- **AI-Powered Historical Land Use Verification:** The standout feature. An AI tool that analyzes decades of satellite imagery for a claimed area and generates a "Claim Authenticity Score" with a visual timeline.  
- **Predictive Livelihood Impact Score:** An AI module that analyzes multiple datasets to predict the socio-economic impact of granting rights in a specific area, helping officials prioritize claims.  
- **Automated Encroachment Detection:** An AI system that continuously monitors current satellite imagery of granted lands and automatically flags unauthorized activities.  

#### Mobile App for Community Engagement  
- **Blockchain-Verified Evidence Submission:** An interface for community members to capture and submit geotagged, time-stamped photo/video evidence, with its digital hash secured on a blockchain for integrity.  
- **Real-Time Claim Status Tracking:** Allows applicants to securely track the live status of their submitted land claims.  
- **Secure Grievance Redressal Portal:** A direct channel for community members to file and track grievances.  

### 6. Technology Stack  

- **AI & Data Processing:**  
  - Language: Python  
  - Libraries: PyTorch, TensorFlow, Rasterio, GeoPandas, GDAL  
  - Data: Free data from USGS (Landsat) and ESA (Sentinel)  
  - Training: Google Colab or Kaggle Notebooks (Free GPU)  

- **Backend:**  
  - Framework: FastAPI (Python)  
  - Database: PostgreSQL with PostGIS extension  
  - Hosting: Render or Heroku (Free Tier)  

- **Frontend:**  
  - Framework: React.js  
  - Mapping Library: Leaflet.js  
  - Hosting: Vercel or Netlify (Free Tier)  

- **Blockchain:**  
  - Platform: Ethereum Testnet (Sepolia)  
  - Language: Solidity  
  - Development: Hardhat  

- **Mobile App:**  
  - Framework: Flutter or React Native  


### 8. Impact & Scalability  
This project directly empowers government officials with transparent, data-driven tools to implement the Forest Rights Act more effectively, ensuring social justice for tribal communities. Post-hackathon, the platform can be scaled to cover all states, integrate more complex datasets, and serve as a foundational tool for sustainable forest management and tribal welfare policies across India.  
