import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';


const modules = {
    toolbar: [
        [{ header: 1 }, { header: 2 }],
        [{ size: ["small", "normal", 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ['clean'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],

    ],
}


function TextEditor({ changeFn, value, style, className, placeholder, name, onBlur }) {
    return (
        <ReactQuill name={name} onBlur={onBlur} className={className} style={style} theme='snow' placeholder={placeholder} value={value} onChange={changeFn} modules={modules} />
    )
}

export default TextEditor