import React from "react";
import "./aboutSection.css";
import { Typography, Avatar } from "@material-ui/core";
import { TiSocialLinkedin } from "react-icons/ti";

const About = () => {

  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About </Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://media.licdn.com/dms/image/D4D03AQEKAyJ7qzpBPw/profile-displayphoto-shrink_200_200/0/1679565411885?e=1712188800&v=beta&t=WIYDw_KQtC_Pc2phjrUfmoDZcACOqpmztVze5al6ojU"
              alt="Founder"
            />
            <Typography>Ajay Kumar</Typography>

            <span>
              This is a Mern Stack E-commerce wesbite made by @ajaykumar. 
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Connect</Typography>
            <a
              href="https://www.linkedin.com/in/ajay-kumar-koilathachetta-369675252/"
              target="blank"
            >
              <TiSocialLinkedin className="youtubeSvgIcon" />
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;