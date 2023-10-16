import {AlertStoryMessageType} from '@molecule/Alert/AlertStory';

const alertStoryMessage = (type: string) => {
  const message: AlertStoryMessageType = {
    type,
    title: 'Title',
    message: "Lorem ipsum dolor sit amet consectetur. Viverra dictum ve",
  };
  const title: AlertStoryMessageType = {
    type,
    message: "Lorem ipsum dolor sit amet consectetur. Viverra dictum ve ",
  };
  const close: AlertStoryMessageType = {
    type,
    close: true,
    // title: 'Love me dearly',
    message: "Lorem ipsum dolor sit amet consectetur. Viverra dictum ve",
  };
  const closeTitle: AlertStoryMessageType = {
    type,
    close: true,
    title: 'Title',
    message: "Lorem ipsum dolor sit amet consectetur. Viverra dictum ve",
  };

  return {
    title,
    closeTitle,
    message,
    close,
  };
};

export default alertStoryMessage;
