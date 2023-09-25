import bcrypt from 'bcrypt';

export default (req, res) => {
    if (req.method === 'POST') {
        const { name, email, password, whyJoin } = req.body;

        // Hashing the Password Using Bcrypt
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error(err);
                res.status(500).end();
            } else {
                // Log the hashed password in the console
                // Validate the data as needed
                const userData = {
                    name: name,
                    email: email,
                    password: password,
                    whyJoin: whyJoin,
                    role: 'user',
                };
                console.log('User Registered in Successfully:', userData);

                // Return success message with user data and status code 200
                res.status(200).json(userData);
                // console.log(`Hashed Password is: ${hash}`);
            }
        });
    } else {
        // Handle other HTTP methods and return appropriate response
        res.setHeader('Allow', ['POST']);
        res.status(401).json({ message: `Method ${req.method} not allowed` });
    }
};
