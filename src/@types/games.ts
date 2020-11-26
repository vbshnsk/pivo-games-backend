export enum Difficulty {
    EASY, MEDIUM, HARD, IMPOSSIBLE
}

export interface MillionaireGame {
    difficulty: Difficulty;
    topics: Array<string>;
    questions: Array<MillionaireQuestion>;
}

export interface CrosswordGame {}

export interface SongGame {}

interface MillionaireQuestion {
    questionText: string;
    options: Array<string>;
    answerId: number;
}
