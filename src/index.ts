import {
    Options,
    availableCountryParams,
    availableFormats,
    availableGeoIPParams,
    availableLanguages,
    makeHttpRquest,
    makePostRquest
} from "./common";

class Greip {
    private token: string;

    /**
     * Creates GreipWrapper object to send requests to the [Greip](https://greip.io/) API.
     *
     * @param token Token string (Greip API Key).
     */
    constructor(token: string) {
        // Check if the token is provided.
        if (!token) {
            throw new Error("Token is required");
        }
        this.token = token;
    }

    Lookup = (options: Options) => {
        if (typeof options !== "object") options = {};

        return new Promise((resolve, reject) => {
            const ip1 = options.ip || "";
            const params = options.params || [];
            const format1 = options.format || "JSON";
            let lang1 = options.lang || "EN";
            const mode1 = options.mode || "live";
            lang1 = lang1.toUpperCase();

            // Validate the ip variable
            if (ip1.length < 7) {
                reject(new Error("You should pass the `ip` parameter."));
            }

            // Validate the params variable items
            params.forEach((perParam) => {
                if (perParam.length > 0) {
                    if (!availableGeoIPParams.includes(perParam)) {
                        reject(
                            new Error(
                                'The "' +
                                    perParam +
                                    '" module you used is unknown.\nYou can use: `location`, `security`, `timezone`, `currency` and/or `device`.\nRead more at: https://docs.greip.io/api-reference/endpoint/ip-geolocation/ip-lookup'
                            )
                        );
                    }
                }
            });

            // Validate the format variable
            if (!availableFormats.includes(format1)) {
                reject(
                    new Error(
                        'The `format` option value "' +
                            format1 +
                            '" you specified is unknown.\nYou can use: `JSON`, `XML`, `CSV` or `Newline`.\nRead more at: https://docs.greip.io/api-reference/endpoint/ip-geolocation/ip-lookup'
                    )
                );
            }

            // Validate the lang variable
            if (!availableLanguages.includes(lang1)) {
                reject(
                    new Error(
                        'The `lang` option value "' +
                            lang1 +
                            '" you specified is unknown.\nYou can use: `EN`, `AR`, `DE`, `FR`, `ES`, `JA`, `ZH` or `RU`.\nRead more at: https://docs.greip.io/api-reference/endpoint/ip-geolocation/ip-lookup'
                    )
                );
            }

            // Validate the mode variable
            if (mode1 !== "live" && mode1 !== "test") {
                reject(
                    new Error(
                        'The `mode` option value "' +
                            mode1 +
                            '" you specified is unknown.\nYou can use: `live` or `test`.\nRead more at: https://docs.greip.io/api-reference/endpoint/ip-geolocation/ip-lookup'
                    )
                );
            }
            makeHttpRquest(
                "IPLookup",
                {
                    ip: ip1,
                    params: params.join(","),
                    format: format1,
                    lang: lang1,
                    mode: mode1
                },
                (res: object) => {
                    if (typeof res !== "object") res = JSON.parse(res);
                    resolve(res);
                },
                this.token
            );
        });
    };

    Threats = (options: Options) => {
        if (typeof options !== "object") options = {};

        return new Promise((resolve, reject) => {
            const ip1 = options.ip || "";
            const format1 = options.format || "JSON";
            const mode1 = options.mode || "live";

            // Validate the ip variable
            if (ip1.length < 7) {
                reject(new Error("You should pass the `ip` parameter."));
            }

            // Validate the format variable
            if (!availableFormats.includes(format1)) {
                reject(
                    new Error(
                        'The `format` option value "' +
                            format1 +
                            '" you specified is unknown.\nYou can use: `JSON`, `XML`, `CSV` or `Newline`.\nRead more at: https://docs.greip.io/api-reference/endpoint/ip-geolocation/ip-lookup'
                    )
                );
            }

            // Validate the mode variable
            if (mode1 !== "live" && mode1 !== "test") {
                reject(
                    new Error(
                        'The `mode` option value "' +
                            mode1 +
                            '" you specified is unknown.\nYou can use: `live` or `test`.\nRead more at: https://docs.greip.io/api-reference/endpoint/ip-geolocation/ip-lookup'
                    )
                );
            }
            makeHttpRquest(
                "threats",
                {
                    ip: ip1,
                    format: format1,
                    mode: mode1
                },
                (res: object) => {
                    if (typeof res !== "object") res = JSON.parse(res);
                    resolve(res);
                },
                this.token
            );
        });
    };

