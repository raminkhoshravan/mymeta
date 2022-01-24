const networksmetamask = {
    tBNB: {
        chainId: `0x${Number(97).toString(16)}`,
        chainName: "Binance Smart Chain Testnet",
        nativeCurrency: {
            name: "tBNB",
            symbol: "tBNB",
            decimals: 18
        },
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
        blockExplorerUrls: ["https://testnet.bscscan.com"]
    },
    BNB: {
        chainId: `0x${Number(56).toString(16)}`,
        chainName: "Binance Smart Chain Mainnet",
        nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18
        },
        rpcUrls: [
            "https://bsc-dataseed1.binance.org",

        ],
        blockExplorerUrls: ["https://bscscan.com"]
    }
};
exports.changeNetworkMetamask = async ({ networkName, setError, callback }) => {
    try {
        if (!window.ethereum) throw new Error("No crypto wallet found");
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    ...networksmetamask[networkName]
                }
            ]
        });
        callback()
    } catch (err) {
        // setError(err.message);
    }
};

exports.StartPayment = async ({ setError, setTxs, Datas, ethers, handleSubmit2, update_tx, account }) => {
    try {
        if (!window.ethereum)
            throw new Error("No crypto wallet found. Please install it.");
        //   await window.ethereum.send("eth_requestAccounts");
        //   const provider = new ethers.providers.Web3Provider(window.ethereum);
        //   const signer = provider.getSigner();
        ethers.utils.getAddress(Datas.to);
        // alert(JSON.stringify(ethers.utils.parseEther(2)))
        // alert(JSON.stringify(Datas))
        // alert(JSON.stringify({
        //     from: account,
        //     to: Datas.to,
        //     value: `${ethers.utils.parseEther(Datas.value.toString())._hex}`,
        //     chain: Datas.chain,
        //     nonce: Datas.nonce,
        //     gas: `${Datas.gas}`,
        // gasPrice: `${Datas.gasPrice}`.toString(16),
        //    gasPrice: "",
        // gas: "",
        // }))
        window.ethereum
            .request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: account,
                        to: Datas.to,
                        value: `${ethers.utils.parseEther(Datas.value.toString())._hex}`,
                        chain: Datas.chain,
                        nonce: Datas.nonce,
                        gas: `${Datas.gas}`,
                        gasPrice: `${Datas.gasPrice}`.toString(16),
                        //    gasPrice: "",
                        // gas: "",
                    },
                    // {
                    //   from: account,
                    //   to: addr,
                    //   value: ethers.utils.parseEther(ether)._hex,
                    //   gasPrice: "",
                    //   gas: "",
                    // },
                ],
            })
            .then(async (txHash) => {
                await handleSubmit2({ setError });
                update_tx({ txHash, id: Datas.id })
                console.log(txHash);
            })
            .catch((error) => console.error);
    } catch (err) {
        setError(err.message);
    }
};
// exports.getRandomColor = () => {
//     return allColors[Math.floor(Math.random() * allColors.length)];
// }

// exports.allColors = allColors;