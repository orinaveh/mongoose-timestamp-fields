# Mongoose Timestamp Fields

A mongoose plugin made for converting each field to an object containing a value and updatedAt.

This plugin supports Typescript, and exports two types: 

 - TimestampFields<Original Interface, Keys without timestamp>: It gives you the type of the document with timestamps.

 - MongooseTFOptions: the options of the plugins. it includes: 
   - fieldsWithoutTimeStamp: an array of strings. insert the fields you want to ignore.

For defining Mongoose Schema, use getSchemaTypeForMongoose(type, required = false). for example: 
``address: getSchemaTypeForMongoose(String) // address: {value: 'Reuven Lerer 2, NZ', updatedAt: 2021-10-11T12:54:46.631Z} not required
name: getSchemaTypeForMongoose(String, true) // address: {value: 'Efi', updatedAt: 2021-10-11T12:54:46.631Z} REQUIRED``

****Note****

This package was built specifically for some private projects. It may suit your project, But it probably won't work for you.

**Limitations**

 - TS: You should send the an "original interface" type object, but it may cause some issues with mongoose due to limited type support. Therefore, you can add ``as any`` after the object, inside the mongoose action (Like findOneAndUpdate)

****