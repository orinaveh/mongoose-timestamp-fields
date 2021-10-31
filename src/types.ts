type TimestampFieldsHelper<I, T extends string | number | symbol> = {
  [K in keyof I]: I[K] extends Record<any, any> ? TimestampFieldsHelper<I[K], T> : K extends T ? I[K] : {
    value: I[K]
    updatedAt: Date;
  }
};

export interface MongooseTFOptionsInternal {
  fieldsWithoutTimeStamp: string[];
  setOnSubObjects?: boolean;
}

export type TimestampFields<OriginalInterface, FieldsToRemove extends string | number | symbol> = TimestampFieldsHelper<OriginalInterface, FieldsToRemove>;

export interface MongooseTFOptions<OriginalInterface> {
  fieldsWithoutTimeStamp: Array<keyof OriginalInterface>,
  setOnSubObjects?: boolean;
}
