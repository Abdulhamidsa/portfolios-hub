import { connect } from "../my-app/util/db";
import { User } from "../my-app/src/models/user.model";
import faker from "@faker-js/faker";

const seed = async () => {
  await connect();
  await User.deleteMany({});
  const users = Array.from({ length: 10 }).map(() => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }));
  await User.insertMany(users);
  console.log("Data Seeded!");
  process.exit(0);
};

seed();
