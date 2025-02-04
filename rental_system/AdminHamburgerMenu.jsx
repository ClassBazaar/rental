import { Box, Grid, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";

//icons hero section
import Logo from "../../assest/pic/Dashboard/logo1 2.png";
import Dashboard from "../../assest/pic/Dashboard/chart.png";

import "../../assest/CSS/hamburgerMenu.css";
import { useNavigate } from "react-router-dom";
import { VectorLogout, VectorUser } from "../Vector";
import { NavExpand, NavItem } from "../StyleComponents/HamburgerStyled";

import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";

function AdminHamburgerMenu({ navigateListing, navigateHome }) {
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  }

  return (
    <>
      {/* hambergur menu  */}
      <Grid
        sx={{ ml: "10px" }}
        className={expand ? "HeroSectionMenu" : ""}
        // onMou
      >
        <Stack sx={{ flexDirection: "column" }} spacing={2}>
          <Box
            sx={{
              background: `url(${Logo})`,
              height: "65px",
              width: "89px",
              backgroundSize: "cover",
            }}
          />
          <Box sx={{ display: "grid", placeItems: "center", width: "89px" }}>
            <Box
              sx={{
                background: `url(${Dashboard})`,
                backgroundSize: "cover",
                height: "45px",
                width: "45px",
                cursor: "pointer",
              }}
              onClick={() => navigate(navigateHome)}
            />
          </Box>

          {!expand ? (
            <>
              <NavItem
                Vector={VectorUser}
                onClick={() => navigate(`${navigateListing}`)}
              />
              <NavItem
                Vector={VectorUser}
                onClick={() => navigate("/rental-mis-reports")}
              />
              <NavItem
                Vector={VectorUser}
                onClick={() => navigate("/graph-reports")}
              />
              <NavItem
                Vector={VectorUser}
                onClick={() => navigate("/rent-paid-schedule")}
              />
              {/* write code here for adding new menu */}
              <NavItem Vector={VectorLogout} onClick={logout} />
            </>
          ) : (
            <Stack container spacing={2}>
              {/* onclick */}
              <NavExpand
                msg="Users"
                Vector={VectorUser}
                NavItem={NavItem}
                onClick={() => navigate(`${navigateListing}`)}
              />
              <NavExpand
                msg="LogOut"
                // navigateTO=""
                Vector={VectorLogout}
                onClick={logout}
              />
            </Stack>
          )}
        </Stack>
      </Grid>
    </>
  );
}

export default AdminHamburgerMenu;
