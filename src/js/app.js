App = {
  web3Provider: null,
  contracts: {},
  contractInstance: null,
  msg: $('.msg'),




  init: function () {
    App.bindEvents();
    return App.initWeb3();
  },

  setMessage: function (text) {
    App.msg.show();
    App.msg.text(text);
    setTimeout(() => {
      App.msg.hide();
    }, 3000);
  },


  bindEvents: function () {
    $('.create').click(App.create);
    $('.get-case').click(App.getCase);
    $('.get-amount').click(App.getAmount);
    $('.pay-amount').click(App.payAmount);
    $('.clear-reset').click(App.clearOrReset);
    // $('.is-exist').click(App.exists);
    // $('.owner-by-id').click(App.ownerOf);
    // $('.transfer-btn').click(App.transferFrom);
    // $('.safe-transfer-btn').click(App.safeTransferFrom);
    // $('.total-count').click(App.totalSupply);
  },

  /**
   * set the HTTP Provider for the web3 to 
   * use the same network that you deployed your contract to
   */
  initWeb3: function () {
    if (typeof web3 !== 'undefined') {
      　App.web3Provider = web3.currentProvider;
      } else { 
        App.web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
    }
    web3 = new Web3(App.web3Provider); 
    return App.initContract();   
  },



  /**
   * use truffle to instantiate the contract
   * save the contract in contract object up ^
   */
  initContract: function () {
    $.getJSON('ERC721Token.json', function (data) {
      　const artifacts = TruffleContract(data);
      　App.contracts.land = artifacts.setProvider(App.web3Provider);   
        artifacts.deployed().then(function(instance) {
          App.contractInstance = instance;
          console.log(App.contractInstance);
        });
    });
  },


  /**
   * after instantiating the contract you need to save the deployed instance in contractInstance up^
   * when you get the deployed instance you can interact with the contract by calling the methods via the contract instance.
   */
  
  createContractInstance: function () {
    return App.contractInstance;
  },



  // call the method create that is located in the smart contract and show msg to the final user;
  create: function () {
    const desc = $('#case-desc1').val();
    const evidence = $('#case-evidence1').val();
    const address = $('#case-address1').val();
    const period = $('#case-period1').val();
    var status = $("input[name='case-status1']");
    for (var i = 0, length = status.length; i < length; i++) {
      if (status[i].checked) {
        break;
      }
    }

    let CasesCount;
    CasesCount = period;

    $.getJSON('cases.json', (data) => {
      $('.cases').html('');
      for (let i = 0; i < CasesCount; i++) {
        let _case = data[i];
        let li = document.createElement('li');
        let caseDesc = document.createElement('h2');
        let criminalAdd = document.createElement('h4');
        let jailPeriod = document.createElement('h4');
        let caseStat = document.createElement('h5');
        caseDesc.innerText = _case.caseDesc;
        criminalAdd.innerText = "Criminal Address: " + _case.criminalAdd;
        jailPeriod.innerText = "Jail Period: " + _case.jailPeriod + " Day(s)";
        caseStat.innerText = "Case Status: " + _case.caseStat;
        li.appendChild(caseDesc);
        li.appendChild(criminalAdd);
        li.appendChild(jailPeriod);
        li.appendChild(caseStat);
        li.classList.add('card');
        $('.cases').append(li);
      }
    });  

  },

  // call the method retreive that is located in the smart contract and show msg to the final user;
  getCase: function () {
    const address = $('#case-address2').val();
    App.setMessage(address);
    // replace me :)
  },

  // call the method retreive that is located in the smart contract and show msg to the final user;
  getAmount: function () {
    const id = $('#case-id3').val();
    App.setMessage(id);
    // replace me :)
  },

  // call the method retreive that is located in the smart contract and show msg to the final user;
  payAmount: function () {
    const id = $('#case-id4').val();
    App.setMessage(id);
    // replace me :)
  },

  // call the method retreive that is located in the smart contract and show msg to the final user;
  clearOrReset: function () {
    const id = $('#case-id5').val();
    var status = $("input[name='case-status5']");
    App.setMessage(id);
    for (var i = 0, length = status.length; i < length; i++) {
      if (status[i].checked) {
        App.setMessage(status[i].value);
        break;
      }
    }
    // replace me :)
  },


  // call the setApprovalForAll method that is located in the smart contract and show msg to the final user;
  setApprovalForAll: function () {
    const key = $('#approve-all-key').val();
    // replace me :)
  },


  // call the getApproved method that is located in the in smart contract and show msg to the user
  getApproved: function () {
    const id = $('#is-approved-id').val();
    // replace me :)
  },


  // call isApprovedForAll method and show result msg to the final user
  isApprovedForAll: function () {
    const first = $('#is-approved-all-first').val();
    const second = $('#is-approved-all-second').val();
    // replace me :)
  },


  // call balanceOf method and show the balance as message to the final user
  balanceOf: function () {
    const key = $('#balance-key').val();
    // replace me :)
  },


  // call exists method that is located in the smart contract and show message to the final user
  exists: function () {
    const id = $('#exist-id').val();
    // replace me :)
  },


  // call ownerOf method and show message to the final user
  ownerOf: function () {
    const id = $('#owner-id').val();
    // replace me :)
  },


  // call transferFrom method that is located in the smart contract and show message to the final user
  transferFrom: function () {
    const from = $('#transfer-from').val();
    const to = $('#transfer-to').val();
    const id = $('#transfer-id').val();
    // replace me :)
  },

  // call safeTransferFrom method that is located in the smart contract and show message to the final user
  safeTransferFrom: function () {
    const from = $('#safe-transfer-from').val();
    const to = $('#safe-transfer-to').val();
    const id = $('#safe-transfer-id').val();
    // replace me :)
  },

  // call totalSupply method in the smart contract instance and show the result as message to the final user
  totalSupply: function () {
    console.log(App.createContractInstance());
    App.setMessage('Test Test');
    //App.setMessage(App.createContractInstance().totalSupply);
  },

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});