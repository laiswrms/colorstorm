let delay = 800
let level = 0
let game = []
let canPlay = false
let streak = []

const $ = document.querySelector.bind(document)

const setLevel = (level) => {
  $("#level").innerHTML = level
}

const randomColor = _ => {
  const random = Math.floor(Math.random() * 4) + 1

  return random
}

const levelUp = _ => {
  level += 1
  game.push(randomColor())
  streak = []

  setLevel(level)
}

const newGame = _ => {
  level = 0
  game = []
  canPlay = false
  streak = []
}

const playSound = sound => {
  const audio = new Audio(sound)
  audio.play()
}

const animateItem = (id, item) => {
  setTimeout(() => {
    playSound("https://www.soundjay.com/button/beep-02.wav")

    item.classList.add("active")

    setTimeout(() => item.classList.remove("active"), delay)
  }, ((delay + (delay / 2)) * id))
}

const getGameItems = _ => {
  const gameItems = $("#game--items").children

  canPlay = false

  setTimeout(() => {
    canPlay = true
  }, ((delay + (delay / 2)) * game.length))

  game.map(async (id, key) => {
    const color = gameItems[(id - 1)]
    animateItem((key + 1), color)
  })
}

const startGame = _ => {
  newGame()
  updateGame()
}

const updateGame = _ => {
  levelUp()
  getGameItems()
}

const gameLost = _ => {
  level = 0
  setLevel(0)
  canPlay = false
  playSound("https://www.soundjay.com/button/beep-03.wav")
}

const restartGame = _ => {
  startGame()
}

const itemClick = event => {
  if (canPlay) {
    const color = event.target
    const dataColor = color.getAttribute("data-color")

    color.classList.add("active")

    streak.push(parseInt(dataColor))

    streak.map((color, key) => {
      if (game[key] !== color) {
        gameLost()
      }
    })
    
    if (level > 0) playSound("https://www.soundjay.com/button/beep-02.wav")

    if (streak.length === game.length) {
      if (JSON.stringify(streak) === JSON.stringify(game)) {
        updateGame()
      }
    }

    setTimeout(() => {
      color.classList.remove("active")
    }, 500)
  }
}