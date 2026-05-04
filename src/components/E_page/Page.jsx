import React, { useEffect, useRef, useState } from "react";
import "../main/Main.css";
import Navbar from "../main/Navbar";
import "./Page.css";
import { MDBCardImage } from "mdb-react-ui-kit";
import CountUp from "react-countup";
import { db } from "../../Firebase";
import { getDoc, doc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import Loader from "../main/Loader";
import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Logo from "../../Images/caro-img/Metrozone-logo.png";

// Parses text and converts URLs into clickable links that open in a new tab
const renderDescription = (text) => {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split("\n").map((line, lineIndex) => {
    const parts = line.split(urlRegex);
    return (
      <span key={lineIndex}>
        {parts.map((part, i) =>
          urlRegex.test(part) ? (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1a73e8", wordBreak: "break-all" }}
            >
              {part}
            </a>
          ) : (
            part
          ),
        )}
        {lineIndex < text.split("\n").length - 1 && <br />}
      </span>
    );
  });
};

function Epage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columnCount, setColumnCount] = useState(3);
  const [textWidth, setTextWidth] = useState("37rem");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [caroimageheight, setCaroimageheight] = useState("600px");
  const [activeSlide, setActiveSlide] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomOffset, setZoomOffset] = useState({ x: 0, y: 0 });

  const imageContainerRef = useRef(null);
  const dragStartRef = useRef(null);
  const pinchStateRef = useRef(null);
  const lastTapRef = useRef(0);
  const zoomScaleRef = useRef(1);
  const zoomOffsetRef = useRef({ x: 0, y: 0 });

  const resetZoom = () => {
    setZoomScale(1);
    setZoomOffset({ x: 0, y: 0 });
    dragStartRef.current = null;
    pinchStateRef.current = null;
  };

  const clampOffset = (nextOffset, scale) => {
    const container = imageContainerRef.current;

    if (!container || scale <= 1) {
      return { x: 0, y: 0 };
    }

    const maxX = ((container.clientWidth * scale) - container.clientWidth) / 2;
    const maxY =
      ((container.clientHeight * scale) - container.clientHeight) / 2;

    return {
      x: Math.min(maxX, Math.max(-maxX, nextOffset.x)),
      y: Math.min(maxY, Math.max(-maxY, nextOffset.y)),
    };
  };

  const applyZoomScale = (nextScale) => {
    const boundedScale = Math.max(1, Math.min(4, nextScale));
    setZoomScale(boundedScale);
    setZoomOffset((prevOffset) => clampOffset(prevOffset, boundedScale));
  };

  const toggleZoom = () => {
    if (zoomScaleRef.current > 1) {
      resetZoom();
      return;
    }

    const nextScale = 2;
    setZoomScale(nextScale);
    setZoomOffset(clampOffset({ x: 0, y: 0 }, nextScale));
  };

  const getTouchDistance = (touches) => {
    const [firstTouch, secondTouch] = touches;
    return Math.hypot(
      secondTouch.clientX - firstTouch.clientX,
      secondTouch.clientY - firstTouch.clientY,
    );
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "touch") return;
    if (zoomScaleRef.current <= 1) return;

    event.preventDefault();
    dragStartRef.current = {
      x: event.clientX - zoomOffsetRef.current.x,
      y: event.clientY - zoomOffsetRef.current.y,
    };
  };

  const handlePointerMove = (event) => {
    if (event.pointerType === "touch") return;
    if (!dragStartRef.current || zoomScaleRef.current <= 1) return;

    event.preventDefault();
    const nextOffset = {
      x: event.clientX - dragStartRef.current.x,
      y: event.clientY - dragStartRef.current.y,
    };
    setZoomOffset(clampOffset(nextOffset, zoomScaleRef.current));
  };

  const handlePointerUp = () => {
    dragStartRef.current = null;
  };

  const handleTouchStart = (event) => {
    if (event.touches.length === 2) {
      pinchStateRef.current = {
        distance: getTouchDistance(event.touches),
        scale: zoomScaleRef.current,
      };
      dragStartRef.current = null;
      return;
    }

    if (event.touches.length === 1 && zoomScaleRef.current > 1) {
      dragStartRef.current = {
        x: event.touches[0].clientX - zoomOffsetRef.current.x,
        y: event.touches[0].clientY - zoomOffsetRef.current.y,
      };
    }
  };

  const handleTouchMove = (event) => {
    if (event.touches.length === 2 && pinchStateRef.current) {
      event.preventDefault();
      const currentDistance = getTouchDistance(event.touches);
      const nextScale =
        pinchStateRef.current.scale *
        (currentDistance / pinchStateRef.current.distance);
      applyZoomScale(nextScale);
      return;
    }

    if (
      event.touches.length === 1 &&
      dragStartRef.current &&
      zoomScaleRef.current > 1
    ) {
      event.preventDefault();
      const nextOffset = {
        x: event.touches[0].clientX - dragStartRef.current.x,
        y: event.touches[0].clientY - dragStartRef.current.y,
      };
      setZoomOffset(clampOffset(nextOffset, zoomScaleRef.current));
    }
  };

  const handleTouchEnd = (event) => {
    if (event.touches.length < 2) {
      pinchStateRef.current = null;
    }

    if (event.touches.length === 0) {
      dragStartRef.current = null;
      const now = Date.now();

      if (now - lastTapRef.current < 300) {
        toggleZoom();
      }

      lastTapRef.current = now;
    }
  };

  const openPopUp = (index) => {
    setSelectedImageIndex(index);
    setActiveSlide(index);
    resetZoom();
    setIsOpen(true);
  };

  const closePopUp = () => {
    resetZoom();
    setIsOpen(false);
  };

  // Slick Carousel settings
  const settings = {
    initialSlide: selectedImageIndex,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    accessibility: true, // Enables keyboard arrow navigation
    focusOnSelect: true,
    swipe: zoomScale === 1,
    draggable: zoomScale === 1,
    touchMove: zoomScale === 1,
    beforeChange: (_, next) => {
      setActiveSlide(next);
      resetZoom();
    },
    // dots: true,
  };

  useEffect(() => {
    zoomScaleRef.current = zoomScale;
  }, [zoomScale]);

  useEffect(() => {
    zoomOffsetRef.current = zoomOffset;
  }, [zoomOffset]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docref = doc(db, "events", id);
        const eventsSnapshot = await getDoc(docref);

        if (eventsSnapshot.exists()) {
          const eventData = eventsSnapshot.data();
          setEvent(eventData);
        }
      } catch (error) {
        setError("Error fetching events");
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setColumnCount(2); // Use 2 columns for phone screens
        setTextWidth("100%");
        setCaroimageheight("300px");
      } else {
        setColumnCount(3); // Use 3 columns for larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial column count

    // Cleanup listener on unmount
    fetchData();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="bg-CSR"
      style={{ minHeight: "600px", position: "relative" }}
    >
      <Navbar />
      <div
        className="clear captionP"
        style={{ paddingTop: "281px", clear: "both" }}
      />
      <div className="container" style={{ maxWidth: "1210px", width: "100%" }}>
        <div
          style={{
            width: "100%",
            height: "600px",
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "hidden",
          }}
        >
          <img
            src={event.mainImage}
            alt="Carousel Background"
            style={{
              width: "100%",
              height: "600px",
              objectFit: "cover", // Ensures image covers the entire div
              objectPosition: " center center", // Centers the image
              position: "absolute",
              top: 0,
              left: 0,
              transition: "opacity 1s ease-in-out",
            }}
            className="mainImg"
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.55)",
            }}
          />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            className="captionPL"
            style={{ paddingLeft: "15px", color: "white" }}
          >
            <span style={{}} className="mx-2 fs-5">
              {new Date(event.eventDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
            <div
              style={{
                paddingTop: "10px",
                fontFamily: "Lato, sans-serif",
                fontWeight: "700",
                fontSize: "38px",
                lineHeight: "40px",
                letterSpacing: "-0.78px",
                color: "rgb(255, 255, 255)",
                width: `${textWidth}`,
              }}
            >
              {event.title}
            </div>
            <div className="mt-2">
              <span style={{}} className="fs-5">
                {event.eventVenue}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "6rem" }}>
        <div className="row justify-content-center">
          {/* Single card containing all sections */}
          <div className="col-lg-11 col-md-12">
            <div
              className="card rounded py-2 fixed-card"
              style={{ background: "rgb(71 104 176)" }}
            >
              <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center text-white">
                {/* Section 1 */}
                <div
                  className="d-flex flex-column justify-content-center align-items-center text-center mb-3 mb-md-0"
                  style={{ flex: 1 }}
                >
                  <div className="me-3"></div>
                  <h3 className="fw-bold fs-md-1">Number of Beneficiary</h3>
                  <h3 className="fs-2 fs-md-1 fw-bold mb-0">
                    <CountUp
                      start={0}
                      d
                      end={event.beneficiarynum}
                      duration={3}
                      separator=","
                    />
                  </h3>
                  <p className="fs-6 fs-md-5 h-100 fixed-title-container">
                    {event.beneficiarytext}
                  </p>
                </div>

                {/* Vertical separator */}
                <div
                  className="vertical-separator mx-4 d-none d-md-block"
                  style={{
                    width: "2px",
                    backgroundColor: "#fff",
                    height: "80px",
                  }}
                ></div>

                {/* Section 2 */}
                <div
                  className="d-flex flex-column justify-content-center align-items-center text-center mb-3 mb-md-0"
                  style={{ flex: 1 }}
                >
                  <h3 className="fw-bold fs-md-1 mb-2">Value of Project</h3>
                  <h3 className="fs-2 fs-md-1 fw-bold mb-0">
                    <span className="mx-2 fs-2">
                      <i className="fa fa-inr" aria-hidden="true"></i>
                    </span>
                    <CountUp
                      start={0}
                      end={event.value}
                      duration={3}
                      separator=","
                    />
                  </h3>
                  <p className="fs-6 fs-md-5 h-100 fixed-title-container">
                    {event.quantvaluetext}
                  </p>
                </div>

                {/* Vertical separator */}
                <div
                  className="vertical-separator mx-4 d-none d-md-block"
                  style={{
                    width: "2px",
                    backgroundColor: "#fff",
                    height: "80px",
                  }}
                ></div>

                {/* Section 3 */}
                <div
                  className="d-flex flex-column justify-content-center align-items-center text-center"
                  style={{ flex: 1 }}
                >
                  <h3 className="fw-bold fs-md-1">In Association with</h3>
                  <h3 className="fs-3 fs-md-2 h-100 fw-bold mb-0">
                    {event.partner}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container  ">
        <div className="containerBody mt-5">
          <Link
            to="/"
            className="btn"
            style={{ backgroundColor: "rgb(222 153 57)", color: "white" }}
          >
            &lt; &lt; Back to CSR Page
          </Link>
        </div>
        <div className="containerBody mt-2 py-4">
          <h2 className="text-primary  pb-1" style={{ fontSize: "22px" }}>
            Program Details
          </h2>
          <hr />
          <div className="bodytextPara">
            {renderDescription(event.description)}
          </div>

          {/* <div className="bodytext aos-init aos-animate">
            The Tata group’s activities relate to education, livelihoods and
            skill development, rural development, water and sanitation,
            healthcare, and strengthening services.
          </div> */}
        </div>
      </div>

      <div className="container">
        <div className="containerBody mt-2 py-2  ">
          <h2
            className="text-primary pb-1 fw-light"
            style={{ fontSize: "22px" }}
          >
            Capturing the Essence of Our Community Efforts
          </h2>
          <div className="yellow-line" />
        </div>

        <div className="row justify-content-center">
          <div className="col-xl-9 col-md-9 mt-2 mb-5">
            <div style={{ columnCount: columnCount, columnGap: "5px" }}>
              {event.images.map((image, index) => (
                <div
                  key={index}
                  style={{ breakInside: "avoid", marginBottom: "10px" }}
                >
                  <MDBCardImage
                    src={image}
                    alt={image.alt}
                    fluid
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                    onClick={() => openPopUp(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="popup-container" onClick={closePopUp}>
            <div
              className="carousel-popup"
              onClick={(e) => e.stopPropagation()}
            >
              <Slider {...settings}>
                {event.images.map((image, index) => (
                  <div
                    key={index}
                    className="carousel-image-wrapper"
                    style={{ position: "relative" }}
                  >
                    {/* Image */}
                    <div
                      ref={index === activeSlide ? imageContainerRef : null}
                      className={`carousel-zoom-frame ${
                        zoomScale > 1 && index === activeSlide ? "is-zoomed" : ""
                      }`}
                      onDoubleClick={toggleZoom}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerLeave={handlePointerUp}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      <img
                        src={image}
                        alt={image.alt || `image-${index}`}
                        className="carousel-image"
                        style={{
                          width: "100%",
                          height: "auto",
                          transform:
                            index === activeSlide
                              ? `translate(${zoomOffset.x}px, ${zoomOffset.y}px) scale(${zoomScale})`
                              : "translate(0px, 0px) scale(1)",
                        }}
                      />
                    </div>
                    {/* Logo in top-right corner */}
                    <img
                      src={Logo} // Replace this with the actual path to your logo
                      alt="Logo"
                      className="image-logo"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        width: "50px", // Adjust size as needed
                        height: "auto",
                        zIndex: 10, // Ensure logo is above other content
                        display: "block", // Make sure it's displayed
                      }}
                    />
                  </div>
                ))}
              </Slider>
              <h5 className="text-white text-center">
                <p className="fs-4 fs-md-5 text-center fixed-title-container">
                  <span>{event.eventVenue}</span> -{" "}
                  <span className="mx-2 fs-4">
                    {new Date(event.eventDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </h5>
            </div>

            <div
              style={{ position: "absolute", top: "50px", right: "20px" }}
              className=""
            >
              <div
                className="close-button"
                onClick={closePopUp}
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "1px solid white",
                  padding: "2px 10px",
                  cursor: "pointer",
                }}
              >
                &times;
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        .popup-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(2px);
        }

        .carousel-popup {
          width: 90%;
          max-width: 800px;
        }

        .carousel-image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: ${caroimageheight}; /* Fixed height for all images */
          overflow: hidden;
        }

        .carousel-zoom-frame {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          touch-action: pan-y pinch-zoom;
          cursor: zoom-in;
        }

        .carousel-zoom-frame.is-zoomed {
          cursor: grab;
          touch-action: none;
        }

        .carousel-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain; /* Ensures images maintain aspect ratio */
          width: 1000px;
          height: 100%; /* Ensures the image fills the height uniformly */
          transition: transform 0.2s ease;
          transform-origin: center center;
          user-select: none;
          -webkit-user-drag: none;
        }
        @media (max-width: 767.98px) {
          .vertical-separator {
            display: none; /* Hide vertical separator on small screens */
          }
        }
        @media (min-width: 768px) {
          .fixed-card {
            margin: 0 auto; /* Center card on larger screens */
          }
        }
      `}</style>
    </div>
  );
}

export default Epage;
