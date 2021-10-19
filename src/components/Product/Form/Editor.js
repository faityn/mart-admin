import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import imageUpload from "quill-plugin-image-upload";
import { useSelector } from "react-redux";
import { UPLOAD_IMAGE } from "../Queries";
Quill.register("modules/imageUpload", imageUpload);

const Editor = ({ onChangeQuillDescription, body }) => {
    const { apolloClient } = useSelector((state) => state);
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: "snow",
            placeholder: "",
            modules: {
                toolbar: [
                    [{ header: "1" }, { header: "2" }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["blockquote", "code-block", "link", "image", "video"],
                    [{ color: [] }, { background: [] }],
                ],
                imageUpload: {
                    // upload: (image) => {
                    //     new Promise((resolve, reject) => {
                    //         apolloClient.uploadClient
                    //             .mutate({
                    //                 mutation: UPLOAD_IMAGE,
                    //                 variables: { image },
                    //             })
                    //             // .then((response) => response.json())
                    //             .then((result) => {
                    //                 if (
                    //                     result.data.uploadImageProduct
                    //                         .statusCode === 200
                    //                 ) {
                    //                     resolve(
                    //                         "https://d2v3r41yrz0w0c.cloudfront.net/product/medium/" +
                    //                             result.data.uploadImageProduct
                    //                                 .data
                    //                     );
                    //                 }
                    //             })
                    //             .catch((error) => {
                    //                 reject("Upload failed");
                    //                 alert(error);
                    //             });
                    //     });
                    upload: (file) => {
                        return new Promise((resolve, reject) => {
                            const formData = new FormData();
                            formData.append("image", file);

                            fetch(
                                `https://api.imgbb.com/1/upload?key=4fffb9e12f0f8f1c95e13b53bfdeb7d1`,
                                {
                                    method: "POST",
                                    body: formData,
                                }
                            )
                                .then((response) => response.json())
                                .then((result) => {
                                    console.log(result);
                                    resolve(result.data.url);
                                })
                                .catch((error) => {
                                    reject("Upload failed");
                                    console.error("Error:", error);
                                });
                        });
                    },
                },
            },
        });
        const quill = quillInstance.current;
        quill.on("text-change", (delta, oldDelta, source) => {
            if (source === "user") {
                onChangeQuillDescription(quill.root.innerHTML);
            }
        });
    }, [onChangeQuillDescription]);

    const mounted = useRef(false);
    useEffect(() => {
        if (mounted.current) return;
        mounted.current = true;
        quillInstance.current.root.innerHTML = body;
    }, [body]);
    return <div ref={quillElement} name="description" />;
};

export default Editor;
