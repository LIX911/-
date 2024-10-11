const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/run-command', (req, res) => {
    const command = req.body.command;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.json({ output: `خطأ: ${error.message}` });
        }
        if (stderr) {
            return res.json({ output: `خطأ: ${stderr}` });
        }
        res.json({ output: stdout });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
