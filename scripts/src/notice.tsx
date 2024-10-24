import * as React from 'react';
import ReactDOM from 'react-dom';
import createRoot from 'react-dom/client';


function Notice(
    {title, content}: {title: string, content: string}
) {
    let notice = <div className='notice'>
        <div className='notice-title'>
            <h1 style={{
                color: 'white'
            }}>{title}</h1>
        </div>
        {content}
    </div>;
    return notice;
}

document.addEventListener('load', () => {
    ReactDOM.render(
    <Notice title='Hello' content='World' />,
    document.getElementById('root'));
})
console.log(<Notice title='Hello' content='World' />);