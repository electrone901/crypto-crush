import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  StylesProvider,
  Container,
  Grid,
  CardMedia,
  Card,
  TextField,
  MenuItem,
  Button,
  Typography,
  CardContent,
} from '@material-ui/core'
import ScoreBoard from '../score-board/ScoreBoard'
import './Board.css'
import MainMenu from '../board/main-menu/MainMenu'
import Blue from '../../../images/game/blue-candy.png'
import Green from '../../../images/game/green-candy.png'
import Orange from '../../../images/game/orange-candy.png'
import Purple from '../../../images/game/purple-candy.png'
import Red from '../../../images/game/red-candy.png'
import Yellow from '../../../images/game/yellow-candy.png'
import Blank from '../../../images/game/blank.png'
import avatar from '../../../images/game/avatarr.jpg'
import profile from '../../../images/profile.jpg'
import logo from '../../../images/logo.jpg'

const width = 8
const candyColors = [Blue, Green, Orange, Purple, Red, Yellow]

const Board = ({
  scoreDisplay,
  setScoreDisplay,
  moves,
  setMoves,
  userInfo,
  mintNFT,
}) => {
  const [currentColorArrangment, setCurrentColorArrangment] = useState([])
  const [squareBeingDraggred, setSquareBeingDraggred] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [playerType, setPlayerType] = useState(0)
  const playerTypeRef = React.createRef()

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
      const notValid = [
        5,
        6,
        7,
        13,
        14,
        15,
        21,
        22,
        23,
        29,
        30,
        31,
        37,
        38,
        39,
        45,
        46,
        47,
        53,
        54,
        55,
        62,
        63,
        64,
      ]
      const isBlank = currentColorArrangment[i] === Blank

      if (notValid.includes(i)) continue

      if (
        rowOfFour.every(
          (square) =>
            currentColorArrangment[square] === decidedColor && !isBlank,
        )
      ) {
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

      if (
        columOfThree.every(
          (square) =>
            currentColorArrangment[square] === decidedColor && !isBlank,
        )
      ) {
        setScoreDisplay((score) => score + 3)
        columOfThree.forEach(
          (square) => (currentColorArrangment[square] = Blank),
        )
        return true
      }
    }
  }

  const checkRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangment[i]
      const notValid = [
        6,
        7,
        14,
        15,
        22,
        23,
        30,
        31,
        38,
        39,
        46,
        47,
        54,
        55,
        63,
        64,
      ]
      const isBlank = currentColorArrangment[i] === Blank

      if (notValid.includes(i)) continue

      if (
        rowOfThree.every(
          (square) =>
            currentColorArrangment[square] === decidedColor && !isBlank,
        )
      ) {
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
    const currentMoves = moves + 1
    setMoves(currentMoves)
    if (currentMoves === 2) {
      mintNFT()
    }
  }

  const dragEnd = (e) => {
    const squareBeingDraggredId = parseInt(
      squareBeingDraggred.getAttribute('data-id'),
    )
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute('data-id'),
    )

    currentColorArrangment[
      squareBeingReplacedId
    ] = squareBeingDraggred.getAttribute('src')
    currentColorArrangment[
      squareBeingDraggredId
    ] = squareBeingReplaced.getAttribute('src')

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

    if (
      squareBeingReplacedId &&
      validMove &&
      (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)
    ) {
      setSquareBeingDraggred(null)
      setSquareBeingReplaced(null)
    } else {
      currentColorArrangment[
        squareBeingReplacedId
      ] = squareBeingReplaced.getAttribute('src')
      currentColorArrangment[
        squareBeingDraggredId
      ] = squareBeingDraggred.getAttribute('src')
      setCurrentColorArrangment([...currentColorArrangment])
    }
  }

  const createBoard = () => {
    const randomColorArrangment = []
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)]
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
  const contentStyle = { background: '#000' }
  const overlayStyle = { background: 'rgba(0,0,0,0.5)' }
  const arrowStyle = { color: '#000' }

  return (
    <StylesProvider injectFirst>
      <div>
        <Grid container>
          <Grid item xs={3} className="side-menu">
            {/* <Card className="card2">
              <CardMedia
                className="avatar"
                image="https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                title="Contemplative Reptile"
              />
            </Card> */}
            <img src={profile} alt="logo" className="avatar" />
            <p>
              <strong>Game name:</strong> Cryptocrush
            </p>
            <br />
            <p>
              <strong>Player type:</strong> Solo
            </p>
            <br />
            <p>
              <strong>Game level:</strong> Easy
            </p>
            <br />
            <hr />
            <h3> 🚩 🚩 Current Game 🏆 🏆 </h3>
            <p>
              Current score: <strong>{scoreDisplay}</strong>
            </p>
            <br />
            <p>
              {' '}
              Numb of moves: <strong>{moves}</strong>
            </p>
            <br />
            <p>
              Available moves: <strong>{10 - moves}</strong>
            </p>
            <br />

            {/* Your NFTS */}
            <br />
            <hr />
            <h3>Your NFTs ✨🔮 </h3>
            <Typography variant="body2">
              To see your NFTs click the button
            </Typography>
            <Button
              variant="contained"
              size="small"
              style={{
                fontSize: '0.7125rem',
                backgroundColor: '#61dafb',
                color: 'white',
              }}
              component={Link}
              to={`/nfts`}
              // to={`/rewards/${pet.cid}`}

              // "/collection/wallet-address"
              // className="swap-msg-btn"
            >
              Go to NFTs
            </Button>

            {/* Instructions */}
            <br />
            <hr />
            <h3> Instructions 🌟💫</h3>
            <Typography variant="body2">
              To see the rules and instructions click the button
            </Typography>
            <Button
              variant="contained"
              size="small"
              style={{
                fontSize: '0.7125rem',
                backgroundColor: '#61dafb',
                color: 'white',
              }}
              to={`/rewards`}
              // to={`/rewards/${pet.cid}`}

              // "/collection/wallet-address"
              // className="swap-msg-btn"
            >
              Go to instructions
            </Button>
          </Grid>

          <Grid
            item
            xs={9}
            style={{
              backgroundColor: '#ebdef8',
              paddingTop: '0.5rem',
              paddingBottom: '2rem',
            }}
          >
            <MainMenu
              scoreDisplay={scoreDisplay}
              setScoreDisplay={setScoreDisplay}
              moves={moves}
              setMoves={setMoves}
              userInfo={userInfo}
            />
            <br />
            <br />

            {/* Board */}
            <div className="container-game">
              <div className="board-container">
                <div className="game">
                  {currentColorArrangment.map((candyColor, index) => (
                    <img
                      key={index}
                      src={candyColor}
                      alt={candyColor}
                      data-id={index}
                      draggable={moves === 10 ? false : true}
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
            </div>
          </Grid>
        </Grid>
      </div>
    </StylesProvider>
  )
}

export default Board
