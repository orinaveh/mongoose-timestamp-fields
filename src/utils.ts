import * as mongoose from 'mongoose';
import { MongooseTFOptionsInternal } from './types';

const isObject = (obj: any): boolean => Object.prototype.toString.call(obj) === '[object Object]';

export const createNewQuery = (ref: mongoose.Query<any, any>, fieldsWithoutTimeStamp: any[]): mongoose.FilterQuery<any> | null => {
  const originalQuery = ref.getQuery();
  const queryKeys = Object.keys(originalQuery);
  let query = {};
  queryKeys.forEach((key) => {
    query = { ...query, [key]: !fieldsWithoutTimeStamp.includes(key) ? { value: originalQuery[key] } : originalQuery[key] };
  });
  return query;
};

export const createSaveObj = (obj: mongoose.DocumentDefinition<mongoose.Document<any, any, any>> & { _id: any }, options: MongooseTFOptionsInternal): mongoose.DocumentDefinition<mongoose.Document<any, any, any>> & { _id: any } => {
  const date = new Date();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, ...restOfObj } = obj;
  return ({
    _id,
    ...(function recursive(objRecursive: Record<string, any>) {
      let user = {};
      Object.keys(objRecursive).forEach((key) => {
        if (isObject(objRecursive[key])) {
          const objFromRecursion = recursive(objRecursive[key]);
          user = { ...user, [key]: objFromRecursion };
        } else {
          user = { ...user, [key]: ![...options.fieldsWithoutTimeStamp].includes(key) ? { value: objRecursive[key], updatedAt: date } : objRecursive[key] };
        }
      });
      return user;
    }(restOfObj)),
  });
};

export const createUpdateSetObj = (dataToUpdate: Record<string, any>, currentDoc: Record<string, any>, options: MongooseTFOptionsInternal): Record<string, any> => {
  const date = new Date();
  return (function recursive(dataToUpdateRecursive: Record<string, any>, currentDocRecursive: Record<string, any>) {
    let update = {};
    Object.keys(dataToUpdateRecursive).forEach((key) => {
      if (isObject(dataToUpdateRecursive[key])) {
        const objFromRecursion = recursive(dataToUpdateRecursive[key], currentDocRecursive?.[key]);
        if (Object.keys(objFromRecursion).length) {
          update = { ...update, [key]: objFromRecursion };
        }
      } else if (!options.fieldsWithoutTimeStamp.includes(key)
      && (currentDocRecursive[key]?.value === undefined || JSON.parse(JSON.stringify(currentDocRecursive[key]?.value)) !== JSON.parse(JSON.stringify(dataToUpdateRecursive[key])))) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        update = { ...update, [key]: { value: dataToUpdateRecursive[key], updatedAt: date } };
      } else if (options.fieldsWithoutTimeStamp.includes(key) && JSON.parse(JSON.stringify(currentDocRecursive[key])) !== JSON.parse(JSON.stringify(dataToUpdateRecursive[key]))) {
        update = { ...update, [key]: dataToUpdateRecursive[key] };
      }
    });
    return update;
  }(dataToUpdate, currentDoc));
};
