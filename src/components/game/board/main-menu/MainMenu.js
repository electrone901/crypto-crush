import React, { useState, useEffect } from 'react'
import {
  StylesProvider,
  Container,
  Grid,
  CardMedia,
  Card,
  TextField,
  MenuItem,
  Typography,
} from '@material-ui/core'
import ProgressBar from '../../progress-bar/ProgressBar'
import './MainMenu.css'
const MainMenu = ({
  scoreDisplay,
  setScoreDisplay,
  moves,
  setMoves,
  userInfo,
}) => {
  const playerTypeRef = React.createRef()
  const [playerType, setPlayerType] = useState('')
  let movesLeft = 10 * 10 - moves * 10
  return (
    <Grid container spacing={3}>
      <Grid item xs={4} style={{ paddingLeft: '1rem' }}>
        <h2>Game Specs</h2>
        <Typography variant="body1" noWrap>
          Initial score: {scoreDisplay}
        </Typography>
        <ProgressBar points={scoreDisplay} />
        <br />

        <Typography variant="body1" noWrap>
          Available moves: {movesLeft / 10}
        </Typography>
        <ProgressBar points={movesLeft} />
        <br />

        <Typography variant="body1" noWrap>
          Moves made: {moves}
        </Typography>
        <ProgressBar points={moves * 10} />
      </Grid>

      <Grid item xs={4}>
        <h2>Your Statistics</h2>
        <Typography variant="body1" noWrap>
          Max Score: {userInfo.maxScore}
        </Typography>
        <ProgressBar points={userInfo.maxScore} />
        <br />

        <Typography variant="body1" noWrap>
          Total Points(score): {userInfo.totalScore}
        </Typography>
        <ProgressBar points={userInfo.totalScore / 10} />
        <br />

        <Typography variant="body1" noWrap>
          Number of games played: {1}
        </Typography>
        <ProgressBar points={1 * 10} />
      </Grid>

      <Grid item xs={4}>
        <h2>Leaderboard</h2>
        <Typography variant="body1" noWrap>
          First Score:
        </Typography>
        <ProgressBar points={98} />
        <br />

        <Typography variant="body1" noWrap>
          Second Score:
        </Typography>
        <ProgressBar points={90} />
        <br />

        <Typography variant="body1" noWrap>
          Third Score:
        </Typography>
        <ProgressBar points={80} />
      </Grid>
    </Grid>
  )
}
export default MainMenu
