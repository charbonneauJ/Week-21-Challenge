const typeDefs = `
type Profile {
  _id: ID
  username: String
  email: String
  password: String
  thoughts: [Thought]!
}

type Thought {
  _id: ID
  thoughtText: String
  thoughtAuthor: String
  createdAt: String
  comments: [Comment]!
}

type Comment {
  _id: ID
  commentText: String
  commentAuthor: String
  createdAt: String
}
  type Query {
    profile(profileId: ID!): Profile
    me: [Profile]!
  }

  type Mutation {
    addProfile(name: String!): Profile
    addSkill(profileId: ID!, skill: String!): Profile
    removeProfile(profileId: ID!): Profile
    removeSkill(profileId: ID!, skill: String!): Profile
  }
`;

module.exports = typeDefs;
