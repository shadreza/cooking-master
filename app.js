// to show a message using a custom popup box 
const showMessage = message => {
    document.getElementById('popupBoxMessage').innerText=message;
    document.getElementById('popupBox').style.display='block';
}

// closing the popup box from the buttons click
document.getElementById('closePopupBox').addEventListener('click',function(){
    document.getElementById('popupBox').style.display='none';
})

// this function will make the passedId's passed in the arguement innerHTML to none
const makeInnerHtmlNone = passedId => {
    passedId.innerHTML='';
}

// this will display the foods in a grid of 4 and this will be done at the first stage of the webpage loading
// also the image and the name will be shown 
const displayFoodsInTheGallery = fletchedJsonDataOfFoods => {
    const foodGalleryId = document.getElementById('foodGallery');
    makeInnerHtmlNone(foodGalleryId);
    foodArrayFromJsonMeals = fletchedJsonDataOfFoods.meals;
    foodArrayFromJsonMeals.forEach(individualFoodContent => {
        const urlOfTheFoodImage = `${individualFoodContent.strMealThumb}`;
        const nameOfTheFood = individualFoodContent.strMeal;
        const individualFoodDiv = document.createElement('div');
        individualFoodDiv.className='foodBoxesInternals';
        individualFoodDiv.id=`${nameOfTheFood}`;
        const foodInfo = `
            <img id='${nameOfTheFood}' src='${urlOfTheFoodImage}'>
            <p id='${nameOfTheFood}'>${nameOfTheFood}<p>
            `
        individualFoodDiv.innerHTML=foodInfo;
        document.getElementById('foodGallery').appendChild(individualFoodDiv);
    });
}

// this functions holds the power of dsiplaying a hidden div with the name , picture , ingredients and the measurements and also 2 special buttons like a button for video and closing the div 
// here all the elements re being created and after reading the ingredients and the measures all the elements are appended to the main div
const showTheDetailsOfTheFood = fletchedDataOfFood => {

    // setting up the tags
    const selectedFoodShowCasingDiv = document.getElementById('foodThatWillShowUpId');
    const foodImageUrl = fletchedDataOfFood.strMealThumb;
    const nameOfTheFood = fletchedDataOfFood.strMeal;
    const ulForTheFoodIngredients = document.createElement('ul');
    const imgOfTheFood = document.createElement('img');
    imgOfTheFood.src=foodImageUrl;
    const headingNameOfTheFood = document.createElement('h2');
    headingNameOfTheFood.innerText=nameOfTheFood;
    const buttonForPlayingVideoRecipe = document.createElement('button');
    const urlForVideoOfTheRecipe = fletchedDataOfFood.strYoutube;
    const anchorWrappingTheButton = document.createElement('a');
    anchorWrappingTheButton.href=urlForVideoOfTheRecipe;
    buttonForPlayingVideoRecipe.className='btn btn-success';
    buttonForPlayingVideoRecipe.innerText="wanna make along? click me!";
    anchorWrappingTheButton.appendChild(buttonForPlayingVideoRecipe);
    const closeTheDiv = document.createElement('button');
    closeTheDiv.innerText='close';
    closeTheDiv.className='btn btn-danger';
    closeTheDiv.addEventListener('click',function(){
        makeInnerHtmlNone(selectedFoodShowCasingDiv);
        selectedFoodShowCasingDiv.style.display='none';
        const foodGalleryId = document.getElementById('foodGallery');
        makeInnerHtmlNone(foodGalleryId);
        clearTheSearchBox();
    })

    // as the ingredients are in strIngredient1 , strIngredient2 , strIngredient(n) format so i had to use the for loop to bring the properties out like that
    let i=1;
    while(1){
        const ingredientsProperty = `strIngredient${i}`;
        const measuresOfTheIngredientsProperty = `strMeasure${i}`;
        const ingredient = fletchedDataOfFood[ingredientsProperty];
        const measures = fletchedDataOfFood[measuresOfTheIngredientsProperty];
        if(ingredient=='' || ingredient==undefined || ingredient==null){
            break;
        }
        else{
            const liOfTheFoodIngredients = document.createElement('li');
            liOfTheFoodIngredients.textContent = measures + ' ......... ' + ingredient;
            ulForTheFoodIngredients.appendChild(liOfTheFoodIngredients);
        }
        i++;
    }
    if(i==1){
        // if the loop never ran this will happen only if there is no ingredients so no need to go further
        showMessage('No Ingredients Found!');
        return;
    }
    else{
        // appending the html tags in the detail div portion 
        const beforeIngredientsText = document.createElement('h5');
        beforeIngredientsText.innerText = 'The Ingredients Along with their Measurements ->>>\n';
        makeInnerHtmlNone(selectedFoodShowCasingDiv);
        selectedFoodShowCasingDiv.appendChild(headingNameOfTheFood);
        selectedFoodShowCasingDiv.appendChild(imgOfTheFood);
        selectedFoodShowCasingDiv.appendChild(beforeIngredientsText);
        selectedFoodShowCasingDiv.appendChild(ulForTheFoodIngredients);
        selectedFoodShowCasingDiv.appendChild(anchorWrappingTheButton);
        const breakingLine = document.createElement('br');
        selectedFoodShowCasingDiv.appendChild(breakingLine);
        selectedFoodShowCasingDiv.appendChild(closeTheDiv);
        makeInnerHtmlNone(document.getElementById('elementFromTheSearchResultDiv'));
        clearTheSearchBox();
        selectedFoodShowCasingDiv.style.display= 'block';
        window.scrollTo(0,200);
    }
}

