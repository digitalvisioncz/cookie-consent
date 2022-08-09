export enum CookieVariant {
    necessary = 'necessary',
    statistics = 'statistics',
    preferences = 'preferences',
    marketing = 'marketing',
}

export type CookieConsentSettings = {
    cookiePrefix?: string,
};

type CookieConsentObject = {
    [key in CookieVariant]?: boolean;
};

export interface ICookieConsent {
    consent: CookieConsentObject,
    consentSelected: boolean,
    acceptAllCookies: () => void,
    declineAllCookies: () => void,
    acceptCookie: (whitelistedCookies: CookieVariant | CookieVariant[]) => void,
}
