// assinging the result variable using DOM to link html id
let result = document.getElementById("result");
// assinging the searchbtn variable using DOM to link html id
let searchBtn = document.getElementById("btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// event listner to acknowledge and respond when a click action occurs
searchBtn.addEventListener("click", () =>{
    // acquiring value of userinput and assigning it to a javascript variable
    let unserInput = document.getElementById("userInput").value;
    // checks for length of userinput and executes either block of code if either evaluates to true
    if(unserInput.length == 0){
        result.innerHTML = `<h3> Field Can't Be Empty</h3>`;
    }
    else{
        // fetchs using API with user's specific input
        fetch(url + unserInput)
        // resolves promise and converts to javascript object notation
.then(response => response.json())
.then(data => {
    // trying to debug the data and understand the different identifiers
    console.log(data);
    let mealDee = data.meals[0];
    console.log(mealDee);
    console.log(mealDee.strMealThumb);
    console.log(mealDee.strArea);
    console.log(mealDee.strMeal);
    console.log(mealDee.strInstructions);
    let count = 1;
    let ingredients = [];
    // for loop to iterate over how many ingredients are on the list, as with different recipes comes different numbers of ingredients
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
