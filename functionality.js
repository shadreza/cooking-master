const foodList = new Array;
const displayFoods = foodsFromJSON => {
    const mainFoodsFromJSONCategories = foodsFromJSON.meals;
    for (let i = 0; i < mainFoodsFromJSONCategories.length; i++) {
        const element = mainFoodsFromJSONCategories[i];
        const imageOfTheFoodURL = `${element.strMealThumb}`;
        const nameOfTheFood = element.strMeal;
        foodList.push(element);
        const foodDiv = document.createElement('div');
        foodDiv.className=`${nameOfTheFood} foodBoxesInternals`;
        const foodInfo = `
        <img src='${imageOfTheFoodURL}'>
        <h3>${nameOfTheFood}<h3>
        `
        foodDiv.innerHTML=foodInfo;
        document.getElementById('galery').appendChild(foodDiv);
    }
}

const searchForFood = foodsFromJSON => {
    const foodInfoFromTheAPI = foodsFromJSON;
    console.log(foodInfoFromTheAPI);
}


function fetchFromAPI(passedURL,passedInfo){
    fetch(passedURL)
    .then(res => res.json())
    .then(data => {
        if(passedInfo===1){
            displayFoods(data);
        }
        else if(passedInfo===2){
            console.log(data);
            for(let i=1;;i++){
                // const property = 'strIngredient'+i;
                const infooo = data.meals[0].strIngredient;
                console.log(infooo);
                if(infooo===''||infooo===undefined){
                    break;
                }else{
                    console.log(infooo);
                }
                
            }
            
        }
    })
    .catch(err => {
        console.error(err);
    });
}
fetchFromAPI('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast',1);

function searchMealInfo(){
    const nameOfTheEnteredMeal = document.getElementById('inputFromUser').value;
    if(nameOfTheEnteredMeal==''){
        alert('Please Insert A Valid Meal First!');
    }
    else{
        const sendingAPIUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameOfTheEnteredMeal}`;
        console.log(sendingAPIUrl);
        fetchFromAPI(sendingAPIUrl,2);
    }
}



document.getElementById('searchButton').addEventListener('click',function(){
    searchMealInfo();
})