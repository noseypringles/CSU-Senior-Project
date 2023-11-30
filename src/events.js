/*****************************************************
 * Events for billing
 */

//event for when invoice is created
export function wixBilling_onInvoiceCreated(event) {
    let invoiceId = event.id.id;
    let email = event.customer.email;
}

// event when bill is paid
export function wixBilling_onInvoicePaid(event) {
    let invoiceId = event.id.id;
    let email = event.customer.email;
}

// event for when invoice is sent to customer email
export function wixBilling_onInvoiceSent(event) {
  let invoiceId = event.id.id;
  let email = event.customer.email;
}
  

//event when a chat is sent
export function wixChat_onMessage(event) {
  const message = event.payload.text;
  const participant = event.participantId;
}


/*****************
 backend/events.js
*******************/