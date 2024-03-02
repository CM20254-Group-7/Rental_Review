import { test, expect } from '@playwright/test';
import { users } from './helpers';

const apiBaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// User Authentication Tests
test.describe('User Authentication Tests', () => {
    // Nav bar tests
    test.describe('Navbar Tests', () => {
        test('Logged out user shown login button', async ({ page }) => { });

        test.describe('Logged in user shown auth button', () => {
            test('Logged in user sees their email', async ({ page }) => {

            });

            test('Logged in user can log out', async ({ page }) => {

            });

            test('Logged in user shown link to account page', async ({ page }) => {

            });
        });
    });

    // Login page tests
    test.describe('Login Page Tests', () => {
        test.describe('Page Access Tests', () => {
            test('Logged out user can access login page', async ({ page }) => {

            });

            test('Logged in user cannot access login page', () => {

            });
        });

        // Signup tests
        test.describe('User Signup Tests', () => {
            test('New user can sign up', async ({ page }) => {

            });

            test('user cannot sign up with an existing email', async ({ page }) => {

            });

            test.describe('Password Validation Tests', () => {
                test('Password must be at least 6 characters - Too short (5 characters)', async ({ page }) => {

                });

                test('Password must be at least 6 characters - Minimum length (6 characters)', async ({ page }) => {

                });

                test('Password must be at least 6 characters - Longer than minimum (7 characters)', async ({ page }) => {

                });
            });
        });

        // Login tests
        test.describe('User Login Tests', () => {
            test('Existing user can login', async ({ page }) => {

            });

            test('Non-existent user cannot login', async ({ page }) => {

            });

            test('User cannot login with incorrect password', async ({ page }) => {

            });
        });
    });
});

// Account page tests
test.describe('Account Management Tests', () => {
    test.describe('Page Access Tests', () => {
        test('Logged out user cannot access account page', async ({ page }) => {

        });

        test('Logged in user can access account page', async ({ page }) => {

        });
    });

    test.describe('Email Change Tests', () => {
        test('User can change their email', async ({ page }) => {

        });

        test('User cannot change their email to an existing email', async ({ page }) => {

        });

        test('User cannot change their email to an invalid email', async ({ page }) => {

        });
    });

    test.describe('Password Change Tests', () => {
        test('User can change their password', async ({ page }) => {

        });

        test('User cannot change password with incorrect current password', async ({ page }) => {

        });

        test('User cannot change their password to a password that does not match the confirm password', async ({ page }) => {

        });

        test('User cannot change their password to a weak password', async ({ page }) => {

        });
    });

    test('User can delete their account', async ({ page }) => {

    });
});

