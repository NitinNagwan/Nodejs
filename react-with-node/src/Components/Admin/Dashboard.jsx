import React from "react";
import "../css/main1.css";
import {
  FaAddressCard,
  FaBars,
  FaBell,
  FaDollarSign,
  FaGifts,
  FaIgloo,
  FaImages,
  FaKey,
  FaQuestionCircle,
  FaSearch,
  FaSearchengin,
  FaServicestack,
  FaShoppingCart,
  FaTimesCircle,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { GrGallery, HiChartSquareBar } from "react-icons/hi";
import { BsKey } from "react-icons/bs";
import {
  BellOutlined,
  KeyOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { changeTab } from "../redux/Actions/tabAction";
import SideNav from "./SideNav";
const handleLogout = () => {
  sessionStorage.clear();
  window.location.reload();
};

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

const userAction = [
  {
    menuItem: "Profile",
    Icon: <UserOutlined />,
  },
  {
    menuItem: "Change Password",
    Icon: <BsKey />,
  },
  {
    menuItem: "Logout",
    Icon: <LogoutOutlined />,
  },
];

export default function Dashboard() {
  const tab = useSelector((state) => state.tabs.tab);
  const dispatch = useDispatch();
  console.log(tab);

  const handleTabs = (value) => {
    console.log(value);
    dispatch(changeTab(value));
  };

  return (
    <>
      <div style={{ background: "lightgray", width: "100%" }}>
        <div className="sidebar">
          <SideNav/>
        </div>
        {/* <section id="side-content">
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
                      onClick={(e) => handleTabs(e.target.__reactProps$iwi7fmhty.defaultValue)}
                    >
                      {item.menuItem}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section> */}
        <section id="interaction">
          <nav>
            <i className="las la-bars Bars">
              <FaBars />
            </i>
            <label className="search">
              <i className="las la-search">
                <FaSearch />
              </i>
              <input type="text" placeholder="Search here" />
            </label>

            <div className="user-content">
              <i className="las la-bell">
                <BellOutlined />
              </i>
              <img className="image" src="/images/nitin.jpg" alt="no image" />
              <div className="tooltip">
                <ul>
                  {userAction.map((item, index) => {
                    return (
                      <li>
                        <i className="las la-user">{item.Icon}</i>
                        <span style={{ color: "#eee" }}> {item.menuItem} </span>
                      </li>
                    );
                  })}
                </ul>
                <div className="color-theme">
                  <div style={{ backgroundColor: "red" }}></div>
                  <div style={{ backgroundColor: "blue" }}></div>
                  <div style={{ backgroundColor: "blue" }}></div>
                  <div style={{ backgroundColor: "goldenrod" }}></div>
                </div>
              </div>
            </div>
          </nav>
          <h3>Dashboard</h3>
          <div className="cards">
            <div className="card">
              <i className="las la-users">
                <FaUsers style={{ width: "50px" }} />
              </i>
              <div className="details">
                <h4>8,234</h4>
                <span>New Users</span>
              </div>
            </div>
            <div className="card">
              <i className="las la-shopping-cart">
                <FaShoppingCart style={{ width: "50px" }} />
              </i>
              <div className="details">
                <h4>100,234</h4>
                <span>Total Orders</span>
              </div>
            </div>
            <div className="card">
              <i className="las la-gift">
                <FaGifts style={{ width: "50px" }} />
              </i>
              <div className="details">
                <h4>213,453</h4>
                <span>Product Sell</span>
              </div>
            </div>
            <div className="card">
              <i className="las la-dollar-sign">
                <FaDollarSign style={{ width: "50px" }} />
              </i>
              <div className="details">
                <h4>62,000</h4>
                <span>This Month</span>
              </div>
            </div>
          </div>
          <div className="board">
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Title</td>
                  <td>Status</td>
                  <td>Role</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="people">
                    <img src="/images/nitin.jpg" alt="no image" />
                    <div className="people-dis">
                      <h5>John doe</h5>
                      <p>john@example.com</p>
                    </div>
                  </td>
                  <td className="people-des">
                    <h5>software Engineer</h5>
                    <p>Web Dev</p>
                  </td>
                  <td className="active">
                    <p>Active</p>
                  </td>
                  <td className="role">
                    <p>Owner</p>
                  </td>
                  <td className="edit">
                    <a href="#">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td className="people">
                    <img src="/images/nitin.jpg" alt="no image" />
                    <div className="people-dis">
                      <h5>Martin</h5>
                      <p>martin@example.com</p>
                    </div>
                  </td>
                  <td className="people-des">
                    <h5>Tecnicial</h5>
                    <p>Hardware</p>
                  </td>
                  <td className="active">
                    <p>Active</p>
                  </td>
                  <td className="role">
                    <p>Owner</p>
                  </td>
                  <td className="edit">
                    <a href="#">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td className="people">
                    <img src="/images/nitin.jpg" alt="no image" />
                    <div className="people-dis">
                      <h5>Andrew</h5>
                      <p>andrew@example.com</p>
                    </div>
                  </td>
                  <td className="people-des">
                    <h5>software Engineer</h5>
                    <p>Web Dev</p>
                  </td>
                  <td className="active">
                    <p>Active</p>
                  </td>
                  <td className="role">
                    <p>Owner</p>
                  </td>
                  <td className="edit">
                    <a href="#">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td className="people">
                    <img src="/images/nitin.jpg" alt="no image" />
                    <div className="people-dis">
                      <h5>Domnic</h5>
                      <p>domnic@example.com</p>
                    </div>
                  </td>
                  <td className="people-des">
                    <h5>IT Consultant</h5>
                    <p>Devops</p>
                  </td>
                  <td className="active">
                    <p>Active</p>
                  </td>
                  <td className="role">
                    <p>Owner</p>
                  </td>
                  <td className="edit">
                    <a href="#">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td className="people">
                    <img src="/images/nitin.jpg" alt="no image" />
                    <div className="people-dis">
                      <h5>Martha</h5>
                      <p>martha@example.com</p>
                    </div>
                  </td>
                  <td className="people-des">
                    <h5>Hiring Recrute</h5>
                    <p>HR</p>
                  </td>
                  <td className="active">
                    <p>Active</p>
                  </td>
                  <td className="role">
                    <p>Owner</p>
                  </td>
                  <td className="edit">
                    <a href="#">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td className="people">
                    <img src="/images/nitin.jpg" alt="no image" />
                    <div className="people-dis">
                      <h5>Aelly</h5>
                      <p>aelly@example.com</p>
                    </div>
                  </td>
                  <td className="people-des">
                    <h5>software Engineer</h5>
                    <p>Web Dev</p>
                  </td>
                  <td className="active">
                    <p>Active</p>
                  </td>
                  <td className="role">
                    <p>Owner</p>
                  </td>
                  <td className="edit">
                    <a href="#">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td className="people">
                    <img src="/images/nitin.jpg" alt="no /image" />
                    <div className="people-dis">
                      <h5>Linda</h5>
                      <p>linda@example.com</p>
                    </div>
                  </td>
                  <td className="people-des">
                    <h5>Java Developer</h5>
                    <p>Android</p>
                  </td>
                  <td className="active">
                    <p>Active</p>
                  </td>
                  <td className="role">
                    <p>Owner</p>
                  </td>
                  <td className="edit">
                    <a href="#">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td className="people">
                    <img src="/images/nitin.jpg" alt="no /image" />
                    <div className="people-dis">
                      <h5>Linda</h5>
                      <p>linda@example.com</p>
                    </div>
                  </td>
                  <td className="people-des">
                    <h5>Java Developer</h5>
                    <p>Android</p>
                  </td>
                  <td className="active">
                    <p>Active</p>
                  </td>
                  <td className="role">
                    <p>Owner</p>
                  </td>
                  <td className="edit">
                    <a href="#">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td className="people">
                    <img src="/images/nitin.jpg" alt="no /image" />
                    <div className="people-dis">
                      <h5>Linda</h5>
                      <p>linda@example.com</p>
                    </div>
                  </td>
                  <td className="people-des">
                    <h5>Java Developer</h5>
                    <p>Android</p>
                  </td>
                  <td className="active">
                    <p>Active</p>
                  </td>
                  <td className="role">
                    <p>Owner</p>
                  </td>
                  <td className="edit">
                    <a href="#">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td className="people">
                    <img src="/images/nitin.jpg" alt="no /image" />
                    <div className="people-dis">
                      <h5>Linda</h5>
                      <p>linda@example.com</p>
                    </div>
                  </td>
                  <td className="people-des">
                    <h5>Java Developer</h5>
                    <p>Android</p>
                  </td>
                  <td className="active">
                    <p>Active</p>
                  </td>
                  <td className="role">
                    <p>Owner</p>
                  </td>
                  <td className="edit">
                    <a href="#">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td className="people">
                    <img src="/images/nitin.jpg" alt="no /image" />
                    <div className="people-dis">
                      <h5>Linda</h5>
                      <p>linda@example.com</p>
                    </div>
                  </td>
                  <td className="people-des">
                    <h5>Java Developer</h5>
                    <p>Android</p>
                  </td>
                  <td className="active">
                    <p>Active</p>
                  </td>
                  <td className="role">
                    <p>Owner</p>
                  </td>
                  <td className="edit">
                    <a href="#">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td className="people">
                    <img src="/images/nitin.jpg" alt="no /image" />
                    <div className="people-dis">
                      <h5>Linda</h5>
                      <p>linda@example.com</p>
                    </div>
                  </td>
                  <td className="people-des">
                    <h5>Java Developer</h5>
                    <p>Android</p>
                  </td>
                  <td className="active">
                    <p>Active</p>
                  </td>
                  <td className="role">
                    <p>Owner</p>
                  </td>
                  <td className="edit">
                    <a href="#">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td className="people">
                    <img src="/images/nitin.jpg" alt="no /image" />
                    <div className="people-dis">
                      <h5>Linda</h5>
                      <p>linda@example.com</p>
                    </div>
                  </td>
                  <td className="people-des">
                    <h5>Java Developer</h5>
                    <p>Android</p>
                  </td>
                  <td className="active">
                    <p>Active</p>
                  </td>
                  <td className="role">
                    <p>Owner</p>
                  </td>
                  <td className="edit">
                    <a href="#">Edit</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
