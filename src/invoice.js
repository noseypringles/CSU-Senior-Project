/**
 * This js file is to handle everything dealing with invoices.
 */
import {invoices} from 'wix-billing-backend';

//gets invoice version and add a payment to invoice
export function addPayment(id, payment) {
  return invoices.getInvoice(id)
    .then( (result) => {
      return invoices.addPayment(result.id, payment);
    });
}

/* Promise resolves to:
 * {
 *   {
 *     "id": {
 *       "id": "1ed3a515-24f9-4039-8937-2e69b6a2f33a",
 *       "version": 31
 *     }
 *   }
 * }
*/

//creates the invoice
const now = new Date()
const dueDate = new Date()
dueDate.setDate(now.getDate() + 30)

let customer = {
  // contact ID and email address must match an
  // existing contact in the site's contact list
  "contactId": "4f7c6637-0657-4696-a00b-9bc2ae4e035d", 
  "email": "john.doe@somedomain.com",
  "address": {
    "city": "New York",
    "subdivision": "NY",
    "postalCode": "10011",
    "country": "USA",
    "addressLine": "235 W 23rd St"
  },
  "billingAddress": {
    "country": "USA",
    "streetAddress": {
      "value": "235 W 23rd St",
      "type": "Name"
    },
    "addressLine": "235 W 23rd St, New York, NY 10011, USA",
    "addressLine2": "secondary address",
    "postalCode": "10011",
    "subdivision": "NY",
    "city": "New York"
  },
  "shippingAddress": {
    "country": "USA",
    "streetAddress": {
      "value": "235 W 23rd St",
      "type": "Name"
    },
    "addressLine": "235 W 23rd St, New York, NY 10011, USA",
    "addressLine2": "secondary address",
    "postalCode": "10011",
    "subdivision": "NY",
    "city": "New York"
  },
  "phone": "5555555555",
  "company": "Some Company",
  "companyId": "Some Company Id",
  "fullName": "John Doe",
  "firstName": "John",
  "lastName": "Doe"
};

let lineItems = [
  {
    "id": "00001",
    "name": "Item 1",
    "description": "First Item",
    "price": 10.50,
    "quantity": 3,
    "taxes": [{
      "name": "tax name",
      "rate": 8.5,
      "code": "tax code"
    }]
  },
  {
    "id": "00002",
    "name": "Item 2",
    "description": "Second Item",
    "price": 50,
    "quantity": 1,
    "taxes": [{
      "name": "tax name",
      "rate": 8.5,
      "code": "tax code"
    }]
  }
];

let discount = {
  "value": 2.5,
  "type": "Fixed"
};

const payments = [{
  "id": "00001",
  "type": "Offline",
  "amount": 25.50,
  "date": now
}];

let metadata = {
  "notes": "Some note.",
  "legalTerms": "Some legal terms",
  "sourceUrl": "http://legalurl.com",
  "source": "Some source",
  "sourceRefId": "Some source ref id"
};

let dates = {
  "issueDate": now,
  "dueDate": dueDate
};

export function createInvoice() {
  let createInvoiceFields = {
    "title": "My Invoice",
    "customer": customer,
    "currency": "USD",
    "lineItems": lineItems,
    "discount": discount,
    "payments": payments,
    "metadata": metadata,
    "dates": dates
  };

  return invoices.createInvoice(createInvoiceFields);
}

/* Promise resolves to:
 * {
 *   "id": {
 *     "id": "411a5551-b0f6-4826-8a41-ebae2879f857"
 *     "version": 25
 *   }
 * }
*/

//will create queries of invoices and create a preview link to the first result
import wixData from 'wix-data';

export async function myCreateInvoicePreviewUrlFunction() {

	const returnedInvoices = await wixData.query('Billing/Invoices').find();
	const firstInvoice = returnedInvoices.items[0];

	const id = {
		id: firstInvoice._id,
		version: firstInvoice.version
	};

  const options = {
    suppressAuth: false
  };

	return await invoices.createInvoicePreviewUrl(id, options);
}

/* Promise resolves to:
 *
 * "https://invoices.wix.com/invoice/4ffbe78f-d789-5f3b-9a01-e892987ee43e:a5af37a4-753d-4701-8518-be23920ac3a0/view?token=628fa483-a473-4408-bac7-7501e81b32e3"
 */

//deletes a specific invoice
export function deleteInvoice(id) {
  return invoices.deleteInvoice(id);
}

//gets a specific invoice
export function getInvoice(id) {
  return invoices.getInvoice(id);
}

