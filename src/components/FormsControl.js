import React from 'react'

export const Textarea = ({input, meta, ...props}) => {
  const hasError = meta.touched && meta.error;
    return (
        <div>
        <div className={(hasError ? 'alert alert-danger' : '')}>
            <textarea {...input} {...props}/>
        </div>
            { hasError && <span className="alert alert-danger"> <strong>Attention! </strong>{meta.error}</span> }
        </div>
    )
}

export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div>
            <div className={(hasError ? 'alert alert-danger' : '')}>
                <input {...input} {...props}/>
            </div>
            { hasError && <span className="alert alert-danger"> <strong>Attention! </strong>{meta.error}</span> }
        </div>
    )
}