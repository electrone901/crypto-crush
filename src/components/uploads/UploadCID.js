import React, { useState } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import lighthouse from 'lighthouse-web3'
import { NFTStorage, File } from 'nft.storage'
import { apiKey } from './ipfs'

function UploadCID() {
  const imgName = 'New theme'
  const description = 'This is a new theme'
  const [img, setImage] = useState('')
  const [imgType, setImageType] = useState('')

  const sign_message = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    const res = await axios.get(
      `https://api.lighthouse.storage/api/lighthouse/get_message?publicKey=${address}`,
    )
    const message = res.data
    const signed_message = await signer.signMessage(message)
    return {
      message: message,
      signed_message: signed_message,
      address: await signer.getAddress(),
    }
  }

  // const execute_transaction = async (
  //   cid,
  //   fileName,
  //   fileSize,
  //   cost,
  //   network,
  // ) => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum)
  //   const contract_address = lighthouse.getContractAddress(network)

  //   const signer = provider.getSigner()
  //   // const contract = new ethers.Contract(contract_address, lighthouseAbi, signer);
  //   const txResponse = await contract.store(cid, '', fileName, fileSize, {
  //     value: ethers.utils.parseEther(cost),
  //   })
  //   return txResponse
  // }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const client = new NFTStorage({ token: apiKey })
      const metadata = await client.store({
        name: imgName,
        description: description,
        image: new File([img], imgName, { type: imgType }),
      })
    } catch (error) {
      console.log(error)
    }
  }

  const uploadFile = async (e) => {
    setImage(e.target.files[0])
    setImageType(e.target.files[0].type)
    e.persist()

    let network = 'fantom-testnet'
    if (window.ethereum.networkVersion === '137') {
      network = 'polygon'
    } else if (window.ethereum.networkVersion === '250') {
      network = 'fantom'
    } else if (window.ethereum.networkVersion === '56') {
      network = 'binance'
    } else if (window.ethereum.networkVersion === '10') {
      network = 'optimism'
    } else if (window.ethereum.networkVersion === '4002') {
      network = 'fantom-testnet'
    } else if (window.ethereum.networkVersion === '80001') {
      network = 'polygon-testnet'
    } else if (window.ethereum.networkVersion === '97') {
      network = 'binance-testnet'
    } else if (window.ethereum.networkVersion === '69') {
      network = 'optimism-testnet'
    } else {
      network = null
    }

    if (network) {
      const signing_response = await sign_message()

      const cost = (
        await lighthouse.getQuote(e.target.files[0].size, network)
      ).totalCost
        .toFixed(18)
        .toString()
      console.log(cost)

      // Last parameter is file/folder. true if file is uploaded, false in case of folder
      const deploy_response = await lighthouse.deploy(
        e,
        signing_response.address,
        signing_response.signed_message,
        true,
      )
      // If directory use below lines to get cid of root for transaction
      // deploy_response = deploy_response.split("\n");
      // deploy_response = JSON.parse(deploy_response[deploy_response.length - 2])
      console.log(deploy_response)

      // const transaction = await execute_transaction(
      //   deploy_response.Hash,
      //   deploy_response.Name,
      //   deploy_response.Size,
      //   cost,
      //   network,
      // )
      // console.log(transaction)

      const add_cid_response = await lighthouse.addCid(
        deploy_response.Name,
        deploy_response.Hash,
      )
      console.log(add_cid_response)
      console.log(add_cid_response.pin.cid)
      // add the url goes to the image =>   ipfs://QmVcq1pTNu4gTUGUiYL63L8RVCMrXQWuwKFngZDV3faoxh
    } else {
      console.log('Please connect to a supported network')
    }
  }

  return (
    <div className="App">
      <input onChange={(e) => uploadFile(e)} type="file" />
      click to see the hash {}
      {/* <input onChange={e=>uploadFile(e)} directory="" webkitdirectory="" type="file" /> */}
    </div>
  )
}

export default UploadCID