// this is a function that call for the special div or the details section of a given items or food
const requestForInternalDetails = urlOfTheSpecificFood => {
    fetchingFromTheMealDBApi(urlOfTheSpecificFood , 2);
}

// // if any of the searched food items that are suggested are clicked then if the click is on the food part then that will trigger the indepth information about the food 
// document.getElementById('elementFromTheSearchResultDiv').addEventListener('click',event =>{
//     const idOfTheClickedFood = event.target.id;
//     console.log(idOfTheClickedFood);
//     if(idOfTheClickedFood == 'elementFromTheSearchResultDiv'){
//         return;
//     }
//     const sendingAPIUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${idOfTheClickedFood}`;
//     requestForInternalDetails(sendingAPIUrl);
// })

// if any part of the foodGallery is pressed then it will trigger the event and if the picture or the name or the internal part of the food is clicked this will show the details of the food but if the outside part or a non food part is clicked then this will not go for the details section
document.getElementById('foodGallery').addEventListener('click',event =>{
    const idOfTheClickedFood = event.target.id;
    if(idOfTheClickedFood == 'foodGallery'){
        return;
    }
    const sendingAPIUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${idOfTheClickedFood}`;
    requestForInternalDetails(sendingAPIUrl);
})

// By typing in the search-box the typed text will be shown as the search results just bellow the search box
// this is also an added functionality for the food suggestion
const displaySearchResults = (fletchedDataInJson) => {
    const searchResultDiv = document.getElementById('elementFromTheSearchResultDiv');
    makeInnerHtmlNone(searchResultDiv);
    const fletchedDataOfMeals = fletchedDataInJson.meals;
    fletchedDataOfMeals.forEach(indivialMealContent => {
        const divForIndividualFoodFromSearchResult = document.createElement('div');
        const nameOfTheFood = indivialMealContent.strMeal;
        divForIndividualFoodFromSearchResult.className='individualFoodInfo';
        divForIndividualFoodFromSearchResult.id=nameOfTheFood;
        divForIndividualFoodFromSearchResult.innerHTML = `
            <img id=${nameOfTheFood} class='imageOfTheSearches' src =${indivialMealContent.strMealThumb}>
            <small id=${nameOfTheFood}>${nameOfTheFood}<small>
        `
        searchResultDiv.appendChild(divForIndividualFoodFromSearchResult);
    });
    searchResultDiv.style.display='grid';
}

// the fletching part is done in this functions
// if the second arguement or passedInfoForTakingDecision is 1 that means loading the foods for the initial display
// else if passedInfoForTakingDecision is 2 that means i am searching for a specific food 
const fetchingFromTheMealDBApi = (passedUrlForFetching , passedInfoForTakingDecision , nameOfTheFood='') => {
    fetch(passedUrlForFetching)
    .then(responseFromApiToJson => responseFromApiToJson.json())
    .then(fletchedDataInJson => {
        if(passedInfoForTakingDecision==1){
            displayFoodsInTheGallery(fletchedDataInJson);
        }
        else if(passedInfoForTakingDecision==2){
            const fletchedFoodObjectFromJson = fletchedDataInJson.meals[0];
            showTheDetailsOfTheFood(fletchedFoodObjectFromJson);
        }
        // else if(passedInfoForTakingDecision==3){
        //     displaySearchResults(fletchedDataInJson);
        // }
    })
    // if there is any problem then the following catch codes will be executed as per condition
    .catch(errorWhileProcessing => {
        const onlineOrOffline = window.navigator.onLine;
        let errorMessage='';
        if(!onlineOrOffline){
            errorMessage = "Please Check Your Internet Connection";
        }
        else if(passedInfoForTakingDecision==1){
            errorMessage =  nameOfTheFood+" Can't Be Found In The Database Of TheMealDB!\n\nSorry!";
        }
        else if(passedInfoForTakingDecision==2){
            errorMessage =  nameOfTheFood+" Can't Be Found In The Database Of TheMealDB!\n\nSorry!";
        }
        else{
            return;
        }
        showMessage(errorMessage);
        document.getElementById('foodThatWillShowUpId').style.display='none';
        errorWhileProcessing.console;
        clearTheSearchBox();
    })
}

// this is like the constructor portion of the code 
// this will display the foods in the initial stages
// displaying foods that starts with a, c, d, e and f
// fetchingFromTheMealDBApi('https://www.themealdb.com/api/json/v1/1/search.php?f=a',1);
// fetchingFromTheMealDBApi('https://www.themealdb.com/api/json/v1/1/search.php?f=c',1);
// fetchingFromTheMealDBApi('https://www.themealdb.com/api/json/v1/1/search.php?f=d',1);
// fetchingFromTheMealDBApi('https://www.themealdb.com/api/json/v1/1/search.php?f=e',1);
// fetchingFromTheMealDBApi('https://www.themealdb.com/api/json/v1/1/search.php?f=f',1);

// this function looks inside the search box input section and if it sees a valid string then it sends that name or text for showing the details about that food or object and if not found then shown message
const searchMealInfo = () => {
    const nameOfTheEnteredMeal = document.getElementById('inputFromUser').value;
    if(nameOfTheEnteredMeal=='' || nameOfTheEnteredMeal==undefined || nameOfTheEnteredMeal==null){
        showMessage('Please Insert A Valid Meal First!');
    }
    else{
        const sendingAPIUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameOfTheEnteredMeal}`;
        fetchingFromTheMealDBApi(sendingAPIUrl,1,nameOfTheEnteredMeal);
    }
}

