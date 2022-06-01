import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { FaHamburger } from "react-icons/fa";
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";
import MedusaLogo from "../../public/medusa-logo.svg";
import styles from "../../styles/nav-bar.module.css";
import { quantity, sum } from "../../utils/helper-functions";
import NavLinks from "./nav-links";

export const NavBar = () => {
  const { updateCartViewDisplay } = useContext(DisplayContext);
  const { cart } = useContext(StoreContext);
  const [isCheckout, setIsCheckout] = useState(true);
  const [navbar, setNavbar] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/checkout" || router.pathname === "/payment") {
      setIsCheckout(true);
    } else {
      setIsCheckout(false);
    }
  }, [router.pathname]);

  const handleHamburgur = () => {
    setNavbar(!navbar);
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <a style={{ width: "125px" }}>
          <Image src={MedusaLogo} height="40px" width="100%" alt="logo" />
        </a>
      </Link>
      <div className={styles.navBtnContainer}>
        <div className={styles.navLinks}>
          <NavLinks></NavLinks>
        </div>
        {navbar ? (
          <div className={styles.navLinksSm}>
            <NavLinks></NavLinks>
          </div>
        ) : null}
        <div className={styles.hamburgurBtn} onClick={() => handleHamburgur()}>
          <FaHamburger></FaHamburger>
        </div>
        {!isCheckout ? (
          <button
            className={styles.btn}
            onClick={() => updateCartViewDisplay()}
          >
            <BiShoppingBag />{" "}
            <span>
              {cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0}
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
