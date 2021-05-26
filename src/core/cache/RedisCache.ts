import { Either, right, left } from 'fp-ts/lib/Either';
import { leftF } from 'fp-ts/lib/EitherT';

import { createNodeRedisClient, WrappedNodeRedisClient } from 'handy-redis';
import { AppCache } from './AppCache';


class RedisCache implements AppCache {
    private client: WrappedNodeRedisClient | null;

    constructor() {
        this.client = null;

        const connectionInstance = createNodeRedisClient();
        
        connectionInstance.nodeRedis.on('ready', () => {
            this.client = connectionInstance;
        });

        connectionInstance.nodeRedis.on('error', () => {
            this.client = null;
        });

        connectionInstance.nodeRedis.on('end', () => {
            this.client = null;
        });

    }

    async getValue<T>(key: string): Promise<Either<Error, T | null>> {
        if(!this.client) return left(new Error());

        try {
            const val = await this.client.get(key);

            if (!val) return right(null);

            const obj = JSON.parse(val) as T;

            return right(obj);
        } catch (err) {
        
            console.log(err);
            return left(err);
        }
    }

    async storeValue(key: string, value: any): Promise<Either<Error, void>> {
        if(!this.client) return left(new Error());

        try {
            const serializedObj = JSON.stringify(value);
            await this.client.set(key, serializedObj);
            return right(undefined);
        } catch (err) {
            console.log(err);
            return left(err);
        }
    }

}

const redisCache: RedisCache = new RedisCache();
export default redisCache;


