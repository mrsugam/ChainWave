import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import UserProfileABI from './build/contracts/UserProfile.json';
import ContentManagementABI from './build/contracts/ContentManagement.json';
import TipRewardABI from './build/contracts/TipReward.json';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

const userProfileAddress = '0xYourUserProfileContractAddress';
const contentManagementAddress = '0xYourContentManagementContractAddress';
const tipRewardAddress = '0xYourTipRewardContractAddress';

const UserProfile = new web3.eth.Contract(UserProfileABI.abi, userProfileAddress);
const ContentManagement = new web3.eth.Contract(ContentManagementABI.abi, contentManagementAddress);
const TipReward = new web3.eth.Contract(TipRewardABI.abi, tipRewardAddress);

function App() {
  const [account, setAccount] = useState('');
  const [profile, setProfile] = useState({ username: '', avatar: '', bio: '' });
  const [uri, setUri] = useState('');

  useEffect(() => {
    const loadWeb3 = async () => {
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
    };
    loadWeb3();
  }, []);

  const createProfile = async (username, avatar, bio) => {
    await UserProfile.methods.createProfile(username, avatar, bio).send({ from: account });
    loadProfile();
  };

  const loadProfile = async () => {
    const userProfile = await UserProfile.methods.getProfile(account).call();
    setProfile(userProfile);
  };

  const createContent = async () => {
    await ContentManagement.methods.createContent(uri).send({ from: account });
    setUri('');
  };

  const tipUser = async (to, amount) => {
    await TipReward.methods.tip(to).send({ from: account, value: web3.utils.toWei(amount, 'ether') });
  };

  return (
    <div className="App">
      <h1>ChainWave</h1>
      <div>
        <h2>Create Profile</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          createProfile(e.target.username.value, e.target.avatar.value, e.target.bio.value);
        }}>
          <input type="text" name="username" placeholder="Username" required />
          <input type="text" name="avatar" placeholder="Avatar URL" required />
          <textarea name="bio" placeholder="Bio" required />
          <button type="submit">Create Profile</button>
        </form>
      </div>

      <div>
        <h2>Profile</h2>
        <p>Username: {profile.username}</p>
        <p>Avatar: <img src={profile.avatar} alt="avatar" width="50" /></p>
        <p>Bio: {profile.bio}</p>
      </div>

      <div>
        <h2>Create Content</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          createContent();
        }}>
          <input type="text" value={uri} onChange={(e) => setUri(e.target.value)} placeholder="Content URI" required />
          <button type="submit">Create Content</button>
        </form>
      </div>

      <div>
        <h2>Tip User</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          tipUser(e.target.to.value, e.target.amount.value);
        }}>
          <input type="text" name="to" placeholder="Recipient Address" required />
          <input type="text" name="amount" placeholder="Amount in ETH" required />
          <button type="submit">Tip</button>
        </form>
      </div>
    </div>
  );
}

export default App;
