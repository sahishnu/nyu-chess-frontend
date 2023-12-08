import { AbiCoder, ethers } from "ethers";
import { JsonRpcSigner } from "ethers";

const coder = AbiCoder.defaultAbiCoder()

/**
 * 
 * @param recipient The public address of the players opponent.
 * @param boardState The current PGN move string, eg 1. d3 e6 2. Qd2 Qg5 3. Qxg5 Bd6 4. Qf4
 * @param nonce Meant to be a sequence number to help players keep count of moves. Must increase
 *              in every transaction
 * @param contractAddress The address of the game contract. It is used to prevent cross-contract replay attacks.
 * @returns An encoded message that mimics the eth_sign.
 */
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