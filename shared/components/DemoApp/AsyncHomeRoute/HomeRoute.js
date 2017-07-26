import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import config from '../../../../config';

const Test = styled.div`
  width:500px;
  height:500px;
  background:red;
`;

const HomeRoute = () => (
  <div>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <Test />
    <h2>{config('welcomeMessage')}</h2>

    <p>
      This starter kit contains all the build tooling and configuration you
      need to kick off your next universal React project, whilst containing a
      minimal project set up allowing you to make your own architecture
      decisions (Redux/Mobx etc).
    </p>
  </div>
);

export default HomeRoute;
