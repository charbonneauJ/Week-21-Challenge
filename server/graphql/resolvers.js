const { Profile, User } = require("../models");

const resolvers = {
  Query: {
    me: async (_, args, context) => {
      try {
        console.log(context);
        const foundUser = await User.findOne({});
        // const foundUser = await User.findOne({
        //   $or: [
        //     { _id: user ? user._id : params.id },
        //     { username: params.username },
        //   ],
        // });

        if (!foundUser) {
          return { message: "Cannot find a user with this id!" };
        }

        res.json(foundUser);
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
  },

  Mutation: {
    addProfile: async (parent, { name }) => {
      return Profile.create({ name });
    },
    addSkill: async (parent, { profileId, skill }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        {
          $addToSet: { skills: skill },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId });
    },
    removeSkill: async (parent, { profileId, skill }) => {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        { $pull: { skills: skill } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
