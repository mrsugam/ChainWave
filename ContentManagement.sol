// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContentManagement {
    struct Content {
        address author;
        string uri;
        uint256 timestamp;
    }

    Content[] public contents;
    event ContentCreated(uint256 indexed contentId, address indexed author, string uri, uint256 timestamp);
    function createContent(string memory _uri) public {
        uint256 contentId = contents.length;
        contents.push(Content(msg.sender, _uri, block.timestamp));
        emit ContentCreated(contentId, msg.sender, _uri, block.timestamp);
    }
    function getContent(uint256 _contentId) public view returns (Content memory) {
        require(_contentId < contents.length, "Content does not exist");
        return contents[_contentId];
    }
}
