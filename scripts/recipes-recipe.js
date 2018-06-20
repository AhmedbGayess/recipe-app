const recipeName = document.querySelector("#recipe-name")
const steps = document.querySelector("#steps")
const ingredientsList = document.querySelector("#ingredients-list")
const ingredientName = document.querySelector("#ingredient-input")
const confirmIngredient = document.querySelector("#confirm-ingredient")
const deleteButton = document.querySelector("#delete-recipe")

recipeName.addEventListener("input", (e) => {
    updateRecipe(recipeId, { name: e.target.value })
    saveRecipes()
})

steps.addEventListener("input", (e) => {
    updateRecipe(recipeId, { steps: e.target.value })
    saveRecipes()
})

const displayRecipe = () => {
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    if (!recipe) {
        location.assign('index.html')
    }

    recipeName.value = recipe.name
    steps.value = recipe.steps
}

displayRecipe()

confirmIngredient.addEventListener("click", (e) => {
    addIngredient(recipeId, ingredientName.value)
    ingredientName.value = ""
    saveRecipes()
    generateIngredientsDOM(ingredientsList)
})

deleteButton.addEventListener("click", () => {
    deleteRecipe(recipeId)
})

generateIngredientsDOM(ingredientsList)
