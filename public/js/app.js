/**
 * Sends a request to the server to get Uber products based on passed in
 * latitude and longitude positions.
 * @param  {number} lat The location's latitude value
 * @param  {number} lng The location's longitude value
 * @return {[Products]]} The Uber products available at the queried location
 */

var productsByLocation=getProductsByLocation('21.3069','-157.8583');

setHTML(productsByLocation);

function getProductsByLocation (lat, lng) {
  var location = {
    latitude:lat, longitude:lng
  };
  var products = getProducts(location);
  return products;
}

function setHTML(thisProductsByLocation)
{

 var theseProducts=thisProductsByLocation['responseJSON'];

var allProducts=theseProducts['products'];  var productCount=allProducts.length;
  

  var thisBody=document.getElementsByTagName('body')[0];

  for(var i=0;i<productCount;i++)
  {
    newDiv=document.createElement('div');
    newDiv.appendChild(createItem('span',allProducts[i]['description']));
    newDiv.appendChild(createItem('span',allProducts[i]['display_name']));
    newDiv.appendChild(createItem('span',allProducts[i]['price_details']['cost_per_distance']));


    //thisBody.appendChild(createItem(allProducts[i]));

    thisBody.appendChild(newDiv);
  }

  
}


function createItem(elementType,elementText)
{
 // console.log(thisProduct);

  var thisItemElement=document.createElement(elementType);
  var thisTextNode=document.createTextNode(elementText);
  thisItemElement.appendChild(thisTextNode);
  
  return thisItemElement;
}

/**
 * Gets the products from a certain location.
 * @param  {object} The location object to query
 * @return {[Product]]} An array of products
 */
function getProducts (location) {
  return $.ajax({
    type: "GET",
    data: location,
    url: '/products',
    async: false
  });
}

// Stretch Goal
/**
 * Returns the device's current location.
 * @return {object} The device's current location
 */
function requestProductsByCurrentPosition () {
  /* The `getCurrentPosition` takes a function as it's first argument.
   * This function is referred to as a "callback" function, because it is
   * called when the result (current location) is found.
   */
  navigator.geolocation.getCurrentPosition(/* your function name goes here */);
}