    BulkLookup = (options: Options) => {
        if (typeof options !== "object") options = {};

        return new Promise((resolve, reject) => {
            let ips1 = options.ips || [];
            const params = options.params || [];
            const format1 = options.format || "JSON";
            let lang1 = options.lang || "EN";
            const mode1 = options.mode || "live";
            lang1 = lang1.toUpperCase();

            if (typeof ips1 !== "object") ips1 = [];

            // Validate the ip variable
            if (ips1.length < 1) {
                reject(new Error("You should pass the `ips` parameter."));
            }
            ips1.forEach((perParam) => {
                if (perParam.length < 7) {
                    reject(
                        new Error(
                            "You should pass a valid IP Addresses in the `ips` parameter."
                        )
                    );
                }
            });

            // Validate the params variable items
            params.forEach((perParam) => {
                if (perParam.length > 0) {
                    if (!availableGeoIPParams.includes(perParam)) {
                        reject(
                            new Error(
                                'The "' +
                                    perParam +
                                    '" module you used is unknown.\nYou can use: `location`, `security`, `timezone`, `currency` and/or `device`.\nRead more at: https://docs.greip.io/api-reference/endpoint/ip-geolocation/ip-lookup'
                            )
                        );
                    }
                }
            });

            // Validate the format variable
            if (!availableFormats.includes(format1)) {
                reject(
                    new Error(
                        'The `format` option value "' +
                            format1 +
                            '" you specified is unknown.\nYou can use: `JSON`, `XML`, `CSV` or `Newline`.\nRead more at: https://docs.greip.io/api-reference/endpoint/ip-geolocation/ip-lookup'
                    )
                );
            }

            // Validate the lang variable
            if (!availableLanguages.includes(lang1)) {
                reject(
                    new Error(
                        'The `lang` option value "' +
                            lang1 +
                            '" you specified is unknown.\nYou can use: `EN`, `AR`, `DE`, `FR`, `ES`, `JA`, `ZH` or `RU`.\nRead more at: https://docs.greip.io/api-reference/endpoint/ip-geolocation/ip-lookup'
                    )
                );
            }

            // Validate the mode variable
            if (mode1 !== "live" && mode1 !== "test") {
                reject(
                    new Error(
                        'The `mode` option value "' +
                            mode1 +
                            '" you specified is unknown.\nYou can use: `live` or `test`.\nRead more at: https://docs.greip.io/api-reference/endpoint/ip-geolocation/ip-lookup'
                    )
                );
            }
            makeHttpRquest(
                "BulkLookup",
                {
                    ips: ips1,
                    params: params.join(","),
                    format: format1,
                    lang: lang1,
                    mode: mode1
                },
                (res: object) => {
                    if (typeof res !== "object") res = JSON.parse(res);
                    resolve(res);
                },
                this.token
            );
        });
    };

