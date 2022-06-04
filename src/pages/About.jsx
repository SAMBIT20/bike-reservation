import React from "react";
import DateCheck from "../components/bike/DateCheck";

const About = () => {
  return (
    <div className="container">
      <div className="py-4">
        <h1>About</h1>

        <p className="lead">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
          consectetur, magni cum hic quo sed architecto id ut pariatur,
          voluptates maiores eos ex, tempore commodi impedit non modi delectus
          iusto. Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
          rem voluptate temporibus nemo incidunt quibusdam quo, quaerat vitae
          perspiciatis earum. Numquam, dolorum odio nesciunt assumenda odit
          tenetur laboriosam! Autem, odio nobis temporibus exercitationem
          impedit voluptas quo maxime eius quis animi. Nisi libero animi
          necessitatibus minima tenetur voluptate sint iusto eveniet.
        </p>

        <DateCheck />
      </div>
    </div>
  );
};

export default About;
