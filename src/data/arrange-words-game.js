// wordbox.js
const sentences = [
    {
        id: 1,
        gameLanguage: 'French',
        hintSentence: 'Het gaat goed, dank je!',
        wrongOrder: ['vais', 'je', 'bien', 'merci'],
        correctOrder: ['Je,', 'vais', 'bien', 'merci'],
    },
    {
        id: 2,
        gameLanguage: 'French',
        hintSentence: 'Hallo, ik ben Louisa',
        wrongOrder: ['suis', 'bonjour', 'Louisa', 'je'],
        correctOrder: ['bonjour,', 'je', 'suis', 'Louisa'],
    },
    {
        id: 3,
        gameLanguage: 'French',
        hintSentence: 'Hoe heet jij?',
        wrongOrder: ['t`appelles', 'tu', 'comment', '?'],
        correctOrder: ['Comment', 't`appelles', 'tu', '?'],
    },
    {
        id: 4,
        gameLanguage: 'French',
        hintSentence: 'Hoi, ik heet Sacha.',
        wrongOrder: ['sacha', 'm`appelle', 'je', 'salut'],
        correctOrder: ['Salut,', 'je', 'm`appelle', 'Sacha'],
    },
];

export default sentences;
