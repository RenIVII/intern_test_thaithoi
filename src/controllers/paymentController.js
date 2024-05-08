const payOS = require("../utils/payos");
const PORT = process.env.PORT || 3000;
const YOUR_DOMAIN = process.env.YOUR_DOMAIN || `http://localhost:${PORT}`;
const getHomePage = (req, res) => {
  res.render("homePage.ejs");
};


const createPayment = async (req, res) => {
  // const YOUR_DOMAIN = `http://localhost:${PORT}`;
  
  const body = {
    orderCode: Number(String(Date.now()).slice(-6)),
    amount: 2000,
    description: "Thanh toan don hang",
    returnUrl: `${YOUR_DOMAIN}/success`,
    cancelUrl: `${YOUR_DOMAIN}/cancel`,
  };
  try {
    const paymentLinkResponse = await payOS.createPaymentLink(body);
    res.redirect(paymentLinkResponse.checkoutUrl);
  } catch (error) {
    console.error(error);
    res.send("Something went error");
  }
};
const getSuccessPage = async (req, res) => {
  const code = req.query.code;
  const id = req.query.id;
  const cancel = req.query.cancel;
  const status = req.query.status;
  const orderCode = req.query.orderCode;
  console.log(id, code, cancel, status, orderCode);
  if (cancel === "true" || status !== "PAID") {
    console.log("Payment is canceled or not paid");
    return res.redirect("/cancel");
  }
  const inforPayment = await payOS.getPaymentLinkInformation(orderCode);
  console.log(inforPayment);
  if (inforPayment === null || inforPayment.orderCode !== parseInt(orderCode)) {
    console.log("Payment not found");
    return res.redirect("/cancel");
  }
  res.render("successPage.ejs", { inforPayment: inforPayment });
};
const getCancelPage = (req, res) => {
  return res.render("cancelPage.ejs");
};
module.exports = {
  createPayment,
  getHomePage,
  getSuccessPage,
  getCancelPage,
};
