import styles from './modal-form-recipe.css?inline'

class ModalFormRecipe extends HTMLElement {
  shadow: ShadowRoot

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
      <div class="modal-form-recipe">
        <div class="form">
          <h3>New Recipe</h3>
          
          <form id="form-recipe">
            <label for="input-title">Title</label>
            <input type="text" id="input-title" />

            <label for="input-description">Description</label>
            <input type="text" id="input-description" />

            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    `

    const stylesElement = document.createElement('style')
    stylesElement.textContent = styles
    shadow.appendChild(stylesElement)
    this.shadow = shadow
  }

  connectedCallback() {
    // # add handlers
    const recipesContainer = document.querySelector('#recipes')
    this.shadow.querySelector('#form-recipe')?.addEventListener('submit', event => {
      event.preventDefault()
      const newRecipe = document.createElement('card-recipe')
      const inputTitle = this.shadow.querySelector('#input-title') as HTMLInputElement
      newRecipe.setAttribute('title', inputTitle.value)

      const descriptionInput = this.shadow.querySelector('#input-description') as HTMLInputElement
      newRecipe.setAttribute('description', descriptionInput.value)
      recipesContainer?.appendChild(newRecipe)
    })
  }
}

customElements.define('modal-form-recipe', ModalFormRecipe)