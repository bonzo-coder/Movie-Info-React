
import './App.css'
import React from 'react'
import Header from './components/Header'
import Body from './components/Body'
import handleApiData from './functions/handleApiData'
import movieDataProcess from './functions/movieData'
import actorDataProcess from './functions/actorData'
import handleRenderData from './functions/handleRenderData'



function App() {
  const apiKey = 'dcea23fcd1a781899697fca8975d293f';
  const elementsOnPage = 20;
  // "url search"
  const [search, setSearch] = React.useState('')
  // movie data
  const [dataFromAPI, setDataFromAPI] = React.useState([])
  const [dataToRender, setDataToRender] = React.useState([])
  const [dataToRenderNext, setDataToRenderNext] = React.useState([])
  const [dataPage, setDataPage] = React.useState(1)
  const [totalPages,setTotalPages] = React.useState()
  const [renderData, setRenderData] = React.useState([])

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
    
    setDataToRender([])
    setDataToRenderNext([])
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
      return {
        ...prev,
        dataPage: dataPage
      }
    })
  }, [dataPage]);


  React.useEffect(() => {
    window.addEventListener('scroll', function(){setTimeout(handleScroll, 2000)});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    console.log("next page")
    setNumberOfScroll(prev => prev+1)
  }
    //MOVIE DATA
    React.useEffect ( () => {  
      //let url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${search}`;
      const url = `https://api.themoviedb.org/3/search/${searchFor}?query=${search}&api_key=${apiKey}&page=${dataPage}`
      const options = {
        method: 'GET',
      }
      
      console.log(url)
      const fetchData = async () => {
            try {
              const response = await fetch(url, options);
              const json = await response.json();
              setTotalPages( () => json.total_pages)
              setDataFromAPI(json.results)
            } catch (error) {
              console.log("error", error);
            }
          };
          fetchData();
    }, [searchDetails]);

    

    React.useEffect ( () => {
      //if (dearch == null )
      if (searchFor == "movie") {
        const dataChangeToComponent = async () => {
          try {
            // deletes movies without img and release year from api data
            const apiDataAfterProcess = await handleApiData(dataFromAPI, renderData)
            console.log(apiDataAfterProcess[1])
            // setDataCount ( () =>  renderData.length)
            setDataCount ( () => { return apiDataAfterProcess.length})
            // const processData = await movieDataProcess(apiDataAfterProcess)
            if (apiDataAfterProcess.length > 0){
            setRenderData(apiDataAfterProcess)}
          } catch (error) {
            console.log("error")
          }
        }
        dataChangeToComponent()
      } else {
          setRenderData(actorDataProcess(dataFromAPI))
      }
    }, [dataFromAPI])
    console.log(renderData)
    React.useEffect (() => {
      console.log(dataCount)
      console.log(renderData)
      const renderDataToCorrectElementsRendered = async () => {
        try {
          const data = await renderData;
          console.log(data)
          const correctDataToRender = await handleRenderData (data, numberOfScroll, elementsOnPage);
          setDataToRender(correctDataToRender)
        } catch (error) {
          console.log("error", error);
        }
      }
      renderDataToCorrectElementsRendered()
      
    }, [renderData])

 
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
      } else if(dataCount < (numberOfScroll * elementsOnPage) ) {
        console.log("wpadlem tu")
        setDataPage( prev => prev + 1 )
      } 
    }, [dataCount])
    console.log(totalPages)
    console.log(dataCount)
    console.log(renderData)
    console.log(search)
    console.log(dataFromAPI)
    console.log(dataToRender)
    console.log(dataPage)
  return (
    <>
      <div>
          <Header 
            handleChange={handleChange}
            handleSearchType={handleSearchType}/>
          <Body 
            data={dataToRender}
            searchFor={searchFor}/>
      </div>
    </>
  )
}

export default App
