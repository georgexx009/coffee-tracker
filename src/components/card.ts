import cardStyles from './card.css?inline'

export class CardRecipe extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })
    const styles = document.createElement('style')
    shadow.appendChild(styles)

    const header = document.createElement('h2')
    header.textContent = this.getAttribute('title') || 'title'

    const description = document.createElement('p')
    description.textContent = this.getAttribute('description') || 'description'

    const container = document.createElement('div')
    container.className = 'card'
    container.appendChild(header)
    container.appendChild(description)

    shadow.appendChild(container);

    styles.textContent = cardStyles
  }
}

customElements.define('card-recipe', CardRecipe)
