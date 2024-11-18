// By Akshay Badhe

const express = require('express');
const cors = require('cors');
const app = express();
const getDiveName = require('./GetDiveName');
const getDDComponentA = require('./GetComponentA');
const getComponentB = require('./GetComponentB');
const getComponentCSB = require('./GetComponentCSB');
const getComponentCHB = require('./GetComponentCHB');
const getComponentD = require('./GetComponentD');
const getComponentE = require('./GetComponentE');

//const app = express();
app.use(cors()); // This enables CORS for all routes

const PORT = 3000; // Specify the port

// Function to check if a dive is a twisting dive
function isTwistingDive(diveNumber) {
    const firstDigit = parseInt(diveNumber.toString()[0]);
    return firstDigit === 5; // Check if the first digit indicates a twisting dive
}

// Function to determine if the dive requires Component C (Springboard or High Board)
function needsComponentCSBOrCHB(diveNumber, height) {
    return diveNumber.length === 4 && ['1m', '3m', '5m', '7.5m', '10m'].includes(height);
}

// Route to handle input for Degree of Difficulty calculation
app.get('/:diveNumber/:position/:height', async (req, res) => {
    try {
        const { diveNumber, position, height } = req.params;
        const upperPosition = position.toUpperCase();

        console.log(`Received request with diveNumber: ${diveNumber}, position: ${upperPosition}, height: ${height}`);

        // Get dive name
        const diveName = getDiveName(diveNumber);
        console.log(`Dive Name: ${diveName}`);


        // Calculate Component A
        const componentA = getDDComponentA(diveNumber, height);
        console.log(`Component A: ${componentA}`);


        // Calculate Component B
        const componentB = getComponentB(diveNumber, upperPosition, height);
        console.log(`Component B: ${componentB}`);


        // Calculate Component C (CSB or CHB)
        let componentC = 0; // Default to 0 if not applicable
        if (needsComponentCSBOrCHB(diveNumber, height)) {
            if (['1m', '3m'].includes(height)) {
                componentC = getComponentCSB(diveNumber, upperPosition);
            } else if (['5m', '7.5m', '10m'].includes(height)) {
                componentC = getComponentCHB(diveNumber, upperPosition);
            }
        }
        console.log(`Component C: ${componentC}`);

        // Calculate Component D
        const componentD = getComponentD(diveNumber, height);
        console.log(`Component D: ${componentD}`);


        // Calculate Component E
        const componentE = getComponentE(diveNumber, height);
        console.log(`Component E: ${componentE}`);


        // Validate components
        const components = [componentA, componentB, componentD, componentE];
        if (needsComponentCSBOrCHB(diveNumber, height)) {
            components.push(componentC);
        }

        if (components.some(comp => comp === 'Invalid input or data not available' || comp === 'Invalid dive number')) {
            console.log('One or more components returned an invalid value.');
            return res.status(400).json({ error: 'Invalid input or data not available.' });
        }

        // Calculate total Degree of Difficulty
        const totalDD = components.reduce((sum, value) => sum + (typeof value === 'number' ? value : 0), 0);

        // Send response
        res.json({
            diveName,
            divePosition: upperPosition,
            height,
            componentA,
            componentB,
            componentC: needsComponentCSBOrCHB(diveNumber, height) ? componentC : 'N/A',
            componentD,
            componentE,
            totalDegreeOfDifficulty: totalDD
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


/*const express = require('express');
const getDiveName = require('./GetDiveName');
const getDDComponentA = require('./GetComponentA');
const getComponentB = require('./GetComponentB');
const getComponentCSB = require('./GetComponentCSB');
const getComponentD = require('./GetComponentD');
const getComponentE = require('./GetComponentE');

const app = express();
const PORT = 3001; // Change this to any available port if needed

// Function to check if a dive is a twisting dive
function isTwistingDive(diveNumber) {
    const firstDigit = parseInt(diveNumber.toString()[0]);
    return firstDigit === 5; // Check if the first digit indicates a twisting dive
}

// Route to handle input for Degree of Difficulty calculation
app.get('/:diveNumber/:position/:height', (req, res) => {
    try {
        const { diveNumber, position, height } = req.params;
        const upperPosition = position.toUpperCase();

        // Get dive name
        const diveName = getDiveName(diveNumber);

        // Calculate each component
        const componentA = getDDComponentA(diveNumber, height);
        const componentB = getComponentB(diveNumber, upperPosition, height);
        let componentC = 0; // Default to 0 for non-twisting dives
        if (isTwistingDive(diveNumber)) {
            componentC = getComponentCSB(diveNumber, height);
        }
        const componentD = getComponentD(diveNumber, height);
        const componentE = getComponentE(diveNumber, height);

        // Validate components
        const components = [componentA, componentB, componentD, componentE];
        if (isTwistingDive(diveNumber)) {
            components.push(componentC);
        }

        if (components.some(component => component === 'Invalid input or data not available' || component === 'Invalid dive number')) {
            return res.status(400).json({ error: 'Invalid input or data not available.' });
        }

        // Calculate total Degree of Difficulty
        const totalDD = components.reduce((sum, value) => sum + value, 0);

        // Send response
        res.json({
            diveName,
            divePosition: upperPosition,
            height,
            componentA,
            componentB,
            componentC: isTwistingDive(diveNumber) ? componentC : 'N/A',
            componentD,
            componentE,
            totalDegreeOfDifficulty: totalDD
        });
    } catch (error) {
        // Handle unexpected errors
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
*/