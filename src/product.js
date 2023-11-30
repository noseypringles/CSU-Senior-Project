$w.onReady(function () {
	const addToCartBtn = $w("#addToCartBtn");
	const buyNowBtn = $w("#buyNowBtn"); // Add this line
	const miniCart = $w("#miniCart");
	const viewCartBtn = $w("#viewCartBtn");
	const exitBtn = $w("#exitBtn");

	addToCartBtn.onClick(() => {
		miniCart.expand();
	});

	buyNowBtn.onClick(() => {
		wixLocation.to('/cart-page');
		console.log('Buy Now clicked');
	});

	viewCartBtn.onClick(() => {
		wixLocation.to('/cart-page');
		console.log('View Cart clicked');
	});

	exitBtn.onClick(() => {
		miniCart.collapse();
	});
});
