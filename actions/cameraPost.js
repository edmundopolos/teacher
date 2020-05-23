export const CAMERA_POST = "camera:cameraPost";

export default function CameraPost(post) {
  console.log('camera',post)
  return {
    type: CAMERA_POST,
    payload: post
  };
}
