
import './App.css'
import React from 'react'
import Header from './components/Header'
import Body from './components/Body'



function App() {
  const apiKey = 'dcea23fcd1a781899697fca8975d293f';

  // "url search"
  const [search, setSearch] = React.useState(`http://www.omdbapi.com/?apikey=${apiKey}&s=harry`)
  // movie data
  const [data, setData] = React.useState(null)
  // movie or actor state
  const [searchFor, setSearchFor] = React.useState("movie")

  const handleChange = (event) => {
    setSearch(event.target.value) 
  }

  const handleSearchType = (event) => {
    setSearchFor(event.target.value)
  }
  //"https://moviesdatabase.p.rapidapi.com/titles/search/akas/Harry"
  
 
    //MOVIE DATA
    React.useEffect ( () => {  
      //let url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${search}`;
      const url = `https://api.themoviedb.org/3/search/${searchFor}?query=${search}&api_key=${apiKey}`
      const options = {
        method: 'GET',
      }
      
      console.log(url)
      const fetchData = async () => {
            try {
              const response = await fetch(url, options);
              const json = await response.json();
              console.log(json)
              setData(json.results);
            } catch (error) {
              console.log("error", error);
            }
          };
          fetchData();
    }, [search]);

    console.log(data)
  return (
    <>
      <div>
          <Header 
            handleChange={handleChange}
            handleSearchType={handleSearchType}/>
          <Body 
            data={data}
            searchFor={searchFor}/>
      </div>
    </>
  )
}

export default App
