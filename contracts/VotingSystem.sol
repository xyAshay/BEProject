pragma solidity ^0.5.0;

contract VotingSystem{
    struct Candidate{
        uint id;
        string name;
        uint voteCount;
    }
    mapping(address => bool) public voters;
    mapping(uint => Candidate) public candidates;
    uint public candidateCount;

    function addCandidate(string memory _name) private {
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
    }

    function vote(uint _candidateID) public{
        //Ensure Valid Candidate ID
        require(_candidateID > 0 && _candidateID <= candidateCount,"Invalid Candidate ID");
        //Ensure Voter Has Not Voted Before
        require(!voters[msg.sender],"Voter has already voted!");

        voters[msg.sender] = true;
        candidates[_candidateID].voteCount++;
    }

    constructor() public{
        addCandidate("Agrey");
        addCandidate("Ashay");
        addCandidate("Ashwika");
        addCandidate("Bhavishya");
    }

}