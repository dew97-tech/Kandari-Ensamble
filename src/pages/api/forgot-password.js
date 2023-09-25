// pages/api/forgot-password.js

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;

        // Check if email is present in request body
        if (!email) {
            console.log('Email is required');

            // Return error message with status code 400
            res.status(400).json({ message: 'Email is required' });
            return;
        }

        // !!Caution this is Hardcoded , Needs proper Middleware to Protect the Routes
        if (email === 'johndoe@gmail.com') {
            const userData = {
                name: 'John Doe',
                username: 'JohnDoe',
                email: 'johndoe@gmail.com',
                password: 'password',
                role: 'admin',
            };
            // Return success message with user data and status code 200
            console.log('Password reset link sent to:', userData);
            res.status(200).json(userData);
        } else {
            // Handle other HTTP methods and return appropriate response
            res.setHeader('Allow', ['POST']);
            res.status(401).json({ message: `Method ${req.method} not allowed` });
        }
    }
}
