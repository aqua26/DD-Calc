const express = require('express');
const app = express();
const port = 3000;

// Function to calculate dive value based on the dive number and position
function CalculateComponentCSB(diveNumber, divePosition) {
    // Validate input length and first digit
    if (diveNumber.length !== 4 || !['5', '6'].includes(diveNumber[0])) {
        return 0; // Return 0 if input is not 4 digits or doesn't start with 5 or 6
    }

    // Extract details from the dive number
    const group = parseInt(diveNumber[0]);
    const diveType = parseInt(diveNumber[1]);
    const somersaults = parseInt(diveNumber[2]) / 2; // Each increment is 0.5 somersaults
    const twists = parseInt(diveNumber[3]) / 2; // Each increment is 0.5 twists

    // Position validation rules
    if (somersaults === 0.5 && !['A', 'B', 'C'].includes(divePosition)) {
        return "This Dive Can be performed in Position A, B, or C";
    }
    if ((somersaults === 1 || somersaults === 1.5) && divePosition !== 'D') {
        return "This Dive Can be performed in Position D";
    }
    if (somersaults >= 2 && !['B', 'C'].includes(divePosition)) {
        return "This Dive can Be Performed in B or C Position";
    }

    // Calculate value based on diveType and twists
    let value = 0;
    if (diveType === 1) { // Forward group
        if (twists === 0.5) value = 0.4;
        else if (twists === 1) value = 0.6;
        else if (twists === 1.5) value = somersaults <= 2 ? 0.8 : 0.8;
        else if (twists === 2) value = 1.0;
        else if (twists === 2.5) value = 1.2;
        else if (twists === 3) value = 1.5;
        else if (twists === 3.5) value = 1.6;
        else if (twists === 4) value = 1.9;
        else if (twists === 4.5) value = 2.0;
    } else if (diveType === 2) { // Back group
        if (twists === 0.5 && somersaults <= 1) value = 0.2;
        else if (twists === 0.5 && somersaults > 1 && somersaults <= 2) value = 0.4;
        else if (twists === 0.5 && somersaults > 2) value = 0.0;
        else if (twists === 1) value = 0.4;
        else if (twists === 1.5 && somersaults <= 2) value = 0.8;
        else if (twists === 1.5 && somersaults > 2) value = 0.7;
        else if (twists === 2) value = 0.8;
        else if (twists === 2.5 && somersaults <= 2) value = 1.2;
        else if (twists === 2.5 && somersaults > 2) value = 1.1;
        else if (twists === 3) value = 1.5;
        else if (twists === 3.5) value = 1.7;
        else if (twists === 4) value = 1.8;
        else if (twists === 4.5) value = 2.1;
    } else if (diveType === 3) { // Reverse group
        if (twists === 0.5 && somersaults <= 1) value = 0.2;
        else if (twists === 0.5 && somersaults > 1 && somersaults <= 2) value = 0.4;
        else if (twists === 0.5 && somersaults > 2) value = 0.0;
        else if (twists === 1) value = 0.4;
        else if (twists === 1.5 && somersaults <= 2) value = 0.8;
        else if (twists === 1.5 && somersaults > 2) value = 0.6;
        else if (twists === 2) value = 0.8;
        else if (twists === 2.5 && somersaults <= 2) value = 1.2;
        else if (twists === 2.5 && somersaults > 2) value = 1.0;
        else if (twists === 3) value = 1.4;
        else if (twists === 3.5) value = 1.8;
        else if (twists === 4) value = 1.8;
        else if (twists === 4.5) value = 2.1;
    } else if (diveType === 4) { // Inward group
        if (twists === 0.5 && somersaults <= 1) value = 0.2;
        else if (twists === 0.5 && somersaults > 1 && somersaults <= 2) value = 0.4;
        else if (twists === 0.5 && somersaults >= 2.5) value = 0.2;
        else if (twists === 0.5 && somersaults >= 3) value = 0.4;
        else if (twists === 1) value = 0.4;
        else if (twists === 1.5 && somersaults <= 2) value = 0.8;
        else if (twists === 1.5 && somersaults > 2) value = 0.8;
        else if (twists === 2) value = 0.8;
        else if (twists === 2.5 && somersaults <= 2) value = 1.2;
        else if (twists === 2.5 && somersaults > 2) value = 1.2;
        else if (twists === 3) value = 1.5;
        else if (twists === 3.5) value = 1.6;
        else if (twists === 4) value = 1.9;
        else if (twists === 4.5) value = 2.0;
    }

    return value;
}

// Route to handle GET requests for dive number and position
app.get('/:diveNumber/:position', (req, res) => {
    const diveNumber = req.params.diveNumber;
    const position = req.params.position.toUpperCase(); // Ensure position is uppercase for consistency

    const result = CalculateComponentCSB(diveNumber, position);
    res.send(`Result: ${result}`);
});

// Start the server
/*app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
*/
// Export the function for use in other files

module.exports = CalculateComponentCSB;

// Start the server

/*
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
*/
