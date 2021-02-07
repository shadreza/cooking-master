const foodList = new Array;
const displayFoods = foodsFromJSON => {
    const mainFoodsFromJSONCategories = foodsFromJSON.meals;
    for (let i = 0; i < mainFoodsFromJSONCategories.length; i++) {
        const element = mainFoodsFromJSONCategories[i];
        const imageOfTheFoodURL = `${element.strMealThumb}`;
        const nameOfTheFood = element.strMeal;
        foodList.push(element);
        const foodDiv = document.createElement('div');
        foodDiv.className='foodBoxesInternals';
        foodDiv.id=`${nameOfTheFood}`;
        const foodInfo = `
        <img id='${nameOfTheFood}' src='${imageOfTheFoodURL}'>
        <h3 id='${nameOfTheFood}'>${nameOfTheFood}<h3>
        `
        foodDiv.innerHTML=foodInfo;
        document.getElementById('galery').appendChild(foodDiv);
    }
}

function fetchFromAPI(passedURL,passedInfo){
    fetch(passedURL)
    .then(res => res.json())
    .then(data => {
        if(passedInfo===1){
            displayFoods(data);
        }
        else if(passedInfo===2){
            let stringText = '';
            for(let i=1;;i++){
                const ingredientsProperty = `strIngredient${i}`;
                const measuresProperty = `strMeasure${i}`;
                const ingredient = data.meals[0][ingredientsProperty];
                const measures = data.meals[0][measuresProperty];
                if(ingredient=='' || ingredient==undefined || ingredient==null){
                    break;
                }
                stringText+=(measures + " " +ingredient+"\n");
            }          
            if(stringText==''){
                alert("nothing there");
            }  
            else{
                alert(stringText);
            }
        }
    })
    .catch(err => {
        alert("nothing there");
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

document.getElementById('inputFromUser').addEventListener('keydown',function(event){
    if(event.keyCode===13){
        searchMealInfo();
    }
})

const showDetails = (idThatWasClicked) => {
    fetchFromAPI(idThatWasClicked,2);
}


document.getElementById('searchButton').addEventListener('click',function(){
    searchMealInfo();
})

document.getElementById('galery').addEventListener('click',event =>{
    const idOfTheClickedFood = event.target.id;
    const sendingAPIUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${idOfTheClickedFood}`;
    showDetails(sendingAPIUrl);
})