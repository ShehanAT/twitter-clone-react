
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
  GET_ALL_TWEETS_SUBSCRIPTION,

} from '../graphql'; 
import Tweet from "../tweet/index";

function Home() {
    const [ tweetTitle, setTweetTitle ] = useState("");
    const [ tweetBody, setTweetBody ] = useState("");
  
    // useQuery() is the primary API for executing queries in an Apollo application. To run a query within a React component, call `useQuery` and pass it a GraphQL query string. 
    const { loading, error, data, subscribeToMore } = useQuery(USERS_AND_TWEETS_QUERY);
    const [ allTweets, setAllTweets ] = useState([]);

    // useMutation() is the primary API for executing queries in an Apollo application
    const [addTweet] = useMutation(CREATE_TWEETS_MUTATION);
    const [addUser] = useMutation(CREATE_USER_MUTATION);
  
    useEffect(() => {
      try {
        // subscribeToMore() executes a subscription that pushes updates to the query's original result 
        subscribeToMore({
          document: GET_ALL_TWEETS_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if(!subscriptionData.data) return prev;
            setAllTweets(subscriptionData.data.getAllTweets.data);
            // const newPost = subscriptionData.data.tweet.data;
            // console.log("prev");
            // console.log(prev);

            // return {
            //   ...prev,
            //   tweets: [newPost, ...prev.usersAndTweets.tweets],
            // };
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
    <Container>
        <Row>
          <Col>
          <h1 className={classes.centerTitle}>Twitter Clone Application</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className={classes.centerTitle}>What's on your mind?</h3>
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
          <h3>Your Latest Tweets: </h3>
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
          allTweets.map((tweet, id) => <Tweet data={tweet} key={id} />)
        }
        </Col>
    </Row>
  </Container>
  );
}

export default Home;