import React from "react";
import '../style/about.css'

const teamMembers = ["Sopnil", "Shiwani", "Urusha", "Aditi"];

export default function About() {
  return (
    <section className="about">
      <div className="about-container">
        <h1>About Our Platform</h1>
        <p className="subtitle">
          Connecting citizens with local government through real-time surveys
          and polls.
        </p>

        <div className="about-card">
          <h2>Who We Are</h2>
          <p>
            This platform is developed by <strong>QuadCoders</strong> to make
            public participation easier and more effective.
          </p>

          <div className="team">
            <h3>Development Team</h3>
            <ul>
              {teamMembers.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="about-card">
          <h2>What This Platform Does</h2>
          <p>
            Administrators can create surveys and polls, while users can respond
            to them in real time. This enables quick feedback collection and
            transparent public engagement.
          </p>
        </div>

        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            Our mission is to help governments identify problems in wards and
            municipalities by connecting directly with the public. Through
            real-time surveys and polls, citizens can share their opinions,
            helping authorities make informed decisions for community
            development.
          </p>
        </div>
      </div>
    </section>
  );
}