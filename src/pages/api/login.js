// pages/api/login.js

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        // !!Caution this is Hardcoded , Needs proper Middleware to Protect the Routes
        // <>TODO: Implement proper Middleware to Protect the Routes</>
        if (username === 'JohnDoe' && password === 'password') {
            const userData = {
                name: 'John Doe',
                username: 'JohnDoe',
                email: 'johndoe@gmail.com',
                password: 'password',
                role: 'admin',
            };

            console.log('User logged in Successfully:', userData);

            // Return success message with user data and status code 200
            res.status(200).json(userData);
        } else {
            console.log('Invalid username or password');

            // Return error message with status code 401
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } else {
        // Handle other HTTP methods and return appropriate response
        res.setHeader('Allow', ['POST']);
        res.status(401).json({ message: `Method ${req.method} not allowed` });
    }
}
