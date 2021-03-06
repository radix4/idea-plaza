import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import profile from "./profilePics/background.jpg";
import Card from "react-bootstrap/Card";
import "./Styles.css";
import { Link } from "react-router-dom";


export default function Profile() {
  const [name, setName] = useState("Allen Baek");
  const [bios, setBios] = useState("My bios");
  const [achieve, setAchieve] = useState("My achievements");

  const handleSubmit = () => {
    console.log("Bios : " + bios);
    console.log("Achievements : " + achieve);
  };

  return (
    <div>
      {/* This is needed to get the Card working */}
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />

      {/* Background Box*/}
      <div className="box"></div>

      {/* ProfileImage */}
      <div className="container2">
        <img src={profile} alt="Image_file" id="clip" />
      </div>
        {/* Button */}
      <div className="goEdit_placement">
          <Link to="./setProfile">
            <Button>Edit Profile</Button>
            </Link>
      </div>

      {/* Input fields */}
      <div className="display">
        <div className="NameSize">{name}</div>

        <br />
        <div className="bold">Bios</div>

        <div>{bios}</div>
        <br />
        <div className="bold">Achievements</div>
        <div>{achieve}</div>
      </div>

      <div className="cardPlacement">
        <Card style={{ fontSize:"15px"}}>
          <Card.Header>Title of the Project</Card.Header>
          <Card.Body>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
