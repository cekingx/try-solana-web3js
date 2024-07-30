import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

const USDC_MINT_ADDRESS = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU')
const OWNER_ADDRESS = new PublicKey('CR9Cv1yApUEV62izH1vnCFNZNH7t3dyTXJ3ScuE5BFy5')
 
const associatedTokenAccountAddress = getAssociatedTokenAddressSync(
  USDC_MINT_ADDRESS,
  OWNER_ADDRESS,
);

console.log('Associated Token Account Address:', associatedTokenAccountAddress.toString());