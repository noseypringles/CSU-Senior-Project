
$w.onReady(function () {
	const products = $w('.product');
  
	products.onClick((event) => {
	  const productId = event.context.dataset.productId;
	  wixLocation.to(`/product-page/${productId}`);
	  console.log(`Redirect to product page for Product ID: ${productId}`);
	});
  });
  