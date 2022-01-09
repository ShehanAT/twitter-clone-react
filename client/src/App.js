import React, { useEffect } from 'react';
import { 
  Container,
  Row, 
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button 
} from 'reactstrap';
import classes from "./App.css";
// import Routes from "./Routes";
// import { SET_THEME } from "./redux/actions";


function App() {
  // const theme = useSelector((state) => state.theme)
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if(Object.keys(theme).length === 0)
  //     dispatch({ type: SET_THEME, payload: "default" });
  // }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className={classes.title}>Twitter Clone Application</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
