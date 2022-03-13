import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import './App.css'
import { Navbar } from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
import Controls from './components/game/board/controls/Controls'
import UploadCID from './components/uploads/UploadCID'
import Register from './components/register/Register'
import CreatePet from './components/create-post/CreatePet'
import Board from './components/game/board/Board'
import NFTCollectionContainer from './components/game/nft-collection/NFTCollectionContainer'
import DonateNFT from './components/donate-nft/DonateNFT'

import Web3 from 'web3'
import playerAbi from './artifacts/contracts/CryptoCrush.sol/CryptoCrush.json'
const playerContractAddress = '0x56A2EF3d9ff17c94ccb8b62909887edB46eB5140'
function App() {
  const [account, setAccount] = useState('')
  const [contractData, setContractData] = useState('')
  const history = createBrowserHistory()
  const [scoreDisplay, setScoreDisplay] = useState(0)
  const [moves, setMoves] = useState(0)
  const [userInfo, setUserInfo] = useState({})
  let isNewAccount = localStorage.getItem('wallet_address')

  useEffect(() => {
    loadWeb3()
    getContract()
  }, [])

  const createAccount = async () => {
    try {
      if (!account) connectWallet()
      const data = await contractData.methods
        .createAccount()
        .send({ from: account })
      console.log('data', data)
      const info = data.events.AccountCreated.returnValues
      console.log('info', info)
    } catch (err) {
      console.error(err)
    }
  }

  // https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80

  // https://images.unsplash.com/photo-1627856014754-2907e2355d34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1447&q=80
  const mintNFT = async () => {
    try {
      const mintResponse = await contractData.methods
        .mintNFT(
          'https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          50,
        )
        .send({ from: account })
      console.log('nfts', mintResponse)
    } catch (error) {
      console.error(error)
    }
  }
  const getNFTs = async () => {
    try {
      const nfts = await contractData.methods.getNFTs().call({ from: account })
      console.log('nfts', nfts)
    } catch (error) {
      console.error(error)
    }
  }

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying Metamask!',
      )
    }
  }
  const getContract = async () => {
    try {
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0])
      const accountFromMetamask = accounts[0]
      const abi = playerAbi.abi
      const address = playerContractAddress
      const myContract = new web3.eth.Contract(abi, address)
      setContractData(myContract)

      // gets userInfo from contract
      const userInfo = await myContract.methods.users(accounts[0]).call()
      console.log('userInfo', userInfo)
      setUserInfo(userInfo)
      console.log('accountFromMetamask', accountFromMetamask)

      // checks if user-wallet exists on the contract, if not redirect to registration page
      if (accountFromMetamask !== userInfo.wallet_address) {
        history.push('/register')
      }
    } catch (error) {
      window.alert(
        'Contract is not deployed to the detected network. Connect to the correct network!',
      )
    }
  }
  console.log('contractData', contractData)

  const logout = () => {
    setAccount('')
  }

  const connectWallet = async () => {
    await loadWeb3()
    await getContract()
    if (!isNewAccount) {
      console.log('new')
    }
  }

  return (
    <Router>
      <div className="cl">
        {/* <Navbar
          account={account}
          connectWallet={connectWallet}
          setAccount={setAccount}
          logout={logout}
          createAccount={createAccount}
          mintNFT={mintNFT}
          getNFTs={getNFTs}
        /> */}
        <Controls
          account={account}
          connectWallet={connectWallet}
          setAccount={setAccount}
          logout={logout}
          createAccount={createAccount}
          mintNFT={mintNFT}
          getNFTs={getNFTs}
          scoreDisplay={scoreDisplay}
          setScoreDisplay={setScoreDisplay}
          moves={moves}
          setMoves={setMoves}
        />

        <Route exact path="/">
          <Board
            scoreDisplay={scoreDisplay}
            setScoreDisplay={setScoreDisplay}
            moves={moves}
            setMoves={setMoves}
            userInfo={userInfo}
            mintNFT={mintNFT}
          />
        </Route>
        <Switch>
          <Route exact path="/add-theme">
            <UploadCID account={account} />
          </Route>
          <Route exact path="/send-nft">
            <DonateNFT account={account} />
          </Route>
          <Route exact path="/nfts">
            <NFTCollectionContainer account={account} />
          </Route>
          <Route exact path="/register">
            <Register createAccount={createAccount} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
