const {
  SEED_PATH,
} = process.env;

const seedPath = SEED_PATH

const values = {
  seedPath,
}

console.log(JSON.stringify(values, null, 2))
