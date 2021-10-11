type ILastUpdatedHelper<I, T extends keyof I> = {
  [K in keyof Omit<I, T>]: {
    value: I[K]
    updatedAt: Date;
  }
};

export type ILastUpdated<I, T extends keyof I> = ILastUpdatedHelper<I, T> & Pick<I, T>;

export interface MongooseTFOptions {
  fieldsWithoutTimeStamp: string[]
}
