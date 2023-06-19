import axios from 'axios';

const endpoint = process.env.COGNITIVE_SERVICES_ENDPOINT;
const key = process.env.COGNITIVE_SERVICES_KEY;

const cognitiveServicesCaptionApi = axios.create({
    baseURL: `${endpoint}/computervision/imageanalysis:analyze?api-version=2023-02-01-preview`,
    headers: {
        'Ocp-Apim-Subscription-Key': key,
    },
    params: {
        features: 'caption',
    },
});

export const describeAnImage = async (url: string) => cognitiveServicesCaptionApi.post('', { url }).then(res => res.data.captionResult.text);
