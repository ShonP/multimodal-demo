import { OutputCard } from '@fluentai/react-copilot';
import './App.css';
import { LatencyLoader, LatencyWrapper } from '@fluentai/react-copilot';
import { Textarea, TextareaSubmitEvents, TextareaValueData } from '@fluentai/textarea';
import { useMutation } from '@tanstack/react-query';
import { chatApi } from './services/api';
import { useState } from 'react';
import { isValidHttpUrl } from './utils/isValidHttpUrl';
const initialChat = [{ role: 'system', content: 'You are a helpful assistant.' }];

function App() {
    const [state, setState] = useState(initialChat);
    const [text, setText] = useState('');
    const { mutate, isLoading } = useMutation({
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
            <LatencyWrapper style={{ padding: 0, flex: 1 }}>
                <LatencyLoader progress={{ value: isLoading ? undefined : 0 }} header="">
                    <div className="chat">
                        {state.map(item => {
                            const urlInImage = item.content.match(/\bhttps?:\/\/\S+/gi)?.[0];
                            const isValidImage = urlInImage && isValidHttpUrl(urlInImage);

                            return (
                                <OutputCard key={item.content}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span>{item.content}</span>
                                        {isValidImage && <img style={{ height: 200, width: 200 }} src={urlInImage} />}
                                    </div>
                                </OutputCard>
                            );
                        })}
                    </div>
                </LatencyLoader>
            </LatencyWrapper>

            <Textarea value={text} onChange={(_, val) => setText(val.value)} onSubmit={onSubmit} placeholder="Ask a question or request, or type '/' for suggestions" />
        </div>
    );
}

export default App;
