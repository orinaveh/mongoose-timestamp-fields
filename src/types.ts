type ITimestampFieldsHelper<I, T extends keyof I> = {
  [K in keyof Omit<I, T>]: {
    value: I[K]
    updatedAt: Date;
  }
};

export interface MongooseTFOptionsInternal {
  fieldsWithoutTimeStamp: string[];
}

export type ITimestampFields<OriginalInterface, FieldsToRemove extends keyof OriginalInterface> = ITimestampFieldsHelper<OriginalInterface, FieldsToRemove> & Pick<OriginalInterface, FieldsToRemove>;

export interface MongooseTFOptions<OriginalInterface> {
  fieldsWithoutTimeStamp: Array<keyof OriginalInterface>
}
