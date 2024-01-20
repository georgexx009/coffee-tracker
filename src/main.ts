import './style.css'
import './components/card.ts'
import './components/examples/todo.ts'
import './components/modal-form-recipe.ts'

// # render recipes array
const recipes = [
{ id: 1, title: 'recipe 1', description: 'description 1'},
{ id: 2, title: 'recipe 2', description: 'description 2'}
]

const elements = recipes.map(recipe => {
  const element = document.createElement('card-recipe')
  element.setAttribute('id', 'id' + recipe.id.toString())
  element.setAttribute('title', recipe.title)
  element.setAttribute('description', recipe.description)
  return element
})
const recipesContainer = document.querySelector('#recipes')
elements.forEach(element => recipesContainer?.appendChild(element))

// # handlers
const btnNew = document.querySelector('#btn-new') as HTMLInputElement
btnNew.addEventListener('click', () => {
  const modal = document.createElement('modal-form-recipe')
  modal.setAttribute('nextID', (recipes.length + 1).toString())
  document.querySelector('.container')!.appendChild(modal)
})