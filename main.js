let result = document.getElementById("result");
let searchBtn = document.getElementById("btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";


searchBtn.addEventListener("click", () =>{
    let unserInput = document.getElementById("userInput").value;
    if(unserInput.length == 0){
        result.innerHTML = `<h3> Field Can't Be Empty</h3>`;
    }
    else{
        fetch(url + unserInput)
.then(response => response.json())
.then(data => {
    console.log(data);
    let mealDee = data.meals[0];
    console.log(mealDee);
    console.log(mealDee.strMealThumb);
    console.log(mealDee.strArea);
    console.log(mealDee.strMeal);
    console.log(mealDee.strInstructions);
    let count = 1;
    let ingredients = [];
    for(let i in mealDee) {
        let ingredient = "";
        let measures = "";
        if(i.startsWith("strIngredient") && mealDee[i]) {
            ingredient = mealDee[i];
            measures = mealDee[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measures} ${ingredient}`);
        }
    }
    console.log(ingredients);
    result.innerHTML = `<img src=${mealDee.strMealThumb}>
    <div class="someDetails">
    <h2>${mealDee.strMeal}</h2>
    <h4>${mealDee.strArea}</h4>
    </div>
    <div id="ingredientHere"></div>
    <div id="recipes">
        <button id="hideRecipe">x</button>
        <pre id="instruction">${mealDee.strInstructions}</pre>
    </div>
    <button id="showRecipe">View Recipe</button>
    `;
    let ingredienthere = document.getElementById("ingredientHere");
    let container = document.createElement("ul");
    let recipe = document.getElementById("recipes");
    let HideRecipe = document.getElementById("hideRecipe");
    let ShowRecipe = document.getElementById("showRecipe");

    ingredients.forEach((i) => {
        let child = document.createElement("li");
        child.innerText = i;
        container.appendChild(child);
        ingredienthere.appendChild(container);
    });

    HideRecipe.addEventListener("click", () => {
        recipe.style.display ="none";
    });
    ShowRecipe.addEventListener("click", () => {
        recipe.style.display = "block";
    });
});
    }
})


