const searchBtn=document.getElementById("search-button");
const fullMeal=document.getElementById("meal");
const detail=document.querySelector(".meal-contain-details");
const close=document.getElementById("closee");

function sho(){
    detail.parentElement.classList.remove("show");
}

searchBtn.addEventListener("click",getmeallist);
fullMeal.addEventListener("click",getdetails);
window.onload = function(){
    let searchInputTxt=document.getElementById("search-input").value.trim();
   
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=`)
  .then(response => response.json())
  .then(data =>{
     let html="";
     if(data.meals){
         data.meals.forEach(meal =>{
            html += `
            <div class = "meal-item" data-id = "${meal.idMeal}">
                <div class = "meal-img">
                    <img src = "${meal.strMealThumb}" alt = "food">
                </div>
                <div class = "meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href = "#" class = "recipe-btn"  target="_blank">Get Recipe</a>
                </div>
            </div>
        `;
         });
     }
   
     fullMeal.innerHTML=html;
      });
}

function getmeallist(){
   
    let searchInputTxt=document.getElementById("search-input").value.trim();
   
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
  .then(response => response.json())
  .then(data =>{
     let html="";
     if(data.meals){
         data.meals.forEach(meal =>{
            html += `
            <div class = "meal-item" data-id = "${meal.idMeal}">
                <div class = "meal-img">
                    <img src = "${meal.strMealThumb}" alt = "food">
                </div>
                <div class = "meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href = "#" class = "recipe-btn"  target="_blank">Get Recipe</a>
                </div>
            </div>
        `;
         });
         fullMeal.classList.remove("found");
     }
     else{
        html=" SORRY,we can't find it ";
        fullMeal.classList.add("found");
      
    }
     fullMeal.innerHTML=html;
      });
}

function getdetails(e){
    e.preventDefault();
   if(e.target.classList.contains('recipe-btn')){
       let mealItem=e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data =>  mealrecipe(data.meals));
   }
}
function mealrecipe(meal){
    meal =meal[0];
    let html=`
       
        <div class="meal-headings">${meal.strMeal}</div>
        <div class="meal-category">${meal.strCategory}</div>
         <div class="foot d-flex flex-column align-items-center">
        <img src="${meal.strMealThumb}" alt="">
        <a href="${meal.strYoutube}" class="meal-link mt-3"  target="_blank"> <i class="fas fa-video    "></i> WATCH VIDEO </a>
        </div>
        <h2 class="meal-instructions-head text-center">Instructions :
        </h2>
        <p class="meal-instructions text-justify">
        ${meal.strInstructions}
        </p>
       
    `;
    detail.innerHTML=html;
    detail.parentElement.classList.add("show");
  
}
