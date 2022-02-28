import React, { useEffect, useState } from 'react';
import { useQuery  } from '@apollo/react-hooks';
import { 
  Row, 
  Col,
} from 'reactstrap';
import { 
  TWEETS_QUERY
} from '../graphql'; 
import { useSelector } from "react-redux";
import MenuBar from '../menubar/index';
import { toast } from 'react-toastify';
import PaginatedItems from './paginatedItems';


function Home() {
  // useQuery() is the primary API for executing queries in an Apollo application. To run a query within a React component, call `useQuery` and pass it a GraphQL query string. 
    // loading, data, subscribeToMore, refetch 
    const { loading, error, data, refetch } = useQuery(TWEETS_QUERY);
    
    const theme = useSelector((state) => state.theme);
  
    const pause = (delay) => {
      return new Promise(res => setTimeout(res, delay));
    }

    const handleRefreshHome = async (refreshHomeArg) => {
      await pause(1000);
      refetch();
    };
   
    useEffect(() => {
      const userFirstName = sessionStorage.getItem("loggedInUserFirstName");
      if(userFirstName){
        toast("Welcome " + userFirstName);
      }
    });
  
  if(data){
    return (
      <React.Fragment>
        <Row style={{ background: theme.bg }}>
          <Col lg={4} md={5} xs={5}>
            <MenuBar refreshHome={handleRefreshHome}/>
          </Col>
        <Col lg={2} md={0} xs={0}>
          <PaginatedItems itemsPerPage={4} allItems={data.tweets} />
        </Col>
      </Row>
    </React.Fragment>
      
    );
  }else{
    return (
      <h3>Loading...</h3>
    );
  }

}

export default Home;