export const LIKE_POST = "post:likePost";

export default function likePost(post) {
  // console.log('post',post)
  return {
    type: LIKE_POST,
    payload: post
  };
}
