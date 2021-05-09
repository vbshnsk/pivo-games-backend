interface IUser {
    id: string;
    username: string;
    email: string;
    role: string;
    profile: IProfile;
    password: string;
    hashPassword: () => Promise<void>
}

interface IProfile {
    id: string;
    crosswordStatsId: string;
    brainstormStatsId: string;
    songStatsId: string;
    avatarUrl: string;
}

export default interface IDatabaseConnection {
    connect: () => Promise<void>
    disconnect: () => Promise<void>
    clear: () => Promise<void>
    loginUser: (username: string, password: string) => Promise<Pick<IUser, 'username'|'role'> | {error: string}>
    registerUser: (username: string, email: string, role: string, password: string)
        => Promise<Pick<IUser, 'username'|'email'>>
    getAll: () => Promise<Array<Pick<IUser, 'username' | 'email' | 'profile'>>>
    getOne: (username: string) => Promise<Pick<IUser, 'username' | 'email' | 'profile'>>
    getOneProfile: (username: string) => Promise<IProfile>
    deleteByUsername: (username: string) => Promise<void>
}
