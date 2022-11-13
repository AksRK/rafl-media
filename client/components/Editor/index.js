import dynamic from "next/dynamic";
import axios from "axios";
import {useRef, useState} from "react";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false
});

export default function Editor({ initialContent = '', name, onChange, props, contTst }) {
    let imagesArr = []
    const options = {
        height: 750,
        "formats": [
            "p",
            "h3",
            "blockquote",
            "pre",
        ],
        "videoResizing": false,
        "videoFileInput": false,
        "imageResizing": false,
        "imageHeightShow": false,
        "imageAlignShow": false,
        // "imageUploadUrl": "http://localhost:4444/uploads",
        // "imageMultipleFile": true,
        buttonList: [
            [
                'undo',
                'redo',
                'formatBlock',
                'bold',
                'underline',
                'italic',
                'blockquote',
                'strike',
                'fontColor',
                'hiliteColor',
                'removeFormat',
                'outdent',
                'indent',
                'align',
                'list',
                'link',
                'image',
                "video",
                'showBlocks',
                'codeView',
                'preview'
            ]
        ],
    }

    const handleImageUploadBefore = (files, info, uploadHandler) => {
        const Data = new FormData()
        Data.append('image', files[0])

        axios.post(
            'http://localhost:4444/uploads',
            Data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
            // console.log(response)
            const res = {
                // The response must have a "result" array.
                errorMessage: response?.data?.message,
                result: [
                    {
                        url: response.data.fullUrl,
                        size: response.data.file_size,
                        name: response.data.public_id
                    }
                ]
            }
            uploadHandler(res)
        })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleImageUpload = (
        targetElement,
        index,
        state,
        info,
        remainingFilesCount,
        core,
    ) => {
        if (state === 'create') imagesArr.push(info.src)
        if (state === 'update') {
            console.log(imagesArr[index])
            imagesArr = imagesArr.map((image, i) => {
                if (i === index) {
                    return info.src
                }
                return image
            })
        }
        if (state === 'delete') {
            console.log(imagesArr[index])
        }
        // console.log(editor.current.core.context.image._infoList[index].src)
    }

    const handleImageUploadError = (errorMessage, result, core) => {
        console.log(errorMessage, result)
    }

    return (
        <div>
            <SunEditor
                {...props}
                placeholder={'Начните создавать статью)'}
                appendContents={contTst}
                name={name}
                lang={'ru'}
                setContents={initialContent}
                setDefaultStyle={'font-family: Inter;'}
                setOptions={options}
                onImageUploadBefore={handleImageUploadBefore}
                onImageUpload={handleImageUpload}
                onImageUploadError={handleImageUploadError}
                onChange={onChange}
            />
        </div>
    );
}
