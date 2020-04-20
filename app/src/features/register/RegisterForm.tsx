import React, { useState, ReactElement, ChangeEvent } from 'react'
import { Input } from '../../common/components/form/Input'
import { RegisterService } from './RegisterService'

interface Props {
  user: User;
  setUser: (user: User) => void;
  register: () => void;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
}

export function RegisterForm({ user, setUser, register }: Props): ReactElement {
  const [isSubmitted, setIsSubmitted] = useState(false)

  function onChange(evt: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = evt.target
    setUser({ ...user, [name]: value })
  }

  return (
    <div
      className="col-md-4 mx-auto py-5 my-5 text-center"
      style={{ maxWidth: '500px' }}
    >
      <h1 className="h3 mb-3 font-weight-normal">Register</h1>
      <form className="needs-validation">
        <div className="row">
          <Input
            size="col-md-6 mb-3"
            type="text"
            name="firstName"
            onChange={onChange}
            isValid={RegisterService.isName(user.firstName)}
            isSubmitted={isSubmitted}
            feedback="Please enter a valid name."
          >
            First name
          </Input>
          <Input
            size="col-md-6 mb-3"
            type="text"
            name="lastName"
            onChange={onChange}
            isValid={RegisterService.isName(user.lastName)}
            isSubmitted={isSubmitted}
            feedback="Please enter a valid name."
          >
            Last name
          </Input>
        </div>
        <Input
          size="mb-3"
          placeholder="you@example.com"
          type="email"
          name="email"
          onChange={onChange}
          isValid={RegisterService.isEmail(user.email)}
          isSubmitted={isSubmitted}
          feedback="Please enter a valid email address."
        >
          Email
        </Input>
        <Input
          size="mb-3"
          placeholder="Password"
          type="password"
          name="password"
          onChange={onChange}
          isValid={RegisterService.isPassword(user.password)}
          isSubmitted={isSubmitted}
          feedback="Please enter a valid password. It should have at least one uppercase letter, one lowercase letter, one digit and be more than 8 character."
        >
          Password
        </Input>
        <Input
          size="mb-3"
          placeholder="Password Confirmation"
          type="password"
          name="confirm"
          onChange={onChange}
          isValid={
            RegisterService.isPassword(user.password) &&
            user.password === user.confirm
          }
          isSubmitted={isSubmitted}
          feedback="Please confirm your password with the exact same character."
        >
          Password <span className="text-muted"> (Re-enter)</span>
        </Input>
        <hr className="mb-4" />
        <button
          title="Submit registration"
          className="btn btn-primary btn-lg btn-block"
          type="submit"
          onClick={(e): void => {
            e.preventDefault()
            setIsSubmitted(true)
            register()
          }}
          onSubmit={(): boolean => false}
        >
          Register
        </button>
      </form>
    </div>
  )
}
