import React from "react";

import {
  Section,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import Button from "../../styles/GlobalComponents/Button";
import { LeftSection } from "./HeroStyles";

const Hero = (props) => (
  <Section row noPadding>
    <LeftSection>
      <SectionTitle main center>
        Hi there, <br />
        I'm Emmanuel
      </SectionTitle>
      <SectionText>
        A Frontend Developer focused on creating responsive, user-friendly and
        accessible websites and web applications. <br /> minimalist at heart.
      </SectionText>
      <Button
        onClick={() => (window.location = "mailto://obiemmy123@gmail.com")}
      >
        Learn More
      </Button>
    </LeftSection>
  </Section>
);

export default Hero;
