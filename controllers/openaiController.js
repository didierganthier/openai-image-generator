const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const generateImage = async (req, res) => {
    try {
        const response = await openai.createImage({
            prompt: 'Polar bear on ice skates',
            n: 1,
            size: '512x512',
        });
        
        const imageUrl = response.data.data[0].url;

        res.status(200).json({
            success: true,
            data: imageUrl,
        });
    } catch (error) {
        if(error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error);
        }

        res.status(500).json({
            success: false,
            error: 'The image could not be generated.',
        });
    }
};

module.exports = {
    generateImage,
};