// this will clear up the input text or the search box
const clearTheSearchBox = () => {
    document.getElementById('inputFromUser').value='';
}

// when the search button is pressed this triggers the searching of the entered information
document.getElementById('searchButton').addEventListener('click',() =>{
    searchMealInfo();
    clearTheSearchBox();
})


// if enter keyCode 13 is pressed and the focus is at the time of staying in the input frame this will also trigger the searching for the meal information
// else if the input text matches with any food name that the api returns then we will show them also and if no then that display div will be set to no innerHtml
document.getElementById('inputFromUser').addEventListener( 'keyup' , event =>{
    // for the enter trigger
    if(event.keyCode===13){
        searchMealInfo();
        clearTheSearchBox();
    }
    else{
        const nameOfTheEnteredMealNode = document.getElementById('inputFromUser');
        let nameOfTheEnteredMeal = nameOfTheEnteredMealNode.value;
        // if the input value is not a string
        if(nameOfTheEnteredMeal=='' || nameOfTheEnteredMeal==' ' || nameOfTheEnteredMeal==undefined || nameOfTheEnteredMeal==null){
            clearTheSearchBox();
            const divOfTheSearchings = document.getElementById('elementFromTheSearchResultDiv');
            makeInnerHtmlNone(divOfTheSearchings);
            const foodGalleryId = document.getElementById('foodGallery');
            makeInnerHtmlNone(foodGalleryId);
        }
        // the input is a string
        else{
            const sendingAPIUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameOfTheEnteredMeal}`;
            fetchingFromTheMealDBApi(sendingAPIUrl,1,nameOfTheEnteredMeal);
        }
    }
})