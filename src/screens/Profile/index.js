import React, { Component } from 'react';
import HeaderLayout from './../HeaderLayout';
import { Container } from '@material-ui/core';

class Profile extends Component {
  render() {
    let { history } = this.props;
    return (
      <>
        <HeaderLayout history={history} />
        <Container>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            Inside Profile Page
          </div>
        </Container>
      </>
    );
  }
}

export default Profile;
