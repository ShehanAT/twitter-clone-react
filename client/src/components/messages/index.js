import React from "react";
import { useSelector } from "react-redux";
import { ProfileCorner, Header } from "../styles/common";
import { 
    Row, 
    Col   
  } from 'reactstrap';
import MenuBar from '../menubar/index';

const Messages = () => {
  const theme = useSelector((state) => state.theme);
  return (
    <React.Fragment>
      <Row style={{ background: theme.bg }}>
        <Col lg={4} md={5} xs={5}>
          <MenuBar />
        </Col>
        <Col lg={5} md={4} xs={4}>
            <ProfileCorner border={theme.border}>
                <Header color={theme.color} border={theme.border}>
                    <h2>Messages</h2>
                </Header>
                <h2 style={{ textAlign: "center", color: theme.color }}>Coming soon!</h2>
            </ProfileCorner>
        </Col>
        </Row>
    </React.Fragment>
  );
};

export default Messages;