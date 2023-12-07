import Web3 from "web3";
import { AbiCoder } from "ethers";

const coder = AbiCoder.defaultAbiCoder()
// recipient is the address that should be paid.
// amount, in wei, specifies how much ether should be sent.
// nonce can be any unique number to prevent replay attacks
// contractAddress is used to prevent cross-contract replay attacks
export const constructMessage = (recipient: string, boardState: string, nonce: number, contractAddress: string) => {
  const message = coder.encode(
    ['address', 'string', 'uint256', 'address'],
    [recipient, boardState, nonce, contractAddress]
  )
  return message;
  // web3.eth.personal.sign(hash, web3.eth.defaultAccount, callback);
} 

export const decodeMessage = (message: string) => {
  const decodedMessage = coder.decode(
    ['address', 'string', 'uint256', 'address'],
    message
  )

  return decodedMessage;
}

export const signMessage = (encodedMessage: string, signer: string, web3: Web3) => {
  const signedMessage = web3.eth.sign(
    encodedMessage,
    signer
  ).then((v) => {
    console.log(v)
  })

  console.log(signedMessage)

  return signedMessage;
}