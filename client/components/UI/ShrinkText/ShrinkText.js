function ShrinkText({text, maxChar}) {

    if (text.length >= maxChar) {
        return text.substring(0,[maxChar])+'...'
    }
    return text
}

export default ShrinkText;