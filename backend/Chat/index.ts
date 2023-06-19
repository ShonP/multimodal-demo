import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { openai } from '../shared/openai';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const chat_completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: req.body.chat,
    });
    context.res = {
        body: chat_completion,
    };
};

export default httpTrigger;
