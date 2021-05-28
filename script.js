window.onload = function () {
  const main = document.querySelector('main')
  const inputKeyword = document.getElementById('keyword')
  const itemLimit = 500

  let submit = document.getElementById('submit')
  let timeout = void 0

  inputKeyword.addEventListener('keydown', (e) => {
    // keydown enter
    const KEYCODE = 13
    if (e.keyCode === KEYCODE) {
      e.preventDefault()
      search(e)
    }
  })

  // create html element
  const createItem = (item) => {
    let div = document.createElement('div')
    div.className = 'mx-6 mb-12'
    main.appendChild(div)

    div.innerHTML += `<img class="w-64" src="${item.img}">`
    div.innerHTML += `<h2 class="text-lg"><a class="text-blue-500 hover:underline" href="${item.link}">${item.title}</a></h2>`
    div.innerHTML += `<p class="text-base mb-1">${item.categories}</p>`

    // star rating
    const rate = Math.round(parseFloat(item.value.replace(/^s+|s+$/g, '')))
    for (let i = 0; i < rate; i++) {
      div.innerHTML += `<i class="fas fa-star"></i>`
    }

    // set comments
    div.innerHTML += `<small class="ml-2">${item.comments}</small>`
  }

  // update the item
  const updateItem = (keyword, index) => {
    index = typeof index === 'undefined' ? 0 : index

    while (true) {
      if (index >= itemLimit) {
        break
      }

      // boolean
      let isMatchesTitle = window.data[index].title.includes(keyword)
      let isMatchesCategories = window.data[index].categories.includes(keyword)

      // if it doesn't include, skip it
      if (!isMatchesTitle && !isMatchesCategories) {
        index++
        continue
      }

      createItem(window.data[index])
      timeout = setTimeout(() => updateItem(keyword, index + 1), 0)
      break
    }
  }

  const search = (e) => {
    main.innerHTML = ''

    if (e !== null) {
      e.stopPropagation()
    }

    clearTimeout(timeout)
    updateItem(inputKeyword.value)
  }

  submit.onclick = search
  search(null)
}
