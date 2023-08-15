import React from "react";
import "./Sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@mui/lab";
import { MdExpandMore, MdListAlt } from "react-icons/md";
import { MdAddCircle } from "react-icons/md";
import { MdImportExport } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="E-MARKET" />
      </Link>

      <Link to="/admin/dashboard">
        <p>
          <RiDashboardFill /> Dashboard
        </p>
      </Link>

      <Link>
        <TreeView
          defaultCollapseIcon={<MdExpandMore />}
          defaultExpandIcon={<MdImportExport />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<FaList />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<MdAddCircle />} />
            </Link>

          </TreeItem>
        </TreeView>
      </Link>

      <Link to="/admin/orders">
        <p>
            <MdListAlt /> Orders
        </p>
      </Link>

      <Link to="/admin/user">
        <p>
            <BsFillPersonFill /> Users
        </p>
      </Link>

      <Link to="/admin/reviews">
        <p>
            <MdRateReview /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
