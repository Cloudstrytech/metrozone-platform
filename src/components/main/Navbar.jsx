import React, { useEffect, useState } from "react";
import { MDBNavbar, MDBContainer } from "mdb-react-ui-kit";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import { Collapse, Divider } from "@mui/material";
import Logo from "../../Images/caro-img/Metrozone-logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  // const [Logoimg , setLogoimg] = useState(Logo)

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      setIsMobile(true);
      // setLogoimg("http://www.metrozonegroup.com/images/logo.png")
    } else {
      setIsMobile(false);
    }
  };

  const handleAboutToggle = () => {
    setOpenAbout(!openAbout);
  };
  const handleServicesToggle = () => {
    setOpenServices(!openServices);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <>
      <MDBNavbar light bgColor="transparent" style={{ zIndex: 2 }}>
        <MDBContainer
          fluid
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: isMobile ? "0rem 1rem" : "1rem 13rem",
            position: "relative",
            marginTop: "1rem",
          }}
        >
          {/* Hamburger Menu */}
          <Link
            aria-label=""
            to="http://metrozonegroup.com/"
            // onClick={toggleDrawer(true)}
            style={{
              margin: "0",
              padding: "0",
              border: "none",
              backgroundColor: "transparent",
              color: "white",
              cursor: "pointer",
              textDecoration: "none",
            }}
            className="text-white tg-btn"
            target="_blank"
          >
            {/* <i class="fa fa-bars text-white fs-2" aria-hidden="true"></i> */}
            <img
              src={Logo}
              style={{ height: "40px", marginRight: "10px" }}
              alt="Metrozone Logo"
              loading="lazy"
            />
            <span
              className="text-white fs-4 "
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              METROZONE Group
            </span>
          </Link>

          {/* Tata Logo */}
          {/* <MDBNavbarBrand
            href=" "
            target="_blank"
            style={{ marginLeft: "auto" ,display:'none' }}
          >
            <img
              src="http://www.metrozonegroup.com/images/logo.png"
               style={{  height: "40px",marginRight:'10px' }}
              
              alt="Metrozone Logo"
              loading="lazy"
               
            />
          </MDBNavbarBrand> */}
        </MDBContainer>
      </MDBNavbar>

      {/* Material-UI Drawer from top */}
      <Drawer
        anchor={isMobile ? "left" : "top"}
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: isMobile ? "70%" : "100%",
          },
        }}
      >
        {/* Conditional Content based on screen size */}
        {isMobile ? (
          <div className="bg-light">
            <div style={{ padding: "1rem", textAlign: "center" }}>
              {/* Logo Space */}
              <img
                src={Logo}
                height="40"
                alt="Logo"
                style={{ marginBottom: "1rem" }}
              />
            </div>
            <Divider />
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ListItem button onClick={toggleDrawer(false)}>
                <ListItemText primary="Home" />
              </ListItem>

              {/* About Us Section */}
              <ListItem button onClick={handleAboutToggle}>
                <ListItemText primary="About Us" />
              </ListItem>
              <Collapse in={openAbout} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button onClick={toggleDrawer(false)}>
                    <ListItemText
                      primary="The Metrozone Group"
                      sx={{ pl: 4 }}
                    />
                  </ListItem>
                  <ListItem button onClick={toggleDrawer(false)}>
                    <ListItemText
                      primary="Sustainability Approach"
                      sx={{ pl: 4 }}
                    />
                  </ListItem>
                  <ListItem button onClick={toggleDrawer(false)}>
                    <ListItemText primary="Contact Us" sx={{ pl: 4 }} />
                  </ListItem>
                </List>
              </Collapse>

              {/* Services Section */}
              <ListItem button onClick={handleServicesToggle}>
                <ListItemText primary="Services" />
              </ListItem>
              <Collapse in={openServices} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button onClick={toggleDrawer(false)}>
                    <ListItemText primary="Web Development" sx={{ pl: 4 }} />
                  </ListItem>
                  <ListItem button onClick={toggleDrawer(false)}>
                    <ListItemText primary="App Development" sx={{ pl: 4 }} />
                  </ListItem>
                  <ListItem button onClick={toggleDrawer(false)}>
                    <ListItemText primary="Cloud Solutions" sx={{ pl: 4 }} />
                  </ListItem>
                  <ListItem button onClick={toggleDrawer(false)}>
                    <ListItemText primary="DevOps Services" sx={{ pl: 4 }} />
                  </ListItem>
                </List>
              </Collapse>

              <ListItem button onClick={toggleDrawer(false)}>
                <ListItemText primary="Contact" />
              </ListItem>
            </List>
          </div>
        ) : (
          <div
            className="text-white"
            style={{
              padding: "3rem 12rem",
              background: "#1d2739",
            }}
          >
            <button
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
              }}
              onClick={toggleDrawer(false)}
            >
              {/* <i class="fa fa-times fs-1 text-danger mb-3" aria-hidden="true"></i> */}
              <Button className=" bg-danger text-white mb-4">Close</Button>
            </button>
            <div className="row gx-5">
              <div className="col-2">
                <div className="">
                  <h3 className="text-primary fw-bold">About us</h3>
                  <hr />
                  <div className="pt-1">
                    <div className="nav-text pb-2">
                      <a href=" " className="text-white text-decoration-none">
                        The Metrozone Group
                      </a>
                    </div>

                    <div className="nav-text pb-2">
                      <a href=" " className="text-white text-decoration-none">
                        How We Approach Sustainability
                      </a>
                    </div>
                    <div className="nav-text pb-2">
                      <a href=" " className="text-white text-decoration-none">
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-7">
                <div>
                  <h3 className="text-primary fw-bold">Focus Area</h3>
                  <hr />
                </div>
                <div className="row bottomP15 borNav">
                  <div className="fs-6 text-primary mb-3 mx-2 border-start border-3 border-primary ps-2">
                    Categories
                  </div>

                  <div className="col-lg-3 col-md-2 col-sm-12 text-center ">
                    <div className="bottomP8">
                      <a href=" ">
                        <img
                          src="https://www.tatasustainability.com/images/Menu/ClimateChangeEnergy.png"
                          className="iconImage"
                          alt="Climate Change Energy"
                        />
                      </a>
                    </div>
                    <div className="subNav">
                      <a href=" " className="text-white text-decoration-none">
                        Climate Change <br />
                        Energy
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-2 col-sm-12 text-center">
                    <div className="bottomP8">
                      <a href=" ">
                        <img
                          src="https://www.tatasustainability.com/images/Menu/Water.png"
                          className="iconImage"
                          alt="Water"
                        />
                      </a>
                    </div>
                    <div className="subNav">
                      <a href=" " className="text-white text-decoration-none">
                        Water
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-2 col-sm-12 text-center">
                    <div className="bottomP8">
                      <a href=" ">
                        <img
                          src="https://www.tatasustainability.com/images/Menu/circular-economy.png"
                          className="iconImage"
                          alt="Circular Economy"
                        />
                      </a>
                    </div>
                    <div className="subNav">
                      <a href=" " className="text-white text-decoration-none">
                        Circular <br />
                        Economy
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-2 col-sm-12 text-center">
                    <div className="bottomP8">
                      <a href=" ">
                        <img
                          src="https://www.tatasustainability.com/images/Menu/Biodiversity.png"
                          className="iconImage"
                          alt="Biodiversity"
                        />
                      </a>
                    </div>
                    <div className="subNav">
                      <a href=" " className="text-white text-decoration-none">
                        Biodiversity
                      </a>
                    </div>
                  </div>
                </div>{" "}
                <hr />
                <div className="row bottomP15 borNav">
                  <div className="fs-6 text-primary mb-3 mx-2 border-start border-3 border-primary ps-2">
                    Social
                  </div>

                  <div className="col-lg-3 col-md-2 col-sm-12 text-center ">
                    <div className="bottomP8">
                      <a href=" ">
                        <img
                          src="https://www.tatasustainability.com/images/Menu/ClimateChangeEnergy.png"
                          className="iconImage"
                          alt="Climate Change Energy"
                        />
                      </a>
                    </div>
                    <div className="subNav">
                      <a href=" " className="text-white text-decoration-none">
                        Climate Change <br />
                        Energy
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-2 col-sm-12 text-center">
                    <div className="bottomP8">
                      <a href=" ">
                        <img
                          src="https://www.tatasustainability.com/images/Menu/Water.png"
                          className="iconImage"
                          alt="Water"
                        />
                      </a>
                    </div>
                    <div className="subNav">
                      <a href=" " className="text-white text-decoration-none">
                        Water
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-2 col-sm-12 text-center">
                    <div className="bottomP8">
                      <a href=" ">
                        <img
                          src="https://www.tatasustainability.com/images/Menu/circular-economy.png"
                          className="iconImage"
                          alt="Circular Economy"
                        />
                      </a>
                    </div>
                    <div className="subNav">
                      <a href=" " className="text-white text-decoration-none">
                        Circular <br />
                        Economy
                      </a>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-2 col-sm-12 text-center">
                    <div className="bottomP8">
                      <a href=" ">
                        <img
                          src="https://www.tatasustainability.com/images/Menu/Biodiversity.png"
                          className="iconImage"
                          alt="Biodiversity"
                        />
                      </a>
                    </div>
                    <div className="subNav">
                      <a href=" " className="text-white text-decoration-none">
                        Biodiversity
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}

export default Navbar;
