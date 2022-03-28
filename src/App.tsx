import './App.css';
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import {Moralis} from 'moralis';

function App() {

   
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout, chainId } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {

      await authenticate({signingMessage: "Log in to the Website" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user!.get("ethAddress"));
          console.log("chain id: ", chainId);
        })
        .catch(function (error) {
          console.log(error);
        });
        var chain = await Moralis.getChainId();
        console.log(chain !== null ? parseInt(chain) : chain )
    }
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }

  const payBnb = async () => {
    if (!isAuthenticated) {
      login()
    }
    var chain = await Moralis.getChainId();
    var chainId;
    if ( chain!=null)
    {
      chainId = parseInt(chain)
    }
    console.log("null check done ", chainId)
    if (chainId != 56){
      console.log("chainID check done ", chainId)
      alert("Please connect to BNB testnet.")
      return;
    }
    let result = await Moralis.transfer({
      type: "native",
      amount: Moralis.Units.ETH("0.0001"),
      receiver: "0xe93B5C2D3D6516303897cfcB533e152E232C3c26"
    });
    await console.log("executed transfer")
    await console.log(result)
  }

  return (
    <div>
      <h1>Park Sale Live!! </h1><br/>
      <label>Amount: </label>
      <button onClick={login}>Metamask Login</button>
      <button onClick={logOut} disabled={isAuthenticating}>Logout</button>
      <button onClick={payBnb}>Pay</button>
    </div>
  );
}

export default App;
