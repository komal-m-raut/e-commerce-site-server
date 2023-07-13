interface IInvoice {
  soldBy: string;
  shipFrom: string;
  gstin: string;
  invoiceNumber: string;
  orderId: string;
  orderDate: string;
  invoiceDate: string;
  companyPan: string;
  totalItems: string;
  billTo: string;
  shipTo: string;
  billingAddress: string;
  shippingAddress: string;
  products: [
    {
      fsnNo: string;
      hsnNo: string;
      productName: string;
      quantity: string;
      grossAmount: string;
      discount: string;
      taxableValue: string;
      cgst: string;
      sgst: string;
      warrantyPeriods: string;
      imeiNo: string;
      csgstAmount: string;
      sgstAmount: string;
      totalAmount: string;
    },
  ];
  shippingQuantity: string;
  shippingGrossAmount: string;
  shippingDiscounts: string;
  shippingTaxableValue: string;
  shippingCgst: string;
  shippingSgst: string;
  shippingAmount: string;
}

const generateInvoice: (data: IInvoice) => string = (data) => {
  const {
    soldBy,
    shipFrom,
    gstin,
    invoiceNumber,
    orderId,
    orderDate,
    invoiceDate,
    companyPan,
    totalItems,
    billTo,
    shipTo,
    billingAddress,
    shippingAddress,
    products,
    shippingQuantity,
    shippingGrossAmount,
    shippingDiscounts,
    shippingTaxableValue,
    shippingCgst,
    shippingSgst,
    shippingAmount,
  } = data;
  let totalQuantity = 0;
  let totalGrossAmount = 0;
  let totalDiscounts = 0;
  let totalTaxableValue = 0;
  let totalCgst = 0;
  let totalSgst = 0;
  let totalAmount = 0;
  products.forEach((product) => {
    totalQuantity += +product.quantity;
    totalGrossAmount += +product.grossAmount;
    totalDiscounts += +product.discount;
    totalTaxableValue += +product.taxableValue;
    totalCgst += +product.csgstAmount;
    totalSgst += +product.sgstAmount;
    totalAmount += +product.totalAmount;
  });
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Invoice</title>
      <style>
      body {
        padding: 1rem;
        font-family: sans-serif;
      }
      .header {
        text-align: center;
        font-weight: 500;
      }
      .section1 {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }
      .shop-details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        line-height: 16px;
      }
      .shop-details p,
      h5,
      h6 {
        margin: 4px;
        font-weight: normal;
      }

      .section2 {
        width: 100%;
      }
      table {
        border-collapse: collapse;
        border: none;
        width: 100%;
      }

      .section2 td {
        vertical-align: top;
        padding: 8px;
        width: 25%;
        border-width: 2px 0;
        border-style: solid;
        border-color: black;
      }

      .section3 th,
      td {
        vertical-align: top;
        padding: 8px;
        border-width: 2px 0;
        border-style: solid;
        border-color: black;
        border-top: 0;
      }

      .section3 th {
        text-align: left;
        font-size: 14px;
      }

      .my-table {
        border-collapse: collapse;
        width: 100%;
      }

      .my-table td {
        border-top: none;
        padding: 10px;
      }

      .my-table tr:nth-last-child(2) td {
        border: none;
      }
      .section4 {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .section4 h6 {
        margin-top: 4px;
      }
    </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h3>Tax Invoice</h3>
        </div>
        <div class="section1">
          <div class="shop-details">
            <p><b>Sold by: ${soldBy},</b></p>
            <h6><b>Ship from address: </b> ${shipFrom}</h6>
            <h5><b>GSTIN:</b> ${gstin}</h5>
          </div>
          <div class="qrcode">
            <img src="" alt="" />
            <h5><b>Invoice Number: </b>${invoiceNumber}</h5>
          </div>
        </div>
        <div class="section2">
          <table>
            <tr>
              <td>
                <h5><b>Order Id: </b>${orderId}</h5>
                <h5><b>Order Date: </b>${orderDate}</h5>
                <h5><b>Invoice Date: </b>${invoiceDate}</h5>
                <h5><b>PAN: </b>${companyPan}</h5>
                <br />
                <h5><b>Total Items: </b>${totalItems}</h5>
              </td>
              <td>
                <h5>
                  <b>Bill To ${billTo}</b> <br />
                  ${billingAddress}<br />
                </h5>
              </td>
              <td>
                <h5>
                  <b>Ship To ${shipTo}</b> <br />
                  ${shippingAddress}<br />
                </h5>
              </td>
              <td>
                <h6>
                  *Keep this invoice and manufacturer box for <br />
                  warranty purposes.
                </h6>
              </td>
            </tr>
          </table>
        </div>
        <div class="section3">
          <table>
            <tr>
              <th>Product</th>
              <th>Title</th>
              <th>Qty</th>
              <th>Gross Amount ₹</th>
              <th>Discounts /Coupons ₹</th>
              <th>Taxable Value ₹</th>
              <th>CGST ₹</th>
              <th>SGST /UTGST ₹</th>
              <th>Total ₹</th>
            </tr>
            <tbody id="productRows">
              ${products
                .map(
                  (product) => `
                    <tr>
                      <td>
                        <h5>FSN:${product.fsnNo} HSN/SAC:${product.hsnNo}</h5>
                      </td>
                      <td>
                        <h5>${product.productName}</h5>
                      </td>
                      <td>
                        <h5>${product.quantity}</h5>
                      </td>
                      <td>
                        <h5>${product.grossAmount}</h5>
                      </td>
                      <td>
                        <h5>${product.discount}</h5>
                      </td>
                      <td>
                        <h5>${product.taxableValue}</h5>
                      </td>
                      <td>
                        <h5>${product.cgst}</h5>
                      </td>
                      <td>
                        <h5>${product.sgst}</h5>
                      </td>
                      <td>
                        <h5>${product.totalAmount}</h5>
                      </td>
                    </tr>
                  `,
                )
                .join('')}
                <tr class="my-table">
                <td></td>
                <td>
                  <h5><b>Shipping And Handling Charges</b></h5>
                </td>
                <td>${shippingQuantity}</td>
                <td>${shippingGrossAmount}</td>
                <td>${shippingDiscounts}</td>
                <td>${shippingTaxableValue}</td>
                <td>${shippingCgst}</td>
                <td>${shippingSgst}</td>
                <td>${shippingAmount}</td>
              </tr>
              <tr class="my-table">
                <td></td>
                <td>
                  <h5><b>Total</b></h5>
                </td>
                <td>${totalQuantity}</td>
                <td>${totalGrossAmount}</td>
                <td>${totalDiscounts}</td>
                <td>${totalTaxableValue}</td>
                <td>${totalCgst}</td>
                <td>${totalSgst}</td>
                <td>${totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </body>
  </html>
`;
};

export default generateInvoice;
