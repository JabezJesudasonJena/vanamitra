import React from 'react';
import './Home.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // ✅ Import Link

// Reusable SVG Icon Component
const LogoIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
    </svg>
);

const FraSatyapanPage = () => {
    return (
        <div className="page-wrapper">
            <header className="main-header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo-container">
                            <LogoIcon className="logo-icon-large" />
                            <h1 className="logo-title">Vanamitra</h1>
                        </div>
                        <nav className="main-nav">
                            <a className="nav-link" href="#">Home</a>
                            <Link to="/mapdd" className='nav-link'>FRA ATLAS</Link>
                            <a className="nav-link" href="/https://github.com/JabezJesudasonJena/vanamitra">Claims</a>
                            <a className="nav-link" href="/https://github.com/JabezJesudasonJena/vanamitra">DSS</a>
                            <a className="nav-link" href="/https://github.com/JabezJesudasonJena/vanamitra">Resources</a>
                            <a className="nav-link" href="/https://github.com/JabezJesudasonJena/vanamitra">Contact</a>
                        </nav>
                        <div className="header-actions">
                            <button className="user-button">
                                <span className="material-symbols-outlined">person</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <section className="hero-section">
                    <div className="hero-bg-image" style={{ backgroundImage: 'linear-gradient(to top, rgba(17, 33, 17, 1) 0%, rgba(17, 33, 17, 0) 50%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBKQ3dFNS9bzwj74FGkS5Mb-_Km5nfOfb71A0dF41DbQ8eVpqf3ap0HLnVa-WO0KOAiK421IUwiPtLx_CpUZ_HXSJQ40Q1ELb3u4pkTO_lXQ9VygtY3sKhBe5owFqapWo81XhgbQMDEWO2HtRG5Wy1Aa9uX8ozzR_s1avae58NwT3f3a9fIQ9m2upMBWpKaMjORZZQ2tXvrpA4O24imUStjES92bP-Y19W27nSR4rNlM3Euo0uZb679FVPt4f3wCce-nWlo15IdhtIg")' }}></div>
                    <div className="hero-overlay"></div>
                    <div className="container hero-content-container">
                        <div className="hero-text-content">
                            <h1 className="hero-title">Empowering Forest Communities with AI, GIS, and Transparency</h1>
                            <p className="hero-subtitle">Leveraging cutting-edge technology to support and empower forest communities in managing their rights and resources effectively.</p>
                            <div className="hero-cta-container">
                                <Link to="/dash" className='cta-button'>FRA ATLAS</Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="features-section">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">Core Features</h2>
                            <p className="section-subtitle">A suite of tools for a transparent and efficient future.</p>
                        </div>
                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-card-image" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDfsM9kCdHPDgXt2u0HvM4Vy1zB2cxw9JqANXSiB7mznoGu4Atub8dC9_L4bPIxmVA6JPKf-MBzrn_AzyoMIuWHVdmz7iPMFBHKC8r8d8AGWv0QIx_jI1MV0inlRPUf-T7u6J-Tku2jG3bbxDtIlY2OUa-KJDUyL4svCog2oNc3pjUDPLDzDGiIAoPZsFEqVRD2vOafZjQJOVG9BJkF2zFNROp52mT-wndpzy5Ep28KR8bxjaCiv9oVgP-iOE5HEFVLf-HLHFmSvm0m")' }}></div>
                                <h3 className="feature-card-title">Digitization of FRA Claims</h3>
                                <p className="feature-card-description">Streamline claim processing for efficient management.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-card-image" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC2dFoW-UwGnWwZhy460ecrovBYyAiJmBBvV4zAOLlHLrxBHmFGyAsxW1WmZK-G9IlapS36pGyArB_6UF-Ray6INV2BIyjnUpCN76MmypuTRUxeAgEE2u_MwqTulHyz3CUuHRD8aPO9khEiEd5VjNolh1VXqi7gsaYmC4RUil-B3stnZZ6dbBOhRMjqZmGMBcVyP9gC0W35PdNHIHt9uFO0MN-bV0ej_MyA-wacZmkZmHdLeZKZt1pHly3qb1g1qcvIL-j3ywYkwtH-")' }}></div>
                                <h3 className="feature-card-title">FRA Atlas & AI Insights</h3>
                                <p className="feature-card-description">Access a comprehensive atlas with AI-driven insights.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-card-image" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCF7VqywDn9gwCNxbMLYw2wcrsbV2Hs55YAICKezJoxC9rNZdEbBZvrrzi1KNoH3hVhIG5bZRkPyP2EK__fagHUcDhHdq7iYjq8zXHc5XK1yDKM6xJAPbKKs0tbXO__mtfrQM35dKfRuKu6m0cswSnW6EftBp8eHl-8KxmZ-Hpj9--_SOUbGucutlYeyl6oS91iVMee_VN5jkLbRw7oEkrZ3WByacJY6FUXSH5GQQvGEJiP8gDCiv-NB7F3DrhGj3FACs0dKLJDVApC")' }}></div>
                                <h3 className="feature-card-title">WebGIS Portal</h3>
                                <p className="feature-card-description">Explore an interactive portal for visualizing spatial data.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-card-image" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuADOEM6y-Yx9c3wdkMhkTYebsbatCEXT62hgqvX5jHideOySdehyFRtSLaiMvTlhugJis8OISAP2EJr802jkGTWK5AQrVjgVP3f0-YKN4yRpVG-N9RPQLLpnO1rvHSIDGYwkOgWU3d11S3a5ebgdvPRuJlLv_l1ZtXkQoBtMK0XKWcnhkckRPx74j9Se7CFLnlFakkt7zZmRHZ5F0SZLh5dlyD6dZke6vgoKdvZhlh9jIXAo2CNRFSHnFP2zyqm2GTCwz41lDs5W-cq")' }}></div>
                                <h3 className="feature-card-title">Remote Sensing & AI/ML</h3>
                                <p className="feature-card-description">Utilize advanced tech for monitoring forest cover.</p>
                            </div>
                            <div className="feature-card">
                                <div className="feature-card-image" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBTENgq8tgYpjdWIb9hFXX6kh2kO552XaKMCQV1tSeU6N1R3VPOPW2NlZfmvu9aSgM6JM9wspehq_RYxVqkGnjmZaWQpRyBLUoDJeK76p8suoswKQr2kfFSRDvMaR1Q3WhlPL_Om8mx1k7_DOx9f6y0b6rzUx9_BRqfoqEJ-zdgyXd8GemH7hDx1dSTZiMwRjQXHFepnuna6ees5yhkmW9a0EJ4YFg0i9uqGnIsegGlgZiJ4m15F1MIB63KNlba5hfRx39b5aPp4GkO")' }}></div>
                                <h3 className="feature-card-title">Decision Support System</h3>
                                <p className="feature-card-description">Leverage a DSS for informed resource management.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="impact-section">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">Impact Metrics</h2>
                            <p className="section-subtitle">Quantifying our commitment to community empowerment.</p>
                        </div>
                        <div className="impact-grid">
                            <div className="impact-card">
                                <p className="impact-number">12,500+</p>
                                <p className="impact-label">Claims Digitized</p>
                            </div>
                            <div className="impact-card">
                                <p className="impact-number">350+</p>
                                <p className="impact-label">Villages Covered</p>
                            </div>
                            <div className="impact-card">
                                <p className="impact-number">8,000+</p>
                                <p className="impact-label">Tribal Households Benefited</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="main-footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <div className="logo-container">
                                <LogoIcon className="logo-icon-small" />
                                <p className="footer-logo-text">FRA-SATYAPAN</p>
                            </div>
                            <p className="footer-tagline">Built with AI & GIS for Social Justice and Empowerment.</p>
                        </div>
                        <div className="footer-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms</a>
                            <a href="#">Help Center</a>
                            <a href="https://github.com/JabezJesudasonJena/vanamitra">GitHub Repo</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FraSatyapanPage;