    Country = (options: Options) => {
        if (typeof options !== "object") options = {};

        return new Promise((resolve, reject) => {
            let countryCode = options.countryCode || "";
            const params = options.params || [];
            const format1 = options.format || "JSON";
            let lang1 = options.lang || "EN";
            const mode1 = options.mode || "live";

            countryCode = countryCode.toUpperCase();
            lang1 = lang1.toUpperCase();

            // Validate the countryCode variable
            if (countryCode.length !== 2) {
                reject(
                    new Error(
                        "You should pass the `countryCode` parameter. Also, it should be a `ISO 3166-1 alpha-2` format.\nRead more at: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2"
                    )
                );
            }

            // Validate the params variable items
            params.forEach((perParam) => {
                if (perParam.length > 0) {
                    if (!availableCountryParams.includes(perParam)) {
                        reject(
                            new Error(
                                'The "' +
                                    perParam +
                                    '" module you used is unknown.\nYou can use: `language`, `flag`, `currency` and/or `timezone`.\nRead more at: https://docs.greip.io/api-reference/endpoint/other-services/country-data'
                            )
                        );
                    }
                }
            });

            // Validate the format variable
            if (!availableFormats.includes(format1)) {
                reject(
                    new Error(
                        'The `format` option value "' +
                            format1 +
                            '" you specified is unknown.\nYou can use: `JSON`, `XML`, `CSV` or `Newline`.\nRead more at: https://docs.greip.io/api-reference/endpoint/other-services/country-data'
                    )
                );
            }

            // Validate the lang variable
            if (!availableLanguages.includes(lang1)) {
                reject(
                    new Error(
                        'The `lang` option value "' +
                            lang1 +
                            '" you specified is unknown.\nYou can use: `EN`, `AR`, `DE`, `FR`, `ES`, `JA`, `ZH` or `RU`.\nRead more at: https://docs.greip.io/api-reference/endpoint/other-services/country-data'
                    )
                );
            }

            // Validate the mode variable
            if (mode1 !== "live" && mode1 !== "test") {
                reject(
                    new Error(
                        'The `mode` option value "' +
                            mode1 +
                            '" you specified is unknown.\nYou can use: `live` or `test`.\nRead more at: https://docs.greip.io/api-reference/endpoint/other-services/country-data'
                    )
                );
            }
            makeHttpRquest(
                "Country",
                {
                    CountryCode: countryCode,
                    params: params.join(","),
                    format: format1,
                    lang: lang1,
                    mode: mode1
                },
                (res: object) => {
                    if (typeof res !== "object") res = JSON.parse(res);
                    resolve(res);
                },
                this.token
            );
        });
    };

    Profanity = (options: Options) => {
        if (typeof options !== "object") options = {};

        return new Promise((resolve, reject) => {
            const text1 = options.text || "";
            const params = options.params || [];
            const format1 = options.format || "JSON";
            let lang1 = options.lang || "EN";
            const mode1 = options.mode || "live";

            lang1 = lang1.toUpperCase();

            // Validate the text variable
            if (text1.length < 1) {
                reject(new Error("You should pass the `text` parameter."));
            }

            // Validate the format variable
            if (!availableFormats.includes(format1)) {
                reject(
                    new Error(
                        'The `format` option value "' +
                            format1 +
                            '" you specified is unknown.\nYou can use: `JSON`, `XML` or `CSV`.\nRead more at: https://docs.greip.io/api-reference/endpoint/other-services/profanity-detection'
                    )
                );
            }

            // Validate the lang variable
            if (!availableLanguages.includes(lang1)) {
                reject(
                    new Error(
                        'The `lang` option value "' +
                            lang1 +
                            '" you specified is unknown.\nYou can use: `EN`, `AR`, `DE`, `FR`, `ES`, `JA`, `ZH` or `RU`.\nRead more at: https://docs.greip.io/api-reference/endpoint/other-services/profanity-detection'
                    )
                );
            }

            // Validate the mode variable
            if (mode1 !== "live" && mode1 !== "test") {
                reject(
                    new Error(
                        'The `mode` option value "' +
                            mode1 +
                            '" you specified is unknown.\nYou can use: `live` or `test`.\nRead more at: https://docs.greip.io/api-reference/endpoint/other-services/profanity-detection'
                    )
                );
            }
            makeHttpRquest(
                "badWords",
                {
                    text: text1,
                    params: params.join(","),
                    format: format1,
                    lang: lang1,
                    mode: mode1
                },
                (res: object) => {
                    if (typeof res !== "object") res = JSON.parse(res);
                    resolve(res);
                },
                this.token
            );
        });
    };

    ASN = (options: Options) => {
        if (typeof options !== "object") options = {};

        return new Promise((resolve, reject) => {
            const asn1 = options.asn || "";
            const mode1 = options.mode || "live";

            // Validate the text variable
            if (asn1.length < 1) {
                reject(new Error("You should pass the `asn` parameter."));
            }

            // Validate the mode variable
            if (mode1 !== "live" && mode1 !== "test") {
                reject(
                    new Error(
                        'The `mode` option value "' +
                            mode1 +
                            '" you specified is unknown.\nYou can use: `live` or `test`.\nRead more at: https://docs.greip.io/api-reference/endpoint/ip-geolocation/asn-lookup'
                    )
                );
            }
            makeHttpRquest(
                "ASNLookup",
                {
                    asn: asn1,
                    mode: mode1
                },
                (res: object) => {
                    if (typeof res !== "object") res = JSON.parse(res);
                    resolve(res);
                },
                this.token
            );
        });
    };

