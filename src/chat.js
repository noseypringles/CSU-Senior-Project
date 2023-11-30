import wixChatBackend from 'wix-chat-backend';

 export function sendChatMessage(messageText, channelId, metadata, sendAsVisitor) {
   wixChatBackend.sendMessage({
     "messageText": messageText,
     "channelId": channelId,
     "metadata": {metadata},
     "sendAsVisitor": sendAsVisitor
   })
   .then( () => {
     console.log("Chat message sent");
   })
   .catch( (error) => {
     console.log(error);
   });
 }