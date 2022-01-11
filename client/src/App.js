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
import classes from "./App.css";

import { 
  TWEETS_QUERY,
  CREATE_TWEETS_MUTATION,
  CREATE_USER_MUTATION,
  TWEETS_SUBSCRIPTION
} from './components/graphql';
import Tweet from "./components/tweet/index"

const App = () => {
  const [ tweetTitle, setTweetTitle ] = useState("");
  const [ tweetBody, setTweetBody ] = useState("");

  // useQuery() is the primary API for executing queries in an Apollo application. To run a query within a React component, call `useQuery` and pass it a GraphQL query string. 
  const { loading, error, data, subscribeToMore } = useQuery(TWEETS_QUERY);
  // useMutation() is the primary API for executing queries in an Apollo application
  const [addTweet] = useMutation(CREATE_TWEETS_MUTATION);
  const [addUser] = useMutation(CREATE_USER_MUTATION);


  useEffect(() => {
    try {
      // subscribeToMore() executes a subscription that pushes updates to the query's original result 
      subscribeToMore({
        document: TWEETS_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if(!subscriptionData.data) return prev;
          const newPost = subscriptionData.data.post.data;

          return {
            ...prev,
            posts: [newPost, ...prev.posts],
          };
        },
      });
    } catch(e) {}
  }, [subscribeToMore]);

  // useCallback() returns a memoized callback. Memoization is an optimization technique used primarily to speed up computer programs by storing the results for expensive function calls and returning the cached result when the same inputs occur again.
  // useCallback() also returns the same function instance between renderings(aka memoization)
  // as long as addTweet, tweetTitle and tweetBody variable values are the same, useCallback() does not submit the form. If one or more of the values change then the form is submitted
  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if(!tweetTitle || !tweetBody) return;

      addTweet({
        variables: {
          title: tweetTitle,
          body: tweetBody,
          published: true,
          authorId: 2
        },
      });

      addUser({
        variables: {
          firstName: "Niccolo",
          lastName: "Tesla",
          email: "niccolotesla@gmail.com",
          age: 46,
          password: "teslaMotors123!"
        }
      });
      // reset tweetTitle and tweetBody to '' after previous tweet has been submitted
      setTweetTitle("");
      setTweetBody("");
    },
    [addTweet, addUser, tweetTitle, tweetBody],
  );

    return (
      <Container>
        <Row>
          <Col>
            <h1 className={classes.title}>Twitter Clone Application</h1>
          </Col>
        </Row>
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
          </Col>
          <Col xs="6">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: </p>
            ) : (
              data.tweets.map((tweet, id) => <Tweet data={tweet} key={id} />)
            )
          
          }
          </Col>
        </Row>
      </Container>
    )
}

export default App;