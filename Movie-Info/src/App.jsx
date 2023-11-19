
import './App.css'
import React from 'react'
import Header from './components/Header'
import Body from './components/Body'



function App() {

  const [search, setSearch] = React.useState("https://moviesdatabase.p.rapidapi.com/titles/search/akas/Harry")
  const [data, setData] = React.useState(null)

  const handleChange = (event) => {
    setSearch(event.target.value)  
  }


 
    //MOVIE DATA
    React.useEffect ( () => {
        const url = `https://moviesdatabase.p.rapidapi.com/titles/search/akas/${search}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'cc7b2fd625msh8fb5f8684e4bee5p157bb9jsn803fd219ec82',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        };
        const fetchData = async () => {
            try {
              const response = await fetch(url, options);
              const json = await response.json();
              setData(json.results);
            } catch (error) {
              console.log("error", error);
            }
          };
      
          fetchData();
    }, [search]);

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
