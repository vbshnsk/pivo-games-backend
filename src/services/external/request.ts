import * as http from 'http';

export type Headers = Record<string, string>

export default class Request {
    private _headers: Headers;
    private _host: string;
    private _timeout = 30000;

    async get(endpoint: string): Promise<unknown> {
        let requestResolve: (res: Record<string, unknown>) => void, requestReject: (err: Error) => void;
        const requestPromise = new Promise<unknown>((res, rej) => {
            requestResolve = res;
            requestReject = rej;
        });
        const request = http.request(this._host + endpoint, {
            method: 'get',
            headers: this._headers ? this._headers : {}
        }, (res) => {
            let buffer = '';
            res.on('data', (chunk => {
                buffer += chunk;
            }));
            res.on('end', () => {
                requestResolve(JSON.parse(buffer));
            });
        });

        request.once('error', err => {
            requestReject(err);
        });
        request.end();

        return Promise.race([
            requestPromise,
            new Promise<never>((_, rej) => setTimeout(() => rej('Request has timed out.'), this._timeout))
        ]);
    }

    set headers(headers: Headers) {
        this._headers = headers;
    }

    set host(host: string) {
        this._host = host.replace(/\/+$/g, '');
    }

    set timeout(timeout: number) {
        this._timeout = timeout;
    }
}