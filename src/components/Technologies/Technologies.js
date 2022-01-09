import React from "react";
import {
  DiJsBadge,
  DiReact,
  DiAngularSimple,
  DiGit,
  DiTrello,
  DiSass,
} from "react-icons/di";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import {
  List,
  ListContainer,
  ListItem,
  ListParagraph,
  ListTitle,
} from "./TechnologiesStyles";

const Technologies = () => (
  <Section id="tech">
    <SectionDivider />
    <br />
    <SectionTitle>Technologies</SectionTitle>
    <SectionText>
      I've worked with a range of technologies in the web development world.
    </SectionText>
    <List>
      <ListItem>
        <DiJsBadge size="3rem" />
        <br />
        <ListContainer>
          <ListTitle>JavaScript</ListTitle>
          <ListParagraph>
            Experience with JavaScript <br />
            (ES5 & ES6 Features)
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiReact size="3rem" />
        <br />
        <ListContainer>
          <ListTitle>React</ListTitle>
          <ListParagraph>
            Experience with React.js and React component libraries like Material
            UI and Chakra UI
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiAngularSimple size="3rem" />
        <br />
        <ListContainer>
          <ListTitle>Angular</ListTitle>
          <ListParagraph>
            Experience with Angular and component libraries like primeNg.
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiGit size="3rem" />
        <br />
        <ListContainer>
          <ListTitle>Git (Version Control)</ListTitle>
          <ListParagraph>Experience with Git, Github, Bitbucket</ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiTrello size="3rem" />
        <br />
        <ListContainer>
          <ListTitle>Agile development</ListTitle>
          <ListParagraph>
            Experience with agile work management tools like Jira, Trello
          </ListParagraph>
        </ListContainer>
      </ListItem>
      <ListItem>
        <DiSass size="3rem" />
        <br />
        <ListContainer>
          <ListTitle>Sass</ListTitle>
          <ListParagraph>Experience with Sass and Bootstrap</ListParagraph>
        </ListContainer>
      </ListItem>
    </List>
  </Section>
);

export default Technologies;
