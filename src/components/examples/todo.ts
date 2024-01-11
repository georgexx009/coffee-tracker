class TodoList extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const container = document.createElement('div')

    const itemsList = this.items
    container.innerHTML = `
      <ul id="item-list">
        ${itemsList.map(item => `
          <li>${item}
            <button id="remove-btn">&ominus;</button>
          </li>
        `).join('')}
      </ul>
      <input id="new-item-input" type="text">
      <button id='add-item-btn'>add item</button>
    `

    shadow.appendChild(container)

    this.addListItem = this.addListItem.bind(this)
  }

  get items() {
    const items: string[] = []

    for (const attr of this.attributes) {
      if (attr.name.includes('list-item')) {
        items.push(attr.value)
      }
    }

    return items
  }

  addListItem() {
    const input = this.shadowRoot!.querySelector<HTMLInputElement>('#new-item-input')!
    if (input.value) {
      const newItem = document.createElement('li')
      newItem.textContent = input.value
      this.shadowRoot!.querySelector('#item-list')!.appendChild(newItem)
      input.value = ''
    }
  }

  removeItem(event: any) {
    event.target.parentNode.remove()
  }

  connectedCallback() {
    if (this.shadowRoot) {
      const btn = this.shadowRoot.querySelector('#add-item-btn')!
      btn.addEventListener('click', this.addListItem, false)

      const removeBtn = this.shadowRoot.querySelectorAll('#remove-btn')!
      removeBtn.forEach(el => {
        el.addEventListener('click', this.removeItem)
      })
    }
  }

}

customElements.define('todo-list', TodoList)
