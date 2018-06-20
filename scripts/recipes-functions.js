const getRecipes = () => {
    const storedRecipes = localStorage.getItem("Recipes")

    if (storedRecipes !== null) {
        return JSON.parse(storedRecipes)
    } else {
        return []
    }
}

let recipes = getRecipes()

const addRecipe = () => {
    const id = uuidv4()
    recipes.push({
        name: "",
        id: id,
        steps: "",
        ingredients: []
    })
    saveRecipes()
    return id
}

const saveRecipes = () => {
    localStorage.setItem("Recipes", JSON.stringify(recipes))
}

const updateRecipe = (id, update) => {
    const recipe = recipes.find((recipe) => {
        return recipe.id === id
    })
    if (typeof update.name === "string") {
        recipe.name = update.name
    }

    if (typeof update.steps === "string") {
        recipe.steps = update.steps
    }

    saveRecipes()
}

const addIngredient = (id, ingredientName) => {
    const ingredientId = uuidv4()
    const recipe = recipes.find((recipe) => {
        return recipe.id === id
    })
    if (typeof ingredientName === "string") {
        const ingredientObj = {
            name: ingredientName,
            id:ingredientId,
            available: false
        }
        recipe.ingredients.push(ingredientObj)
    }
}

const deleteRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => {
        return recipe.id === id
    })
    recipes.splice(recipeIndex, 1)
    saveRecipes()
    location.assign("index.html")
}

generateIngredientsDOM = (id) => {
    ingredientsList.innerHTML = ""
    const recipe = recipes.find((recipe) => {
        return recipe.id === recipeId
    })
    recipe.ingredients.forEach((ingredient) => {
            // Create container
            const ingredientContainer = document.createElement("div")
            ingredientContainer.classList.add("container")

            // Create ingredient element
            const ingredientEl = document.createElement("div")
            ingredientEl.classList.add("row")

            // Create checkbox and label
            const id = uuidv4()
            const checkboxEl = document.createElement("div")
            checkboxEl.classList.add("col-sm")
            const label = document.createElement("label")
            label.setAttribute("for", id)
            const check = document.createElement("input")
            check.setAttribute("type", "checkbox")
            check.setAttribute("id", id)
            check.checked = ingredient.available
            check.addEventListener("change", () => {
                toggleIngredient(recipeId, ingredient.id)
            })
            checkboxEl.appendChild(check)
            checkboxEl.appendChild(label)


            // Create ingredient name element
            const nameEl = document.createElement("div")
            nameEl.classList.add("col-sm")
            const ingredientName = document.createElement("p")
            ingredientName.textContent = ingredient.name
            ingredientName.classList.add("ingredient-name")
            nameEl.appendChild(ingredientName)
            
            // Create remove button
            const removeEl = document.createElement("div")
            removeEl.classList.add("col-sm")
            const remove = document.createElement("button")
            remove.textContent = "remove"
            remove.addEventListener("click", () => {
                removeIngredient(recipeId, ingredient.id)
            })
            remove.classList.add("btn")
            removeEl.appendChild(remove)

            // Append to element
            ingredientEl.appendChild(checkboxEl)
            ingredientEl.appendChild(nameEl)
            ingredientEl.appendChild(removeEl)
            ingredientContainer.appendChild(ingredientEl)

            //Append to list
            ingredientsList.appendChild(ingredientContainer)
        })

}

const removeIngredient = (id, ingId) => {
    const recipe = recipes.find((recipe) => {
        return recipe.id === id
    })
    ingredientIndex = recipe.ingredients.findIndex((ingredient) => {
        return ingredient.id === ingId
    })
    recipe.ingredients.splice(ingredientIndex, 1)
    generateIngredientsDOM(recipeId)
    saveRecipes()
}

let filter = ""

const toggleIngredient = (id, ingId) => {
    const recipe = recipes.find((recipe) => {
        return recipe.id === id
    })
    ingredient = recipe.ingredients.find((ingredient) => {
        return ingredient.id === ingId
    })
    if (ingredient) {
        ingredient.available = !ingredient.available
        saveRecipes()
    }
}


const checkAvailableIngredients = (recipes, id) => {
    const recipe = recipes.find((recipe) => {
        return recipe.id === id
    })
    const availableIngredients = recipe.ingredients.filter((ingredient) => {
        return ingredient.available 
    })
    if (availableIngredients.length === 0) {
        return "You don't have any of the ingredients you need for this recipe"
    } else if (availableIngredients.length > 0 && availableIngredients.length < recipe.ingredients.length) {
        return `You have some of the ingredients needed for this recipe (${availableIngredients.length}/${recipe.ingredients.length})`
    } else if (availableIngredients.length === recipe.ingredients.length) {
        return "You have all of the ingredients you need for this recipe"
    }
}

const recipeId = location.hash.substring(1)


