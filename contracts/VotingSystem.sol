pragma solidity ^0.5.0;

contract VotingSystem{
    struct Candidate{
        uint id;
        string name;
        uint voteCount;
    }
    mapping(uint => Candidate) public candidates;
    uint public candidateCount;

    function addCandidate(string memory _name) private {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
    }

    function vote(uint _candidateID) public{
        candidates[_candidateID].voteCount++;
    }

    constructor() public{
        addCandidate("Agrey");
        addCandidate("Ashay");
        addCandidate("Ashwika");
        addCandidate("Bhavishya");
    }

}