import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:ajaykumarkc03@gmail.com">
        <Button>Contact: ajaykmarkc03i@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;