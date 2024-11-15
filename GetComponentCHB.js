const express = require('express');
const app = express();
const port = 3000;

// Function to calculate Component C for High Board
function GetComponentCHB(diveNumber, divePosition) {
    // Validate input length and first digit
    if (diveNumber.length !== 4 || !['5', '6'].includes(diveNumber[0])) {
        return 0.0; // Return 0.0 if input is not 4 digits or doesn't start with 5 or 6
    }

    // Extract details from the dive number
    const group = parseInt(diveNumber[0]);
    const subGroup = parseInt(diveNumber[1]);
    const somersaults = parseInt(diveNumber[2]) / 2; // Each increment is 0.5 somersaults
    const twists = parseInt(diveNumber[3]) / 2; // Each increment is 0.5 twists

    let value = 0.0;

    // Logic for Twists group (group 5)
    if (group === 5) {
        switch (subGroup) {
            case 1: // Forward
                if (twists === 0.5 && somersaults <= 1) value = 0.4;
                else if (twists === 0.5 && somersaults > 1 && somersaults <= 2) value = 0.4;
                else if (twists === 0.5 && somersaults === 2.5) value = 0.4;
                else if (twists === 0.5 && somersaults >= 3) value = 0.4;
                else if (twists === 1) value = 0.6;
                else if (twists === 1.5 && somersaults <= 2) value = 0.8;
                else if (twists === 1.5 && somersaults > 2) value = 0.8;
                else if (twists === 2) value = 1.0;
                else if (twists === 2.5 && somersaults <= 2) value = 1.2;
                else if (twists === 2.5 && somersaults > 2) value = 1.2;
                else if (twists === 3) value = 1.5;
                else if (twists === 3.5 && somersaults <= 2) value = 1.6;
                else if (twists === 3.5 && somersaults > 2) value = 1.6;
                else if (twists === 4) value = 1.9;
                else if (twists === 4.5 && somersaults <= 2) value = 2.0;
                else if (twists === 4.5 && somersaults > 2) value = 2.0;
                break;
            case 2: // Back
                if (twists === 0.5 && somersaults <= 1) value = 0.2;
                else if (twists === 0.5 && somersaults > 1 && somersaults <= 2) value = 0.4;
                else if (twists === 0.5 && somersaults === 2.5) value = 0.0;
                else if (twists === 0.5 && somersaults >= 3) value = 0.0;
                else if (twists === 1) value = 0.4;
                else if (twists === 1.5 && somersaults <= 2) value = 0.8;
                else if (twists === 1.5 && somersaults > 2) value = 0.6;
                else if (twists === 2) value = 0.8;
                else if (twists === 2.5 && somersaults <= 2) value = 1.2;
                else if (twists === 2.5 && somersaults > 2) value = 1.0;
                else if (twists === 3) value = 1.4;
                else if (twists === 3.5 && somersaults <= 2) value = 1.7;
                else if (twists === 3.5 && somersaults > 2) value = 1.5;
                else if (twists === 4) value = 1.8;
                else if (twists === 4.5 && somersaults <= 2) value = 2.1;
                else if (twists === 4.5 && somersaults > 2) value = 1.9;
                break;
            case 3: // Reverse
                if (twists === 0.5 && somersaults <= 1) value = 0.2;
                else if (twists === 0.5 && somersaults > 1 && somersaults <= 2) value = 0.4;
                else if (twists === 0.5 && somersaults === 2.5) value = 0.0;
                else if (twists === 0.5 && somersaults >= 3) value = 0.0;
                else if (twists === 1) value = 0.4;
                else if (twists === 1.5 && somersaults <= 2) value = 0.8;
                else if (twists === 1.5 && somersaults > 2) value = 0.6;
                else if (twists === 2) value = 0.8;
                else if (twists === 2.5 && somersaults <= 2) value = 1.2;
                else if (twists === 2.5 && somersaults > 2) value = 1.0;
                else if (twists === 3) value = 1.4;
                else if (twists === 3.5 && somersaults <= 2) value = 1.7;
                else if (twists === 3.5 && somersaults > 2) value = 1.5;
                else if (twists === 4) value = 1.8;
                else if (twists === 4.5 && somersaults <= 2) value = 2.1;
                else if (twists === 4.5 && somersaults > 2) value = 1.9;
                break;
            case 4: // Inward
                if (twists === 0.5 && somersaults <= 1) value = 0.4;
                else if (twists === 0.5 && somersaults > 1 && somersaults <= 2) value = 0.4;
                else if (twists === 0.5 && somersaults === 2.5) value = 0.4;
                else if (twists === 0.5 && somersaults >= 3) value = 0.4;
                else if (twists === 1) value = 0.6;
                else if (twists === 1.5 && somersaults <= 2) value = 0.8;
                else if (twists === 1.5 && somersaults > 2) value = 0.8;
                else if (twists === 2) value = 1.0;
                else if (twists === 2.5 && somersaults <= 2) value = 1.2;
                else if (twists === 2.5 && somersaults > 2) value = 1.2;
                else if (twists === 3) value = 1.5;
                else if (twists === 3.5 && somersaults <= 2) value = 1.6;
                else if (twists === 3.5 && somersaults > 2) value = 1.6;
                else if (twists === 4) value = 1.9;
                else if (twists === 4.5 && somersaults <= 2) value = 2.0;
                else if (twists === 4.5 && somersaults > 2) value = 2.0;
                break;
        }
    } else if (group === 6) { // Armstand group
        switch (subGroup) {
            case 1: // Forward
                if (twists === 0.5 && somersaults <= 1) value = 0.4;
                else if (twists === 0.5 && somersaults > 1 && somersaults <= 2) value = 0.5;
                else if (twists === 0.5 && somersaults === 2.5) value = 0.5;
                else if (twists === 0.5 && somersaults >= 3) value = 0.4;
                else if (twists === 1) value = 1.2;
                else if (twists === 1.5 && somersaults <= 2) value = 1.3;
                else if (twists === 1.5 && somersaults > 2) value = 1.3;
                else if (twists === 2) value = 1.5;
                else if (twists === 2.5 && somersaults <= 2) value = 1.7;
                else if (twists === 2.5 && somersaults > 2) value = 1.7;
                else if (twists === 3) value = 1.9;
                else if (twists === 3.5 && somersaults <= 2) value = 2.1;
                else if (twists === 3.5 && somersaults > 2) value = 2.1;
                else if (twists === 4) value = 2.3;
                else if (twists === 4.5 && somersaults <= 2) value = 2.5;
                else if (twists === 4.5 && somersaults > 2) value = 2.5;
                break;
            case 2: // Back and Reverse
            case 3: // Reverse (treated similarly to Back)
                if (twists === 0.5 && somersaults <= 1) value = 0.4;
                else if (twists === 0.5 && somersaults > 1 && somersaults <= 2) value = 0.5;
                else if (twists === 0.5 && somersaults === 2.5) value = 0.5;
                else if (twists === 0.5 && somersaults >= 3) value = 0.5;
                else if (twists === 1) value = 1.2;
                else if (twists === 1.5 && somersaults <= 2) value = 1.3;
                else if (twists === 1.5 && somersaults > 2) value = 1.3;
                else if (twists === 2) value = 1.3;
                else if (twists === 2.5 && somersaults <= 2) value = 1.7;
                else if (twists === 2.5 && somersaults > 2) value = 1.7;
                else if (twists === 3) value = 1.9;
                else if (twists === 3.5 && somersaults <= 2) value = 2.1;
                else if (twists === 3.5 && somersaults > 2) value = 2.1;
                else if (twists === 4) value = 2.3;
                else if (twists === 4.5 && somersaults <= 2) value = 2.5;
                else if (twists === 4.5 && somersaults > 2) value = 2.5;
                break;
        }
    }

    return value;
}

// Route to handle GET requests for dive number and position
app.get('/:diveNumber/:position', (req, res) => {
    const diveNumber = req.params.diveNumber;
    const position = req.params.position.toUpperCase(); // Ensure position is uppercase for consistency

    const result = GetComponentCHB(diveNumber, position);
    res.send(`Result: ${result}`);
});

//module.exports = getComponentCHB;

module.exports = GetComponentCHB;



/*
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
*/