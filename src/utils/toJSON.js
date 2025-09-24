// utils/toJSON.js
// Reusable Mongoose plugin to clean up JSON output from documents
// - converts _id -> id (string)
// - removes __v and password
// - preserves any existing schema.toJSON.transform

export default function toJSON(schema) {
  // keep existing transform if any
  const existingTransform = schema.options.toJSON && schema.options.toJSON.transform;

  // ensure options object exists
  schema.options.toJSON = schema.options.toJSON || {};

  schema.options.toJSON.transform = function (doc, ret, options) {
    // if an existing transform exists, run it first (and use its return if provided)
    if (typeof existingTransform === 'function') {
      const maybeRet = existingTransform(doc, ret, options);
      if (maybeRet !== undefined) ret = maybeRet;
    }

    // convert _id to id (string)
    if (ret && ret._id !== undefined) {
      try {
        ret.id = typeof ret._id === 'object' && ret._id.toString ? ret._id.toString() : ret._id;
      } catch {
        ret.id = ret._id;
      }
      delete ret._id;
    }

    // remove internal fields
    if (ret && ret.__v !== undefined) delete ret.__v;
    if (ret && ret.password !== undefined) delete ret.password;

    return ret;
  };

  // Optionally mirror the same behavior for toObject (useful if you call doc.toObject())
  const existingToObject = schema.options.toObject && schema.options.toObject.transform;
  schema.options.toObject = schema.options.toObject || {};
  schema.options.toObject.transform = function (doc, ret, options) {
    if (typeof existingToObject === 'function') {
      const maybeRet = existingToObject(doc, ret, options);
      if (maybeRet !== undefined) ret = maybeRet;
    }

    if (ret && ret._id !== undefined) {
      try {
        ret.id = typeof ret._id === 'object' && ret._id.toString ? ret._id.toString() : ret._id;
      } catch {
        ret.id = ret._id;
      }
      delete ret._id;
    }
    if (ret && ret.__v !== undefined) delete ret.__v;
    if (ret && ret.password !== undefined) delete ret.password;

    return ret;
  };
}
