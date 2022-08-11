import {CookieConsentSettings} from '../useCookieConsent/useCookieConsent.types';

export type CookieConsentProviderProps = {
    settings?: CookieConsentSettings,
    children: React.ReactNode,
};

export type CookiesConsentWrapperProps = {
    settings?: CookieConsentSettings,
    children: React.ReactNode,
};
