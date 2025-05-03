// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title App
 * @dev Implements voting process along with vote delegation
 */
contract App {

    uint256 public groupCount;
    mapping(uint => Group) groups;
    enum Stage{Created,Staking,Voting,Completed}
    event GroupCreated(uint indexed id, address indexed owner);
    event MemberHasStaked(uint indexed id, address indexed payer );
    event RefundIssued(uint indexed id, address indexed member);
    event VotingClosed();
    error TimeExpired();
    error MemberAlreadyPaid();
    error StakingNotComplete();
    error BalanceShareNotMet();
    error HasVotedAlready();
    error ErrorWithVotingProcess();
    error CannotVoteForSelf();

    struct Group{
        address owner;
        address[] members;
        mapping(address=>bool) isMember;
        //groupId

        uint256 billAmount;
        uint256 requiredStake;

        uint256 staking_start;
        uint256 staking_deadline;
        uint256 voting_start;
        uint256 voting_deadline;

        mapping(address => uint256) stakes;

        mapping(address => bool) hasStaked;
        uint256 stakesAmount;

        uint256 totalStaked;

        //voting logic
        mapping(address => address) votes;
        mapping(address => bool) hasVoted;
        mapping(address => uint256) votesReceived;
        uint256 votingCount;
        address currentVoteWinner;
        
        Stage state;
        
        }

    function getGroupInfo(uint id) public view returns (
        address owner,
        uint256 billAmount,
        uint256 requiredStake,
    
        //time varibles
        uint256 staking_start,
        uint256 staking_deadline,
    

        Stage state,
        uint256 stakesAmount,
        uint256 totalStaked,
        address[] memory members
    ){
         Group storage g = groups[id];

    return (
        g.owner,
        g.billAmount,
        g.requiredStake,
        g.staking_start,
        g.staking_deadline,
        g.state,
        g.stakesAmount,
        g.totalStaked,
        g.members     
    );
    }
    
    function getStage(uint id) public view returns(Stage state){
        require(id > 0 && id <= groupCount, "Unknown group");
        return groups[id].state;
    }
    function getGroupSize(uint id) public view returns(uint256){
        require(id > 0 && id <= groupCount, "Unknown group");
        return groups[id].members.length;
    }
    
    function getBillAmount(uint id) public  view returns(uint256){
        require(getGroupSize(id) > 0, "No members in group");
        require(id > 0 && id <= groupCount, "Unknown group");
        return groups[id].billAmount / getGroupSize(id);
    }

    function addMember(uint id, address member) private{
        require(id > 0 && id <= groupCount, "Unknown group");
        groups[id].isMember[member] = true;
        groups[id].members.push(member);
    }

    function removeMember(uint id,address member) private{
        groups[id].isMember[member] = false;
    }

    function createGroup(
    uint256 billAmount,
    address[] memory members) public{
        groupCount ++;
        groups[groupCount].owner = msg.sender;
        groups[groupCount].billAmount = billAmount;
        groups[groupCount].staking_start = block.timestamp;
        groups[groupCount].staking_deadline = block.timestamp + 30;
        groups[groupCount].votingCount = 0;


        //logic to create members
        groups[groupCount].members = members;
        
        for(uint i=0; i<groups[groupCount].members.length; i++){
            address m = groups[groupCount].members[i];
            groups[groupCount].isMember[m] = true;
            groups[groupCount].hasStaked[m] = false;
            groups[groupCount].hasVoted[m] = false;
        }
    
        groups[groupCount].requiredStake = billAmount / groups[groupCount].members.length;
        //initialize how many have staked
        groups[groupCount].stakesAmount = 0;
        groups[groupCount].totalStaked = 0;

        groups[groupCount].state = Stage.Staking;
        emit GroupCreated(groupCount,groups[groupCount].owner);
    }

    function individualStake(uint256 id) external payable{
        require(id > 0 && id <= groupCount, "Unknown group");

        require(groups[id].isMember[msg.sender]);

        require(groups[id].state == Stage.Staking, "Not yet in staking");

        //check if the window is still open for voting
        if(block.timestamp > groups[id].staking_deadline){

            //refund the money to each user if time is over
            //create a loop checking through the members list if they have paid refund them
            for(uint i=0; i < groups[id].members.length; i++){
                address curr_member = groups[id].members[i];

                //checks if that member has staked
                if(groups[id].hasStaked[curr_member] == true){

                    uint paid = groups[id].stakes[curr_member];
                    groups[id].totalStaked -= paid; // money gets put into the contract 
                    groups[id].stakesAmount -=1; //amount of people that have staked increases by 1 
                    groups[id].hasStaked[curr_member] = false;
                    uint refund = groups[id].requiredStake;
                    payable(curr_member).transfer(refund);
                    emit RefundIssued(id,curr_member);
                    groups[id].state = Stage.Completed;
                }
            }
        }

            
        
        if(groups[id].hasStaked[msg.sender] == true)
            revert MemberAlreadyPaid();

        //ensures that all people pay there equal share    
        if(msg.value != getBillAmount(id)){
            revert BalanceShareNotMet();
        }
        //stake the money 
        groups[id].stakes[msg.sender] = getBillAmount(id);
        groups[id].totalStaked += msg.value; // money gets put into the contract 
        groups[id].stakesAmount +=1; //amount of people that have staked increases by 1 
        groups[id].hasStaked[msg.sender] = true;

        emit MemberHasStaked(id,msg.sender);
        if(groups[id].stakesAmount == groups[id].members.length){
            stakedComplete(id);
        }
    }

    //create event where every member has staked 
    function stakedComplete(uint256 id) private returns(bool){
        if(groups[id].stakesAmount == groups[id].members.length){
            groups[id].state = Stage.Voting;
            groups[id].voting_start = block.timestamp;
            groups[id].voting_deadline = block.timestamp+30;
            return true;
        }
        return false;
    }

    function hasStakedInGroup(uint256 id, address member) public view returns (bool) {
    return groups[id].hasStaked[member];
    }

    function currentVoteLeader(uint256 id) public view returns (address){
        return groups[id].currentVoteWinner;
    }

    function getVotesPerPerson(uint256 id, address person) public view returns(uint256){
        return groups[id].votesReceived[person];
    }
    
    function hasVotedInGroup(uint256 id, address member) public view returns (bool) {
    return groups[id].hasVoted[member];
    }

    //now members get to vote
    function voting(uint256 id, address vote) payable public {
        require(id > 0 && id <= groupCount, "Unknown group");
        require(groups[id].isMember[msg.sender]);
        require(groups[id].state == Stage.Voting, "Not yet in voting");
        require(msg.sender != vote, "You cannot vote for yourself");

        if(block.timestamp > groups[id].voting_deadline){
            

            //refund the money to each user
            //create a loop checking through the members list if they have paid refund them
            for(uint i=0; i < groups[id].members.length; i++){
                address curr_member = groups[id].members[i];

                //checks if that member has staked
                if(groups[id].hasStaked[curr_member] == true){
                    uint paid = groups[id].stakes[curr_member];
                    groups[id].totalStaked -= paid; // money gets put into the contract 
                    groups[id].stakesAmount -=1; //amount of people that have staked increases by 1 
                    groups[id].hasStaked[curr_member] = false;
                    uint refund = groups[id].requiredStake;
                    payable(curr_member).transfer(refund);
                    emit RefundIssued(id,curr_member);
                    groups[id].state = Stage.Completed;
                }
        }
        }
    
        if(groups[id].hasVoted[msg.sender] == true){
            revert HasVotedAlready();
        }    

        //map your vote to another vote
        groups[id].votes[msg.sender] = vote; 
        groups[id].hasVoted[msg.sender] = true;
        groups[id].votesReceived[vote] ++;
        
        //increment the votting count
        groups[id].votingCount ++;
        
        //check if there is a new vote leader
        if(groups[id].votesReceived[vote] > 
        groups[id].votesReceived[groups[id].currentVoteWinner]){
            groups[id].currentVoteWinner = vote;
        }

        //checks if all members have voted
        if(groups[id].votingCount == groups[id].members.length){
            emit VotingClosed();
            groups[id].state = Stage.Completed;
        }


    }

    //now that all members have their votes mapped tally them up 
    function electDelegate(uint256 id) public payable{
        require(id > 0 && id <= groupCount, "Unknown group");
        if(groups[id].state != Stage.Completed){
            revert ErrorWithVotingProcess();
        }
        //give the money to the winner of the votes
        address winner = groups[id].currentVoteWinner;
        payable(winner).transfer(groups[id].totalStaked);
        //empty out the funds
        groups[id].totalStaked =0;
    }
}