import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'; // install @heroicons/react if not already
import {Container, LogoutBtn, Logo} from '../index'

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="shadow py-3 bg-white sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="ml-10">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-4 text-blue-600 font-semibold">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-4 py-2 hover:bg-blue-100 rounded-full transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden mr-2">
            <button onClick={toggleMenu} className="text-blue-600">
              {menuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden mt-4 px-4">
            <ul className="space-y-2 text-blue-600 font-semibold">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate(item.slug);
                      }}
                      className="block w-full text-left px-4 py-2 rounded hover:bg-blue-100"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
