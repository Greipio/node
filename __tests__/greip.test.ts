import * as dotenv from "dotenv";
import { Greip } from "../src/index";

let greip: Greip;

beforeEach(() => {
    dotenv.config();
    const token = process.env.GREIP_TOKEN || "";
    //? Force fail if token is not provided
    if (token === "") {
        throw new Error(
            "Please place the `GREIP_TOKEN` in the .env file before running the tests."
        );
    }
    greip = new Greip(token);
});

describe("Greip", () => {
    test("Lookup", async () => {
        const data: any = await greip.Lookup({
            ip: "1.1.1.1"
        });
        expect(data.ip).toEqual("1.1.1.1");
    });

    test("ASN", async () => {
        const data: any = await greip.ASN({
            asn: "AS13335"
        });
        expect(data.asn).toEqual("AS13335");
    });

    test("EmailValidation", async () => {
        const data: any = await greip.EmailValidation({
            email: "name@domain.com"
        });
        expect(data.isValid).toBeFalsy();
    });

    test("PhoneValidation", async () => {
        const data: any = await greip.PhoneValidation({
            phone: "1234567890",
            countryCode: "US"
        });
        expect(data.isValid).toBeFalsy();
    });

    test("IBANValidation", async () => {
        const data: any = await greip.IBANValidation({
            iban: "DE89370400440532013000"
        });
        expect(data.isValid).toBeTruthy();
    });

    test("BulkLookup", async () => {
        const data: any = await greip.BulkLookup({
            ips: ["1.1.1.1", "2.2.2.2"]
        });
        expect(data["1.1.1.1"].ip).toEqual("1.1.1.1");
        expect(data["2.2.2.2"].ip).toEqual("2.2.2.2");
    });

    test("Country", async () => {
        const data: any = await greip.Country({
            countryCode: "PS"
        });
        expect(data.countryCode).toEqual("PS");
    });

    test("Profanity", async () => {
        const data: any = await greip.Profanity({
            text: "This is not a text with profanity"
        });
        expect(data.isSafe).toBeTruthy();
    });

    test("PaymentFraud", async () => {
        const data: any = await greip.PaymentFraud({
            data: {
                transaction_amount: 100,
                currency: "USD"
            }
        });
        expect(data.score).toBeDefined();
    });
});
