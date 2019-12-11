const VotingSystem = artifacts.require("./VotingSystem.sol");

contract("VotingSystem", () => {
    var app;

    it("Initialize With Correct No Of Candidates", () => {
        return VotingSystem.deployed().then((instance) => {
            app = instance;
            return app.candidateCount();
        }).then((count) => {
            assert.equal(count, 4);
        });
    });

    it("Initial VoteCount Must Be 0",() => {
        return VotingSystem.deployed().then((instance) => {
            app = instance;
            return app.candidates(1);
        }).then((temp) => {
            assert.equal(temp[2],0);
            return app.candidates(2);
        }).then((temp) => {
            assert.equal(temp[2],0);
            return app.candidates(3);
        }).then((temp) => {
            assert.equal(temp[2],0);
            return app.candidates(4);
        }).then((temp) => {
            assert.equal(temp[2],0);
        })
    });
});