import { Connection, PublicKey } from "@solana/web3.js";
import { publicKey, u64, bool } from '@solana/buffer-layout-utils';
import { u32, u8, struct } from '@solana/buffer-layout';

export interface RawMint {
    mintAuthorityOption: 1 | 0;
    mintAuthority: PublicKey;
    supply: bigint;
    decimals: number;
    isInitialized: boolean;
    freezeAuthorityOption: 1 | 0;
    freezeAuthority: PublicKey;
}

export const MintLayout = struct<RawMint>([
    u32('mintAuthorityOption'),
    publicKey('mintAuthority'),
    u64('supply'),
    u8('decimals'),
    bool('isInitialized'),
    u32('freezeAuthorityOption'),
    publicKey('freezeAuthority'),
]);

export interface RawTokenAccount {
  mint: PublicKey;
  owner: PublicKey;
  amount: bigint;
  delegateOption: 1 | 0;
  delegate: PublicKey;
  state: number;
  isNativeOption: 1 | 0;
  isNative: number;
  delegatedAmount: bigint;
  closeAuthorityOption: 1 | 0;
  closeAuthority: PublicKey;
}

export const TokenAccountLayout = struct<RawTokenAccount>([
  publicKey('mint'),
  publicKey('owner'),
  u64('amount'),
  u32('delegateOption'),
  publicKey('delegate'),
  u32('state'),
  u32('isNativeOption'),
  u64('isNative'),
  u64('delegatedAmount'),
  u32('closeAuthorityOption'),
  publicKey('closeAuthority'),
]);

async function main() {
  const userAddress = new PublicKey('28z7gNEo5fuR85duxx26QcMD1aooeNTAPL7W2oH1mVbK')
  const tokenAddress = new PublicKey('CZ93GmthAv5QKtrzUUfYjuVH9Ze49i8712kjPcdUqT12')
  const tokenDataAddress = new PublicKey('GoHSBDFf7MGpkWkYVoEJ2HyumL7vo7bd3ZB3WYw246g9')
  const connection = new Connection('http://localhost:8899', 'confirmed')

  const userInfo = await connection.getAccountInfo(userAddress)
  console.log('userInfo', userInfo)
  // if(userInfo?.data) {
  //   console.log('deserialized', MintLayout.decode(userInfo?.data))
  // }

  const tokenInfo = await connection.getAccountInfo(tokenAddress)
  console.log('tokenInfo', tokenInfo)
  if(tokenInfo?.data) {
    console.log('deserialized', MintLayout.decode(tokenInfo?.data))
  }
  const tokenDataInfo = await connection.getAccountInfo(tokenDataAddress)
  if(tokenDataInfo?.data) {
    console.log('deserialized', TokenAccountLayout.decode(tokenDataInfo?.data))
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
})