import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import styled from 'styled-components';

const Container = styled.div`
  margin: 1rem 0 5rem;

  .social-icon {
    display: inline-block;
    margin: 0 0.5rem;
    cursor: pointer;
  }
`;

class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
    };
  }
  componentDidMount() {
    this.setState({
      url: window.location.href,
    });
  }
  render() {
    const { post } = this.props;
    const { url } = this.state;
    return (
      <Container>
        {url && (
          <>
            <TwitterShareButton
              url={url}
              title={`Read ${post.title} by ${post.author}`}
              className="social-icon"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </>
        )}
      </Container>
    );
  }
}

Share.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};

export default Share;
