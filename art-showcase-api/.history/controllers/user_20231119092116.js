const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const { dbConnect } = require("../database");

exports.addUserDetails = (req, res, next) => {
  if ((req.isAuth = false)) {
    const error = new Error("Not Authenticated");
    error.code = 400;
    throw error;
  }
  const objId = new ObjectId(req.body._id);
  console.log(req.body);
  const db = dbConnect();
  db.collection("usersData")
    .updateOne(
      { _id: objId },
      {
        $set: {
          name: req.body.name,
          title: req.body.title,
          profilePicUrl: req.files.profileImg[0].path,
          backgroundImgUrl: req.files.backgroundImg[0].path,
          about: req.body.about,
        },
      }
    )
    .then(() => res.status(200).send({ message: "success" }));
};

exports.addNewPost = (req, res, next) => {
  console.log("Running");
  if (!req.isAuth) {
    throw new Error("not authenticated");
  }

  const objId = new ObjectId(req.get("userId"));
  const email = req.get("email");
  const postUrlArray = req.files.map((post) => {
    return post.path;
  });
  const newPost = {
    urls: postUrlArray,
    createionDate: new Date().toLocaleDateString(),
    likesCount: 0,
    commentsCount: 0,
    saveCount: 0,
    title: req.body.title,
    description: req.body.description,
    likes: [],
    comments: [],
    user: {
      _id: objId,
      email: email,
    },
  };
  const db = dbConnect();
  let response = {
    postId: null,
    userId: null,
    email: null,
  };
  let res = db.collection("posts")
    .insertOne(newPost)
    .then((result) => {
      return db.collection("usersData").updateOne(
        { _id: objId },
        {
          $push: {
            posts: {
              $each: [result.insertedId.toString()],
              $position: 0,
            },
          },
        }
      );
    })
    .then((result) => {
      console.log("Result ", result);
      return result
    });
};
