export interface MillionaireGame {
    difficulty: number;
    topic: string;
    questions: Array<MillionaireQuestion>;
}

export interface CrosswordGame {}

export interface SongGame {}

interface MillionaireQuestion {
    questionText: 'string';
    options: Array<string>;
    answerId: 0 | 1 | 2 | 3;
}
