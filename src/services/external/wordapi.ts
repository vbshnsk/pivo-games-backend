import Request from './request';
import {Difficulty, MillionaireGame} from '../../@types/games';
import {shuffle} from 'lodash';

const isStringArray =
    (value: any): value is Array<string> => Array.isArray(value) && value.every(v => typeof v === 'string');

//TODO: add more topics, more subtopics, shuffle -> get 5
const topics = {
    science: ['science', 'nature', 'chemistry', 'physics', 'scientific'],
    literature: ['book', 'novel', 'literature', 'art', 'creativity']
};

type Topic = keyof typeof topics;

enum DataMuseRel {
    nounToAdj = 'jja',
    adjToNoun = 'jjb',
    synonyms = 'syn',
    triggers = 'trg',
    antonyms = 'ant',
    kindOf = 'spc',
    moreGeneralThan = 'gen',
    comprises = 'com',
    partOf = 'par',
    frequentFollowers = 'bga',
    frequentPredecessors = 'bgb',
    rhymes = 'rhy',
    approximateRhymes = 'nry',
    homophones = 'hom',
    consonantMatch = 'con'
}

enum DataMuseMeta {
    definitions = 'd',
    partsOfSpeech = 'p',
    syllableCount = 's',
    pronunciation = 'r',
    frequency = 'f'
}

type DataMuseRelations = {[k in DataMuseRel]?: Array<string>};
type DataMuseMetadata = {[k in DataMuseMeta]?: boolean};

type DataMuseParams = {
    meansLike?: string;
    soundsLike?: string;
    spelledLike?: string;
    related?: DataMuseRelations;
    topics?: Array<string>;
    leftContext?: string;
    rightContext?: string;
    maximum?: number;
    metadata?: DataMuseMetadata;
    vocabulary: string;
}

export class DataMuseQueryBuilder {
    private _query = '?';
    private _params: DataMuseParams = {
        related: {},
        metadata: {},
        vocabulary: 'enwiki'
    };

    getDefinitions() {
        this._setMetadata(DataMuseMeta.definitions);
        return this;
    }

    getPartsOfSpeech() {
        this._setMetadata(DataMuseMeta.partsOfSpeech);
        return this;
    }

    getSyllableCount() {
        this._setMetadata(DataMuseMeta.syllableCount);
        return this;
    }

    getPronunciation() {
        this._setMetadata(DataMuseMeta.pronunciation);
        return this;
    }

    getFrequency() {
        this._setMetadata(DataMuseMeta.frequency);
        return this;
    }

    nounToAdj(value: string | Array<string>) {
        this._setRelated(value, DataMuseRel.nounToAdj);
        return this;
    }

    adjToNoun(value: string | Array<string>) {
        this._setRelated(value, DataMuseRel.adjToNoun);
        return this;
    }

    synonyms(value: string | Array<string>) {
        this._setRelated(value, DataMuseRel.synonyms);
        return this;
    }

    triggers(value: string | Array<string>) {
        this._setRelated(value, DataMuseRel.triggers);
        return this;
    }

    antonyms(value: string | Array<string>) {
        this._setRelated(value, DataMuseRel.antonyms);
        return this;
    }

    moreGeneralThan(value: string | Array<string>) {
        this._setRelated(value, DataMuseRel.moreGeneralThan);
        return this;
    }

    comprises(value: string | Array<string>) {
        this._setRelated(value, DataMuseRel.comprises);
        return this;
    }

    kindOf(value: string | Array<string>) {
        this._setRelated(value, DataMuseRel.kindOf);
        return this;
    }

    partOf(value: string | Array<string>) {
        this._setRelated(value, DataMuseRel.partOf);
        return this;
    }

    frequentFollowers(value: string | Array<string>) {
        this._setRelated(value, DataMuseRel.frequentFollowers);
        return this;
    }

    frequentPredecessors(value: string | Array<string>) {
        this._setRelated(value, DataMuseRel.frequentPredecessors);
        return this;
    }

    rhymes(value: string | Array<string>) {
        this._setRelated(value, DataMuseRel.rhymes);
        return this;
    }

    approximateRhymes(value: string | Array<string>) {
        this._setRelated(value, DataMuseRel.approximateRhymes);
        return this;
    }

    homophones(value: string | Array<string>) {
        this._setRelated(value, DataMuseRel.homophones);
        return this;
    }

