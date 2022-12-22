console.log(`booting up...`);

const fs = require('fs');
const path = require('path');
const { parse } = require('json2csv');

const getUserInfo = (user) => {
    const userInfo = user.split('@');
    const username = userInfo[1];
    const userDomain = userInfo[0].replace('https://','').replace(/\/+$/, '');
    const acct = `@${username}@${userDomain}`;
    return {user, userInfo, username, userDomain, acct};
}

const sortByIntKey = (array, key) => {
    return array.sort((a, b) => {
        if (a[key] > b[key]) { return -1; }
        if (a[key] < b[key]) { return 1; }
        return 0;
    });
}

const dir = fs.opendirSync('../data/')
let accounts = [], dirent;

while ((dirent = dir.readSync()) !== null) {
  const fileName = `../data/${dirent.name}`;
  if (path.extname(fileName) === '.json'){
    const dataFile = fs.readFileSync(fileName);
    const data = JSON.parse(dataFile);
    const info = {
      username: data.username,
      bot: data.bot,
      created_at: data.created_at,
      followers_count: parseInt(data.followers_count),
      created_at: data.created_at,
      last_status_at: data.last_status_at,
    };
    accounts.push(info);
    // console.log(info);
    // console.log(data);
  }
}

dir.closeSync();

accounts = sortByIntKey(accounts, 'followers_count');
const topFollowedAccounts = accounts.filter(acc => acc.bot);
console.log(topFollowedAccounts);

const fields = Object.keys(topFollowedAccounts[0]);

try {
  const topFollowedAccountsCSV = parse(topFollowedAccounts, { fields });
  console.log(topFollowedAccountsCSV);
  fs.writeFile(`../analysis/analysis.csv`, topFollowedAccountsCSV, (err) => {
  });
} catch (err) {
  console.error(err);
}
