import React, { useState } from "react";
import { ethers } from "ethers";
import styled from "styled-components";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function MaskMeta() {
    // usetstate for storing and retrieving wallet details
    const [data, setdata] = useState({
        address: "",
        Balance: null,
    });

    // Button handler button for handling a
    // request event for metamask
    const btnhandler = () => {
        // Asking if metamask is already present or not
        if (window.ethereum) {
            // res[0] for fetching a first wallet
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) =>
                    accountChangeHandler(res[0])
                );
        } else {
            alert("install metamask extension!!");
        }
    };

    // getbalance function for getting a balance in
    // a right format with help of ethers
    const getbalance = (address) => {
        // Requesting balance method
        window.ethereum
            .request({
                method: "eth_getBalance",
                params: [address, "latest"],
            })
            .then((balance) => {
                // Setting balance
                setdata({
                    Balance:
                        ethers.utils.formatEther(balance),
                });
            });
    };

    // Function for getting handling all events
    const accountChangeHandler = (account) => {
        // Setting an address data
        setdata({
            address: account,
        });

        // Setting a balance
        getbalance(account);
    };

    return (
        <div className="MaskMeta">
            
            <ButtonContainer
                        onClick={btnhandler}
                        variant="primary"
                    >
                        Connect to wallet
            </ButtonContainer>
        </div>
    );
}
const ButtonContainer = styled.button`
  color: #cf89ff;
  font-family: sans-serif;
  font-weight: 600;
  background:black;
  text-decoration: none;
   &:hover {
    color: white;
  }
border: none;
background: none;
cursor: pointer;

`

export default MaskMeta;