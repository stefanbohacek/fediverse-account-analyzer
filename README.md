# Fediverse Account Analyzer

A collection of scripts for analyzing accounts on specific fediverse instances. Currently only Mastodon has been tested.

## Usage

1. Install dependencies with `npm install`.
2. Create a Mastodon app. ([See how.](https://botwiki.org/resource/tutorial/how-to-make-a-mastodon-botsin-space-app-bot/))
3. Rename `.env-example` to `.env` and add your `MASTODON_ACCESS_TOKEN` and update the value for `MASTODON_API_URL`.
4. Add your list of usernames inside `usernames.json` as a JSON-formatted array of URLs.

```json
[
    "https://INSTANCE.NAME/@account1",
    "https://INSTANCE.NAME/@account2",
    "https://INSTANCE.NAME/@account3"
]
```

5. Run `node download.js` inside `scripts` to download the account information into the `data` folder.
6. Update the `analyze.js` script in the same folder and run it with `node analyze.js` to analyze your data and export the CSV files. 

## Resources

- https://docs.joinmastodon.org/methods/accounts/#lookup
- https://docs.joinmastodon.org/methods/accounts/#get
