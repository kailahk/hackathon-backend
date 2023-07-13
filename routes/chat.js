const router = require('express').Router();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const openaiChatModel = 'gpt-3.5-turbo-0613';

router.post('/', async (req, res, next) => {
    try {
        const messages = req.body.messages;
        const response = await openai.createChatCompletion({
            model: openaiChatModel,
            messages: messages,
        });
        const answer = response.data.choices[0].message;
        res.json({ answer });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;