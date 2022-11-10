import dynamic from "next/dynamic";

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
                onChange={onChange}
            />
        </div>
    );
}