    consonantMatch(value: string | Array<string>) {
        this._setRelated(value, DataMuseRel.consonantMatch);
        return this;
    }

    meansLike(value: string) {
        this._setParam(value, 'meansLike');
        return this;
    }

    soundsLike(value: string) {
        this._setParam(value, 'soundsLike');
        return this;
    }

    spelledLike(value: string) {
        this._setParam(value, 'spelledLike');
        return this;
    }

    topics(value: string | Array<string>) {
        this._setParam(value, 'topics');
        return this;
    }

    leftContext(value: string) {
        this._setParam(value, 'leftContext');
        return this;
    }

    rightContext(value: string) {
        this._setParam(value, 'rightContext');
        return this;
    }

    maximum(value: number) {
        this._setParam(value, 'maximum');
        return this;
    }

    private _getKeys = Object.keys as <T extends Record<string, unknown>>(obj: T) => Array<keyof T>;

    build() {
        for (const key of this._getKeys(this._params)) {
            switch (key) {
                case 'meansLike':
                    this._query += `ml=${this._params[key]}&`;
                    break;
                case 'maximum':
                    this._query += `max=${this._params[key]}&`;
                    break;
                case 'topics':
                    this._query += `topics=${this._params[key].join(',')}&`;
                    break;
                case 'leftContext':
                    this._query += `lc=${this._params[key]}&`;
                    break;
                case 'rightContext':
                    this._query += `rc=${this._params[key]}&`;
                    break;
                case 'soundsLike':
                    this._query += `sl=${this._params[key]}&`;
                    break;
                case 'spelledLike':
                    this._query += `sp=${this._params[key]}&`;
                    break;
                case 'vocabulary':
                    this._query += `v=${this._params[key]}&`;
                    break;
                case 'metadata':
                    let base = 'md=';
                    for (const metaKey of this._getKeys(this._params[key])) {
                        base += this._params[key][metaKey] ? metaKey : '';
                    }
                    this._query += base + '&';
                    break;
                case 'related':
                    for (const relKey of this._getKeys(this._params[key])) {
                        for (const relation of this._params[key][relKey]) {
                            this._query += `rel_${relKey}=${relation}&`;
                        }
                    }
                    break;
            }
        }
        const res = this._query.replace(/&+$/g, '');
        this.flush();
        return res;
    }

    flush() {
        this._query = '?';
        this._params = {
            related: {},
            metadata: {},
            vocabulary: 'enwiki'
        };
    }

    private _setMetadata(field: DataMuseMeta) {
        this._params.metadata[field] = true;
    }

    private _setRelated(value: string | Array<string>, field: DataMuseRel) {
        if (isStringArray(value)) {
            this._params.related[field] = value;
        }
        else {
            this._params.related[field] = [value];
        }
    }

    private _setParam(value: string | Array<string> | number,
        field: Exclude<keyof DataMuseParams, 'related' | 'metadata'>) {
        switch (field) {
            case 'topics':
                if (isStringArray(value)) {
                    this._params[field] = value;
                }
                else if (typeof value === 'string') {
                    this._params[field] = [value];
                }
                else {
                    throw TypeError('Topics must be a string or an array of strings.');
                }
                break;
            case 'maximum':
                if (typeof value === 'number') {
                    if (value > 1000) value = 1000;
                    this._params[field] = value;
                }
                else {
                    throw TypeError('Maximum must be a number.');
                }
                break;
            default:
                if (typeof value === 'string') {
                    this._params[field] = value;
                }
                break;
        }
    }
}

type WordInternal = {
    word: string;
    score: number;
    tags?: Array<string>;
    defs?: Array<string>;
}
type Word = {
    word: string;
    definition: string;
    difficulty: number;
}

type WordListInternal = Array<WordInternal>;
type WordList = Array<Word>;

export default class WordApi {
    private _request: Request;
    private readonly _endpoint = '/words';
    private readonly _queryBuilder: DataMuseQueryBuilder;

    constructor() {
        this._queryBuilder = new DataMuseQueryBuilder();
        this._request = new Request();
        this._request.host = 'http://api.datamuse.com';
        this._request.headers = {};
        this._request.timeout = 30000;
    }

