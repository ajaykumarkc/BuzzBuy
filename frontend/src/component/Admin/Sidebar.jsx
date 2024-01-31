import React from 'react'
import "./sidebar.css";
import { Link } from "react-router-dom";
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { MdExpandMore } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdImportExport } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { MdOutlineRateReview } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="sidebar">
    <Link to="/">
      <img src='https://is4-ssl.mzstatic.com/image/thumb/Purple125/v4/25/6e/6a/256e6ad9-b464-4b4b-57ed-3e1de3e6d2dd/AppIcon-0-0-1x_U007emarketing-0-0-0-6-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg' alt="Ecommerce" />
    </Link>
    <Link to="/admin/dashboard">
      <p>
        <MdDashboard /> Dashboard
      </p>
    </Link>
    <Link>
      <TreeView
        defaultCollapseIcon={<MdExpandMore/>}
        defaultExpandIcon={<MdImportExport />}
      >
        <TreeItem nodeId="1" label="Products">
          <Link to="/admin/products">
            <TreeItem nodeId="2" label="All" icon={<MdPostAdd />} />
          </Link>

          <Link to="/admin/product">
            <TreeItem nodeId="3" label="Create" icon={<IoMdAdd />} />
          </Link>
        </TreeItem>
      </TreeView>
    </Link>
    <Link to="/admin/orders">
      <p>
        <FaListAlt />
        Orders
      </p>
    </Link>
    <Link to="/admin/users">
      <p>
        <IoPeopleSharp /> Users
      </p>
    </Link>
    <Link to="/admin/reviews">
      <p>
        <MdOutlineRateReview />
        Reviews
      </p>
    </Link>
  </div>
  )
}

export default Sidebar