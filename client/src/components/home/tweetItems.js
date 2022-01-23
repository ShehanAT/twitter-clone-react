
import React, { useState, useEffect } from "react";
import Tweet from "../tweet/index";

const TweetItems = ({ currentTweetItems }) => {
    return (
      <>
        { currentTweetItems && 
          currentTweetItems.map((tweet, id) => (
            <Tweet data={tweet} key={id} />
          )) }
      </>
    )
};

export default TweetItems;