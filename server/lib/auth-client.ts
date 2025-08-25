import { createAuthClient } from "better-auth/vue"
import { usernameClient } from "better-auth/client/plugins"
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { auth } from '~/utils/auth';

export const { signIn, signUp, useSession, signOut } = createAuthClient({
  plugins: [ 
    usernameClient(),
    inferAdditionalFields<typeof auth>()
  ]
})