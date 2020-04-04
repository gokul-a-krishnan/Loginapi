function validate(data, schema) {
  const valid = schema.validate(data);
  if (valid.error) throw Error(valid.error.message.replace(/"/g, ""));
}

module.exports = {validate};
