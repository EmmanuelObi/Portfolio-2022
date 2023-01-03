import React from "react";

import {
  Section,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { LeftSection } from "./HeroStyles";
import { Div3 , SocialIcons} from "../Header/HeaderStyles";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin, AiFillBook } from "react-icons/ai";

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
      
      <div style={{display: "flex", flexWrap: "wrap"}}>
      <SocialIcons href="https://github.com/emmanuelobi">
        <AiFillGithub size="4rem" />
      </SocialIcons>
      <SocialIcons href="https://linkedin.com/in/emmanuelobi20">
        <AiFillLinkedin size="4rem" />
      </SocialIcons>
      <SocialIcons href="https://instagram.com/koliko_official">
        <AiFillInstagram size="4rem" />
      </SocialIcons>
      <SocialIcons href="https://codeprophet.hashnode.dev">
        <AiFillBook size="4rem" />
      </SocialIcons>
      </div>
   
     
    </LeftSection>
  </Section>
);

export default Hero;
