// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserProfile {
    struct Profile {
        string username;
        string avatar;
        string bio;
    }

    mapping(address => Profile) public profiles;

    event ProfileCreated(address indexed user, string username);
    event ProfileUpdated(address indexed user, string username, string avatar, string bio);

    function createProfile(string memory _username, string memory _avatar, string memory _bio) public {
        profiles[msg.sender] = Profile(_username, _avatar, _bio);
        emit ProfileCreated(msg.sender, _username);
    }

    function updateProfile(string memory _username, string memory _avatar, string memory _bio) public {
        profiles[msg.sender] = Profile(_username, _avatar, _bio);
        emit ProfileUpdated(msg.sender, _username, _avatar, _bio);
    }

    function getProfile(address _user) public view returns (Profile memory) {
        return profiles[_user];
    }
}
