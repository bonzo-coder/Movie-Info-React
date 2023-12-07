/* eslint-disable react-hooks/exhaustive-deps */

import './App.css'
import React from 'react'
import Header from './components/Header'
import Body from './components/Body'
import handleApiData from './functions/handleApiData'
import handleRenderData from './functions/handleRenderData'

function App() {
  const apiKey = 'dcea23fcd1a781899697fca8975d293f';
  // "url search"
  const [search, setSearch] = React.useState('')
  // movie data
  const [dataToRender, setDataToRender] = React.useState([])
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
  const [hasMoreData, setHasMoreData] = React.useState(false)
  console.log(searchDetails)

  //handle input
  const handleChange = (event) => {
    setDataPage(1)
    setDataToRender([])
    setRenderData([])
    console.log(event)
    setSearch(event.target.value) 
  }
  //handle select
  const handleSearchType = (event) => {
    setDataPage(1)
    setDataToRender([])
    setRenderData([])
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

  // React.useEffect ( () => {
  //   if (totalPages < 5) {
  //     setRenderState(true)
  //   } else if (dataToRender.length < numberOfScroll * elementsOnPage) {
  //     setRenderState(false)
  //   } else {
  //     setRenderState(true)
  //   }
  // }, [dataToRender])

  // Changes searchDetails if search query change
  React.useEffect(() => {
    setDataPage(1)
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
      return {
        ...prev,
        dataPage: dataPage
      }
    })
  }, [dataPage]);


  const observer = React.useRef()
  const lastElementRef = React.useCallback(node => {
    console.log("bylemwREEEFFF")
    if (isFetching) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && 1) {
        setDataPage(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [isFetching, hasMoreData])

  // const handleScroll = () => {
  //   if (window.innerHeight + document.documentElement.scrollTop !== (document.documentElement.offsetHeight -4)|| isFetching) {
  //     return;
  //   }
  //   console.log("next page")
  //     if (numberOfScroll < totalPages) {
  //     setNumberOfScroll(prev => prev+1) 
  //     } 
  //     setIsFetching(true)
  // };

  // React.useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [isFetching]);


  
    //MOVIE DATA

    async function getData () {
      setIsFetching(true)
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
      // console.log(apiDataAfterProcess.length)
      // setDataCount (apiDataAfterProcess.length)
      setHasMoreData (apiDataAfterProcess.length > 0)
      // console.log(dataCount)
      setRenderData (apiDataAfterProcess)
      // const correctDataToRender = await handleRenderData (apiDataAfterProcess, numberOfScroll, elementsOnPage);
      // console.log(correctDataToRender)
      // const dataFactory = await movieDataProcess(correctDataToRender)
      setDataToRender(apiDataAfterProcess)
      setIsFetching(false)
    }

    React.useEffect ( () => {  
      if ( dataPage > totalPages) {
        return
      }
      getData()
    }, [searchDetails]);

    // console.log(totalPages)
    // console.log(dataCount)
       console.log(renderData)
    // console.log(search)
    // console.log(dataFromAPI)
     console.log(dataToRender)
    // console.log(dataPage)
    // console.log(renderState)
    // console.log(numberOfScroll)
     console.log(searchDetails)
    // console.log((numberOfScroll+1) * elementsOnPage)
    // console.log(totalPages)
    console.log(isFetching)
    console.log(hasMoreData)
  return (
    <>
      <div>
          <Header 
            handleChange={handleChange}
            handleSearchType={handleSearchType}/>
          <Body 
            data={dataToRender}
            ref = {lastElementRef}
            searchFor={searchFor}/>
          {isFetching && <p>Loading...</p>}
      </div>
    </>
  )
}

export default App
