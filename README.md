# Greip Node.js Library

The official Node.js library for the Greip API.

[Report Issue](https://github.com/Greipio/node/issues/new) ·
[Request Feature](https://github.com/Greipio/node/discussions/new?category=ideas)
· [Greip Website](https://greip.io/) · [Documentation](https://docs.greip.io/)

[![NPM Package of Greip](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/greip-node)
[![Github Repository](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Greipio/node)

[![npm version](https://badge.fury.io/js/greip-node.svg)](https://badge.fury.io/js/greip-node)
&nbsp;&nbsp;
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Greipio/node?color=green&label=Minified%20size&logo=github)
&nbsp;&nbsp;
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/apache-2-0)
&nbsp;&nbsp;
![API Status](https://img.shields.io/website?down_color=orange&down_message=down&label=API%20status&up_color=green&up_message=up&url=https%3A%2F%2Fgreipapi.com)

---

## Installation

Install the package using npm or yarn:

```bash
npm install greip-node --save
```

or

```bash
yarn add greip-node
```

---

## Usage

Import the Greip library and initialize it with your API token:

```javascript
const { Greip } = require("greip-node");
const greip = new Greip(process.env.GREIP_TOKEN);
```

### IP Lookup

**Available Options**

| Option | Type     | Required | Description                                                                  |
| ------ | -------- | -------- | ---------------------------------------------------------------------------- |
| ip     | string   | Yes      | The IP address to lookup                                                     |
| params | string[] | No       | Modules to include: `location`, `security`, `timezone`, `currency`, `device` |
| format | string   | No       | Response format: `JSON`, `XML`, `CSV`, `Newline`                             |
| lang   | string   | No       | Language: `EN`, `AR`, `DE`, `FR`, `ES`, `JA`, `ZH`, `RU`                     |
| mode   | string   | No       | Mode: `live`, `test`                                                         |

```javascript
greip
    .Lookup({ ip: "1.1.1.1" })
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });
```

### IP Threats

**Available Options**

| Option | Type   | Required | Description                                      |
| ------ | ------ | -------- | ------------------------------------------------ |
| ip     | string | Yes      | The IP address to check for threats              |
| format | string | No       | Response format: `JSON`, `XML`, `CSV`, `Newline` |
| mode   | string | No       | Mode: `live`, `test`                             |

```javascript
greip
    .Threats({ ip: "1.1.1.1" })
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Bulk IP Lookup

**Available Options**

| Option | Type     | Required | Description                                                                  |
| ------ | -------- | -------- | ---------------------------------------------------------------------------- |
| ips    | string[] | Yes      | Array of IP addresses to lookup                                              |
| params | string[] | No       | Modules to include: `location`, `security`, `timezone`, `currency`, `device` |
| format | string   | No       | Response format: `JSON`, `XML`, `CSV`, `Newline`                             |
| lang   | string   | No       | Language: `EN`, `AR`, `DE`, `FR`, `ES`, `JA`, `ZH`, `RU`                     |
| mode   | string   | No       | Mode: `live`, `test`                                                         |

```javascript
greip
    .BulkLookup({ ips: ["1.1.1.1", "2.2.2.2"] })
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });
```

### ASN Lookup

**Available Options**

| Option | Type   | Required | Description          |
| ------ | ------ | -------- | -------------------- |
| asn    | string | Yes      | The ASN to lookup    |
| mode   | string | No       | Mode: `live`, `test` |

```javascript
greip
    .ASN({ asn: "AS01" })
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Profanity Detection

**Available Options**

| Option | Type     | Required | Description                                              |
| ------ | -------- | -------- | -------------------------------------------------------- |
| text   | string   | Yes      | The text to check for profanity                          |
| params | string[] | No       | Additional parameters (see docs)                         |
| format | string   | No       | Response format: `JSON`, `XML`, `CSV`                    |
| lang   | string   | No       | Language: `EN`, `AR`, `DE`, `FR`, `ES`, `JA`, `ZH`, `RU` |
| mode   | string   | No       | Mode: `live`, `test`                                     |

```javascript
greip
    .Profanity({ text: "This is just normal sample text." })
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Country Lookup

**Available Options**

| Option      | Type     | Required | Description                                              |
| ----------- | -------- | -------- | -------------------------------------------------------- |
| countryCode | string   | Yes      | ISO 3166-1 alpha-2 country code                          |
| params      | string[] | No       | Modules: `language`, `flag`, `currency`, `timezone`      |
| format      | string   | No       | Response format: `JSON`, `XML`, `CSV`, `Newline`         |
| lang        | string   | No       | Language: `EN`, `AR`, `DE`, `FR`, `ES`, `JA`, `ZH`, `RU` |
| mode        | string   | No       | Mode: `live`, `test`                                     |

```javascript
greip
    .Country({ countryCode: "SA" })
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Email Validation

**Available Options**

| Option | Type   | Required | Description                   |
| ------ | ------ | -------- | ----------------------------- |
| email  | string | Yes      | The email address to validate |
| mode   | string | No       | Mode: `live`, `test`          |

```javascript
greip
    .EmailValidation({ email: "name@domain.com" })
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Phone Validation

**Available Options**

| Option      | Type   | Required | Description                       |
| ----------- | ------ | -------- | --------------------------------- |
| phone       | string | Yes      | The phone number to validate      |
| countryCode | string | Yes      | Country code (ISO 3166-1 alpha-2) |
| mode        | string | No       | Mode: `live`, `test`              |

```javascript
greip
    .PhoneValidation({
        phone: "123123123",
        countryCode: "US"
    })
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Payment Fraud Prevention

**Available Options**

| Option | Type   | Required | Description                                                                                                       |
| ------ | ------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| data   | object | Yes      | Transaction data ([see all fields](https://docs.greip.io/api-reference/endpoint/scoring/payment#body-parameters)) |
| mode   | string | No       | Mode: `live`, `test`                                                                                              |

```javascript
greip
    .PaymentFraud({
        data: {
            // ...transaction and customer details...
        }
    })
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });
```

### IBAN Validation

**Available Options**

| Option | Type   | Required | Description          |
| ------ | ------ | -------- | -------------------- |
| iban   | string | Yes      | The IBAN to validate |
| mode   | string | No       | Mode: `live`, `test` |

```javascript
greip
    .IBANValidation({ iban: "BY86AKBB10100000002966000000" })
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.error(error);
    });
```

---

## Documentation

For detailed API documentation and advanced usage, visit the
[Greip Documentation](https://docs.greip.io/).

---

## Credits

-   [Greip Developers](https://greip.io)
-   [All Contributors](https://github.com/Greipio/node/graphs/contributors)

---

## Repository Activity

![Alt](https://repobeats.axiom.co/api/embed/bab805f0de99cf0d92ad370eaeac81a33b025d13.svg "Repobeats analytics image")
