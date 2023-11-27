/* eslint-disable react-hooks/exhaustive-deps */

import './App.css'
import React from 'react'
import Header from './components/Header'
import Body from './components/Body'
import handleApiData from './functions/handleApiData'
import movieDataProcess from './functions/movieData'
import actorDataProcess from './functions/actorData'
import handleRenderData from './functions/handleRenderData'
import _ from 'lodash'; 


function App() {
  const apiKey = 'dcea23fcd1a781899697fca8975d293f';
  const elementsOnPage = 20;
  // "url search"
  const [search, setSearch] = React.useState('')
  // movie data
  const [dataFromAPI, setDataFromAPI] = React.useState([])
  const [dataToRender, setDataToRender] = React.useState([])
  const [renderState, setRenderState] = React.useState(false)
  const [dataPage, setDataPage] = React.useState(1)
  const [totalPages,setTotalPages] = React.useState()
  const [renderData, setRenderData] = React.useState([])
  const [isFetching, setIsFetching] = React.useState(false);

  // movie or actor state
  const [searchFor, setSearchFor] = React.useState("movie")
  const [searchDetails, setSearchDetails] = React.useState({
        search: search,
        searchFor: searchFor,
        dataPage: dataPage

  })
  const [numberOfScroll, setNumberOfScroll] = React.useState(1)
  const [dataCount, setDataCount] = React.useState(0)
  console.log(searchDetails)

  const handleChange = (event) => {
    setDataPage(1)
    setNumberOfScroll(1)
    setDataCount(0)
    setDataToRender([])
    setRenderData([])
    setSearch(event.target.value) 
  }

  const handleSearchType = (event) => {
    setSearchFor(event.target.value)
  }
  //"https://moviesdatabase.p.rapidapi.com/titles/search/akas/Harry"
  // Changes searchDetails if actor/movie selected
  React.useEffect(() => {
    setSearchDetails( prev => {
      return {
        ...prev,
        searchFor: searchFor
      }
    })
  }, [searchFor]);

  React.useEffect ( () => {
    if (totalPages < 5) {
      setRenderState(true)
    } else if (dataToRender.length < numberOfScroll * elementsOnPage) {
      setRenderState(false)
    } else {
      setRenderState(true)
    }
  }, [dataToRender])

  // Changes searchDetails if search query change
  React.useEffect(() => {
   
    setDataPage(1)
    setNumberOfScroll(1)
    setDataCount(0)
    setSearchDetails( prev => {
      console.log(searchDetails)
      console.log(dataPage)
      return {
        ...prev,
        search: search
      }
    })
  }, [search]);

// Changes searchDetails - query page out of totalPages
  React.useEffect(() => {
    setSearchDetails( prev => {
      console.log("bylem w searchDet change")
      return {
        ...prev,
        dataPage: dataPage
      }
    })
  }, [dataPage]);


  window.onscroll = function() {

    // @var int totalPageHeight
    var totalPageHeight = document.body.scrollHeight; 

    // @var int scrollPoint
    var scrollPoint = window.scrollY + window.innerHeight;

    // check if we hit the bottom of the page
    if(scrollPoint >= totalPageHeight)
    {
        console.log("at the bottom");
    }
}


  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== (document.documentElement.offsetHeight -4)|| isFetching) {
      return;
    }
    console.log("next page")
      if (numberOfScroll < totalPages) {
      setNumberOfScroll(prev => prev+1) 
      } 
      setIsFetching(true)
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching]);


  // React.useEffect(() => {
  //   if (!fired) {
  //     window.addEventListener('scroll', handleScroll);
  //   }
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [dataToRender]);

  // function handleScroll() {
  //   let debounce_fun = _.debounce(function () {
  //     if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 2)) return;
  //     console.log("next page")
  //     if (numberOfScroll < totalPages) {
  //     fired = true;
  //     setNumberOfScroll(prev => prev+1) 
  //   } 
  //   setIsFetching(true)
  // }, 1000);
   
  // debounce_fun();
  // }
    //MOVIE DATA

    async function getData () {
      const url = `https://api.themoviedb.org/3/search/${searchFor}?query=${search}&api_key=${apiKey}&page=${dataPage}`
      const options = {
        method: 'GET',
      }
      console.log(url)
      const response = await fetch(url, options);
      const json = await response.json();
      console.log(json)
      console.log(json.results)
      setTotalPages( () => json.total_pages)
      const apiDataAfterProcess = await handleApiData(json.results, renderData)
      console.log(apiDataAfterProcess.length)
      setDataCount (apiDataAfterProcess.length)
      console.log(dataCount)
      setRenderData (apiDataAfterProcess)
      const correctDataToRender = await handleRenderData (apiDataAfterProcess, numberOfScroll, elementsOnPage);
      console.log(correctDataToRender)
      // const dataFactory = await movieDataProcess(correctDataToRender)
      setDataToRender(correctDataToRender)
      
    }
    React.useEffect ( () => {  
      // //let url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${search}`;
      // const url = `https://api.themoviedb.org/3/search/${searchFor}?query=${search}&api_key=${apiKey}&page=${dataPage}`
      // const options = {
      //   method: 'GET',
      // }
      
      // console.log(url)
      // const fetchData = async () => {
      //       try {
      //         const response = await fetch(url, options);
      //         const json = await response.json();
      //         setTotalPages( () => json.total_pages)
      //             console.log(json.results[0])
      //         setDataFromAPI(json.results)
              
      //       } catch (error) {
      //         console.log("error", error);
      //       }
      //     };
      //     fetchData();
      getData()
    }, [searchDetails]);

    

    // React.useEffect ( () => {
    //   //if (dearch == null )
    //   if (searchFor == "movie") {
    //     const dataChangeToComponent = async () => {
    //       try {
    //         // deletes movies without img and release year from api data
    //         const apiDataAfterProcess = await handleApiData(dataFromAPI, renderData)
    //         console.log(apiDataAfterProcess)
    //         // setDataCount ( () =>  renderData.length)
            
    //         // const processData = await movieDataProcess(apiDataAfterProcess)
            
    //         setRenderData(apiDataAfterProcess)
    //         setDataCount (apiDataAfterProcess.length)
    //       } catch (error) {
    //         console.log("error")
    //       }
    //     }
    //     console.log(dataChangeToComponent())
    //     dataChangeToComponent()
    //   } else {
    //       setRenderData(actorDataProcess(dataFromAPI))
    //   }
    // }, [dataFromAPI])
    console.log(renderData)
    console.log(typeof renderData)
    // React.useEffect (() => {
      
    
    //   const renderDataToCorrectElementsRendered = async () => {
    //     try {
    //       const data = await renderData;
    //       console.log(data)
    //       const correctDataToRender = await handleRenderData (data, numberOfScroll, elementsOnPage);
    //       setDataToRender(correctDataToRender)
    //     } catch (error) {
    //       console.log("error", error);
    //     }
    //   }
    //   renderDataToCorrectElementsRendered()
      
    // }, [renderData])

 
    // React.useEffect ( () => {
    //   console.log(dataToRender)
    //   if (dataToRender == undefined) {
    //     return
    //   } else if ( dataToRender.length == 0) {
    //     return
    //   } else if(dataToRender.length < (numberOfScroll * elementsOnPage) ) {
    //     console.log("wpadlem tu")
    //     setDataPage( prev => prev + 1 )
    //   } 
    // }, [dataToRender])

    React.useEffect ( () => {
      console.log(dataCount)
      if (dataCount == 0) {
        return
      } else if ( dataToRender?.length == 0) {
        return
      } else if(dataCount < ((numberOfScroll+1) * elementsOnPage) ) {
          console.log("wpadlem tu")
          if ( dataPage < totalPages) {
            setDataPage( prev => prev + 1 )
            setIsFetching(false)
          }
      } 
    }, [dataCount, numberOfScroll])
    console.log(totalPages)
    console.log(dataCount)
    console.log(renderData)
    console.log(search)
    console.log(dataFromAPI)
    console.log(dataToRender)
    console.log(dataPage)
    console.log(renderState)
    console.log(numberOfScroll)
    console.log(searchDetails)
    console.log((numberOfScroll+1) * elementsOnPage)
    console.log(totalPages)
    console.log(isFetching)
  return (
    <>
      <div>
          <Header 
            handleChange={handleChange}
            handleSearchType={handleSearchType}/>
          {renderState && <Body 
            data={dataToRender}
            searchFor={searchFor}/>}
          {isFetching && <p>Loading...</p>}
      </div>
    </>
  )
}

export default App
