import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { openai } from '../shared/openai';
import { classifyActionPrompt, createImagePrompt } from '../shared/prompts';
import { actions } from '../shared/actions';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const lastMessage = req.body.chat.slice(-1)[0];
    const action = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: classifyActionPrompt }, lastMessage],
    });
    console.log({ action: action.data['choices'] });
    const actionNumber = action.data['choices'][0]['message']['content'].trim();
    console.log({ actionNumber });
    if (actionNumber === actions.chat) {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: req.body.chat,
        });

        context.res = {
            body: response.data['choices'][0]['message'],
        };
    }

    if (actionNumber === actions.generateImage) {
        console.log('creating image');
        const imagePromptResponse = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: createImagePrompt }, lastMessage],
        });
        console.log(imagePromptResponse);
        const imageDescription = imagePromptResponse.data['choices'][0]['message']['content'].trim();
        const imageResponse = await openai.createImage({
            prompt: imageDescription,
            n: 1,
            size: '1024x1024',
        });
        const imageUrl = imageResponse.data.data[0].url;
        console.log({ imageUrl });
        context.res = {
            body: { role: 'assistant', content: imageUrl },
        };
    }
};
export default httpTrigger;
