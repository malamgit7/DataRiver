import { MsalGuardConfiguration } from "@azure/msal-angular";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "../configs/msal.config";

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
    return {
        interactionType: InteractionType.Redirect,
        authRequest: loginRequest
    };
}