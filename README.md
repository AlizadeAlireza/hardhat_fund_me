# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```


for import we can downloading with yarn.

hardhat-deploy package: 

	we download @chainlink/contracts with yarn 
	
	yarn add --dev hardhat-deploy and set require in 
	config.js
	
create deploy folder that is going to be where a lot of hardhat deploy module
and we are wirting our scripts.

because we use ethers.js we also need to hardhat-deploy-ethers.

we're doing is we're taking at nomic labs, hardhat ethers, witch we've used before and we're overriding it with hardhat deploy ethers.this will enable ethers to keep track of and remember all the different deployments that we actually make in our contract.

create a function --> deployFunc --> we're going to export this deploy function
as the default function for hardhat deploy to look for.

hre: is a hardhat runtime environment.

we wan't to everytime deploy on testnet because it's slow. so we can use mock.

parameterizing priceFeed:
	1) pass priceFeed address to constructor
	2) that gets saved as a global variable to an aggV3Int type
	3) passing it to getConversionRate function
	witch passes it to the getPrice witch then just calls 
	latestRoundData
	
to be able the functionality we actually take a page out of aave.
we want to use chainId to use different addresses.
so we can use helper-hardhat-config.js

for this we create a new file. --> helper-hardhat-config.js
after set chainId, name and ethUsdPriceFeed we must to export this network config
in deploy script. so our other scripts can actually work with it.

so after that we can declare a variable and equal it to networkConfig

when we use a chain that doesn't even have a price feed addresson it??use mocks.


sometimes we can add multiple solidity version in config.js 
we set development chain and export and import in the script.

decimal parameters : is going be equivalent to this decimals function.
initial answer: is the price feed starting at


we can use modules.exports.tags and in the bashe we can use --tags

if development chains that includes that network the names, 
then we're gonna go ahead and deploy the mocks.

utils Folder:
	is where we're going to add different scripts that we can use 
	across different deployments.
	
if no block confirmation is given in our HardHat.config we just wait for 1 block.


the reason that we add these tags here is actually we can use the to natspec to automatically create doc for us


unit test:
	- local hardhat network
	- forked hardhat network

first step of test: ---> our constructor

for deploying because we use mocks we declare fundme with let.

{deployments}.fixture : it is allows us to basically run our entire deploy folder with as many tags as we want.
for "all" in our tags declaration.

a different way to get account from hardhat --> await ethers.getSigners()

we want to see our priceFeed is the same in our MockV3Aggregator.

test fund function:
	1) reverted when the ETH amount is not enough
	2) updated sent amount in mapping
	3) adding funders in funders array

test withdraw():

	only the owner of the contract is going be able to get the balance back.(with one funder)

	- before withdraw we actually need to put some money in it.
	so we add a beforeEach for this describe and then we can test and for every it() 
	we fund some eth in it.
	a little notice exists is here that for withdrawal we need spend some gas.


	- with multiple funder:

	in our fundMe contract the contract connected with the deployer 
	so for connecting with multiple accounts.
	then we can fund with several accounts.

	- we want to make sure that the funders reset properly

	the zero position must revert an error because we start with one 
	in our loop.

	then we want to loop all of these account and see the balances of accounts are zero
	or not.

	- last test is want to our only owner can withdraw


### Gas estimator

the opcodes represent what the machine code is doing and the represent how much computational work
it takes to actually run our code and do stuff with our code.

the best convention or making sure we know that we're working with a stored variable and 
about to spend a lot of gas is to append s underscore to the variable.

the best convention for immutable variable is to use i underscore.

capslock for constant variables.

we can save our storage variable in the memory and read and write from this memory variable
much cheaper.

our state variables are public and actually intrnal and private variables are also cheaper gas wise.

optimization for errors as well is we could update all of our require to instead be reverts.
because without requires, we're actually storing this massive array of text on chain.