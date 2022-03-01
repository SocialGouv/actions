const {
  PG_CREATE_EXTENSIONS,
} = process.env;

const pgCreateExtensions = PG_CREATE_EXTENSIONS

const values = {
  pgCreateExtensions,
}

console.log(JSON.stringify(values, null, 2))
