import styles from './modal-form-recipe.css?inline'

class ModalFormRecipe extends HTMLElement {
  shadow: ShadowRoot

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
      <div class="modal-form-recipe">
        <div class="form">
          <h3>New Recipe - ${this.getAttribute('id')}</h3>
          
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

    const stylesElement = document.createElement('style')
    stylesElement.textContent = styles
    shadow.appendChild(stylesElement)
    this.shadow = shadow
  }

  connectedCallback() {
    const inputTitle = this.shadow.querySelector('#input-title') as HTMLInputElement
    const titleVal = this.getAttribute('title')
    if (titleVal) {
      inputTitle.value = titleVal
    }

    const descriptionInput = this.shadow.querySelector('#input-description') as HTMLInputElement
    const descriptionVal = this.getAttribute('description')
    if (descriptionVal) {
      descriptionInput.value = descriptionVal
    }

    const submitBtn = this.shadow.querySelector('#btn-submit') as HTMLButtonElement
    submitBtn.disabled = true
    const btnCancel = this.shadow.querySelector('#btn-cancel') as HTMLInputElement

    // # add handlers
    const recipesContainer = document.querySelector('#recipes')
    this.shadow.querySelector('#form-recipe')?.addEventListener('submit', event => {
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
  }

  closeModal() {
    const modal = this.shadow.querySelector('.modal-form-recipe')!
    modal.remove()
  }
}

customElements.define('modal-form-recipe', ModalFormRecipe)