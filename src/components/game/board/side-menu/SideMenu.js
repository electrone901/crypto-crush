import React, { useState, useEffect } from 'react'
import {
  StylesProvider,
  Container,
  Grid,
  CardMedia,
  Card,
  TextField,
  MenuItem,
} from '@material-ui/core'

const SideMenu = () => {
  const playerTypeRef = React.createRef()
  const [playerType, setPlayerType] = useState('')
  return (
    <Grid container>
      <Grid item xs={2}>
        <TextField
          fullWidth
          name="playerType"
          select
          label="Select Player "
          variant="outlined"
          className="text-field"
          onChange={(e) => setPlayerType(e.target.value)}
          defaultValue="Solo"
          ref={playerTypeRef}
        >
          <MenuItem value="Solo">Solo</MenuItem>
          <MenuItem value="Multiplayer" disabled>
            Multiplayer
          </MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={2}>
        <TextField
          fullWidth
          name="playerType"
          select
          label="Select Theme "
          variant="outlined"
          className="text-field"
          onChange={(e) => setPlayerType(e.target.value)}
          defaultValue="Crypto crush"
          ref={playerTypeRef}
        >
          <MenuItem value="Crypto crush">Crypto crush</MenuItem>
          <MenuItem value="Candy crush" disabled>
            Candy crush
          </MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={2}>
        <TextField
          fullWidth
          name="playerType"
          select
          label="Select Level "
          variant="outlined"
          className="text-field"
          onChange={(e) => setPlayerType(e.target.value)}
          defaultValue="Easy"
          ref={playerTypeRef}
        >
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium" disabled>
            Medium
          </MenuItem>
          <MenuItem value="Advance" disabled>
            Advance
          </MenuItem>
        </TextField>
      </Grid>


      <Grid item xs={2}>
        
        <TextField
          fullWidth
          name="playerType"
          select
          label="Select Level "
          variant="outlined"
          className="text-field"
          onChange={(e) => setPlayerType(e.target.value)}
          defaultValue="Easy"
          ref={playerTypeRef}
        >
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium" disabled>
            Medium
          </MenuItem>
          <MenuItem value="Advance" disabled>
            Advance
          </MenuItem>
        </TextField>
      </Grid>



    </Grid>
  )
}
export default SideMenu
