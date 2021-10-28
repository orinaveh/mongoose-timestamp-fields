type TimestampFieldsHelper<I, T extends keyof I> = {
  [K in keyof Omit<I, T>]: {
    value: I[K]
    updatedAt: Date;
  }
};

export interface MongooseTFOptionsInternal {
  fieldsWithoutTimeStamp: string[];
  setOnSubObjects?: boolean;
}

export type TimestampFields<OriginalInterface, FieldsToRemove extends keyof OriginalInterface> = TimestampFieldsHelper<OriginalInterface, FieldsToRemove> & Pick<OriginalInterface, FieldsToRemove>;

export interface MongooseTFOptions<OriginalInterface> {
  fieldsWithoutTimeStamp: Array<keyof OriginalInterface>,
  setOnSubObjects?: boolean;
}
