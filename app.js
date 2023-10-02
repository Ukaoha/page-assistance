

// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Define button explanations
const buttonExplanations = {
    button1: "This is Button 1. It performs action 1.",
    button2: "Button 2 does something special.",
    button3: "Button 3 is used for a specific task.",
    button4: "Button 4 has its own function.",
    button5: "This is Button 5. It does action 5.",
    button6: "Button 6 performs a unique action.",
};

// Create an array to store 3D models
const models = [];

// Create a function to add a 3D model to the scene
function addModel(geometry, material) {
    const model = new THREE.Mesh(geometry, material);
    scene.add(model);
    models.push(model);
}

// Create 3D models with different shapes
const geometries = [
    new THREE.BoxGeometry(1, 1, 1),         // Cube
    new THREE.CircleGeometry(1, 32),        // Circle
    new THREE.SphereGeometry(1, 32, 32),    // Sphere
    new THREE.TorusGeometry(1, 0.3, 16, 100), // Torus
    new THREE.CylinderGeometry(1, 1, 2, 32), // Cylinder
    new THREE.TetrahedronGeometry(1),      // Tetrahedron
];

const materials = [
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),  // Green
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),  // Red
    new THREE.MeshBasicMaterial({ color: 0x0000ff }),  // Blue
    new THREE.MeshBasicMaterial({ color: 0xff00ff }),  // Magenta
    new THREE.MeshBasicMaterial({ color: 0xffff00 }),  // Yellow
    new THREE.MeshBasicMaterial({ color: 0x00ffff }),  // Cyan
];

// Create initial models
for (let i = 0; i < 6; i++) {
    addModel(geometries[i], materials[i]);
    models[i].position.set(i * 2, 0, 0); // Set initial positions along the x-axis
    models[i].visible = false;
    models[i].rotation.set(0, 0, 0);
}

// Button click interaction for all buttons
for (let i = 1; i <= 6; i++) {
    const button = document.getElementById(`button${i}`);
    button.addEventListener('click', () => {
        for (let j = 0; j < models.length; j++) {
            models[j].visible = false;
        }
        models[i - 1].visible = true;
        showExplanation(buttonExplanations[`button${i}`]);
    });
}

// Hover icon interaction for all elements
for (let i = 1; i <= 3; i++) {
    const element = document.getElementById(`element${i}`);
    element.addEventListener('mouseenter', () => {
        for (let j = 0; j < models.length; j++) {
            models[j].visible = false;
        }
        models[i - 1].visible = true;
        showExplanation(`This is Element ${i}. Hover over me to learn more.`);
    });
}

// Function to move the assistant to a new position
function moveAssistant(targetPosition) {
    const tween = new TWEEN.Tween(models[0].position)
        .to(targetPosition, 1000) // Animation duration
        .easing(TWEEN.Easing.Quadratic.InOut) // Easing function
        .start();
}

// Function to make models rotate in circles
function rotateModels() {
    const centerX = 0; // X-coordinate of the rotation center
    const centerY = 0; // Y-coordinate of the rotation center
    const radius = 4; // Radius of the circular path

    for (let i = 0; i < models.length; i++) {
        const model = models[i];

        // Calculate the angle for the current model
        const angle = (i / models.length) * Math.PI * 2;

        // Calculate the new position on the circular path
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const rotationTween = new TWEEN.Tween(model.rotation)
            .to({ y: model.rotation.y + Math.PI * 2 }, 4000) // 4 seconds for one full rotation
            .easing(TWEEN.Easing.Linear.None)
            .repeat(Infinity)
            .start();

        const positionTween = new TWEEN.Tween(model.position)
            .to({ x, y, z: 0 }, 4000) // 4 seconds for one full rotation
            .easing(TWEEN.Easing.Linear.None)
            .repeat(Infinity)
            .start();
    }
}

// Function to display explanations in a tooltip
function showExplanation(message) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = message;
    tooltip.style.display = 'block';
    tooltip.style.left = '10px'; // Adjust the tooltip position
    tooltip.style.top = `${window.innerHeight - 40}px`; // Position tooltip near the bottom
}

// Hide the tooltip when the mouse leaves the element
document.addEventListener('mouseleave', () => {
    const tooltip = document.getElementById('tooltip');
    // tooltip.style.display = 'none';
});

// Set the desired background color (e.g., light gray)
const whiteColor = new THREE.Color(0xffffff);
renderer.setClearColor(whiteColor);


// Set up camera position
camera.position.z = 5;

// Start the rotation of models
rotateModels();

// Three.js rendering loop
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update(); // Update animations
    renderer.render(scene, camera);
}
animate();
