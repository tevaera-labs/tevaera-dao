const ethers = require("ethers");
const dotenv = require("dotenv");

dotenv.config();

// constants
const oldBeneficiary = "";
const newBeneficiary = "";

const MVW_JSON = require("../../artifacts/contracts/MultiVestingWalletCliffV1.sol/MultiVestingWalletCliffV1.json");
const MVW_ABI = MVW_JSON.abi;

const createVestingWallets = async () => {
  console.log(`Updating vesting wallet beneficiary...`);

  const base_rpc_provider_uri = process.env.BASE_RPC_PROVIDER_URI;
  if (!base_rpc_provider_uri) throw new Error("Please set Base provider url");
  const provider = new ethers.JsonRpcProvider(base_rpc_provider_uri);

  const multiVestingContractAddress =
    process.env.MULTI_VESTING_CONTRACT_ADDRESS;
  if (!multiVestingContractAddress)
    throw new Error("Please set MULTI_VESTING_CONTRACT_ADDRESS");

  const wallet = new ethers.Wallet(
    `${process.env.CONTRACT_ADMIN_WALLET_PK}`,
    provider
  );
  console.log("wallet: ", await wallet.getAddress());

  const mvwContract = new ethers.Contract(
    multiVestingContractAddress,
    MVW_ABI,
    wallet
  );

  // Call changeBeneficiaryOfVestingWallet function
  const updateVestingTx = await mvwContract.changeBeneficiaryOfVestingWallet(
    newBeneficiary,
    oldBeneficiary
  );

  await updateVestingTx.wait();
  console.log(
    `Vesting wallet beneficiary updated from ${oldBeneficiary} to ${newBeneficiary}, TX: ${createVestingTx.hash}`
  );
};

createVestingWallets();
