import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import Astone from "../../assets/Astone.svg";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // React Router's navigate hook
  const dropdownRefs = useRef([]); // Refs for dropdowns

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Using React Router's navigate method
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const dropdown = dropdownRefs.current[index];
      if (dropdown) {
        const firstLink = dropdown.querySelector("a");
        firstLink?.focus();
      }
    }
  };

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/shop", label: "Shop" },
    {
      href: "/categories",
      label: "Categories",
      subLinks: [
        { href: "/categories/hair", label: "Hair" },
        { href: "/categories/watches", label: "Watches" },
        { href: "/categories/jewelries", label: "Jewelries" },
        { href: "/categories/fashion", label: "Fashion" },
      ],
    },
    { href: "/vendors", label: "Vendors" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="header">
      {/* Top Bar */}
      <div className={`header-top ${menuOpen ? "hide" : ""}`}>
        <p>
          <span className="highlight">FREE</span> Express Shipping on orders over NGN100,000.00
        </p>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-top">
          {/* Hamburger for Mobile */}
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="navbar-menu"
          >
            {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>

          {/* Logo */}
          <div className={`logo ${menuOpen ? "hide" : ""}`}>
            <img src={Astone} alt="ShopEasy Logo" />
          </div>

          {/* Search Bar */}
          <div className={`search-bar ${menuOpen ? "hide" : ""}`}>
            <label htmlFor="search-input" className="visually-hidden"></label>
            <input
              id="search-input"
              type="text"
              placeholder="Searching for..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
            <button aria-label="Search" onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>

          {/* Icons */}
          <div className={`nav-icons ${menuOpen ? "hide" : ""}`}>
            <Link to="/wishlist">
              <FaHeart />
            </Link>
            <Link to="/cart">
              <FaShoppingCart />
            </Link>
            <Link to="/profile">
              <FaUser />
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        {menuOpen && (
          <div id="navbar-menu" className="navbar-open">
            <div className="search-bar-mobile">
              <label htmlFor="mobile-search-input" className="visually-hidden">Search</label>
              <input
                id="mobile-search-input"
                type="text"
                placeholder="Searching for..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
              <button aria-label="Search" onClick={handleSearch}>
                <FaSearch />
              </button>
            </div>
            <ul className="nav-links-open">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  className={link.subLinks ? "dropdown" : ""}
                  onKeyDown={(e) => link.subLinks && handleKeyDown(e, index)}
                  ref={(el) => (dropdownRefs.current[index] = el)}
                >
                  <Link to={link.href} aria-haspopup={!!link.subLinks}>
                    {link.label} {link.subLinks && <FaChevronDown />}
                  </Link>
                  {link.subLinks && (
                    <ul className="dropdown-menu" role="menu">
                      {link.subLinks.map((subLink) => (
                        <li key={subLink.href}>
                          <Link to={subLink.href}>{subLink.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="nav-bottom">
          <ul className="nav-links">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                className={link.subLinks ? "dropdown" : ""}
                onKeyDown={(e) => link.subLinks && handleKeyDown(e, index)}
                ref={(el) => (dropdownRefs.current[index] = el)}
              >
                <Link to={link.href} aria-haspopup={!!link.subLinks}>
                  {link.label} {link.subLinks && <FaChevronDown />}
                </Link>
                {link.subLinks && (
                  <ul className="dropdown-menu" role="menu">
                    {link.subLinks.map((subLink) => (
                      <li key={subLink.href}>
                        <Link to={subLink.href}>{subLink.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;