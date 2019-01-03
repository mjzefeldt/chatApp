// bad words based on https://simple.wikipedia.org/wiki/Profanity
const badWordsCollection = [
    'ass',
    'asshole',
    'bastard',
    'bitch',
    'cock',
    'cunt',
    'pussy',
    'fuck',
    'shit'
];

// returns true if should censor message as it includes bad words
const badWords = function (message) {
    return message
    .toLowerCase()
    .split(' ')
    .reduce((acc, cur) => {
        if (badWordsCollection.includes(cur)) acc = true;
        return acc;
    }, false);
}


module.exports = {
    badWords
};