test.describe('User Profile Tests', () => {
    // This test uses 2 users
    // for each user checks if they can access their own profile and not the other user's profile
    const firstUser = users[0];
    const secondUser = users[1];

    // Verify the data we are looking for exists with the service key before checking which users can access it
    test.describe(`User's have profiles`, () => {
        test(`${firstUser.label} has a profile`, async ({ page }) => {
            const res = await page.request.get(`${apiBaseURL}/rest/v1/user_profiles?email=eq.${firstUser.email}&select=email`, {
                headers: {
                    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY!}`,
                }
            });

            // Should return 200 with the user's profile
            await expect(res.status()).toBe(200);
            await expect(await res.json()).toEqual([{ email: firstUser.email }]);
        });

        test(`${secondUser.label} has a profile`, async ({ page }) => {
            const res = await page.request.get(`${apiBaseURL}/rest/v1/user_profiles?email=eq.${secondUser.email}&select=email`, {
                headers: {
                    'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                    'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_KEY!}`,
                }
            });

            // Should return 200 with the user's profile
            await expect(res.status()).toBe(200);
            await expect(await res.json()).toEqual([{ email: secondUser.email }]);
        });
    });

    test.describe('User profile access tests', () => {

        test.describe('Anon User Tests', () => {
            test('Anon user state reflected', async ({ page }) => {
                await page.goto('./');

                // Expect the body to contain the login button.
                await expect(page.getByRole('navigation')).toContainText('Login');
            });

            test(`Anon user cannot access ${firstUser.label}'s profile`, async ({ page }) => {
                const res = await page.request.get(`${apiBaseURL}/rest/v1/user_profiles?email=eq.${firstUser.email}&select=*`, {
                    headers: {
                        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
                    }
                });

                // Should return 200 but with an empty array
                await expect(res.status()).toBe(200);
                await expect(await res.json()).toEqual([]);
            });

            test(`Anon user cannot access ${secondUser.label}'s profile`, async ({ page }) => {
                const res = await page.request.get(`${apiBaseURL}/rest/v1/user_profiles?email=eq.${secondUser.email}&select=email`, {
                    headers: {
                        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
                    }
                });

                // Should return 200 but with an empty array
                await expect(res.status()).toBe(200);
                await expect(await res.json()).toEqual([]);
            });
        });

        test.describe(`${firstUser.label} tests`, () => {
            test.use({ storageState: firstUser.file });

            test('logged in user state reflected', async ({ page }) => {
                await page.goto('./');

                // Expect the navbar to contain the user's email
                await expect(page.getByRole('navigation')).toContainText(firstUser.email);
            });

            test(`${firstUser.label} can access ${firstUser.label}'s profile`, async ({ page }) => {
                // get an access token for user 1
                const userRes = await page.request.post(`${apiBaseURL}/auth/v1/token?grant_type=password`, {
                    data: {
                        email: firstUser.email,
                        password: firstUser.password,
                    },
                    headers: {
                        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        'Content-Type': 'application/json',
                    }
                });
                const { access_token } = await userRes.json();

                // use the access token to get user 1's profile
                const testRes = await page.request.get(`${apiBaseURL}/rest/v1/user_profiles?email=eq.${firstUser.email}&select=email`, {
                    headers: {
                        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        'Authorization': `Bearer ${access_token}`,
                    }
                });

                // Should return 200 with the user's profile
                await expect(testRes.status()).toBe(200);
                await expect(await testRes.json()).toEqual([{ email: firstUser.email }]);
            });

            test(`${firstUser.label} cannot access ${secondUser.label}'s profile`, async ({ page }) => {
                // get an access token for user 1
                const userRes = await page.request.post(`${apiBaseURL}/auth/v1/token?grant_type=password`, {
                    data: {
                        email: firstUser.email,
                        password: firstUser.password,
                    },
                    headers: {
                        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        'Content-Type': 'application/json',
                    }
                });
                const { access_token } = await userRes.json();

                // use the access token to get user 2's profile
                const testRes = await page.request.get(`${apiBaseURL}/rest/v1/user_profiles?email=eq.${secondUser.email}&select=email`, {
                    headers: {
                        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        'Authorization': `Bearer ${access_token}`,
                    }
                });

                // Should return 200 but with an empty array
                await expect(testRes.status()).toBe(200);
                await expect(await testRes.json()).toEqual([]);
            });
        });

        test.describe(`${secondUser.label} tests`, () => {
            test.use({ storageState: secondUser.file });

            test('logged in user state reflected', async ({ page }) => {
                await page.goto('./');

                // Expect the navbar to contain the user's email
                await expect(page.getByRole('navigation')).toContainText(secondUser.email);
            });

            test(`${secondUser.label} cannot access ${firstUser.label}'s profile`, async ({ page }) => {
                // get an access token for user 2
                const userRes = await page.request.post(`${apiBaseURL}/auth/v1/token?grant_type=password`, {
                    data: {
                        email: secondUser.email,
                        password: secondUser.password,
                    },
                    headers: {
                        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        'Content-Type': 'application/json',
                    }
                });
                const { access_token } = await userRes.json();

                // use the access token to get user 1's profile
                const testRes = await page.request.get(`${apiBaseURL}/rest/v1/user_profiles?email=eq.${firstUser.email}&select=email`, {
                    headers: {
                        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        'Authorization': `Bearer ${access_token}`,
                    }
                });

                // Should return 200 but with an empty array
                await expect(testRes.status()).toBe(200);
                await expect(await testRes.json()).toEqual([]);
            });

            test(`${secondUser.label} can access ${secondUser.label}'s profile`, async ({ page }) => {
                // get an access token for user 2
                const userRes = await page.request.post(`${apiBaseURL}/auth/v1/token?grant_type=password`, {
                    data: {
                        email: secondUser.email,
                        password: secondUser.password,
                    },
                    headers: {
                        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        'Content-Type': 'application/json',
                    }
                });
                const { access_token } = await userRes.json();

                // use the access token to get user 2's profile
                const testRes = await page.request.get(`${apiBaseURL}/rest/v1/user_profiles?email=eq.${secondUser.email}&select=email`, {
                    headers: {
                        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                        'Authorization': `Bearer ${access_token}`,
                    }
                });

                // Should return 200 with the user's profile
                await expect(testRes.status()).toBe(200);
                await expect(await testRes.json()).toEqual([{ email: secondUser.email }]);
            });
        });
    });
});