import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { SET_UPDATE } from "../../redux/actions";
import Tweet from "../tweet/index";


const SideBar = (props) => {

  const user = useSelector((state) => state.profile.user);
  const userId = user.id;
  const token = user.token;
  const refresh = useSelector((state) => state.update.refresh);
  const dispatch = useDispatch();

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    return () => {
      source.cancel();
    };
  }, [refresh]);

  return (
      <>
        
        {/* <PaginatedItems itemsPerPage={4} allItems={props.data.tweets} /> */}
            {/* {
            props.loading ? (
            <p>Loading...</p>
            ) : props.error ? (
            <p>Error: </p>
            ) : props.data.tweets.map((tweet, id) => <Tweet data={tweet} key={id} />)
              
            } */}
      </>
  );
};

export default SideBar;