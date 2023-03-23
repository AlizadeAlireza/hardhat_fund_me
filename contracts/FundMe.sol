// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

/*
 errors 
*/
error FundMe__NotOwner();
error FundeMe_PayMoreEth(uint256 MINIMUM_USD, uint256 yourPay);

contract FundMe {
    // Type declarations
    using PriceConverter for uint256;

    /*
     state variables 
    */
    mapping(address => uint256) private s_addressToAmountFunded;

    address[] private s_funders;

    uint256 public constant MINIMUM_USD = 50 * 10 ** 18;
    address private immutable i_owner;
    AggregatorV3Interface private s_priceFeed;

    /*
     constructor 
    */
    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    /*
     functions
    */
    function fund() public payable {
        if (msg.value.getConversionRate(s_priceFeed) <= MINIMUM_USD) {
            revert FundeMe_PayMoreEth(MINIMUM_USD, msg.value);
        }
        // require(
        //     msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
        //     "You need to spend more ETH!"
        // );
        // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
        s_addressToAmountFunded[msg.sender] += msg.value;
        s_funders.push(msg.sender);
    }

    modifier onlyOwner() {
        // require(msg.sender == owner);
        if (msg.sender != i_owner) revert FundMe__NotOwner();
        _;
    }

    function withdraw() public onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            address funder = s_funders[funderIndex];
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        // // transfer
        // payable(msg.sender).transfer(address(this).balance);
        // // send
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");
        // call
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Call failed");
    }

    function cheaperWithdraw() public payable onlyOwner {
        address[] memory funders = s_funders;
        // mappings can't be in memory
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            // resetting mapping here
            s_addressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success, "");
    }

    /*
     getter functions
    */
    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getFunder(uint256 _index) public view returns (address) {
        return s_funders[_index];
    }

    function getAddressToAmountFunded(
        address _funder
    ) public view returns (uint256) {
        return s_addressToAmountFunded[_funder];
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }

    function getVersion() public view returns (uint256) {
        // ETH/USD price feed address of Goerli Network.

        return s_priceFeed.version();
    }

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }
}

// Functions Orders
// constructor
// receive
// fallback
// external
// public
// internal
// private
// view / pure
