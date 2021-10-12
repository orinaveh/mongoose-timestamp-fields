import mongoose from 'mongoose';
import { TimestampFields, MongooseTFOptionsInternal, MongooseTFOptions } from './types';
import { createUpdateSetObj, createSaveObj, createNewQuery } from './utils';

export const getSchemaTypeForMongooseTimestampFields = (type: mongoose.SchemaDefinition<mongoose.DocumentDefinition<undefined>>, required = false): mongoose.SchemaDefinition<mongoose.DocumentDefinition<undefined>> => ({
  type: {
    value: type,
    updatedAt: {
      type: Date,
    },
  },
  required,
});

export const MongooseTimestampFieldsPlugin = (schema: mongoose.Schema<mongoose.Document<any>, mongoose.Model<mongoose.Document<any>>>, options: MongooseTFOptionsInternal): void => {
  options.fieldsWithoutTimeStamp.push('_id');

  schema.pre(['findOneAndUpdate'], async function findOneAndUpdate(next) {
    try {
      this.setQuery(createNewQuery(this, options.fieldsWithoutTimeStamp));
      const objectToInsert = (this?.getUpdate() as mongoose.UpdateQuery<any>).$set;
      const currentDoc = await this?.findOne();
      if (!objectToInsert) {
        throw new Error('$set is undef');
      }
      const updateObject = { ...this.getUpdate(), $set: createUpdateSetObj(objectToInsert, currentDoc, options) };
      this.setUpdate(updateObject);
      next(null);
    } catch (err) {
      console.log(err);
      next(err as any);
    }
  });

  schema.pre('save', async function save(next) {
    try {
      const user = createSaveObj(this.toJSON(), options);
      this.overwrite(user);
      next();
    } catch (err) {
      next(err as any);
    }
  });

  schema.pre(['findOne', 'find', 'findOneAndDelete'], async function find(next) {
    this.setQuery(createNewQuery(this, options.fieldsWithoutTimeStamp));
    next(null);
  });
};

export { TimestampFields, MongooseTFOptions };
