import {MillionaireGame, CrosswordGame, SongGame} from '../../@types/games';

type GameId = 'millionaire' | 'song' | 'crossword';
type Game = MillionaireGame | CrosswordGame | SongGame;

export interface IGeneratorParam {
    gameId: GameId;
}

export interface IGeneratorReply  {
    gameId: GameId;
    game: Game;
}

export interface IGeneratorQuery {
    difficulty: string;
    topic: string;
    questions: number;
}