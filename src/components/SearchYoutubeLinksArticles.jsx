import React, { useEffect, useState } from 'react'
import axios from "axios";

const SearchYoutubeLinksArticles = ({setResults, setLoadingYoutubeVideos, searchTerm, setSearchTerm}) => {

    const handleSearch = async () => {
        setResults([]);
        setLoadingYoutubeVideos(true)
        try {
          // Fetching YouTube search results
          const youtubeResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchTerm}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
          );
    
          // Fetching articles using Google Custom Search API
          const articleResponse = await axios.get(
            `https://www.googleapis.com/customsearch/v1`,
            {
              params: {
                key: process.env.REACT_APP_GOOGLE_CUSTOM_SEARCH_API_KEY,
                cx: process.env.REACT_APP_GOOGLE_CUSTOM_SEARCH_CX,
                q: searchTerm,
              },
            }
          );
    
          // Combine YouTube, articles, and academic paper results
          const combinedResults = [
            ...youtubeResponse.data.items.map((item) => ({
              title: item.snippet.title,
              id: item.id.videoId,
              link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
              type: "video",
            })),
            ...articleResponse.data.items.map((item) => ({
              title: item.title,
              link: item.link,
              type: "article",
            })),
          ];
    
          setResults(combinedResults);
          console.log("articleResponse.data", articleResponse.data);
          console.log("combinedResults", combinedResults);
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingYoutubeVideos(false)
        }
      };
    
      useEffect(() => {
        // Set a timeout to handle debouncing
        const handler = setTimeout(() => {
          if (searchTerm) {
            handleSearch(); 
          }
        }, 700); // 700ms delay
    
        // Cleanup function to clear the previous timeout if the search term changes
        return () => {
          clearTimeout(handler);
        };
      }, [searchTerm]);
  return (
    <div className="searchBox">
        <input
          type="search"
          placeholder="Search for youtube video link and articles"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}><i class="fa-solid fa-magnifying-glass"></i></button>
      </div>
  )
}

export default SearchYoutubeLinksArticles
