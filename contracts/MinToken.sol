// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MinToken is ERC721, Ownable{
    constructor(string memory _name, string memory _symbol)
    ERC721(_name,_symbol)
    {}
    uint256 COUNTER;

    uint256 fee = 0.01 ether;
    
    struct Min{
        //프로퍼티
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarity;
    }

    Min[] public mins;

    event NewMin(address indexed owner,uint256 id, uint256 dna); 

    // Helpers
    // pure : 컨트랙트 내의 다른 변수를 사용하지 않을 때
    function _createRandomNum(uint256 _mod) internal view returns(uint256){
        uint256 randomNum = uint256(keccak256(abi.encodePacked(block.timestamp,msg.sender)));
        return randomNum % _mod;
    }

    // external : 컨트랙트 내부에서 사용 불가능, 컨트랙트 외부에서 사용
    function updateFee(uint256 _fee) external onlyOwner() {
        fee = _fee;
    }

    function withdraw() external payable onlyOwner() { 
        address payable _owner = payable(owner());
        _owner.transfer(address (this).balance);
    }


    // Creation
    // modifier onlyOwner() 사용
    // internal : 오로지 이 컨트랙트만 접근가능
    function _createMin(string memory _name) internal {
        uint8 randRarity = uint8 (_createRandomNum(100)); //0~99, 1~100
        uint256 randDna = _createRandomNum(10**16);

        //구조체 만들기?
        Min memory newMin = Min(_name,COUNTER,randDna,1,randRarity);
        mins.push(newMin);
        _safeMint(msg.sender,COUNTER);

        emit NewMin(msg.sender,COUNTER,randDna);
        
        COUNTER++;
    }

    function createRandomMin(string memory _name) public payable {
        require(msg.value >= fee);//, "The fee is not correct.");
        _createMin(_name);
    }


    // Getters
    function getMins() public view returns(Min[] memory){
        return mins;
    }

    function getOwnerMins(address _owner) public view returns(Min[] memory){
        Min[] memory result = new Min[](balanceOf(_owner));
        uint256 counter = 0;
        for(uint256 i = 0; i < mins.length; i++){
            if(ownerOf(i) == _owner){
                result[counter] = mins[i];
                counter++;
            }
        }
        return result;
    }

    // Actions
    function levelUp(uint256 _minId) public {
        require(ownerOf(_minId) == msg.sender);
        // memory 였으면, level 값이 변하지 않음.
        Min storage min = mins[_minId];
        min.level++;

        // //memory를 사용할경우
        // Min memory min = mins[_minId];
        // min.level++;
        // mins[_minId] = min;
    }


}
