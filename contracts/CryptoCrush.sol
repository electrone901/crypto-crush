// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
contract CryptoCrush is ERC721 {
    mapping(address => User) public users;
    mapping(uint => NFT) public nfts;
    constructor() ERC721("CC", "CC") public  {}

    struct NFT {
        uint id;
        string link;
        uint256 points;
    }

    struct User {
        address wallet_address;
        uint [] nftsIds;
        uint maxScore;
        uint totalScore;
    }

    // creates user
   function createAccount() external {
    users[msg.sender] = User(msg.sender, new uint [](0), 0, 0);
    emit AccountCreated(msg.sender, new uint [](0), 0,0);
   }
   function getNFTs() external view returns(uint [] memory){
       User storage usersReference = users[msg.sender];
       return usersReference.nftsIds;
   }

   event AccountCreated (
        address wallet_address,
        uint [] NFT,
        uint maxScore,
        uint totalScore
    );

    event cryptoCrusCreated (
        uint id,
        string link,
        uint256 points
    );

    function mintNFT(string memory link, uint256 points) external {
        uint _id = totalSupply().add(1);
        nfts[_id] = NFT(_id, link, points);
        _safeMint(msg.sender, _id);
        _setTokenURI(_id, link);

        User storage usersReference = users[msg.sender];
        usersReference.nftsIds.push(_id);
        usersReference.totalScore += points;
        if(points > usersReference.maxScore) {
            usersReference.maxScore = points;
        }
        emit cryptoCrusCreated(_id, link, points);
    }
}

