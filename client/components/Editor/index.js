import dynamic from "next/dynamic";
import axios from "axios";

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false
});

export default function Editor({ initialContent = '', name, onChange, props, contTst }) {

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
        console.log(targetElement.src)
        console.log(core)
    }

    const handleImageUploadError = (errorMessage, result) => {
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
