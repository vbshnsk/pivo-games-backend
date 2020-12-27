// import WordApi, {DataMuseQueryBuilder} from './wordapi';
//
// const expected =
//     '?rel_rhy=test&rel_jjb=test&rel_ant=test&rel_nry=test&rel_com=test&rel_con=test&rel_bga=test&rel_bgb=test&rel_hom' +
//     '=test&rel_spc=test&rel_gen=test&rel_jja=test&rel_jja=test2&rel_par=test&rel_syn=test&rel_trg=test&md=dfprs&v=enw' +
//     'iki&sl=test&lc=test&max=100&ml=test&rc=test&sp=test&topics=test,test2';
//
// describe('DatamuseQueryBuilder', () => {
//     test('should build a valid query', () => {
//         const qb = new DataMuseQueryBuilder();
//         const query = qb
//             .rhymes('test')
//             .soundsLike('test')
//             .adjToNoun('test')
//             .antonyms('test')
//             .approximateRhymes('test')
//             .comprises('test')
//             .consonantMatch('test')
//             .frequentFollowers('test')
//             .frequentPredecessors('test')
//             .getDefinitions()
//             .getFrequency()
//             .getPartsOfSpeech()
//             .getPronunciation()
//             .getSyllableCount()
//             .homophones('test')
//             .kindOf('test')
//             .leftContext('test')
//             .maximum(100)
//             .meansLike('test')
//             .moreGeneralThan('test')
//             .nounToAdj('test')
//             .partOf('test')
//             .rightContext('test')
//             .spelledLike('test')
//             .synonyms('test')
//             .topics('test')
//             .topics(['test', 'test2'])
//             .triggers('test')
//             .nounToAdj(['test', 'test2'])
//             .build();
//         expect(query).toEqual(expected);
//     });
// });
//
// describe('WordApi module', () => {
//
//     test('get word list', async () => {
//         jest.setTimeout(30000);
//         const api = new WordApi();
//         const game = await api.generateMillionaireGame('science', 5, 0);
//         console.log(game);
//     });
//
// });