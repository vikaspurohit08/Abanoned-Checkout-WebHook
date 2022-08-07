import cssClasses from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

const MainNavigation = (props) => {
  return (
    <header className={cssClasses.header}>
      <div className={cssClasses.logo}>SHOP</div>
      <nav className={cssClasses.nav}>
        <div>
          <ul>
            <li>
              <NavLink className={cssClasses.a} to="/checkout">
                Checkout
              </NavLink>
            </li>
            <li>
              <NavLink className={cssClasses.a} to="/notifications">
                Notifications
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
