function placeLogosRandomly() {
    var doc = app.activeDocument;
    var logo = doc.selection[0]; // Select the logo before running the script
    if (!logo) {
        alert("Please select your logo before running the script.");
        return;
    }
    
    var boxWidth = 500; // Define the box width
    var boxHeight = 500; // Define the box height
    var numLogos = 20; // Number of logos to place
    
    for (var i = 0; i < numLogos; i++) {
        var duplicate = logo.duplicate();
        
        // Generate random position within the box
        var x = Math.random() * boxWidth;
        var y = Math.random() * boxHeight;
        duplicate.position = [x, y];
        
        // Apply random rotation
        var rotation = Math.random() * 360;
        duplicate.rotate(rotation);
    }
    
    alert("Logos placed randomly inside the box!");
}

placeLogosRandomly();