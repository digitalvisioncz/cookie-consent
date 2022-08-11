export enum CookieVariant {
    necessary = 'necessary',
    statistics = 'statistics',
    preferences = 'preferences',
    marketing = 'marketing',
    firstParty = 'firstParty',
    thirdParty = 'thirdParty',
    session = 'session',
    persistent = 'persistent',
}

export type CookieConsentSettings = {
    cookiePrefix?: string,
    cookies?: CookieVariant[],
};

export type ConsentCookies = CookieVariant[];

export interface ICookieConsent {
    consent: {
        cookies: ConsentCookies,
        groups?: string[],
        isAccepted: boolean,
    },
    acceptAllCookies: () => void,
    declineAllCookies: () => void,
    acceptSelectedCookies: (acceptedCookies: CookieVariant | CookieVariant[]) => void,
}
