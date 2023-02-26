import React, { useState } from "react";

const Register = ({ onRouteChange, loadUser }) => {
    const [newEmail, setEmail] = useState('');
    const [newPassword, setPassword] = useState('');
    const [newName, setName] = useState('');

    const onNameChange = (event) => {
        setName(event.target.value);
    }
    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3010/register', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: newEmail,
                password: newPassword,
                name: newName
            })
        }).then(Response => Response.json())
            .then(user => {
                // console.log(data);
                if (user) {
                    loadUser(user);
                    onRouteChange('home');
                }
            })
    }

    return (
        <article className="br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 white-80">
                <form className="measure white-80">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input
                                onChange={onNameChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input
                                onChange={onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input
                                onChange={onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                        </div>
                    </fieldset>
                    <div>
                        <input className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer pointer f6 dib white" type="submit" value="Register" onClick={onSubmit} />
                    </div>
                </form>
            </main>
        </article>
    )
}
export default Register;