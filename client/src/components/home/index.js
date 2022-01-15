
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
  USERS_AND_TWEETS_QUERY,
  CREATE_TWEETS_MUTATION,
  CREATE_USER_MUTATION,
  TWEETS_SUBSCRIPTION,

} from '../graphql'; 
import Tweet from "../tweet/index";
import User from "../user/index";

function Home() {
    const [ tweetTitle, setTweetTitle ] = useState("");
    const [ tweetBody, setTweetBody ] = useState("");
    const [ userFirstName, setUserFirstName ] = useState("");
    const [ userEmail, setUserEmail ] = useState("");
  
    // useQuery() is the primary API for executing queries in an Apollo application. To run a query within a React component, call `useQuery` and pass it a GraphQL query string. 
    const { loading, error, data, subscribeToMore } = useQuery(USERS_AND_TWEETS_QUERY);
   
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
            const newPost = subscriptionData.data.tweet.data;
  
            return {
              ...prev,
              tweets: [newPost, ...prev.tweets],
            };
          },
        });
  
      } catch(e) {}
    });
  
   
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
  
        // reset tweetTitle and tweetBody to '' after previous tweet has been submitted
        setTweetTitle("");
        setTweetBody("");
      },
      [addTweet, tweetTitle, tweetBody],
    );
  
    const handleUserFormSubmit = useCallback(
      (e) => {
        e.preventDefault();
  
        addUser({
          variables: {
            firstName: "Niccolo",
            lastName: "Tesla",
            email: "niccolotesla@gmail.com",
            age: 46,
            password: "teslaMotors123!"
          }
        });
      },
      [addUser, userFirstName, userEmail],
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
        <Form onSubmit={handleUserFormSubmit}>
            <FormGroup row>
            <Label for="title" sm={2}>
                User FirstName 
            </Label>
            <Col sm={10}>
                <Input 
                name="title"
                value={userFirstName}
                id="title"
                place="Tweet title..."
                onChange={(e) => setUserFirstName(e.target.value)}
                />
            </Col>
            </FormGroup>
            <FormGroup>
            <Label for="body">User Email:</Label>
            <Input 
                name="body"
                value={userEmail}
                id="body"
                placeholder="User Email..."
                onChange={(e) => setUserEmail(e.target.value)}
            />
            </FormGroup>
            <Button 
            type="submit"
            color="primary"
            disabled={userFirstName === "" || userEmail === ""}  
            >
            Add User!
            </Button>
        </Form>
        </Col>
        <Col xs="6">
        {
            loading ? (
            <p>Loading...</p>
            ) : error ? (
            <p>Error: </p>
            ) : (
            data.usersAndTweets.tweets.map((tweet, id) => <Tweet data={tweet} key={id} />)
            
            )
        }
        {
            loading ? (
            <p>Loading...</p>
            ) : error ? (
            <p>Error: </p>
            ) : (
            data.usersAndTweets.users.map((user, id) => <User data={user} key={id} />)
            )
        }
        </Col>
    </Row>
  </Container>
  );
}

export default Home;