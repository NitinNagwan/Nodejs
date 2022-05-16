import React, { useRef } from "react";
import {
  FaIgloo,
  FaQuestionCircle,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import { HiChartSquareBar } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { changeTab } from "../redux/Actions/tabAction";

const menu = [
  {
    menuItem: "Dashboard",
    Icon: <FaIgloo />,
  },
  {
    menuItem: "Chart",
    Icon: <HiChartSquareBar />,
  },
  {
    menuItem: "Students",
    Icon: <FaUsers />,
  },
  {
    menuItem: "New Question",
    Icon: <FaQuestionCircle />,
  },
];

export default function SideNav() {
  const dispatch = useDispatch();
  const ref = useRef();
  const handleTabs = (value) => {
    // console.log(value);

    console.log(value)
    // dispatch(changeTab(value));
  };

  return (
    <>
      <section id="side-content">
        <i className="la-times-circle">
          <FaTimesCircle />
        </i>
        <div className="logo">
          <img className="image" src="/images/nitin.jpg" alt="no image" />
          <h3>Nitin Nagwan</h3>
        </div>
        <div className="items">
          <ul>
            {menu.map((item, index) => {
              return (
                <li key={index}>
                  <i className="las la-images"> {item.Icon}</i>
                  <span
                    style={{ color: "#eee" }}
                    defaultValue={item.menuItem}
                   
                    onClick={(e) =>
                      handleTabs(e.target.textContent)
                    }
                  >
                    {item.menuItem}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
