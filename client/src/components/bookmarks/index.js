import React from "react";
import { useSelector } from "react-redux";
import { ProfileCorner, Header } from "../styles/common";
import { 
    Row, 
    Col   
} from 'reactstrap';
import MenuBar from '../menubar/index';

const URL = process.env.REACT_APP_SERVER_URL;

const BookMarks = () => {
  const user = useSelector((state) => state.profile.user);
  const theme = useSelector((state) => state.theme);

  const username = sessionStorage.getItem("loggedInUserFirstName");

  return (
    <React.Fragment>
        <Row style={{ background: theme.bg }}>
        <Col lg={4} md={5} xs={5}>
            <MenuBar />
        </Col>
        <Col lg={5} md={4} xs={4}>
            <ProfileCorner border={theme.border}>
            <Header bg={theme.bg} color={theme.color} para={theme.para} border={theme.border}>
                <h2>Bookmarks</h2>
                <p>@ {username}</p>
            </Header>
            <h4>No bookmarks found...</h4>
            </ProfileCorner>
        </Col>
        </Row>
    </React.Fragment>
   
  );
};

export default BookMarks;