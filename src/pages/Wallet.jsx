import React, { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { VscPercentage } from "react-icons/vsc";
import "../pages/Wallet.css";
import Rectangle4221 from "../assets/Rectangle4221.png";
import Rectangle4219 from "../assets/Rectangle4219.png";
import group18265 from "../assets/Group18265.png";
import group18266 from "../assets/Group18266.png";
import { MdOutlineFileDownload } from "react-icons/md";

const Wallet = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('All');
    const tabs = ['All', 'Loaded Funds', 'Referral Earnings', 'Withdraws'];

    // Simulated transactions (empty initially)
    const transactions = [];
    
    const totalCredit = transactions.length > 0
        ? transactions.filter(transaction => transaction.type === "Credit")
            .reduce((sum, transaction) => sum + transaction.amount, 0)
        : 0;

    const filteredTransactions = activeTab === 'All'
        ? transactions
        : transactions.filter(transaction => {
            if (activeTab === 'Referral Earnings') {
                return transaction.description.includes('Transfer from referral');
            } else if (activeTab === 'Withdraws') {
                return transaction.description.includes('Withdraw');
            } else if (activeTab === 'Loaded Funds') {
                return transaction.description.includes('Loaded Funds');
            }
            return false;
        });

    return (
        <div className="Walletcontainer">
            <div className="Walletdetails">
                <h2 className="Wallet100">Wallet</h2>
            </div>

            <div className="image-container-wallet">
                <div className="wallet-image" style={{ backgroundImage: `url(${Rectangle4219})` }}>
                    <div className="wallet-content">
                        <div className="wallet-image2" style={{ backgroundImage: `url(${Rectangle4221})` }}>
                            <div className="wallet-content2">
                                <p className="wallet-balance1">Balance</p>
                                <p className="wallet-amount1">₦{totalCredit.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="wallet509">
                            <div className="wallet-content3">
                                <div className="wallet-image3" style={{ backgroundImage: `url(${group18266})` }}>
                                    <p className="top">Top Up</p>
                                </div>
                            </div>
                            <div className="wallet-content1">
                                <div className="wallet-image3" style={{ backgroundImage: `url(${group18265})` }}>
                                    <p className="withdraw">Withdraw</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="transaction-header">
                <span className="title">Transaction History</span>
                <a href="#" className="see-all" onClick={() => setActiveTab('All')}>See all</a>
            </div>

            <div className="wallet-container1">
                <div className="wallet-header">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`wallet-tab ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {filteredTransactions.length > 0 ? (
                <div className="transactions-list">
                    {filteredTransactions.map(transaction => (
                        <div key={transaction.id} className="transaction-item">
                            <p className="transaction-reference">{transaction.reference}</p>
                            <p className={`transaction-amount ${transaction.type.toLowerCase()}`}
                                style={{ display: 'flex', alignItems: 'center' }}>
                                <span className="transaction-arrow" style={{
                                    background: activeTab === "Referral Earnings" ? 'gold' : (transaction.amount < 0 ? '#FF2A23' : '#6CC51D'),
                                    color: '#000',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '8px'
                                }}>
                                    {transaction.amount < 0 ? <FaArrowUp style={{ fontSize: '14px' }} /> :
                                        activeTab === "Referral Earnings" ? <VscPercentage style={{ fontSize: '14px' }} /> :
                                            <FaArrowDown style={{ fontSize: '14px' }} />}
                                </span>
                                ₦{Math.abs(transaction.amount).toLocaleString()}
                            </p>
                            <p className="transaction-description">{transaction.description} on {transaction.date} || {transaction.time}</p>
                            <span className={`transaction-type ${transaction.type.toLowerCase()}`}>{transaction.type}</span>
                            <button className="transaction-download"><MdOutlineFileDownload className="Mdoutlinefiledownload" /> Download</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-transactions">No transactions yet.</p>
            )}
        </div>
    );
};

export default Wallet;
