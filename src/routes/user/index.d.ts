import User from '../../services/db/entities/user';
import Profile from '../../services/db/entities/profile';

export interface IBaseBody {
    username: string;
    password: string;
}

export interface IBaseReply {
    user: Partial<User>;
}

export interface IBaseParams {
    username: string;
}

export interface IRegisterBody extends IBaseBody {
    email: string;
    role: string;
}

export interface IRegisterReply extends IBaseReply{
    user: Pick<User, 'username'|'email'>;
    token: string;
}

export interface IGetAllReply {
    users: Array<Pick<User, 'username'|'email'|'profile'>>;
}

export interface IGetOneReply extends IBaseReply {
    user: Pick<User, 'username'|'email'|'profile'>;
}

export interface IGetProfileReply {
    profile: Profile
}