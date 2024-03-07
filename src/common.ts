import axios from "axios";

export const BASE_URL: string = "https://gregeoip.com";

export const availableGeoIPParams = [
    "location",
    "security",
    "timezone",
    "currency",
    "device"
];
export const availableLanguages = [
    "EN",
    "AR",
    "DE",
    "FR",
    "ES",
    "JA",
    "ZH",
    "RU"
];
export const availableFormats = ["JSON", "XML", "CSV", "Newline"];
export const availableCountryParams = [
    "language",
    "flag",
    "currency",
    "timezone"
];

export interface Options {
    ips?: string[];
    ip?: string;
    source?: string;
    key?: string;
    params?: string[];
    format?: string;
    lang?: string;
    mode?: string;
    countryCode?: string;
    text?: string;
    asn?: string;
    email?: string;
    phone?: string;
    iban?: string;
    data?: {
        [key: string]: string | number | string[] | object | boolean;
    };
}

export const serialize = (obj: any) => {
    const str: any[] = [];
    for (const p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
};

export const makeHttpRquest = (
    endpoint: string,
    options: any,
    callback: (data: object) => void,
    token: string
) => {
    options.source = "JS-Package";

    axios
        .get(BASE_URL + "/" + endpoint + "?" + serialize(options), {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            if (response.status === 200) {
                if (response.data.status !== "success") {
                    callback(response.data);
                } else {
                    callback(response.data.data);
                }
            } else {
                throw new Error(
                    "An unknown error occurred while sending the request to Greip API 2."
                );
            }
        })
        .catch(() => {
            throw new Error(
                "An unknown error occurred while sending the request to Greip API 1."
            );
        });
};

export const makePostRquest = (
    endpoint: string,
    options: any,
    callback: (data: object) => void,
    token: string
) => {
    options.source = "JS-Package";

    axios
        .post(BASE_URL + "/" + endpoint, options, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            if (response.status === 200) {
                if (response.data.status !== "success") {
                    callback(response.data);
                } else {
                    callback(response.data.data);
                }
            } else {
                throw new Error(
                    "An unknown error occurred while sending the request to Greip API."
                );
            }
        })
        .catch(() => {
            throw new Error(
                "An unknown error occurred while sending the request to Greip API."
            );
        });
};
