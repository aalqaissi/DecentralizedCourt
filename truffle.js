module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
	  from: '0x015bb7051E59239E989bb9BD9019B4aF3f42FE75',
      network_id: 5777, // Match any network id
      gasPrice: 1,   // <--- Twice as much
      gas: 99999999   // <--- Twice as much
    }
  }
};
