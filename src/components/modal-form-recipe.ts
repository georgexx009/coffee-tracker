import styles from './modal-form-recipe.css?inline'

class ModalFormRecipe extends HTMLElement {
  constructor() {
    // set up initial state and detault values
    // NOT - cause observable side effects (adding childrens)
    super()
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="modal-form-recipe">
        <div class="form">
          <h3>New Recipe</h3>
          
          <form id="form-recipe">
            <label for="input-title">Title</label>
            <input type="text" id="input-title" />

            <label for="input-description">Description</label>
            <input type="text" id="input-description" />

            <button id="btn-cancel">Cancel</button>
            <button id="btn-submit" type="submit">Create</button>
          </form>
        </div>
      </div>
    `

    const inputTitle = this.querySelector('#input-title') as HTMLInputElement
    const descriptionInput = this.querySelector('#input-description') as HTMLInputElement
    const submitBtn = this.querySelector('#btn-submit') as HTMLButtonElement
    const btnCancel = this.querySelector('#btn-cancel') as HTMLInputElement
    const recipesContainer = document.querySelector('#recipes')

    inputTitle.value = this.getAttribute('title')!
    descriptionInput.value = this.getAttribute('description')!
    submitBtn.disabled = true

    // # add handlers
    this.querySelector('#form-recipe')?.addEventListener('submit', event => {
      event.preventDefault()
      const recipeID = this.getAttribute('id')
      if (recipeID) {
        const recipe = document.querySelector(`card-recipe[id="${recipeID}"]`)!
        recipe.setAttribute('title', inputTitle.value)
        recipe.setAttribute('description', descriptionInput.value)
        this.closeModal()
        return
      }
      const newRecipe = document.createElement('card-recipe')
      newRecipe.setAttribute('title', inputTitle.value)
      newRecipe.setAttribute('description', descriptionInput.value)
      newRecipe.setAttribute('id', 'id' + this.getAttribute('nextID') || '0')

      recipesContainer?.appendChild(newRecipe)
      this.closeModal()
    })

    btnCancel.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault()
      this.closeModal()
    })

    const checkInput = () => {
      submitBtn.disabled = !inputTitle.value || !descriptionInput.value
    }
    inputTitle.addEventListener('input', checkInput)
    descriptionInput.addEventListener('input', checkInput)

    const stylesElement = document.createElement('style')
    stylesElement.textContent = styles
    this.appendChild(stylesElement)
  }

  closeModal() {
    const modal = this.querySelector('.modal-form-recipe')!
    modal.remove()
  }
}

customElements.define('modal-form-recipe', ModalFormRecipe)