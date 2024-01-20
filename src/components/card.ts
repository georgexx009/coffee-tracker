import cardStyles from './card.css?inline'

export class CardRecipe extends HTMLElement {
  private ID: number = 0
  static get observedAttributes() {
    return ['title', 'description']
  }

  constructor() {
    super()
    this.ID = 0
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })
    const styles = document.createElement('style')
    shadow.appendChild(styles)

    const idLabel = document.createElement('span')
    idLabel.textContent = this.ID.toString()

    const header = document.createElement('h2')
    header.textContent = this.getAttribute('title') || 'title'

    const description = document.createElement('p')
    description.textContent = this.getAttribute('description') || 'description'

    const controls = document.createElement('div')
    const updateBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')
    updateBtn.textContent = 'update'
    deleteBtn.textContent = 'delete'

    updateBtn.addEventListener('click', () => {
      this.update(header.textContent!, description.textContent!)
    })

    deleteBtn.addEventListener('click', () => {
      const id = this.getAttribute('id')
      const cardToRemove = document.querySelector(`#${id}`)
      cardToRemove?.remove()
    })

    controls.appendChild(updateBtn)
    controls.appendChild(deleteBtn)

    const container = document.createElement('div')
    container.className = 'card'
    container.appendChild(idLabel)
    container.appendChild(header)
    container.appendChild(description)
    container.appendChild(controls)

    shadow.appendChild(container);

    styles.textContent = cardStyles
  }

  update(title: string, description: string) {
    const modal = document.createElement('modal-form-recipe')
    modal.setAttribute('title', title)
    modal.setAttribute('description', description)
    const id = this.getAttribute('id')!
    modal.setAttribute('id', id)
    document.querySelector('.container')!.appendChild(modal)
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'title':
        const titleElement = this.shadowRoot?.querySelector('h2')
        if (titleElement) titleElement.textContent = newValue
        break
      case 'description':
        const descriptionElement = this.shadowRoot?.querySelector('p')
        if (descriptionElement) descriptionElement.textContent = newValue
        break
    }
  }
}

customElements.define('card-recipe', CardRecipe)
