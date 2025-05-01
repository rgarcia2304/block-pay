
export const CONTRACT_ADDRESS = "0x615714898AF4bfF982E7f6074D6A7c91BA1509b8";
export const CONTRACT_ABI = 

	[
        {
            "inputs": [],
            "name": "BalanceShareNotMet",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "CannotVoteForSelf",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "billAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "members",
                    "type": "address[]"
                }
            ],
            "name": "createGroup",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "electDelegate",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ErrorWithVotingProcess",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "HasVotedAlready",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "individualStake",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "MemberAlreadyPaid",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "StakingNotComplete",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "TimeExpired",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "GroupCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "payer",
                    "type": "address"
                }
            ],
            "name": "MemberHasStaked",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "member",
                    "type": "address"
                }
            ],
            "name": "RefundIssued",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "vote",
                    "type": "address"
                }
            ],
            "name": "voting",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [],
            "name": "VotingClosed",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "currentVoteLeader",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getBillAmount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getGroupInfo",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "billAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "requiredStake",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "staking_start",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "staking_deadline",
                    "type": "uint256"
                },
                {
                    "internalType": "enum App.Stage",
                    "name": "state",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "stakesAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "totalStaked",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "members",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getGroupSize",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getStage",
            "outputs": [
                {
                    "internalType": "enum App.Stage",
                    "name": "state",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "person",
                    "type": "address"
                }
            ],
            "name": "getVotesPerPerson",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "groupCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
