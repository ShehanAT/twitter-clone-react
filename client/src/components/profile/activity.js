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
import { useSelector } from "react-redux";



const Activity = (props) => {

    const [ tweetBody, setTweetBody ] = useState("");
  
    // useQuery() is the primary API for executing queries in an Apollo application. To run a query within a React component, call `useQuery` and pass it a GraphQL query string. 
    const { subscribeToMore } = useQuery(TWEETS_QUERY);

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
  
        if(!tweetBody) return;
        const loggedInUserId = sessionStorage.getItem("loggedInUserId");

        addTweet({
          variables: {
            body: tweetBody,
            published: true,
            authorId: loggedInUserId
          },
        });
  
        // reset tweetBody to '' after previous tweet has been submitted
        setTweetBody("");
      },
      [addTweet, tweetBody],
    );

    return (
        <Row>
          <Col xs="6" className={classes.form}>
          <Form onSubmit={handleFormSubmit}>
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
              disabled={tweetBody === ""}  
              >
              Post Tweet!
              </Button>
          </Form>
          <Row>
          </Row>
          </Col>
      </Row>
    );


}

export default Activity;