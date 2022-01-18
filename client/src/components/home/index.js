
import React, { useEffect, useCallback, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
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
import classes from "../../App.css";
import { 
  CREATE_TWEETS_MUTATION,
  GET_ALL_TWEETS_SUBSCRIPTION,
  TWEETS_QUERY
} from '../graphql'; 
import Tweet from "../tweet/index";
import { ProfileCorner, Header } from "../styles/common";
import { useSelector } from "react-redux";
import Activity from '../profile/activity';
import MenuBar from '../menubar/index';
import SideBar from '../sidebar/index';


function Home() {
    const [ tweetTitle, setTweetTitle ] = useState("");
    const [ tweetBody, setTweetBody ] = useState("");
  
    // useQuery() is the primary API for executing queries in an Apollo application. To run a query within a React component, call `useQuery` and pass it a GraphQL query string. 
    const { loading, error, data, subscribeToMore } = useQuery(TWEETS_QUERY);

    // useMutation() is the primary API for executing queries in an Apollo application
    const [addTweet] = useMutation(CREATE_TWEETS_MUTATION);

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
  
   
    const handleFormSubmit = useCallback(
      (e) => {
        e.preventDefault();
  
        if(!tweetTitle || !tweetBody) return;
        const loggedInUserId = sessionStorage.getItem("loggedInUserId");

        addTweet({
          variables: {
            title: tweetTitle,
            body: tweetBody,
            published: true,
            authorId: loggedInUserId
          },
        });
  
        // reset tweetTitle and tweetBody to '' after previous tweet has been submitted
        setTweetTitle("");
        setTweetBody("");
      },
      [addTweet, tweetTitle, tweetBody],
    );
  
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