import blogsecure from "@/app/services/blogSecure";

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("filename", file, file.name); // Append file to FormData with the key 'filename'

          blogsecure
            .post("/blogs/uploadFile", formData)
            .then((response) => {
              console.log(response);

              if (response.data && response.data.img_id) {
                const imgUrl = `${process.env.NEXT_PUBLIC_BLOG_URL}/blogs/image/${response.data.img_id}`;
                resolve({ default: imgUrl });
              } else {
                console.log(1);
                reject(`Upload failed: ${file.name}`);
              }
            })
            .catch((error) => {
              console.log(2);
              console.log(error)
              reject(`Upload failed: ${file.name}`);
            });
        })
    );
  }

  abort() {
    // Abort the upload process if needed
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

export default MyCustomUploadAdapterPlugin;
