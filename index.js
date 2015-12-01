var express = require('express');
var bodyParser = require('body-parser');
var chain = require('chain-node');
var path = require('path');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

var c = new chain.Client({
	url: "https://fidelity-api.chain.com",
	tokenID: "at072R1XZKG09RC",
	tokenSecret: "c66c083cb6607ee18ffa7a01c9b48212"
});

  c.keyStore.add(new chain.Xprv(
	req.body.xprv,
	true
  ));

app.get('/fetch_transactions', function (req, res) {
  c.listAccountActivity('acc076VQP2FG082W', function(err, resp){
	res.send(resp);
	});
	
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname + '/intro.html'));
});

app.post('/embed', function(req, res) {
  c.keyStore.add(new chain.Xprv(
	req.body.xprv,
	true
  ));
  c.createAsset(req.body.id, req.body.text , function(err, resp){
	//console.log(resp['id']);
	//console.log(resp['issuer_node_id']);
	//console.log(resp['label']);
	
	c.issue(
	  resp['id'],
	  [
		{
		  account_id: "acc076VQP2FG082W",
		  amount: 1
		}
	  ],
	  function(err, resp){
		res.send(resp); 
		}
	)
	
})
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server Started %s:%s', host, port);
});

// Creating a brand new asset

c.createAsset('in072ERNKPG09QY', 'Test Sample 6', function(err, resp){
	//console.log(resp['id']);
	//console.log(resp['issuer_node_id']);
	//console.log(resp['label']);
	
	c.issue(
	  resp['id'],
	  [
		{
		  account_id: "acc077DMNP4G085G",
		  amount: 1
		}
	  ],
	  function(err, resp){
		console.log(resp);  
		}
	)
	
})



/*
c.listAccountActivity('acc072S3PCHG09RM', function(err, resp){
	console.log(resp['activities']);
});
*/
//c.listAccountActivity("acc072S3PCHG09RM");

// Listing the created assets
/*
c.listAssets('in072ERNKPG09QY', function(err, resp){
	console.log(resp);
})
*/

// Issuing the created assets to various account ids or addresses
/*c.issue(
  "24d8079f1a09ead77c436abcf964a11df4ef1372fe7f34db4ff3a7f76759cfc1",
  [
    {
      account_id: "acc072S3PCHG09RM",
      amount: 1000
    }
  ],
  function(err, resp){
	console.log(resp);  
	}
)*/

// List of transactions that took place in the issuer node
/*
c.listIssuerNodeActivity('in072ERNKPG09QY', function(err, resp){
	console.log(resp);
});
*/

// List of accounts in the manager node
/*
c.listAccounts("mn072S2N5T009RG", function(err, resp){
	console.log(resp);
});
*/

// Creating a transaction
/*
var tx = {
  inputs: [
    {
     account_id: 'acc072S3PCHG09RM',
     asset_id: '24d8079f1a09ead77c436abcf964a11df4ef1372fe7f34db4ff3a7f76759cfc1',
     amount: 250
    }
  ],
  outputs: [
    {
      account_id: 'acc072SWSFP009RT',
      asset_id: '24d8079f1a09ead77c436abcf964a11df4ef1372fe7f34db4ff3a7f76759cfc1',
      amount: 250
    }
  ]
}

c.buildTransaction(tx, function(err, resp){
 //console.log(resp);
	 try{
		c.signTransaction(tx);
	 }catch(err){
		console.log("Error Occurred!");
	 }
	c.submitTransaction(tx, function(err, result) {
	   console.log(resp);
	})
});
*/

// Listing balances: Manager Node
/*
c.listManagerNodeBalances('mn072S2N5T009RG', function(err, resp){
	console.log(resp);
});
*/
	
// Listing account balances
/*
c.listAccountBalances('acc072S3PCHG09RM', function(err, resp){
	console.log(resp);
});
*/

// Manager Node: xprv9s21ZrQH143K277a4HQMooHvV2BPFfHMgbcKXC9uTtKsYNtBPvdUaMutMKdQ71M7JGzsAbtFTKpabMwfjqcdFrxYonEhh8FUui8LakPS4Rd