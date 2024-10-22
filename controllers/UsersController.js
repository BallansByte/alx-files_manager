const crypto = require('crypto');
const mongoose = require('mongoose');

// Define your User schema (if not defined elsewhere)
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

class UsersController {
    static async postNew(req, res) {
        const { email, password } = req.body;

        // Check for missing email
        if (!email) {
            return res.status(400).json({ error: 'Missing email' });
        }

        // Check for missing password
        if (!password) {
            return res.status(400).json({ error: 'Missing password' });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Already exists' });
        }

        // Hash the password using SHA1
        const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Return the new user details
        return res.status(201).json({ id: newUser._id, email: newUser.email });
    }
}

module.exports = UsersController;
