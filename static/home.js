const rotatingImage = document.getElementById("UiImg");
const imageContainer = document.querySelector(".image-container");

let isRotating = false;
let currentRotationX = 0;
let targetRotationX = 0;
let currentRotationY = 0;
let targetRotationY = 0;

function smoothRotate() {
    if (isRotating) {
        currentRotationX += (targetRotationX - currentRotationX) * 0.1;
        currentRotationY += (targetRotationY - currentRotationY) * 0.1;
        rotatingImage.style.transform = `perspective(1000px) rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
        requestAnimationFrame(smoothRotate);
    }
}

imageContainer.addEventListener("mousemove", (e) => {
    const containerWidth = imageContainer.clientWidth;
    const containerHeight = imageContainer.clientHeight;
    const mouseX = e.clientX - imageContainer.getBoundingClientRect().left;
    const mouseY = e.clientY - imageContainer.getBoundingClientRect().top;
    targetRotationX = ((mouseY / containerHeight - 0.5) * -40);
    targetRotationY = (mouseX / containerWidth - 0.5) * 40;
    
    if (!isRotating) {
        isRotating = true;
        rotatingImage.style.transition = "none";
        smoothRotate();
    }
});

imageContainer.addEventListener("mouseleave", () => {
    if (isRotating) {
        isRotating = false;
        rotatingImage.style.transition = "transform 0.5s ease-in-out";
        rotatingImage.style.transform = "perspective(1000px) rotateX(9.8deg) rotateY(17deg)";
    }
});