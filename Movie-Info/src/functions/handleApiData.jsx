
export default function handleApiData (arrayNewData, arrayOldData) {

    console.log(arrayNewData)
    console.log(arrayOldData)
   
    
    let newArray = arrayOldData; 
    const dataArray = arrayNewData.map( movie => {
        console.log("byłem")
        const imageUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
        const releaseYear = movie.release_date?.slice(0,4);
        // Stop if ID already in array
        if ( Array.prototype.includes.call(newArray, movie.id) ) {
            return
        }
        if( imageUrl !== "https://image.tmdb.org/t/p/w500null" && releaseYear !== null) {
            newArray.push(movie)
        } else {
            return
        }
   })
   
   console.log(newArray)
   console.log(newArray.length)
   console.log (typeof newArray)
   return newArray
}