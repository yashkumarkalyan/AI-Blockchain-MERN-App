import "./tip.css"

import React, { useState } from 'react';
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

export function TransferForm({popUp,toAccount}) {
    
    
//   const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [showPopup, setShowPopup] = useState(popUp);
  

  async function handleSubmit(event) {
    event.preventDefault();
    const accounts = await window.ethereum.enable();
    const fromAddress = accounts[0];
    const value = web3.utils.toWei(amount, 'ether');

    try {
      const tx = await web3.eth.sendTransaction({ from: fromAddress, to: toAccount, value: value });
      console.log(tx.transactionHash);
    } catch (error) {
      alert(error);
    }
  }

  

  return (
    <div>
      {/* <button onClick={() => setShowPopup(true)}>Transfer</button>
      <button onClick={handleAddWallet}>Add Wallet</button> */}
      {showPopup && (
        <div>
          <div className="overlay" />
          <div className="popup">
            <form onSubmit={handleSubmit}>
              {/* <label>
                To Address:
                <input type="text" value={toAddress} onChange={event => setToAddress(event.target.value)} />
              </label>
              <br /> */}
              <label>
                Amount:
                <input type="text" value={amount} onChange={event => setAmount(event.target.value)} />
              </label>
              <br />
              <div className="popupButtons">

              <button type="submit">Transfer</button>
              <button onClick={()=>setShowPopup(false)}>Cancel</button>
              
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransferForm;
