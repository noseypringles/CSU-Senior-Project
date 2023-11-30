import wixData from 'wix-data';

$w.onReady(function () {
  // image URLs and corresponding collection page URLs to this array of objects
  const imagesData = [
    { imageUrl: 'https://static.wixstatic.com/media/5842d6_924a8862f15048179d4c339759ea694b~mv2.jpg', pageUrl: 'page1' },
    { imageUrl: 'https://static.wixstatic.com/media/5842d6_4750cc573db84160a4a221aac914e474~mv2.jpg', pageUrl: 'page2' },
    { imageUrl: 'https://static.wixstatic.com/media/5842d6_8a709ad0a8574d64862806f5058a6ae2~mv2.jpg', pageUrl: 'page3' },
	{ imageUrl: 'https://static.wixstatic.com/media/5842d6_cfb5c433694e4de9a2a70cef42db8a6b~mv2.jpg', pageUrl: 'page3' },
  ];

  // Set up a counter to keep track of the current image index
  let currentIndex = 0;

  // Function to update the image source and navigate to the collection page
  function updateImageAndNavigate() {
    const currentImage = imagesData[currentIndex];
    $w('#imageElement').src = currentImage.imageUrl;

    // Add an onClick event to the image element
    $w('#imageElement').onClick(() => {
      // Navigate to the specified collection page
      wixLocation.to(`/collection/${currentImage.pageUrl}`);
    });
  }

  // Function to handle automatic image change
  function autoChangeImage() {
    currentIndex = (currentIndex + 1) % imagesData.length;
    updateImageAndNavigate();
  }

  // Set an interval to automatically change the image (adjust the duration as needed)
  const intervalId = setInterval(autoChangeImage, 3000); // Change image every 3 seconds

  // Initial image setup
  updateImageAndNavigate();
});
