import React, { useState, useEffect } from "react";
import props from 'prop-types';
import ReactPaginate from "react-paginate";
import Tweet from "../tweet/index";
import TweetItems from "./tweetItems";

const PaginatedItems = ({ itemsPerPage, allItems }) => {
    const [ currentItems, setCurrentItems ] = useState(null);
    const [ pageCount, setPageCount ] = useState(0);
    // Using item offsets for pagination feature 
    const [ itemOffset, setItemOffset ] = useState(0);
    const [ refreshComponent, setRefreshComponent ] = useState([]);
    useEffect(() => {
      allItems = [...allItems].reverse();
      var endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(allItems.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(allItems.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, allItems]);

    // useEffect(() => {
    //   console.log(allItems);
    //   setRefreshComponent([...refreshComponent, 1]);
    // },[allItems]);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % allItems.length;
      console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
      setItemOffset(newOffset);
    }
  
    return (
      <>
        <h3>Welcome {sessionStorage.getItem("loggedInUserFirstName")}!</h3>
        <h3>Latest Tweets: </h3>
        <div className="all-tweets-container" name="all-tweets-container">
          <TweetItems currentTweetItems={currentItems} />
        </div>
        <ReactPaginate 
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </>
    );
  
  };

  export default PaginatedItems;