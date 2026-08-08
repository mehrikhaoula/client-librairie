export const flyToCart = (event, product, addToCart) => {
  const card = event.currentTarget.closest(".product-card");

  const img = card.querySelector("img");
  const cart = document.getElementById("cart-icon");

  if (!img || !cart) {
    addToCart(product);
    return;
  }

  const imgRect = img.getBoundingClientRect();
  const cartRect = cart.getBoundingClientRect();

  const flyingImg = img.cloneNode(true);

  flyingImg.style.position = "fixed";
  flyingImg.style.left = imgRect.left + "px";
  flyingImg.style.top = imgRect.top + "px";
  flyingImg.style.width = imgRect.width + "px";
  flyingImg.style.height = imgRect.height + "px";
  flyingImg.style.borderRadius = "10px";
  flyingImg.style.objectFit = "cover";
  flyingImg.style.zIndex = "9999";
  flyingImg.style.transition =
    "all .8s cubic-bezier(.3,.8,.2,1)";

  document.body.appendChild(flyingImg);

  requestAnimationFrame(() => {
    flyingImg.style.left = cartRect.left + "px";
    flyingImg.style.top = cartRect.top + "px";
    flyingImg.style.width = "25px";
    flyingImg.style.height = "25px";
    flyingImg.style.opacity = ".3";
    flyingImg.style.transform = "scale(.2)";
  });

  setTimeout(() => {
    flyingImg.remove();

    cart.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.35)" },
        { transform: "scale(.9)" },
        { transform: "scale(1)" },
      ],
      {
        duration: 350,
      }
    );

    addToCart(product);
  }, 800);
};