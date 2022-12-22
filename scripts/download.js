console.log(`booting up...`);

require('dotenv').config();
const fs = require('fs');
const Masto = require('mastodon');
 
const M = new Masto({
  access_token: process.env.MASTODON_ACCESS_TOKEN,
  api_url: process.env.MASTODON_API_URL
});

const getUserInfo = (user) => {
    const userInfo = user.split('@');
    const username = userInfo[1];
    const userDomain = userInfo[0].replace('https://','').replace(/\/+$/, '');
    const acct = `@${username}@${userDomain}`;
    return {user, userInfo, username, userDomain, acct};
}

const userList = fs.readFileSync('../usernames.json');
const users = JSON.parse(userList);

const newUsers = users.filter((user) => {
    const userInfo = getUserInfo(user);
    return !fs.existsSync(`../data/${userInfo.username}.json`);
});

console.log(`found ${users.length.toLocaleString('en-US')} username${users.length > 1 ? 's' : ''}`);

if (newUsers.length === 0){
    console.log(`no new usernames found`);
} else {
    console.log(`processing ${newUsers.length.toLocaleString('en-US')} username${newUsers.length > 1 ? 's' : ''}`);

    const process = setInterval(() => {
        if (newUsers.length === 0){
            clearInterval(process);
            console.log(`finished`);
        } else {
            const user = newUsers.shift();
            const {username, userDomain, acct} = getUserInfo(user);
        
            if (!fs.existsSync(`../data/${username}`)){
                console.log(`processing ${acct}...`);
            
                M.get('accounts/lookup', {
                    acct,
                    skip_webfinger: false
                }).then(resp => {
                    // console.log(resp.data);
                    const data = JSON.stringify(resp.data, null, 2);
                    fs.writeFile(`../data/${username}.json`, data, (err) => {
        
                        
                    });
                });
            }
        }
    }, 2000);
}