    private async _getWordList(topics: Array<string>, wordCount: number): Promise<WordListInternal> {
        const maximum = 1000;
        const query = this._queryBuilder
            .topics(topics)
            .maximum(maximum)
            .getDefinitions()
            .build();
        const res: WordListInternal = [];
        const fetched = await this._request.get(this._endpoint + query);

        if (this._isAWordList(fetched)) {
            while (res.length !== wordCount) {
                const word = fetched[Math.floor(Math.random() * fetched.length)];
                if (word.tags !== undefined &&
                    word.tags.some(v => v === 'n') &&
                    !res.some(v => v.word === word.word) &&
                    word.defs !== undefined) {
                    res.push(word);
                }
            }
        }
        return res;
    }

    private _internalWordListToWordList(list: WordListInternal) {
        const res: WordList = [];
        for (const wordInternal of list) {
            res.push({
                word: wordInternal.word,
                definition: this._getRandomWordDefinition(wordInternal),
                difficulty: 0 //TODO: find a way to calculate the word's difficulty
            });
        }
        return res;
    }

    private _getRandomWordDefinition(word: WordInternal): string {
        const def = word.defs[Math.floor(Math.random() * word.defs.length)]
            .replace(/^(n|v|adj)\t/g, '');
        return def[0].toUpperCase() + def.slice(1) + '.';
    }

    async generateWordsForTopic(topic: Topic, wordCount: number, difficulty: Difficulty) {
        const wordList = this._internalWordListToWordList(await this._getWordList(topics[topic], wordCount * 3));
        //TODO: difficulty filtering
        return wordList.slice(0, wordCount);
    }

    async getCloseWords(word: string, count: number): Promise<Array<string>> {
        const mlQuery = this._queryBuilder
            .meansLike(word)
            .maximum(1000)
            .getDefinitions()
            .build();
        const synQuery = this._queryBuilder
            .synonyms(word)
            .maximum(1000)
            .getDefinitions()
            .build();
        const kindOfQuery = this._queryBuilder
            .kindOf(word)
            .maximum(1000)
            .getDefinitions()
            .build();
        const slQuery = this._queryBuilder
            .soundsLike(word)
            .maximum(1000)
            .getDefinitions()
            .build();
        const compQuery = this._queryBuilder
            .comprises(word)
            .maximum(1000)
            .getDefinitions()
            .build();
        const antQuery = this._queryBuilder
            .antonyms(word)
            .maximum(1000)
            .getDefinitions()
            .build();

        const synonyms: Array<string> = [];

        const fetched = (await Promise.all([
            this._request.get(this._endpoint + mlQuery),
            this._request.get(this._endpoint + slQuery),
            this._request.get(this._endpoint + antQuery),
            this._request.get(this._endpoint + compQuery),
            this._request.get(this._endpoint + kindOfQuery),
            this._request.get(this._endpoint + synQuery)
        ]))
            .flat()
            .filter((v, i, a) => a.findIndex(val => v === val) === i);
        if (this._isAWordList(fetched) && fetched.length > 4) {
            while (synonyms.length !== count) {
                const word = fetched[Math.ceil(Math.random() * fetched.length)];
                if (!(synonyms.find(v => v === word.word) === undefined)) continue;
                synonyms.push(word.word);
            }
        }
        else {
            throw new Error('Failed to get close words.');
        }
        return synonyms;
    }

    async generateMillionaireGame(topic: Topic, wordCount: number, difficulty: Difficulty): Promise<MillionaireGame> {
        const wordList = await this.generateWordsForTopic(topic, wordCount, difficulty);
        const game: MillionaireGame = {
            topics: topics[topic],
            difficulty: difficulty,
            questions: []
        };
        for (const word of wordList) {
            try {
                const synonyms = await this.getCloseWords(word.word, 3);
                const options = shuffle<string>([word.word, ...synonyms]);
                const answer = options.findIndex(v => v === word.word);
                game.questions.push({
                    options,
                    questionText: word.definition,
                    answerId: answer
                });
            }
            catch (e) {
                continue;
            }
        }
        return game;
    }

    isValidTopic(value: string): value is Topic {
        return Object.keys(topics).some(v => v === value);
    }
    private _isAWordList(value: any): value is WordListInternal {
        return Array.isArray(value) && value.every(v => this._isAWordListElement(v));
    }

    private _isAWordListElement(value): value is WordInternal {
        return (value.word !== undefined && typeof value.word === 'string')
        && (value.score !== undefined && typeof value.score === 'number');
    }
}