import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import VerifiedUserSharpIcon from '@material-ui/icons/VerifiedUserSharp'
import {
  StylesProvider,
  Container,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Button,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import './Controls.css'

const Controls = ({
  account,
  connectWallet,
  setAccount,
  logout,
  createAccount,
  mintNFT,
  getNFTs,
  
}) => {
  const playerTypeRef = React.createRef()
  const [playerType, setPlayerType] = useState('')
  const menuId = 'primary-search-account-menu'
  const [anchorEl, setAnchorEl] = useState(null)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  return (
    <StylesProvider injectFirst>
      <div className="nav-like">
        <Grid container>
          <Grid item xs={2}>
            <Link to="/" className="whiteLink">
              <Typography className="title" variant="h6" noWrap>
                CryptoCrush
              </Typography>
            </Link>
          </Grid>

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
              style={{ borderWidth: '1px', borderColor: 'yellow' }}
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
            <Button className="whiteLink" component={Link} to="add-theme">
              Upload-theme
            </Button>
          </Grid>

          <Grid item xs={4} className="control-container">
            <div className="section-right">
              <Button className="whiteLink" component={Link} to="/send-nft">
                Send NFTs
              </Button>

              {account ? (
                <>
                  <Button className="whiteLink" onClick={logout}>
                    logout
                  </Button>
                  <Button
                    variant="contained"
                    className="connected-btn"
                    endIcon={<VerifiedUserSharpIcon />}
                  >
                    {account.substring(0, 8)}...{account.substring(34)}
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  className="connected-btn"
                  onClick={connectWallet}
                >
                  Login
                </Button>
              )}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </div>
    </StylesProvider>
  )
}
export default Controls
