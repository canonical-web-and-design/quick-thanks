import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Canonical Quick Thanks
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  return (
    <header id="navigation" className="p-navigation">
      <div className="p-navigation__row">
        <div className="p-navigation__banner">
          <div className="p-navigation__logo">
            <li className="p-navigation__item">
              <img
                className="p-navigation__image"
                src="https://assets.ubuntu.com/v1/5d6da5c4-logo-canonical-aubergine.svg"
                alt="Canonical"
                width="95"
              />
            </li>
          </div>
          <a
            href="#navigation"
            className="p-navigation__toggle--open"
            title="menu"
          >
            Menu
          </a>
          <a
            href="#navigation-closed"
            className="p-navigation__toggle--close"
            title="close menu"
          >
            Close menu
          </a>
        </div>

        <nav className="p-navigation__nav" aria-label="Example main navigation">
          <ul className="p-navigation__items">
            <li className="p-navigation__item is-selected">
              <a className="p-navigation__link" href="/">
                Quick Thanks
              </a>
            </li>
          </ul>
        </nav>
        <ul className="p-navigation__items">
          <li className="p-navigation__item">
            {status === 'authenticated' ? (
              <a className="p-navigation__link" onClick={() => signOut()}>
                Log out ({session.user.name})
              </a>
            ) : (
              <a className="p-navigation__link" href="/api/auth/signin">
                Log in
              </a>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
