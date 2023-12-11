export default function handleApiData (arrayNewData, arrayOldData) {

    const indexStartPlace = arrayOldData.length;
    
    let newArray = arrayOldData; 
    const dataArray = arrayNewData.map( (data, index) => {
        console.log("byłem")
        const imageUrl = "https://image.tmdb.org/t/p/w500" + data.poster_path;
        const releaseYear = data.release_date?.slice(0,4);
        // Stop if ID already in array
        if ( Array.prototype.includes.call(newArray, data.id) ) {
            return
        }
        if( imageUrl !== "https://image.tmdb.org/t/p/w500null" && releaseYear !== null) {
            newArray.push({...data, index: index + indexStartPlace})
        } else {
            return
        }
   })
   
   return newArray
}