import User from '../../services/db/entities/user';

export interface IAuthBody {
    username: string;
    password: string;
}

export interface IAuthReply  {
    user: Partial<User>;
    token: string;
}