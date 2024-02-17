'use client'

import { signIn, signUp, State } from './actions'
import { useFormState } from 'react-dom'

export const SignInForm = () => {
    const initialState = { message: null, errors: {} };
    const [loginState, loginDispatch] = useFormState(signIn, initialState)
    const [signupState, signupDispatch] = useFormState(signUp, initialState)

    return (
        <form
            className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
            action={loginDispatch}
        >
            <label className="text-md" htmlFor="email">
                Email
            </label>
            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="email"
                placeholder="you@example.com"
                required
            />
            <label className="text-md" htmlFor="password">
                Password
            </label>
            <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="password"
                name="password"
                placeholder="••••••••"
                required
            />
            <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
                Sign In
            </button>
            <button
                formAction={signupDispatch}
                className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            >
                Sign Up
            </button>
            {loginState?.message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                    {loginState.message}
                </p>
            )}
        </form>
    )
}
