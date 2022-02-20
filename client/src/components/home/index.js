import React, { useEffect, useState } from 'react';
import { useQuery  } from '@apollo/react-hooks';
import { 
  Row, 
  Col,
} from 'reactstrap';
import { 
  GET_ALL_TWEETS_SUBSCRIPTION,
  TWEETS_QUERY
} from '../graphql'; 
import { useSelector } from "react-redux";
import MenuBar from '../menubar/index';
import { toast } from 'react-toastify';
import PaginatedItems from './paginatedItems';
import { PAUSE } from 'redux-persist/es/constants';


function Home() {
  
    // useQuery() is the primary API for executing queries in an Apollo application. To run a query within a React component, call `useQuery` and pass it a GraphQL query string. 
    const { loading, data, subscribeToMore } = useQuery(TWEETS_QUERY);
    const [ dataId, setDataId ] = useState(0);
    // const [refreshComponent, setRefreshComponent] = useState([1]);

    const theme = useSelector((state) => state.theme);

    const [ refreshHome, setRefreshHome ] = useState([]);

    const [ refreshCounter, setRefreshCounter ] = useState(0);
  
    const pause = (delay) => {
      return new Promise(res => setTimeout(res, delay));
    }
    const handleRefreshHome = async (refreshHomeArg) => {
      console.log("refreshHomeArg: " + refreshHomeArg);
      console.log("start waiting");
      await pause(2000);
      console.log("done waiting");
      // setRefreshHome(refreshHomeArg);
      // const response = await subscribeToMore({
      //   document: GET_ALL_TWEETS_SUBSCRIPTION,
      //   updateQuery: (prev, { subscriptionData }) => {
      //     if(!subscriptionData.data) return prev;

      //     return { tweets: subscriptionData.data.getAllTweets.data }
      //   },
      // });
      // console.log(response);
      setRefreshHome([...refreshHome, 1]);
      // subscribeToMore();
      // setRefreshComponent(true);
      
      console.log(refreshHome);
    };
    

    useEffect(() => {
      (async () => {
        try {
        // subscribeToMore() executes a subscription that pushes updates to the query's original result 
        await subscribeToMore({
          document: GET_ALL_TWEETS_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if(!subscriptionData.data) return prev;

            return { tweets: subscriptionData.data.getAllTweets.data }
          },
        });
        console.log(data.tweets);
        // setRefreshHome([...refreshHome, 1])
        setRefreshCounter(1);
        // setRefreshHome(false);
        setDataId(dataId + 1);
      } catch(e) {}
      })();
    }, []);

    useEffect(() => {
      setRefreshCounter(refreshCounter + 1);
    }, [data]);
    
   
    useEffect(() => {
      const userFirstName = sessionStorage.getItem("loggedInUserFirstName");
      if(userFirstName){
        toast("Welcome " + userFirstName);
      }
    });
  
  return (
    <React.Fragment>
      <h4>RefreshHome: {refreshHome}</h4>
      <h4>RefreshCounter: {refreshCounter}</h4>
      {/* { refreshHome ? <h3>Refreshing homepage...</h3> :  */}
      <Row style={{ background: theme.bg }}>
        <Col lg={4} md={5} xs={5}>
          <MenuBar refreshHome={handleRefreshHome}/>
        </Col>
      <Col lg={2} md={0} xs={0}>
        {/* {mockTweets ? <PaginatedItems itemsPerPage={4} allItems={mockTweets.data.tweets} />
          : null 
        }!mockTweets */}
        {/* <PaginatedItems itemsPerPage={4} allItems={data ? data.tweets : [1, 2, 3]} /> */}
       {refreshCounter == 2  ? <PaginatedItems itemsPerPage={4} allItems={data.tweets} />
        : null }
         {/*
         { refreshHome ? <PaginatedItems itemsPerPage={4} allItems={data.tweets} />
        : null } */}
      
      </Col>
    </Row>
    {/* } */}
  </React.Fragment>
    
  );
}

export default Home;