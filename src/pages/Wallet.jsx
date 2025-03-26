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
        <div className="Walletcontainer1">
            <div className="Walletdetails1">
                <h3 className="wallet1000">WALLET</h3>
            </div>

            <div className="image-container-wallet1">
                <div className="wallet-image1" style={{ backgroundImage: `url(${Rectangle4219})` }}>
                    <div className="wallet-content1">
                        <div className="wallet-image21" style={{ backgroundImage: `url(${Rectangle4221})` }}>
                            <div className="wallet-content21">
                                <p className="wallet-balance110">Balance</p>
                                <p className="wallet-amount11">₦{totalCredit.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="wallet5091">
                            <div className="wallet-content31">
                                <div className="wallet-image31" style={{ backgroundImage: `url(${group18266})` }}>
                                    <p className="top1">Top Up</p>
                                </div>
                            </div>
                            <div className="wallet-content11">
                                <div className="wallet-image31" style={{ backgroundImage: `url(${group18265})` }}>
                                    <p className="withdraw1">Withdraw</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="transaction-header109">
                <span className="title109">Transaction History</span>
                <a href="#" className="see-all109" onClick={() => setActiveTab('All')}>See all</a>
            </div>

            <div className="wallet-container1109">
                <div className="wallet-header109">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`wallet-tab109 ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {filteredTransactions.length > 0 ? (
                <div className="transactions-list109">
                    {filteredTransactions.map(transaction => (
                        <div key={transaction.id} className="transaction-item109">
                            <p className="transaction-reference109">{transaction.reference}</p>
                            <p className={`transaction-amount109 ${transaction.type.toLowerCase()}`}
                                style={{ display: 'flex', alignItems: 'center' }}>
                                <span className="transaction-arrow109" style={{
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
                            <p className="transaction-description109">{transaction.description} on {transaction.date} || {transaction.time}</p>
                            <span className={`transaction-type109 ${transaction.type.toLowerCase()}`}>{transaction.type}</span>
                            <button className="transaction-download109"><MdOutlineFileDownload className="Mdoutlinefiledownload109" /> Download</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-transactions109">No transactions yet.</p>
            )}
        </div>
    );
};

export default Wallet;
