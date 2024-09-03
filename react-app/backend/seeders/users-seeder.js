import { User } from "../src/models/user.model.js";
import { faker } from "@faker-js/faker";
import { connect } from "../util/db.js";

const seed = async () => {
  await connect();
  await User.deleteMany({});
  const users = Array.from({ length: 50 }).map(() => ({
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    mobile: faker.phone.number(),
  }));
  await User.insertMany(users);
  console.log("Data Seeded!");
  process.exit(0);
};
seed();
