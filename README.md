# Mongoose Timestamp Fields

A mongoose plugin made for converting each field to an object containing a value and updatedAt.

This plugin supports Typescript, and exports two types: 

 - ILastUpdated<Original Interface, Keys without timestamp>: It gives you the type of the document with timestamps.

 - MongooseTFOptions: the options of the plugins. includes: 
   - fieldsWithoutTimeStamp: an array of strings. insert the fields you want to ignore.

For defining Mongoose Schema, use getSchemaTypeForMongoose(type, required = false). for example: 
``address: getSchemaTypeForMongoose(String) // address: {value: 'Reuven Lerer 2, NZ', updatedAt: 2021-10-11T12:54:46.631Z} not required
name: getSchemaTypeForMongoose(String, true) // address: {value: 'Efi', updatedAt: 2021-10-11T12:54:46.631Z} REQUIRED``