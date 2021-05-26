import { Either } from "fp-ts/lib/Either";

export interface AppCache {
     getValue<T>(key:string):Promise<Either<Error,T | null>>;
     storeValue<T>(key:string, value:string): Promise<Either<Error, void>>;
}
