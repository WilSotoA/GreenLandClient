/* eslint-disable react/prop-types */
import React, { useState } from 'react';

export const MessageParser = ({ children, actions }) => {

  const [greeted, setGreeted] = useState(false);
  let userName = null;
  const validOptions = ['hello', 'hola', 'orders', 'how to order', 'placed successfully', 'shipping', 'delivery time', 'delivery cost', 'returns', 'return cost', 'shipping cost', 'refund', 'thanks', 'gracias'];

  const parse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (!greeted) {
      setGreeted(true);
      if (lowerMessage === 'hello' || lowerMessage === 'hola') {
        actions.handleUserResponse('user');
      } else {
        userName = message;
        actions.handleUserResponse(userName);
      }
    } else if (validOptions.includes(lowerMessage)) {
      switch (lowerMessage) {
        case 'orders':
          actions.handleOrders('Orders');
          break;
        case 'how to order':
          actions.handleHowToOrder('How to orders');
          actions.handleMessageTwo();
          break;
        case 'placed successfully':
          actions.handlePlacedSuccessfully();
          actions.handleMessageTwo();
          break;
        case 'shipping':
          actions.handleShipping('Shipping');
          break;
        case 'delivery time':
          actions.handleDeliveryTime('delivery time');
          actions.handleMessageTwo();
          break;
        case 'delivery cost':
          actions.handleDeliveryCost('delivery cost');
          actions.handleMessageTwo();
          break;
        case 'returns':
          actions.handleReturns('Returns');
          break;
        case 'return cost':
          actions.handleReturnCost('Return Cost');
          actions.handleMessageTwo();
          break;
        case 'shipping cost':
          actions.handleShippingCost('Shipping cost');
          actions.handleMessageTwo();
          break;
        case 'refund':
          actions.handleRefund('Refund');
          actions.handleMessageTwo();
          break;
        case 'thanks':
        case 'gracias':
          actions.handleBye();
          break;
      }
    } else {
      actions.handleNoOptions();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};
