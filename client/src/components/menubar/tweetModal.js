import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UploadButton from "../uploadButton";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Flex, Button } from "../styles/modal";
import { 
  Form,
  Input 
} from 'reactstrap';
import  user_avatar  from "../../assets/user_avatar.png";
import { 
  CREATE_TWEETS_MUTATION,
  GET_ALL_TWEETS_SUBSCRIPTION,
  TWEETS_QUERY
} from '../graphql'; 
import "./tweetModal.css";
const URL = process.env.REACT_APP_SERVER_URL;

const TweetModal = (props) => {
  const [text, setText] = useState("");
  const [isTweetDisabled, setIsTweetDisabled] = useState(false);
  const [preview, setPreview] = useState({ image: "", video: "", media: null });

  const [ tweetBody, setTweetBody ] = useState("");

  // useQuery() is the primary API for executing queries in an Apollo application. To run a query within a React component, call `useQuery` and pass it a GraphQL query string. 
  const { subscribeToMore } = useQuery(TWEETS_QUERY);

  // useMutation() is the primary API for executing queries in an Apollo application
  const [addTweet] = useMutation(CREATE_TWEETS_MUTATION);

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

  const handleSubmittedTweet = props.handleSubmittedTweetEvent;

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if(!tweetBody) return;
      const loggedInUserId = sessionStorage.getItem("loggedInUserId");

      addTweet({
        variables: {
          title: "",
          body: tweetBody,
          published: true,
          authorId: loggedInUserId
        },
      });

      // reset tweetBody to '' after previous tweet has been submitted
      setTweetBody("");
      handleSubmittedTweet();
    },
    [addTweet,  tweetBody],
  );

  const theme = useSelector((state) => state.theme);


  const handlePhoto = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const isImage = file.type.includes("image");

    reader.onloadend = () => {
      isImage
        ? setPreview({ image: reader.result, video: "", media: file })
        : setPreview({ image: "", video: reader.result, media: file });
    };
  };



  return (
    
    <div>
      <Form onSubmit={handleFormSubmit}>
      <Flex bg={theme.bg} color={theme.color}>
        <div>
          <img
            src={user_avatar}
            width="49px"
            height="49px"
            style={{ borderRadius: "50%" }}
            alt="user avatar image"
          />
        </div>
        <div style={{ width: "100%" }}>
           <Input 
                  type="textarea"
                  name="body"
                  value={tweetBody}
                  id="body"
                  placeholder="Tweet Body..."
                  onChange={(e) => setTweetBody(e.target.value)}
              />
          <div style={{ marginBottom: "10px" }}>
            {preview.video && (
              <video
                src={preview.video}
                style={{ width: "100%" }}
                controls
              ></video>
            )}
          </div>
          <Flex style={{ alignItems: "center", justifyContent: "flex-end" }}>
            <div>
              <label htmlFor="photo">
                <UploadButton />
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*,video/*"
                onChange={handlePhoto}
                style={{ display: "none" }}
              />
            </div>
            <div>
              <Button
                onClick={handleFormSubmit}
                disabled={isTweetDisabled}
                defaultBg={theme.defaultBg}
                darkBg={theme.darkBg}
              >
                Tweet
              </Button>
            </div>
          </Flex>
        </div>
      </Flex>
      </Form>
    </div>
  );
};

export default TweetModal;