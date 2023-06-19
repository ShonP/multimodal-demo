import { OutputCard, Suggestion, SuggestionList } from '@fluentai/react-copilot';
import './App.css';
import { LatencyLoader, LatencyWrapper } from '@fluentai/react-copilot';
import { Textarea, TextareaSubmitEvents, TextareaValueData } from '@fluentai/textarea';
import { useMutation } from '@tanstack/react-query';
import { chatApi } from './services/api';
import { useState } from 'react';
import { isValidHttpUrl } from './utils/isValidHttpUrl';
import openAIIcon from './assets/openai.png';
import meIcon from './assets/me.webp';

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
    const handleSuggestion = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.textContent && setText(e.currentTarget.textContent);
    };
    return (
        <div className="root">
            <LatencyWrapper style={{ padding: 0, flex: 1 }}>
                <LatencyLoader className={isLoading ? 'loading' : ''} progress={{ value: isLoading ? undefined : 0 }} header="">
                    <div className="chat">
                        {state
                            .filter(item => item.role !== 'system')
                            .map((item, idx) => {
                                const urlInImage = item.content.match(/\bhttps?:\/\/\S+/gi)?.[0];
                                const isValidImage = urlInImage && isValidHttpUrl(urlInImage);

                                return (
                                    <OutputCard style={{ display: 'flex', flexDirection: 'row', gap: 12 }} key={idx}>
                                        <img style={{ width: 24, height: 24 }} src={idx % 2 ? openAIIcon : meIcon} />
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
            <SuggestionList>
                <Suggestion onClick={handleSuggestion}>Show me an image of a dog</Suggestion>
                <Suggestion onClick={handleSuggestion}>How do I write a Contoso project brief?</Suggestion>
                <Suggestion onClick={handleSuggestion}>What are the OKRs this quarter?</Suggestion>
                <Suggestion onClick={handleSuggestion}>Brainstorm ideas for a virtual team bonding activity</Suggestion>
            </SuggestionList>
            <Textarea value={text} onChange={(_, val) => setText(val.value)} onSubmit={onSubmit} placeholder="Ask a question or request, or type '/' for suggestions" />
        </div>
    );
}

export default App;
