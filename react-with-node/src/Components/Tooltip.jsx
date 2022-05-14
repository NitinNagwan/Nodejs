import { DownloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import React from "react";
import "../css/Tooltip.css";

export default function Tooltip() {
  const [value, setValue] = useState("");
  function handle() {
    alert(value);
  }
  return (
    // <div className="container">
    //   <img
    //     src="/images/nitin.jpg"
    //     alt="Avatar"
    //     class="image"
    //     style={{ width: "100%" }}
    //   />
    //   <div className="middle">
    //     <span>Nitin Nagwan</span>
    //     <button><DownloadOutlined/></button>
    //   </div>
    // </div>

    <div>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button onClick={handle}>Button</button>
    </div>
  );
}
