import { OutputCard } from '@fluentai/react-copilot';
import './App.css';

import { Textarea, TextareaSubmitEvents, TextareaValueData } from '@fluentai/textarea';
import { useMutation } from '@tanstack/react-query';
import { chatApi } from './services/api';
import { useState } from 'react';
import { isValidHttpUrl } from './utils/isValidHttpUrl';
const initialChat = [{ role: 'system', content: 'You are a helpful assistant.' }];

function App() {
    const [state, setState] = useState(initialChat);
    const [text, setText] = useState('');
    const { mutate } = useMutation({
        mutationFn: chatApi,
        onSuccess: data => {
            setState(prevState => [...prevState, data]);
        },
    });

    const onSubmit = (_: TextareaSubmitEvents, text: TextareaValueData) => {
        setText('');
        setState(prevState => [...prevState, { role: 'user', content: text.value }]);
        mutate({
            chat: [...state, { role: 'user', content: text.value }],
        });
    };

    return (
        <div className="root">
            <div className="chat">
                {state.map(item => (
                    <OutputCard key={item.content}>{isValidHttpUrl(item.content) ? <img style={{ height: 200, width: 200 }} src={item.content} /> : <div>{item.content}</div>}</OutputCard>
                ))}
            </div>
            <Textarea value={text} onChange={(_, val) => setText(val.value)} onSubmit={onSubmit} placeholder="Ask a question or request, or type '/' for suggestions" />
        </div>
    );
}

export default App;
