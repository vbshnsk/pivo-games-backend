import IDatabaseConnection from "../interface";
import {Connection, createConnection} from "typeorm";
import UserRepository from "./repositories/user";

export default class TypeOrmConnection implements IDatabaseConnection {
    private connection: Connection;
    private userRepo: UserRepository;

    async connect() {
        this.connection = await createConnection({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [__dirname + '/entities/*.js', __dirname + '/entities/*.ts'],
            synchronize: true,
        });
        this.userRepo = this.connection.getCustomRepository<UserRepository>(UserRepository)
    }

    async disconnect() {
        await this.connection.close();
        this.userRepo = null;
    }

    async loginUser(username: string, password: string) {
        return this.userRepo.loginUser(username, password);
    }

    async registerUser(username: string, email: string, role: string, password: string) {
        return this.userRepo.registerUser(username, email, role, password);
    }

    async getAll() {
        return this.userRepo.getAll();
    }

    async getOne(username: string) {
        return this.userRepo.getOne(username);
    }

    async getOneProfile(username: string) {
        return this.userRepo.getOneProfile(username);
    }

    async deleteByUsername(username: string) {
        return this.userRepo.deleteByUsername(username);
    }

    async clear() {
        return this.userRepo.clear();
    }
}