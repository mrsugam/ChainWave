const express = require('express');
const app = express();
const Web3 = require('web3');
const UserProfileABI = require('./build/contracts/UserProfile.json').abi;
const ContentManagementABI = require('./build/contracts/ContentManagement.json').abi;
const TipRewardABI = require('./build/contracts/TipReward.json').abi;

const web3 = new Web3(new Web3.providers.HttpProvider('https://base-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'));

const userProfileAddress = '0xYourUserProfileContractAddress';
const contentManagementAddress = '0xYourContentManagementContractAddress';
const tipRewardAddress = '0xYourTipRewardContractAddress';

const UserProfile = new web3.eth.Contract(UserProfileABI, userProfileAddress);
const ContentManagement = new web3.eth.Contract(ContentManagementABI, contentManagementAddress);
const TipReward = new web3.eth.Contract(TipRewardABI, tipRewardAddress);

app.use(express.json());

// Example endpoint to get user profile
app.get('/profile/:address', async (req, res) => {
    try {
        const profile = await UserProfile.methods.getProfile(req.params.address).call();
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Example endpoint to create content
app.post('/content', async (req, res) => {
    const { uri, address } = req.body;
    try {
        const receipt = await ContentManagement.methods.createContent(uri).send({ from: address });
        res.json(receipt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Example endpoint to tip a user
app.post('/tip', async (req, res) => {
    const { to, amount, from } = req.body;
    try {
        const receipt = await TipReward.methods.tip(to).send({ from: from, value: web3.utils.toWei(amount, 'ether') });
        res.json(receipt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
