import { useState } from 'react';

export default function InputCard({ id, typeComponent, typeInput, value, body }) {
    const [inputValue, setInputValue] = useState(value);

    switch (typeComponent) {
        case 'image':
            return (
                <>
                    <div>
                        <img src={`data:image/png;base64, ${value}`} style={{ height: '128px' }} />
                        <br />
                        <label className='fw-bold my-3' htmlFor={id}>{body}</label>
                        <div className='input-group'>
                            <input className='form-control border-secondary-subtle' name={id} type={typeInput} />
                        </div>
                    </div>
                </>
            );
        case 'field':
            return (
                <>
                    <div className="my-4">
                        <div className='input-group'>
                            <span className='input-group-text border-secondary-subtle'>{body}</span>
                            <input className='form-control border-secondary-subtle' value={inputValue} onChange={event => setInputValue(event.target.value)} />
                        </div>
                    </div>
                </>
            );
        case 'textarea':
            return (
                <>
                    <div className="my-4">
                        <div className='input-group'>
                            <span className='input-group-text border-secondary-subtle'>{body}</span>
                            <textarea className='form-control border-secondary-subtle' value={inputValue} onChange={event => setInputValue(event.target.value)}></textarea>
                        </div>
                    </div>
                </>
            );
    }
}
