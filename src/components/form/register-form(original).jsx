import Link from 'next/link';
import React, { useState } from 'react';

const RegisterhtmlForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === 'name') {
            setUsername(value);
        } else if (id === 'email-id') {
            setEmail(value);
        } else if (id === 'pass') {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <section
                className="login-area pt-20 pb-100 wow fadeInUp"
                data-wow-duration=".3s"
                data-wow-delay=".1s">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="basic-login">
                                <h3 className="text-center mb-60">Sign up From Here</h3>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="name">
                                        Username <span>**</span>
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Enter Username"
                                        value={username}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="email-id">
                                        Email Address <span>**</span>
                                    </label>
                                    <input
                                        id="email-id"
                                        type="text"
                                        placeholder="Email address..."
                                        value={email}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="pass">
                                        Password <span>**</span>
                                    </label>
                                    <input
                                        id="pass"
                                        type="password"
                                        placeholder="Enter password..."
                                        value={password}
                                        onChange={handleChange}
                                    />
                                    <div className="mt-10"></div>
                                    <button className="tp-btn w-100">Register Now</button>
                                    <div className="or-divide">
                                        <span>or</span>
                                    </div>
                                    <Link href="/sign-in" className="tp-border-btn w-100">
                                        login Now
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RegisterhtmlForm;
