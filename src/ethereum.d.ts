// ethereum.d.ts

interface EthereumProvider {
  isMetaMask?: boolean;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  request: (...args: any[]) => Promise<any>;
  // Add other properties and methods you use
}

interface Window {
  ethereum: EthereumProvider;
}