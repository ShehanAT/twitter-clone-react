import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { SET_UPDATE } from "../../redux/actions";
import Tweet from "../tweet/index";

const URL = process.env.REACT_APP_SERVER_URL;

const SideBar = (props) => {
  const [whoFollow, setWhoFollow] = useState(null);
  const [isFollowDisabled, setFollowDisabled] = useState(false);

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

  const handleFollow = async (e, idx) => {
    e.preventDefault();
    setFollowDisabled(true);
    await axios.post(
      `${URL}/follow`,
      {
        followedId: whoFollow[idx].id,
        followerId: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await axios.get(`${URL}/feed/who-follow?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setWhoFollow(res.data.whoFollow);
    setFollowDisabled(false);
    dispatch({ type: SET_UPDATE });
  };

  return (
      <>
        <h3>Your Latest Tweets: </h3>
            {
            props.loading ? (
            <p>Loading...</p>
            ) : props.error ? (
            <p>Error: </p>
            ) : (
            props.data.tweets.map((tweet, id) => <Tweet data={tweet} key={id} />)
            )
            }
      </>
  );
};

export default SideBar;