const VotingSystem = artifacts.require("./VotingSystem.sol");

contract("VotingSystem", () => {
    it("Initialize With Correct No Of Candidates", () => {
        return VotingSystem.deployed().then((app) => {
            return app.candidateCount();
        }).then((count) => {
            assert.equal(count, 4);
        });
    });
});