# BackDropChallenge
To setup
`npm install`
`node index`
To tes
`npm test`

# Assumptions
1. Database contains some User Data already.
2. A JSON file was created to act as the database
3. Tests are to run while the server is running.
4. .env Variables are to be populated before running server.
5. npm packages also to be installed.

# Levenshtein Distance(LD) VS Damerau–Levenshtein Distance(DLD)
The significant difference between LD and DLD is DLD allows transposition(swapping positions). Based on our scenario, Although DLD can prove to be faster if one swapping operation is needed, this adds another layer of unneeded complexity. Also , People are less likely to mistakenly change the position of two characters in their name or when copying a name.  Using “enoch” and “enohc” as an example, LD will use 2 operations and DLD will use 1.But for “eonhc” LD will use 3 and DLD will use 2, but such a mistake happening will have to be deliberate. Hence the easier to implement LD will suffice.
