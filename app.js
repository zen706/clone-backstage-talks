import { data } from './data.js'

const { log } = console
const section = document.querySelector('section')
const body = document.querySelector('body')
const issues = [...document.querySelectorAll('.issue')]
const colors = ['#00c1b5', '#ff651a', '#ffbe00', '#1d3fbb', '#e30512']

let id = 1

//render data
section.innerHTML = data
  .map((item, index) => {
    return `<div class="cover"><article id=${item.id}>
            <img src=${item.img} alt="book-img" class="book-img" />
            ${!item.outOfStock ? `<p class="title">${item.title}</p>` : ''}
            ${
              !item.outOfStock
                ? `<p><a href="#">BUY HERE</a><span>
or in <a href="#">selected stores</a>.</span></p>`
                : `<p>${item.title} is sold out.<span>
if ou are lucky, you may get the last pieces in <a href="#">selected stores</a>.</span></p>`
            }
        </article></div>`
  })
  .join('')


issues.forEach((issue) => {
  issue.addEventListener('click', (e) => {
    body.style.backgroundColor = `${colors[e.target.dataset.id - 1]}`
    id = e.target.dataset.id
  })
})


window.addEventListener('keydown', (e) => {
  if(e.repeat)return
  keyDownUp(e)
})
window.addEventListener('keyup', (e) => {
  keyDownUp(e)
})

const keyDownUp =(e)=>{
  const width = window.innerWidth
  const height = window.innerHeight
  if (width >= 992 && height >= 650) {
    const keyCode = e.keyCode
    if (keyCode === 38 || keyCode === 33) {
      //up pageUp
      if (id <= 1) return
      id--
      body.style.backgroundColor = `${colors[id - 1]}`
      document.getElementById(`${id}`).scrollIntoView()
    } else if (keyCode === 40 || keyCode === 34 || keyCode === 32) {
      //down or pageDown ore space
      if (id >= 5) return
      id++
      body.style.backgroundColor = `${colors[id - 1]}`
      document.getElementById(`${id}`).scrollIntoView()
    } else if (keyCode === 36) {
      //home
      id = 1
      body.style.backgroundColor = `${colors[id - 1]}`
      document.getElementById(`${id}`).scrollIntoView()
    } else if (keyCode === 35) {
      //end
      id = 5
      body.style.backgroundColor = `${colors[id - 1]}`
      document.getElementById(`${id}`).scrollIntoView()
    }
  }
}

window.addEventListener('scroll', (e) => {
  log("scroll")
  const pageYOffset = window.pageYOffset
  const cover = document.querySelector('.cover')
  const height = cover.getBoundingClientRect().height
  if (pageYOffset <= 450) {
    id = 1
    body.style.backgroundColor = `${colors[id - 1]}`
  } else if (pageYOffset <= 450 + height) {
    id = 2
    body.style.backgroundColor = `${colors[id - 1]}`
  } else if (pageYOffset <= 450 + height * 2) {
    id = 3
    body.style.backgroundColor = `${colors[id - 1]}`
  } else if (pageYOffset <= 450 + height * 3) {
    id = 4
    body.style.backgroundColor = `${colors[id - 1]}`
  } else {
    id = 5
    body.style.backgroundColor = `${colors[id - 1]}`
  }
})

//imcomplete
window.addEventListener('wheel', (e) => {
  log('wheel')
  const width = window.innerWidth
  const height = window.innerHeight
  if (width >= 992 && height >= 650) {
    if (e.deltaY < 0) {
      if (id <= 1) return
      id--
      body.style.backgroundColor = `${colors[id - 1]}`
      document.getElementById(`${id}`).scrollIntoView()
    } else {
      if (id >= 5) return
      id++
      body.style.backgroundColor = `${colors[id - 1]}`
      document.getElementById(`${id}`).scrollIntoView()
    }
  }
  log(id)
})

window.addEventListener('resize', (e) => {
  document.querySelector('html').style.scrollBehavior = 'initial'
  setTimeout(() => {
    document.querySelector('html').style.scrollBehavior = 'smooth'
  }, 1)
  const width = window.innerWidth
  const height = window.innerHeight
  if (width >= 992 && height >= 650) {
    log(id)
    document.getElementById(`${id}`).scrollIntoView()
  }
})
