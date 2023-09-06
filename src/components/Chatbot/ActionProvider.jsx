/* eslint-disable react/prop-types */
import React from 'react';

export const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello! What\'s your name?');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      waitingForName: true
    }));
  };


  const handleUserResponse = (name) => {
    const botMessage = createChatBotMessage(`Hello ${name}! How can I help you?.What information are you looking for?.`,
    );

    setState((prev) => ({
      ...prev,
      waitingForName: false,
      messages: [...prev.messages, botMessage],
    }));
    handleOptions()
  };


  const handleOptions = () => {
    const botMessage = createChatBotMessage('Here are some options:',
      {
        widget: "actionSelector",
        delay: 500,
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));


  };

  const handleOrders = (selectedAction) => {
    if (selectedAction === "Orders") {
      console.log(selectedAction);
      const botMessage = createChatBotMessage('Do you need help regarding HOW TO ORDER or do you need to know if your order is PLACED SUCCESSFULLY? ');

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }
  }

  const handleHowToOrder = () => {
    const botMessage = createChatBotMessage('How to order?    Ordering on our website is very fast and easy! You just have to follow these steps:    Select the product and the quantity you want and add it to the shopping cart;    Confirm and proceed to Checkout;    Fill a simple form with billing address and/or shipping address; choose the shipping method and the payment method and place the order.')

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

  }

  const handlePlacedSuccessfully = () => {
    const botMessage = createChatBotMessage('Is my order placed successfully?    After your order is registered in our system and the payment successfully received, we will send you an automatic order confirmation e-mail with your order number and details that you provided during Checkout. You can always check our "Track My Order" page. In here after providing your order number and email address, you will be able to see all the details about your order.')

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));


  }

  // handle Shipping ---------------------------------------------
  const handleShipping = (selectedAction) => {
    if (selectedAction === "Shipping") {
      const botMessage = createChatBotMessage(
        `You selected ${selectedAction},
        What is the estimated delivery time or delivery cost? .
        `
      )
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    } else {
      const botMessage = createChatBotMessage(
        'Enter a valid option'
      );

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }
  }

  const handleDeliveryTime = () => {
    const botMessage = createChatBotMessage('Delivery time depends on the destination country and the shipping method you choose: Regular Mail through National Post Office Service and Express Shipping through DHL (courier). Once the payment is confirmed, we do our best to make sure the orders are shipped within 1 to 3 working days')

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  const handleDeliveryCost = () => {
    const botMessage = createChatBotMessage('As every order is unique, shipping costs vary depending on the chosen delivery method, weight, and destination of your order. choosing the delivery option and indicating your address, the delivery price will be automatically updated and visible. We also offer free shipping for orders above a certain value - please check on top of our website what value it is in case of delivery to your country.')

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }
  // ---------------------------------------------------------------

  // handle returns 
  const handleReturns = (selectedAction) => {
    if (selectedAction === "Returns") {
      const botMessage = createChatBotMessage('Do you need to know what is the Return cost or shipping cost?')

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));

    }
  }

  const handleReturnCost = () => {
    const botMessage = createChatBotMessage('We are more than happy to cover/refund the cost of return when it is required due to our error. We will not refund the cost of returning the order if the return is caused by the customer’s mistake or if the product(-s) is no longer wanted or required. These costs will need to be covered by you upfront.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  const handleShippingCost = () => {
    const botMessage = createChatBotMessage('Which items can/cannot be returned? In order for the return to be accepted, it must respect the following rules: The product(s) must never be opened or used;The product(s) has to be sealed in its original packaging, including the protective; cellophane or labels (if any) - if the product box has no mark or seal, you must keep intact the box, or any other packaging; You shall ensure that the product conforms to all the accompanying components: samples, gifts, among others, respecting the original shipping conditions;')

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }


  const handleMessage = () => {
    const botMessage = createChatBotMessage('Thank you for using our services')

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    setTimeout(() => {
      window.location.href = '/home';
    }, 50000);
  }


  const handleRefund = (selectedAction) => {
    if (selectedAction === "Refund") {
      const botMessage = createChatBotMessage('How and when you will receive a refund?      We will process a refund back to the original account used to purchase the item. It can take extra 5-10 working days to be processed. You will receive an e-mail confirming your account has been credited once your refund is processed.      PayPal funds are available back at the account right after the refund was processed.');

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    } else {
      const botMessage = createChatBotMessage(
        `You selected ${selectedAction}.`
      );

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }
  }


  const handleNoOptions = () => {
    const botMessage = createChatBotMessage('Enter a valid option!');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  const handleMessageTwo = () => {
    const botMessage = createChatBotMessage('If you need more information, do not hesitate to use our contact form.');
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  const handleBye = () => {
    const botMessage = createChatBotMessage('Your welcome!');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
    handleMessage();
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleUserResponse,
            handleOrders,
            handleShipping,
            handleReturns,
            handleRefund,
            handleBye,
            handleDeliveryTime,
            handleDeliveryCost,
            handleNoOptions,
            handleReturnCost,
            handleShippingCost,
            handleHowToOrder,
            handlePlacedSuccessfully,
            handleMessageTwo
          },
        });
      })}
    </div>
  );
};


