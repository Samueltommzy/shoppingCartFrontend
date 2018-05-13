import { AuthServiceConfig, FacebookLoginProvider , GoogleLoginProvider} from 'angular5-social-login';
export function authConfig() {
   let config = new AuthServiceConfig([
       {id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("847189518805831")
     },
     {
         id:GoogleLoginProvider.PROVIDER_ID,
         provider: new GoogleLoginProvider("563168590984-fjnhagepa1a4qtodn3h5k9tp97m6h9u7.apps.googleusercontent.com")
     }
   ]);
   return config;
}