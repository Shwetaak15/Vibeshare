const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light sticky-top glass-nav py-2.5">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#top">
          <i className="bi bi-share-fill me-2 fs-5 text-indigo" style={{ color: '#4f46e5' }}></i>
          <span className="brand-logo-text fs-4">VibeShare</span>
        </a>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-3 mt-2 mt-md-0">
            <li className="nav-item">
              <a className="nav-link fw-semibold text-dark py-1" href="#create-post-section">
                <i className="bi bi-plus-square-fill me-1"></i> Create Post
              </a>
            </li>
            <li className="nav-item d-none d-md-block">
              <div className="vr h-100 mx-1 text-secondary" style={{ minHeight: '20px' }}></div>
            </li>
            <li className="nav-item d-flex align-items-center gap-2">
              <div className="navbar-user-avatar">
                U
              </div>
              <div className="d-none d-lg-block">
                <div className="fw-semibold lh-1" style={{ fontSize: '0.85rem' }}>Current User</div>
                <span className="text-muted" style={{ fontSize: '0.75rem' }}>@user</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
