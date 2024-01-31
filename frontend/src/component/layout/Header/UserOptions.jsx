import React, { useState } from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { MdAccountCircle } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { useAlert } from 'react-alert';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { logout } from "../../../actions/userAction";
import { Backdrop } from '@mui/material';

const UserOptions = ({user}) => {
  const { cartItems } = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    


    const options = [
        { icon: <FaRegListAlt />, name: "Orders", func: orders },
        { icon: <MdAccountCircle />, name: "Profile", func: account },
        {
          icon: (
            <IoMdCart
              
            />
          ),
          name: `Cart(${cartItems.length})`,
          func: cart,
        },
        { icon: <MdLogout />, name: "Logout", func: logoutUser },
      ];
    
      if (user.role === "admin") {
        options.unshift({
          icon: <MdDashboard />,
          name: "Dashboard",
          func: dashboard,
        });
      }
    
      function dashboard() {
        navigate("/admin/dashboard");
      }
    
      function orders() {
        navigate("/orders");
      }
      function account() {
        navigate("/account");
      }
      function cart() {
        navigate("/cart");
      }
      function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
      }

  return (
    <>
     <Backdrop open={open} style={{ zIndex: "10" }} />
     <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  )
}

export default UserOptions