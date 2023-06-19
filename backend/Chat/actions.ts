import { describeAnImage } from '../shared/cognitiveServices';
import { openai } from '../shared/openai';
import { classifyActionPrompt, createImagePrompt } from '../shared/prompts';

export const decideAction = async lastMessage => {
    const action = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: classifyActionPrompt }, lastMessage],
    });
    const actionNumber = action.data['choices'][0]['message']['content'].trim();

    return actionNumber;
};

export const chat = async messages => {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
    });

    return response.data['choices'][0]['message'];
};

export const createImage = async lastMessage => {
    const imagePromptResponse = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: createImagePrompt }, lastMessage],
    });
    const imageDescription = imagePromptResponse.data['choices'][0]['message']['content'].trim();
    const imageResponse = await openai.createImage({
        prompt: imageDescription,
        n: 1,
        size: '1024x1024',
    });
    const imageUrl = imageResponse.data.data[0].url;

    return { role: 'assistant', content: imageUrl };
};

export const describeImage = async lastMessage => {
    const imageUrl = lastMessage.content.match(/\bhttps?:\/\/\S+/gi)[0];
    const description = await describeAnImage(imageUrl);

    return { role: 'assistant', content: description };
};
