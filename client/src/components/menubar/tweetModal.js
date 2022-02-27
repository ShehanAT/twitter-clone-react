import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import UploadButton from "../uploadButton";
import { useMutation } from '@apollo/react-hooks';
import { Flex, Button } from "../styles/modal";
import { 
  Form,
  Input 
} from 'reactstrap';
import  user_avatar  from "../../assets/user_avatar.png";
import { 
  CREATE_TWEETS_MUTATION
} from '../graphql'; 
import "./tweetModal.css";
const URL = process.env.REACT_APP_SERVER_URL;

const TweetModal = (props) => {
 
};

export default TweetModal;