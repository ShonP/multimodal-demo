import { AzureFunction, Context, HttpRequest } from '@azure/functions';
require('dotenv').config();
import { actions } from '../shared/actions';
import { chat, createImage, decideAction, describeImage } from './actions';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const lastMessage = req.body.chat.slice(-1)[0];
    const actionNumber = await decideAction(lastMessage);

    if (actionNumber === actions.chat) {
        const response = await chat(req.body.chat);

        context.res = {
            body: response,
        };
    }

    if (actionNumber === actions.generateImage) {
        const response = await createImage(lastMessage);

        context.res = {
            body: response,
        };
    }
    if (actionNumber === actions.describeImage) {
        const response = await describeImage(lastMessage);

        context.res = {
            body: response,
        };
    }
};
export default httpTrigger;