/* Promise resolves to:
 * 
 * {  
 *   "id":{  
 *     "id": "411a5551-b0f6-4826-8a41-ebae2879f857",
 *     "version": 25
 *   },
 *   "status": "Draft",
 *   "number": "0000001",
 *   "title": "My Invoice",
 *   "currency": "USD",
 *   "customer": {  
 *     "contactId": "4f7c6637-0657-4696-a00b-9bc2ae4e035d",
 *     "email": "john.doe@somedomain.com",
 *     "address": {
 *       "country": "USA",
 *       "subdivision": "NY",
 *       "city": "New York",
 *       "postalCode": "10011",
 *       "streetAddress": {
 *         "value": "235 W 23rd St",
 *         "type": "Name"
 *       },
 *       "addressLine": "someStreet",
 *       "formatted": "235 W 23rd St, New York, NY 10011, USA"
 *     },
 *     "billingAddress": {
 *       "country": "USA",
 *       "streetAddress": {
 *         "value": "235 W 23rd St",
 *         "type": "Name"
 *       },
 *       "addressLine": "235 W 23rd St, New York, NY 10011, USA",
 *       "postalCode": "10011",
 *       "subdivision": "NY",
 *       "city": "New York",
 *       "formatted": "235 W 23rd St, New York, NY 10011, USA"
 *     },
 *     "shippingAddress": {
 *       "country": "USA",
 *       "streetAddress": {
 *         "value": "235 W 23rd St",
 *         "type": "Name"
 *       },
 *       "addressLine": "235 W 23rd St, New York, NY 10011, USA",
 *       "postalCode": "10011",
 *       "subdivision": "NY",
 *       "city": "New York",
 *       "formatted": "235 W 23rd St, New York, NY 10011, USA"
 *     },
 *     "phone": "5555555555",
 *     "company": "Some Company",
 *     "companyId": "Some Company Id",
 *     "fullName": "John Doe",
 *     "firstName": "John",
 *     "lastName": "Doe"
 *   },
 *   "dates": {  
 *     "issueDate": 2019-03-13T00:00:00.000Z,
 *     "dueDate": 2019-06-12T00:00:00.000Z,
 *     "lastSeenDate": 2019-03-14T00:00:00.000Z
 *   },
 *   "discount": {
 *     "value": 2.5,
 *     "type": "Fixed"
 *   },
 *   "lineItems":[  
 *     {  
 *       "id": "00001",
 *       "name": "Item 1",
 *       "description": "First Item",
 *       "price": 10.5,
 *       "quantity": 3,
 *       "taxes": [
 *         {
 *           "name": "tax name",
 *           "rate": 8.5,
 *           "code": "tax code"
 *         }
 *       ]
 *     },
 *     {
 *       "id": "00002",
 *       "name": "Item 2",
 *       "description": "Second Item",
 *       "price": 50,
 *       "quantity": 1,
 *       "taxes": [
 *         {
 *           "name": "tax name",
 *           "rate": 8.5,
 *           "code": "tax code"
 *         }
 *       ]
 *     }
 *   ],
 *   "locale": {  
 *     "language": "en"
 *   },
 *   "payments": [{
 *     "id": "4j9q4o00-4205-8q83-003d-3ofd9d8wmf0w",
 *     "type": "offline",
 *     "amount": "25.50",
 *     "date": 2019-03-23T00:00:00.000Z"
 *   }],
 *   "totals": {  
 *     "discountAmount": null,
 *     "taxedAmount": 6.93,
 *     "fees": [],
 *     "subtotal": 81.5,
 *     "total": 88.43
 *   },
 *   "dynamicTotals": {
 *     "paidAmount": 25.50,
 *     "balance": 62.39
 *   },
 *   "taxes": [  
 *     {  
 *       "name": "tax name",
 *       "rate": 8.5,
 *       "taxable": 81.5,
 *       "taxed": 6.93,
 *       "code": "tax code"
 *     }
 *   ],
 *   "metadata": {  
 *     "notes": "Some note",
 *     "legalTerms": "Some legal terms",
 *     "sourceUrl": "http://legalurl.com",
 *     "source": "Some source",
 *     "sourceRefId": "Some source ref id"
 *   },
 *   "companyId": "Some company id",
 *   "wasSent": true
 * }
 */

//gets the invoice version and sends the invoice to customer via email
export function sendInvoiceToCustomer(id, subject, body) {
  const emailInfo = {
    "subject": subject,
    "body": body
  };
  
  return invoices.getInvoice(id)
    .then( (result) => {
      return invoices.sendInvoice(result.id, emailInfo);
    } );
}

//updates an existing invoice
export function updateInvoice(id) {
  return invoices.getInvoice(id)
    .then( (result) => {
      //make some changes
      result.metadata.notes = "An updated note.";

      let updateFields = {
        "title": result.title,
        "customer": result.customer,
        "currency": result.currency,
        "lineItems": result.lineItems,
        "discount": result.discount,
        "payments": result.payments,
        "metadata": result.metadata,
        "dates": result.dates
      };
      return invoices.updateInvoice(result.id, updateFields);
    } );
}

/* Promise resolves to:
 * {
 *   {
 *     "id": {
 *       "id": "1ed3a515-24f9-4039-8937-2e69b6a2f33a",
 *       "version": 31
 *     }
 *   }
 * }
 */

//gets the invoice version and voids the invoice
export function voidInvoice(id, version) {
  const idAndVersion = {
    "id": id,
    "version": version
  };

  return invoices.getInvoice(id)
    .then( (result) => {
      return invoices.voidInvoice(idAndVersion);
    } );
}