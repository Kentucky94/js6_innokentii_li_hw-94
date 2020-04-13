const mongoose = require('mongoose');
const {nanoid} = require('nanoid');

const config = require('./config');
const User = require('./models/User');
const Post = require('./models/Post');

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = mongoose.connection.db.listCollections().toArray();

  for(let coll of collections){
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user1, user2, user3] = await User.create({
    username: 'user1',
    password: 'password1',
    displayName: 'Mick Gordon',
    token: nanoid(),
  }, {
    username: 'user2',
    password: 'password2',
    displayName: 'James Hatfield',
    token: nanoid(),
  }, {
    username: 'user3',
    password: 'password3',
    displayName: 'Shoto Todoroki',
    token: nanoid(),
  });

  await Post.create({
    text: 'Some post from Mick',
    user: user1,
    tags: ["music"],
  }, {
    text: 'Some post from James',
    user: user2,
    tags: ["sports"],
  }, {
    text: 'Some post from Shoto',
    user: user3,
    tags: ["games"],
  });

  mongoose.connection.close();
};

run().catch(e => {
  console.log(e);
});

