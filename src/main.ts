import './style.css'
import './components/card.ts'
import './components/examples/todo.ts'
import './components/modal-form-recipe.ts'

// # render recipes array
const recipes = [{ title: 'recipe 1', description: 'description 1'},
{ title: 'recipe 2', description: 'description 2'}]

const elements = recipes.map(recipe => {
  const element = document.createElement('card-recipe')
  element.setAttribute('title', recipe.title)
  element.setAttribute('description', recipe.description)
  return element
})
const recipesContainer = document.querySelector('#recipes')
elements.forEach(element => recipesContainer?.appendChild(element))
