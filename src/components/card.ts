import cardStyles from './card.css?inline'

export class CardRecipe extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'description']
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="card">
        <h2></h2>
        <p></p>
        <div>
          <button>update</button>
          <button>delete</button>
        </div>
      </div> 
    `

    const header = this.querySelector('h2')!
    const description = this.querySelector('p')!
    const buttons = Array.from(this.querySelectorAll('button'))
    const updateBtn = buttons.find(btn => btn.textContent === 'update')!
    const deleteBtn = buttons.find(btn => btn.textContent === 'delete')!

    header.textContent = this.getAttribute('title') || 'title'
    description.textContent = this.getAttribute('description') || 'description'

    updateBtn.addEventListener('click', () => {
      this.update(header.textContent!, description.textContent!)
    })

    deleteBtn.addEventListener('click', () => {
      const id = this.getAttribute('id')
      const cardToRemove = document.querySelector(`#${id}`)
      cardToRemove?.remove()
    })

    const styles = document.createElement('style')
    styles.textContent = cardStyles
    this.appendChild(styles)
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
