document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("canvas"); 
    canvas.width = 900; 
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "purple";
    ctx.fillRect(0, 0, 500, 500);
})
