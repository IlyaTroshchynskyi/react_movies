const SignInForm = () => {
    return (
        <>
            <div className='container d-flex justify-content-center'>
                <form>
                    <div className="col-xl-12 mt-2">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail4"/>
                    </div>
                    <div className="col-xl-12 mt-2">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username"/>
                    </div>
                    <div className="col-xl-12 mt-2">
                        <label htmlFor="inputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword2"/>
                    </div>
                    <div className="col-xl-12 mt-2">
                        <label htmlFor="inputPassword2" className="form-label">Password2</label>
                        <input type="password" className="form-control" id="inputPassword2"/>
                    </div>

                    <div className="col-12 mt-2">
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignInForm
