const showMessage = message => {
    document.getElementById('popupBoxMessage').innerText=message;
    document.getElementById('popupBox').style.display='block';
}

document.getElementById('closePopupBox').addEventListener('click',function(){
    document.getElementById('popupBox').style.display='none';
})

const displayFoodsInTheGallery = fletchedJsonDataOfFoods => {
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

const showTheDetailsOfTheFood = fletchedDataOfFood => {
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
        
    }
    else{
        const beforeIngredientsText = document.createElement('h5');
        beforeIngredientsText.innerText = 'The Ingredients Along with their Measurements ->>>\n';
        const selectedFoodShowCasingDiv = document.getElementById('foodThatWillShowUpId');
        selectedFoodShowCasingDiv.innerHTML=''; 
        selectedFoodShowCasingDiv.appendChild(headingNameOfTheFood);
        selectedFoodShowCasingDiv.appendChild(imgOfTheFood);
        selectedFoodShowCasingDiv.appendChild(beforeIngredientsText);
        selectedFoodShowCasingDiv.appendChild(ulForTheFoodIngredients);
        selectedFoodShowCasingDiv.appendChild(anchorWrappingTheButton);
        selectedFoodShowCasingDiv.style.display= 'block';
    }
}

const requestForInternalDetails = urlOfTheSpecificFood => {
    fetchingFromTheMealDBApi(urlOfTheSpecificFood , 2);
}

document.getElementById('foodGallery').addEventListener('click',event =>{
    const idOfTheClickedFood = event.target.id;
    const sendingAPIUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${idOfTheClickedFood}`;
    requestForInternalDetails(sendingAPIUrl);
})

const fetchingFromTheMealDBApi = (passedUrlForFetching , passedInfoForTakingDecision) => {
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
    })
    .catch(errorWhileProcessing => {
        const errorMessage = "Wrong URL provided!";
        showMessage(errorMessage);
        console.log(errorWhileProcessing.console);
    })
}

fetchingFromTheMealDBApi('https://www.themealdb.com/api/json/v1/1/search.php?f=a',1);
fetchingFromTheMealDBApi('https://www.themealdb.com/api/json/v1/1/search.php?f=c',1);
fetchingFromTheMealDBApi('https://www.themealdb.com/api/json/v1/1/search.php?f=d',1);
fetchingFromTheMealDBApi('https://www.themealdb.com/api/json/v1/1/search.php?f=e',1);
fetchingFromTheMealDBApi('https://www.themealdb.com/api/json/v1/1/search.php?f=f',1);

const searchMealInfo = () => {
    const nameOfTheEnteredMeal = document.getElementById('inputFromUser').value;
    if(nameOfTheEnteredMeal=='' || nameOfTheEnteredMeal==undefined || nameOfTheEnteredMeal==null){
        showMessage('Please Insert A Valid Meal First!');
    }
    else{
        const sendingAPIUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameOfTheEnteredMeal}`;
        fetchingFromTheMealDBApi(sendingAPIUrl,2);
    }
}

document.getElementById('searchButton').addEventListener('click',function(){
    searchMealInfo();
})

document.getElementById('inputFromUser').addEventListener('keydown',function(event){
    if(event.keyCode===13){
        searchMealInfo();
    }
})