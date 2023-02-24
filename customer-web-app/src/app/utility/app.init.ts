import {KeycloakService} from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080', //http://localhost:8080
        realm: 'myrealm',
        clientId: 'myclient' // you can use many clients for a simple realm
      },
      initOptions: {
        checkLoginIframe: true,
        checkLoginIframeInterval: 5
      },
      loadUserProfileAtStartUp: true
    });


}
