// const { use } = require("../app");
const Post = require("../models/post");
const user = require("../models/user");
const User = require("../models/user");

exports.createPost = async (req, res) => {
  try {
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: "req.body.public_id",
        url: "req.body.url",
      },
      owner: req.user._id,
    };

    const post = await Post.create(newPostData);

    const user = await User.findById(req.user._id);

    user.posts.push(post._id);

    await user.save();

    res.status(201).json({
      success: true,
      message: "New post created successfully !!",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not found !",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized !",
      });
    }

    // await post.remove();   //notWorking
    await Post.deleteOne({ _id: req.params.id });

    const user = await User.findById(req.user._id);
    const postIndex = user.posts.findIndex((postId) =>
      postId.equals(req.params.id)
    );
    if (postIndex !== -1) {
      user.posts.splice(postIndex, 1);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Post deleted !!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.likeUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not found !",
      });
    }

    if (post.likes.includes(req.user._id)) {
      const postIndex = post.likes.findIndex((userId) =>
        userId.equals(req.user._id)
      );
      post.likes.splice(postIndex, 1);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "post UnLiked successfully !!",
      });
    }

    post.likes.push(req.user._id);
    await post.save();
    res.status(200).json({
      success: true,
      message: "post liked successfully !!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPostsOfFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = await Post.find({
      owner: {
        $in: user.following,
      },
    });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { newCaption } = req.body;

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not found !",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized !",
      });
    }

    post.caption = newCaption;
    await post.save();

    return res.status(200).json({
      success: true,
      message: "caption Updated !!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addUpdateComment = async (req, res) => {
  try {
    const { newComment } = req.body;
    const post = await Post.findById(req.params.id);

    if (!newComment) {
      return res.status(404).json({
        success: false,
        message: "add comment !",
      });
    }
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not found !",
      });
    }

    const payload = {
      user: req.user._id,
      comment: newComment,
    };

    //checking that if this user have a comment or not
    // if have store the index of the user in comments array of the post.
    let commentIndex = -1;
    post.comments.forEach((element, index) => {
      if (element.user.toString() === req.user._id.toString()) {
        console.log("index", index);
        return (commentIndex = index);
      }
    });
    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = newComment;
      await post.save();

      return res.status(200).json({
        success: true,
        message: "comment updated !!",
      });
    } else {
      post.comments.push(payload);
      await post.save();

      res.status(200).json({
        success: true,
        message: "comment added !!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not found !",
      });
    }

    if (post.owner.toString() === req.user._id.toString()) {
      post.comments.forEach((element, index) => {
        if (element._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      await post.save();
      return res.status(200).json({
        success: true,
        message: "this comment is deleted on your post !!",
      });
    } else {
      post.comments.forEach((element, index) => {
        if (element.user.toString() === req.user._id.toString()) {
          if (element._id.toString() === req.body.commentId.toString()) {
            return post.comments.splice(index, 1);
          }
        }
      });
      await post.save();
      res.status(200).json({
        success: true,
        message: "your comment is deleted on this post !!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
