import React from "react";
import Carousel from "./Carousel";
import "./Main.css"; // Import external CSS
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  
} from "mdb-react-ui-kit";
import Event from "./Event";
import QutoteBanner from "../../Images/Vivekananda’s-neverending-hope-from-the-youth.jpg";

function Main() {
  const cardData = [
    {
      id: 1,
      title: "Healthcare & Nutrition",
      imageUrl: "fas fa-heartbeat",
      description: [
        <ul className="custome-list">
          <li>
            Over a Decade of Impactful Service for the Economically Weaker
            Sections of Society.
          </li>
          <li>
            Arranging facilities, where lack of healthcare often left families
            vulnerable to exploitation by anti-national elements.
          </li>
          <li>
            Free Distribution of <b style={{color:"#535353ff"}}>75+ tons medicines</b> through medical
            camps.
          </li>
          <li>Transforming healthcare needs in <b style={{color:"#535353ff"}}>2000+ villages.</b></li>
          <li>Benefitting over <b style={{color:"#535353ff"}}>5,00,000 underprivileged patients.</b> </li>
          <li>
            Benefitting <b style={{color:"#535353ff"}}>70,000+ pregnant and lactating women</b>  under the Shishu
            Kalyan Yojna, tackling malnutrition.
          </li>
          <li>
            Supported <b style={{color:"#535353ff"}}>50,000+ children</b>  under the Swablamban Insurance Scheme,
            earning national recognition.
          </li>
        </ul>,
      ],
    },
    {
      id: 2,
      title: "Education & Skill Development",
      imageUrl: "fas fa-graduation-cap",
      description: [
        <ul className="custome-list">
          <li>
            Sponsored schooling and supplies for children across Zanskar Valley and Kashmir, strengthening through education.
          </li>
          <li>
            Empowering <b style={{color:"#535353ff"}}>100,000+ youth</b>  self-employment opportunities into Insurance and finance domain.
          </li>
          <li>
            Supported the Disability Empowerment Program in association with SNEH for Special abled children fostering empowerment, dignity, and social harmony.
          </li>
        </ul>,
      ],
    },
    {
      id: 3,
      title: "Sports & Community Engagement",
      imageUrl: "fas fa-trophy",
      description: [
        <ul className="custome-list">
          <li>
            Revived local sports in <b style={{color:"#535353ff"}}>Ladakh and Kashmir</b>  by providing equipment and medical support to sportsmen. 
          </li>
          <li>
            Beyond events, Metro Zone Group backs their <b style={{color:"#535353ff"}}>entire journey</b>  in Lawn Tennis and Archery— enabling many to rise from grassroots to <b style={{color:"#535353ff"}}>national and international recognition.</b> 
          </li>
           
        </ul>,
      ],
    },
    {
      id: 4,
      title: "During COVID-19 crisis",
      imageUrl: "fa-solid fa-virus",
      description: [
        <ul className="custome-list">
          <li>
           Sponsored Oxygen, Medicines to safeguarded <b style={{color:"#535353ff"}}>thousands of families.</b> 
          </li>
          <li>
            Sponsored Disease prevention kits for <b style={{color:"#535353ff"}}>1 lakh+ police personnel</b> being Covid warrior.
          </li>
          <li>
            Sponsored Black Fungus Costliest Medicines during Pandemic and saved life of 18 affected patients.
          </li>
          <li>
            Sponsored Training Program for Disease Prevention.
          </li>
          <li>
            Distribution of Free Food Program for 5000 families during entire pandemic period.
          </li>
           
        </ul>
      ],
    },
  ];

  return (
    <div>
      <Carousel />

      <div className="container custom-container">
        <div className="containerBody py-5 px-3 mt-5">
          <div style={{ width: "auto" }}>
            <div
              className="fw-bold h2 py-3 text-black"
              style={{
                fontFamily: "Lato, sans-serif",
                letterSpacing: "0.5px",
                borderBottom: "2px solid #095996ff", // Set border size and color here
                margin: "0 auto",
              }}
            >
              Metro Zone Group: Compassion Beyond Boundaries
            </div>
          </div>

          <div
            className="bodytextPara mt-4 h2"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            The journey of{" "}
            <b style={{ color: "#191a1bff" }}>Metro Zone Group</b> is not just
            about corporate milestones — it is a testament to how businesses can
            be both profitable and purposeful. Since 2014, beyond balance
            sheets, the Group has championed social transformation across some
            of India’s most underserved regions, enriching countless lives
            through gestures both big and small.
          </div>
          <div
            className="bodytextPara mt-1"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            In deep collaboration with the{" "}
            <b style={{ color: "#191a1bff" }}>
              Indian Army, Assam Rifles, State Police Administrations, Railway
              Protection Force, Rotary International, National Medicos
              Organisation (NMO), ISKCON, and Special Needs Education Homes
              (SNEH), Metro Zone Group
            </b>{" "}
            continues to redefine corporate responsibility through compassion in
            action.
          </div>
          <div
            className="bodytextPara mt-1"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Reaching far beyond cities and comfort zones, the Group’s
            initiatives extend to the{" "}
            <b style={{ color: "#191a1bff" }}>
              high-altitude and conflict-affected terrains of Kashmir, Kargil,
              Dras, Suru, Zanskar Valley, Manipur, Assam, Arunachal Pradesh, and
              the Indo-Nepal border
            </b>{" "}
            , as well as the
            <b style={{ color: "#191a1bff" }}>
              {" "}
              underprivileged regions
            </b> of{" "}
            <b style={{ color: "#191a1bff" }}>
              Uttar Pradesh, Madhya Pradesh, and Bihar.
            </b>
          </div>
          <div
            className="bodytextPara mt-1"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Through these meaningful partnerships, Metro Zone Group has been a
            beacon of hope —{" "}
            <b style={{ color: "#191a1bff" }}>
              delivering medical aid, nutritional support, educational
              opportunities, sports training, and employable skills
            </b>{" "}
            to thousands in need. Each initiative reflects a simple belief: that
            business success holds true meaning only when it uplifts humanity
            and transforms lives.
          </div>
          <div
            className="bodytextPara mt-1"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            With every step, Metro Zone Group continues to build a{" "}
            <i>healthier, stronger, and more compassionate India</i> — where
            purpose leads profit, and empathy drives excellence.
          </div>
        </div>

        <div className="container mx-5 mb-5 d-xl-block d-none">
          <img
            src={QutoteBanner}
            alt=""
            style={{ height: "22rem", width: "77rem", filter: "sepia(100%)" }}
          />
        </div>

        <MDBContainer className="py-4 mx-auto ">
          <h2
            className="text-primary  pb-2"
            style={{
              fontSize: "22px",
              borderBottom: "5px solid #2968da",
              fontFamily: "Lato, sans-serif",
            }}
          >
            Focus Area
          </h2>

          <MDBRow className="justify-content-center align-items-stretch">
            {cardData.map((card, index) => (
              <MDBCol
                md="6"
                lg="3"
                sm="12"
                key={card.id}
                className="mb-4 d-flex flex-column "
              >
                <div className="text-center bg-light h-100 p-4 position-relative">
                  {/* Icon */}
                  <i
                    class={card.imageUrl}
                    style={{ fontSize: "3.5rem", color: "rgb(12 68 168)" }}
                  ></i>

                  {/* Title */}
                  <h5 className="fw-bold fs-5 text-center text-secondary py-2">
                    {card.title}
                  </h5>

                  {/* Bullet points */}
                  <ul className="text-start ps-4">
                    {card.description.map((point, idx) => (
                      <div key={idx} className=" text-secondary h6">
                        {point}
                      </div>
                    ))}
                  </ul>

                  {/* Add vertical line between the cards, except for the last one */}
                  {index !== cardData.length - 1 && (
                    <div
                      className="vertical-separator d-none d-lg-block"
                      style={{
                        width: "1px",
                        backgroundColor: "#ccc",
                        height: "70%", // Adjust height to control how long the line appears
                        position: "absolute",
                        right: "-1px",
                        top: "50%", // Position it from the middle
                        transform: "translateY(-50%)", // Center it vertically
                      }}
                    ></div>
                  )}
                </div>
              </MDBCol>
            ))}
          </MDBRow>
          <hr />
        </MDBContainer>
        <MDBContainer className=" mb-5 mx-auto" style={{ marginTop: "5rem" }}>
          <Event />
        </MDBContainer>
      </div>
    </div>
  );
}

export default Main;
