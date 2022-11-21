import dynamic from "next/dynamic";
import axios from "axios";
import {useRef, useState} from "react";
import {alert} from "../../core/utils";

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
        const domainString = document.domain
        axios.post(
            '/api/uploads',
            Data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
            const res = {
                errorMessage: response?.data?.message,
                result: [
                    {
                        // url: response.data.fullUrl,
                        url: 'https://'+domainString+'/api/'+response.data.url,
                        size: response.data.file_size,
                        name: response.data.public_id
                    }
                ]
            }
            console.log(res)
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
            // console.log(imagesArr[index])
            const regexUrl = new RegExp(/(\/uploads.*\.(?:png|jpg|jpeg))/, 'g')
            const url = imagesArr[index].match(regexUrl)
            axios.delete('/api' + url[0])
                .then((response) => {
                    alert('Картинка удалена!', 'info')
                })
                .catch((error) => {
                    alert(error.msg || error.message, 'error')
                })
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
