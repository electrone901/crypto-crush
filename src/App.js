import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/layout/navbar/Navbar'
import Footer from './components/layout/footer/Footer'
import Home from './components/home-container/home/Home'
import PetDetails from './components/home-container/pet-details/PetDetails'
import CreatePet from './components/create-post/CreatePet'
import Board from './components/game/board/Board'
import Web3 from 'web3'
import playerAbi from './artifacts/contracts/CryptoCrush.sol/CryptoCrush.json'
const playerContractAddress = '0xa2dDc7AB9820DC0bffeA988E85B7239E4191106f'
function App() {
  const [account, setAccount] = useState('')
  const [contractData, setContractData] = useState('')

  useEffect(() => {
    loadWeb3()
    getContract()
  }, [])

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
      const abi = playerAbi.abi
      const address = playerContractAddress
      const myContract = new web3.eth.Contract(abi, address)
      setContractData(myContract)
    } catch (error) {
      window.alert(
        'Contract is not deployed to the detected network. Connect to the correct network!',
      )
    }
  }
  console.log('contractData', contractData)

  const connectWallet = async () => {}

  return (
    <Router>
      <div className="cl">
        <Navbar />
        <Route exact path="/" component={Board} />
        <Switch>
          <Route exact path="/create-pet" component={CreatePet} />
          <Route path="/pet-details/:petId">
            <PetDetails />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