    EmailValidation = (options: Options) => {
        if (typeof options !== "object") options = {};

        return new Promise((resolve, reject) => {
            const email1 = options.email || "";
            const mode1 = options.mode || "live";

            // Validate the text variable
            if (email1.length < 1) {
                reject(new Error("You should pass the `email` parameter."));
            }

            // Validate the mode variable
            if (mode1 !== "live" && mode1 !== "test") {
                reject(
                    new Error(
                        'The `mode` option value "' +
                            mode1 +
                            '" you specified is unknown.\nYou can use: `live` or `test`.\nRead more at: https://docs.greip.io/api-reference/endpoint/data-validation/email-lookup'
                    )
                );
            }
            makeHttpRquest(
                "validateEmail",
                {
                    email: email1,
                    mode: mode1
                },
                (res: object) => {
                    if (typeof res !== "object") res = JSON.parse(res);
                    resolve(res);
                },
                this.token
            );
        });
    };

    PaymentFraud = (options: Options) => {
        if (typeof options !== "object") options = {};

        return new Promise((resolve, reject) => {
            const data1 = options.data || [];
            const mode1 = options.mode || "live";

            // Validate the text variable
            if (typeof data1 !== "object" || Array.isArray(data1)) {
                reject(new Error("You should pass the `data` parameter."));
            }

            // Validate the mode variable
            if (mode1 !== "live" && mode1 !== "test") {
                reject(
                    new Error(
                        'The `mode` option value "' +
                            mode1 +
                            '" you specified is unknown.\nYou can use: `live` or `test`.\nRead more at: https://docs.greip.io/api-reference/endpoint/payment-fraud/payment-fraud-prevention'
                    )
                );
            }
            makePostRquest(
                "paymentFraud",
                {
                    data: data1,
                    mode: mode1
                },
                (res: object) => {
                    if (typeof res !== "object") res = JSON.parse(res);
                    resolve(res);
                },
                this.token
            );
        });
    };

    PhoneValidation = (options: Options) => {
        if (typeof options !== "object") options = {};

        return new Promise((resolve, reject) => {
            const phone1 = options.phone || "";
            const countryCode1 = options.countryCode || "";
            const mode1 = options.mode || "live";

            // Validate the text variable
            if (phone1.length < 1 || countryCode1.length < 1) {
                reject(
                    new Error(
                        "You should pass both `phone` and `countryCode` parameters."
                    )
                );
            }

            // Validate the mode variable
            if (mode1 !== "live" && mode1 !== "test") {
                reject(
                    new Error(
                        'The `mode` option value "' +
                            mode1 +
                            '" you specified is unknown.\nYou can use: `live` or `test`.\nRead more at: https://docs.greip.io/api-reference/endpoint/data-validation/phone-lookup'
                    )
                );
            }
            makeHttpRquest(
                "validatePhone",
                {
                    phone: phone1,
                    countryCode: countryCode1,
                    mode: mode1
                },
                (res: object) => {
                    if (typeof res !== "object") res = JSON.parse(res);
                    resolve(res);
                },
                this.token
            );
        });
    };

    IBANValidation = (options: Options) => {
        if (typeof options !== "object") options = {};

        return new Promise((resolve, reject) => {
            const iban1 = options.iban || "";
            const mode1 = options.mode || "live";

            // Validate the text variable
            if (iban1.length < 1) {
                reject(new Error("You should pass the `iban` parameter."));
            }

            // Validate the mode variable
            if (mode1 !== "live" && mode1 !== "test") {
                reject(
                    new Error(
                        'The `mode` option value "' +
                            mode1 +
                            '" you specified is unknown.\nYou can use: `live` or `test`.\nRead more at: https://docs.greip.io/api-reference/endpoint/payment-fraud/iban-validation'
                    )
                );
            }
            makeHttpRquest(
                "validateIBAN",
                {
                    iban: iban1,
                    mode: mode1
                },
                (res: object) => {
                    if (typeof res !== "object") res = JSON.parse(res);
                    resolve(res);
                },
                this.token
            );
        });
    };
}

export { Greip };

export default Greip;
module.exports = Greip;
