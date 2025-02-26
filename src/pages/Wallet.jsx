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

    const transactions = [
        { id: 1, reference: "19GUX94836X", amount: 1000.00, description: "Transfer from referral PAYSTACK", date: "16-01-2024", time: "4:30pm", type: "Credit" },
        { id: 2, reference: "19GUFFI84H5", amount: 20000.00, description: "Loaded Funds from CANARY BLACK", date: "12-01-2024", time: "2:45pm", type: "Credit" },
        { id: 3, reference: "19GGJGJ7F49", amount: -10000.00, description: "Withdraw to BOND INYANG", date: "12-01-2024", time: "4:30pm", type: "Debit" },
        { id: 4, reference: "19GGJOSBR01", amount: 17000.00, description: "Loaded Funds from CANARY BLACK", date: "12-01-2024", time: "3:30pm", type: "Credit" },
        { id: 5, reference: "19GAJF90BF4", amount: 10000.00, description: "Transfer from referral FEMI BANJO", date: "11-01-2024", time: "4:30pm", type: "Credit" },
        { id: 6, reference: "19GGJKNDKJF", amount: -2500.00, description: "Withdraw to STANLEY UMOH", date: "11-01-2024", time: "2:30pm", type: "Debit" }
    ];

    const totalCredit = transactions
        .filter(transaction => transaction.type === "Credit")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const filteredTransactions = activeTab === 'All'
        ? transactions.filter(transaction =>
            transaction.description.includes('Transfer from referral') ||
            transaction.description.includes('Withdraw') ||
            transaction.description.includes('Loaded Funds')
        )
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
                <a href="#" className="see-all">See all</a>
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
        </div>
    );
};

export default Wallet;
