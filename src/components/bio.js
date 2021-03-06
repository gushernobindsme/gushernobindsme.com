import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import media from '../utils/media';
import Twitter from '../images/social/twitter.svg';
import Github from '../images/social/github.svg';
import Instagram from '../images/social/instagram.svg';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5rem 0;

  ${media.tablet`
    flex-direction: column;
    text-align: center;
  `}
`;

const TextContainer = styled.div`
  ${media.phone`
    order: 2;
  `}
`;

const Name = styled.h3`
  font-size: 2.4rem;
  letter-spacing: 0.1rem;
  font-weight: 800;
  margin-bottom: 1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-family: 'system';
`;

const TagLine = styled.sub`
  font-weight: normal;
  font-size: 1.6rem;
  margin: 0;
  display: block;
`;

const Icon = styled.img`
  height: 2rem;
  width: 2rem;
  padding: 1.5rem 0.5rem;
`;

const Bio = () => (
  <StaticQuery
    query={bioQuery}
    render={data => {
      const { author, authorTagline, social } = data.site.siteMetadata;
      return (
        <Container>
          <TextContainer>
            <Name>{author}</Name>
            <TagLine>{authorTagline}</TagLine>
            <a
              href={`https://twitter.com/${social.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon src={Twitter} alt="twitter" />
            </a>
            <a
              href={`https://github.com/${social.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon src={Github} alt="github" />
            </a>
            <a
              href={`https://instagram.com/${social.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon src={Instagram} alt="instagram" />
            </a>
          </TextContainer>
        </Container>
      );
    }}
  />
);

const bioQuery = graphql`
  query BioQuery {
    site {
      siteMetadata {
        author
        authorTagline
        social {
          twitter
          github
          instagram
        }
      }
    }
  }
`;

export default Bio;
