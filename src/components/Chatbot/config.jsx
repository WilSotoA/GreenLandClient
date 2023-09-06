import { createChatBotMessage } from "react-chatbot-kit";
import { BotAvatar } from "./BotAvatar";
import { ActionSelectorWidget } from "./ActionSelectorWidget";


const botName = 'GreenlandBot';

export const config = {

  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
  },

  customStyles: {
    botMessageBox: {
      backgroundColor: '#fff',
      fontColor: 'black',
    },
    chatButton: {
      backgroundColor: '#8CB799',
    },
  },

  initialMessages: [
    createChatBotMessage(`Hello! I'm ${botName} what´s your name? `),    
  ],
  
  widgets: [
    {
      widgetName: "actionSelector",
      widgetFunc: (props) => <ActionSelectorWidget {...props} />,
      props: {},
    }
  ]
};














