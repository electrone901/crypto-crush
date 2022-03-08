import React, { useState, useEffect } from 'react'
import { StylesProvider, Container } from '@material-ui/core'
import ScoreBoard from '../score-board/ScoreBoard'
import './Board.css'
import Blue from '../../../images/game/blue-candy.png'
import Green from '../../../images/game/green-candy.png'
import Orange from '../../../images/game/orange-candy.png'
import Purple from '../../../images/game/purple-candy.png'
import Red from '../../../images/game/red-candy.png'
import Yellow from '../../../images/game/yellow-candy.png'
import Blank from '../../../images/game/blank.png'

const width = 8
const candyColors = [Blue, Green, Orange, Purple, Red, Yellow]

const Board = () => {
  const [currentColorArrangment, setCurrentColorArrangment] = useState([])
  const [squareBeingDraggred, setSquareBeingDraggred] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)

  useEffect(() => {
    createBoard()
  }, [])


  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = currentColorArrangment[i]
      const isBlank = currentColorArrangment[i] === Blank

      if (
        columOfFour.every(
          (square) =>
            currentColorArrangment[square] === decidedColor && !isBlank,
        )
      ) {
        setScoreDisplay((score) => score + 4)
        columOfFour.forEach(
          (square) => (currentColorArrangment[square] = Blank),
        )
        return true
      }
    }
  }

  const checkRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentColorArrangment[i]
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
      const isBlank = currentColorArrangment[i] === Blank

      if (notValid.includes(i)) continue

      if (rowOfFour.every((square) =>currentColorArrangment[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4)
        rowOfFour.forEach((square) => (currentColorArrangment[square] = Blank))
        return true
      }
    }
  }


  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangment[i]
      const isBlank = currentColorArrangment[i] === Blank

      if (columOfThree.every((square) =>currentColorArrangment[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        columOfThree.forEach((square) => (currentColorArrangment[square] = Blank))
        return true
      }
    }
  }

  const checkRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangment[i]
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
      const isBlank = currentColorArrangment[i] === Blank

      if (notValid.includes(i)) continue

      if (rowOfThree.every((square) =>currentColorArrangment[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3)
        rowOfThree.forEach((square) => (currentColorArrangment[square] = Blank))
        return true
      }
    }
  }

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && currentColorArrangment[i] === Blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrangment[i] = candyColors[randomNumber]
      }

      if (currentColorArrangment[i + width] === Blank) {
        currentColorArrangment[i + width] = currentColorArrangment[i]
        currentColorArrangment[i] = Blank
      }
    }
  }

  const dragStart = (e) => {
    setSquareBeingDraggred(e.target)
  }

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target)
  }

  const dragEnd = (e) => {
    const squareBeingDraggredId = parseInt(squareBeingDraggred.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    currentColorArrangment[squareBeingReplacedId] = squareBeingDraggred.getAttribute('src')
    currentColorArrangment[squareBeingDraggredId] = squareBeingReplaced.getAttribute('src')

    // switch only if its move by one and posibility of match
    const validMoves = [
      squareBeingDraggredId - 1,
      squareBeingDraggredId - width,
      squareBeingDraggredId + 1,
      squareBeingDraggredId + width,
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)
    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkRowOfThree()

    if (squareBeingReplacedId && validMove &&(isAColumnOfFour || isARowOfFour ||isAColumnOfThree || isARowOfThree)) {
      setSquareBeingDraggred(null)
      setSquareBeingReplaced(null)
    } else {
      currentColorArrangment[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
      currentColorArrangment[squareBeingDraggredId] = squareBeingDraggred.getAttribute('src')
      setCurrentColorArrangment([...currentColorArrangment])
    }
  }


  const createBoard = () => {
    const randomColorArrangment = []
    for (let i = 0; i < width * width; i++) {
      const randomColor =candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangment.push(randomColor)
    }
    setCurrentColorArrangment(randomColorArrangment)
  }


  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour()
      checkForColumnOfThree()
      checkRowOfThree()
      checkRowOfFour()
      moveIntoSquareBelow()
      setCurrentColorArrangment([...currentColorArrangment])
    }, 100)
    return () => clearInterval(timer)
  }, [
    checkRowOfFour,
    checkRowOfFour,
    checkForColumnOfThree,
    checkRowOfThree,
    moveIntoSquareBelow,
    currentColorArrangment,
  ])

  return (
    <StylesProvider injectFirst>
      <Container>
        <div style={{ minHeight: '70vh', paddingBottom: '3rem' }}>
          <div className="board-container">
            <h1>Board</h1>
            <div className="game">
              {currentColorArrangment.map((candyColor, index) => (
                <img
                  key={index}
                  src={candyColor}
                  alt={candyColor}
                  data-id={index}
                  draggable={true}
                  onDragStart={dragStart}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnter={(e) => e.preventDefault()}
                  onDragLeave={(e) => e.preventDefault()}
                  onDrop={dragDrop}
                  onDragEnd={dragEnd}
                />
              ))}
            </div>
          </div>
          <ScoreBoard score={scoreDisplay} />
        </div>
      </Container>
    </StylesProvider>
  )
}

export default Board
