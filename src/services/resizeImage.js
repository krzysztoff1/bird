import Resizer from "react-image-file-resizer";

export async function createResizedImage(file, size = 200) {
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        size,
        size,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  return resizeFile(file);
}