import React, { useEffect, useState } from 'react';
import { useQuery  } from '@apollo/react-hooks';
import { 
  Row, 
  Col,
} from 'reactstrap';
import { 
  TWEETS_QUERY
} from '../graphql'; 
import { useSelector } from "react-redux";
import MenuBar from '../menubar/index';
import { toast } from 'react-toastify';
import PaginatedItems from './paginatedItems';


function Home() {

}

export default Home;