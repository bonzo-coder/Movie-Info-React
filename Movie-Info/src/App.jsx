
import './App.css'
import React from 'react'
import Header from './components/Header'
import Body from './components/Body'



function App() {
  const apiKey = 'e55ded36';

  const [search, setSearch] = React.useState(`http://www.omdbapi.com/?apikey=${apiKey}&s=harry`)
  const [data, setData] = React.useState(null)
  console.log(search)
  const handleChange = (event) => {
    setSearch(event.target.value)  
  }
  //"https://moviesdatabase.p.rapidapi.com/titles/search/akas/Harry"
  
 
    //MOVIE DATA
    React.useEffect ( () => {
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${search}`;
        const options = {
            method: 'GET',
            // headers: {
            //     'X-RapidAPI-Key': 'cc7b2fd625msh8fb5f8684e4bee5p157bb9jsn803fd219ec82',
            //     'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            // }
        };

        console.log(url)
        const fetchData = async () => {
            try {
              const response = await fetch(url, options);
              const json = await response.json();
              setData(json.Search);
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
          <Header handleChange={handleChange}/>
          <Body data={data}/>
      </div>
    </>
  )
}

export default App
