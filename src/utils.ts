import { AbiCoder, ethers } from "ethers";
import { JsonRpcSigner } from "ethers";

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
} 

export const decodeMessage = (message: string) => {
  const decodedMessage = coder.decode(
    ['address', 'string', 'uint256', 'address'],
    message
  )

  return decodedMessage;
}

/**
 * 
 * @param encodedMessage 
 * @param signer 
 * @returns A signed message using the signers private key
 */
export const signMessage = async (encodedMessage: string, signer: JsonRpcSigner) => {
  const signedMessage = await signer.signMessage(
    encodedMessage
  );

  return signedMessage;
}

export interface IVerification {
  recoveredAddress: string;
  expectedAddress: string;
  isMatch: boolean;
}

export const verifyMessage = (recipient: string, boardState: string, nonce: number, contractAddress: string, signature: string, expectedAddress: string): IVerification => {
  const message = constructMessage(recipient, boardState, nonce, contractAddress)
  const recoveredAddress = ethers.verifyMessage(message, signature);

  return {
    recoveredAddress,
    expectedAddress,
    isMatch: recoveredAddress === expectedAddress
  }
}