


export default async function handleRenderData (renderData, numberOfScroll, elementsOnPage) {

    
    
    console.log(renderData)

    const elementsToRender = numberOfScroll * elementsOnPage;
    console.log(elementsToRender)    
     let dataArray = [];
        if (renderData.length !== 0 ) {
        for ( let i=0; i<elementsToRender; i++) {
            if (renderData[i] !== undefined) {
            dataArray.push(renderData[i])
            }
        }
    }
    
    
    
    
    return dataArray;
}