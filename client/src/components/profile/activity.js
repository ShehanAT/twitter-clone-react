import React, { useEffect, useCallback, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { 
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
import { useSelector } from "react-redux";



const Activity = (props) => {

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
        <Row>
          <Col xs="6" className={classes.form}>
          <Form onSubmit={handleFormSubmit}>
              <FormGroup row>
              <Label for="title" sm={2}>
                  Title 
              </Label>
              <Col sm={10}>
                  <Input 
                  name="title"
                  value={tweetTitle}
                  id="title"
                  place="Tweet title..."
                  onChange={(e) => setTweetTitle(e.target.value)}
                  />
              </Col>
              </FormGroup>
              <FormGroup>
              <Label for="body">Message Content:</Label>
              <Input 
                  type="textarea"
                  name="body"
                  value={tweetBody}
                  id="body"
                  placeholder="Tweet Body..."
                  onChange={(e) => setTweetBody(e.target.value)}
              />
              </FormGroup>
              <Button 
              type="submit"
              color="primary"
              disabled={tweetTitle === "" || tweetBody === ""}  
              >
              Post Tweet!
              </Button>
          </Form>
          <Row>
            {/* <h3>Your Latest Tweets: </h3>
            {
                loading ? (
                <p>Loading...</p>
                ) : error ? (
                <p>Error: </p>
                ) : (
                data.tweets.map((tweet, id) => <Tweet data={tweet} key={id} />)
                )
            } */}
          </Row>
          </Col>
          {/* <Col xs="6">
            
          </Col> */}
      </Row>
    );


}

export default Activity;