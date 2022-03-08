import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from "./redux/blockchain/blockchainActions"
import { fetchData } from './redux/data/dataActions'
import * as s from './styles/globalStyles'
import MinRenderer from "./components/minRenderer"
import _color from './assets/images/bg/_color.png'


function App() {
  const dispatch = useDispatch();
  //store.js의 blockchain
  const blockchain = useSelector((state => state.blockchain));
  const data = useSelector((state => state.data));
  const [loading, setLoading] = useState(false);

  console.log(data);

  const mintNFT = (_account, _name) => {
    setLoading(true);
    blockchain.minToken.methods
      .createRandomMin(_name)
      .send({ from: _account, value: blockchain.web3.utils.toWei('0.01', 'ether') })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
      .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
      })
  }

  const levelUpMin = (_account, _id) => {
    setLoading(true);
    blockchain.minToken.methods
      .levelUp(_id)
      .send({ from: _account })
      .once("error", (err) => {
        setLoading(false);
        console.log(err);
      })
      .then((receipt) => {
        setLoading(false);
        console.log(receipt);
        dispatch(fetchData(blockchain.account));
      })
  }

  useEffect(() => {
    if (blockchain.account != "" && blockchain.minToken != null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.minToken])

  return (
    <s.Screen image={_color}>
      {blockchain.account === "" || blockchain.minToken === null ?
        (<s.Container flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle>Connect to the Game</s.TextTitle>
          <s.SpacerSmall />
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(connect());
            }}>CONNECT</button>
          <s.SpacerXSmall />
          {blockchain.errorMsg != "" ? <s.TextDescription>{blockchain.errorMsg}</s.TextDescription> : null}
        </s.Container>)
        :
        (<s.Container ai={"center"} style={{ padding: "24px" }}>
          <s.TextTitle>Welcome to the Game</s.TextTitle>
          <s.SpacerSmall />
          <button
            disabled={loading ? 1 : 0}
            onClick={(e) => {
              e.preventDefault();
              mintNFT(blockchain.account, "BLACKSTONE");
            }}>CREATE NFT MIN</button>
          <s.SpacerMedium />
          <s.Container jc={"center"} fd={"row"} style={{ flexWrap: "wrap" }}>
            {data.allMins.map((item, index) => {
              return (
                <s.Container key={index} style={{ padding: '15px' }}>
                  <MinRenderer min={item} />
                  <s.SpacerXSmall />
                  <s.Container>
                    <s.TextDescription>ID: {item.id}</s.TextDescription>
                    <s.TextDescription>DNA: {item.dna}</s.TextDescription>
                    <s.TextDescription>LEVEL: {item.level}</s.TextDescription>
                    <s.TextDescription>NAME: {item.name}</s.TextDescription>
                    <s.TextDescription>RARITY: {item.rarity}</s.TextDescription>
                    <s.SpacerXSmall />
                    <button
                      disabled={loading ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        levelUpMin(blockchain.account, item.id);
                      }}>LEVEL UP</button>
                  </s.Container>

                </s.Container>
              );
            })}
          </s.Container>
        </s.Container>)}
    </s.Screen>
  );
}

export default App;
