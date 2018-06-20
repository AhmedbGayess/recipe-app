const searchRecipe = document.querySelector("#search")
const newRecipe = document.querySelector("#new-recipe")
const recipesList = document.querySelector("#recipes")

newRecipe.addEventListener("click", (e) => {
    const id = addRecipe()
    location.assign(`recipe.html#${id}`)
})

const generateRecipeDOM = (recipe) => {
    const recipeCard = document.createElement("a")
    const recipeName = document.createElement("p")
    const availableIngredients = document.createElement("p")
    const localId = recipe.id
    availableIngredients.textContent = checkAvailableIngredients(recipes, localId)

    if (recipe.name.length > 0) {
        recipeName.textContent = recipe.name
    } else {
        recipeName.textContent = "Unnamed Recipe"
    }

    recipeCard.classList.add("recipe-card")
    recipeCard.setAttribute("href", `recipe.html#${recipe.id}`)
    recipeName.classList.add("recipe-name")
    availableIngredients.classList.add("available")

    recipeCard.appendChild(recipeName)
    recipeCard.appendChild(availableIngredients)

    return recipeCard
}

searchRecipe.addEventListener("input", (e) => {
    filter = e.target.value
    renderRecipes()
})

const renderRecipes = () => {
    recipesList.innerHTML = ""
    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(filter.toLocaleLowerCase())
    })

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            recipesList.appendChild(generateRecipeDOM(recipe))
        })
    } else {
        const messageEl = document.createElement("p")
        messageEl.textContent = "No recipes to show"
        messageEl.classList.add("recipe-card")
        recipesList.appendChild(messageEl)
    }

}

renderRecipes()


