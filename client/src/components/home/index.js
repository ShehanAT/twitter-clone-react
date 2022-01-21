
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { 
  Row, 
  Col,
} from 'reactstrap';
import { 
  GET_ALL_TWEETS_SUBSCRIPTION,
  TWEETS_QUERY
} from '../graphql'; 
import { useSelector } from "react-redux";
import Activity from '../profile/activity';
import MenuBar from '../menubar/index';
import SideBar from '../sidebar/index';


function Home() {
  
    // useQuery() is the primary API for executing queries in an Apollo application. To run a query within a React component, call `useQuery` and pass it a GraphQL query string. 
    const { loading, data, subscribeToMore } = useQuery(TWEETS_QUERY);

    const theme = useSelector((state) => state.theme);
  
    useEffect(() => {
      try {
        // subscribeToMore() executes a subscription that pushes updates to the query's original result 
        subscribeToMore({
          document: GET_ALL_TWEETS_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if(!subscriptionData.data) return prev;

            return { tweets: subscriptionData.data.getAllTweets.data }
          },
        });
  
      } catch(e) {}
    });
  
  return (
    <React.Fragment>
      <Row style={{ background: theme.bg }}>
        <Col lg={4} md={5} xs={5}>
          <MenuBar />
        </Col>
        <Col lg={5} md={4} xs={4}>
          <Activity />
        </Col>
      <Col lg={2} md={0} xs={0}>
        <SideBar loading={loading} data={data}/>
      </Col>
    </Row>
  </React.Fragment>
    
  );
}

export default Home;