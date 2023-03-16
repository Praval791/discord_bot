const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "chat-or-ask",
    description: "Ask or Chat with me",
    options: [
      {
        name: "prompt",
        description: "your question or chat with me",
        type: 3,
        maxLength: 50,
        required: true,
      },
    ],
  },
  {
    name: "text-to-image",
    description: "Convert text to image",
    options: [
      {
        name: "prompt",
        description: "prompt to generate image",
        type: 3,
        maxLength: 30,
        required: true,
      },
      {
        name: "n",
        description: "number of images to generate",
        type: 4,
        required: true,
        choices: [
          {
            name: 1,
            value: 1,
          },
          {
            name: 2,
            value: 2,
          },
          {
            name: 3,
            value: 3,
          },
          {
            name: 4,
            value: 4,
          },
          {
            name: 5,
            value: 5,
          },
        ],
      },
    ],
  },
];

module.exports = { commands };
