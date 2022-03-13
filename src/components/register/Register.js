import React, { useState } from 'react'
import { StylesProvider, Container, Button } from '@material-ui/core'
import './Register.css'

const Register = ({ createAccount }) => {
  const [r, setR] = useState('')

  const registerUser = (e) => {
    e.preventDefault()
    setR('Exist')
    console.log('r', r)
  }

  return (
    <div className="register-body">
      <h1>👋 Welcome!</h1> <br />
      <div>
        <h2>Please register to continue... </h2> <br />
        <br />
        <Button
          variant="contained"
          className="register-btn"
          onClick={() => createAccount()}
        >
          Register now
        </Button>
      </div>{' '}
      <br />
      <br />
      <br />
      <div>
        <p>
          The metamask extension will open, please sing and confirm the transaction. Click here if you need help from{' '}
          <a
            href="
            https://metamask.zendesk.com/hc/en-us
"
          >
              Metamask.
          </a>{' '}
        </p>  <br />
        <p className="note">
          Note: <span> You don't need an username </span>
          <span> or password. We are completely decentralize 😎</span>
        </p>
      </div>
    </div>
  )
}
export default Register
