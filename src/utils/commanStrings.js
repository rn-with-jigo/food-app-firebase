import uuid from "react-native-uuid";

export const commanStrings = {
    order_cancled: "Cancled",
    order_placed: "Placed",
    order_accepted: "Accepted",
    order_Completed: "Completed",
    order_prepared: "Prepared",
}

export const options = [
    {
        id: "op#001",
        name: "with name, price | SNP",
        slug: "SNP",
    },
    {
        id: "op#002",
        name: "with name, image, price | SNIP",
        slug: "SNIP",
    },
]

export const options1 = [
    {
        id: "op#001",
        name: "Ch. with name, price | NP",
        slug: "SNP",
    },
    {
        id: "op#002",
        name: "Ch. with name, image, price | SNIP",
        slug: "SNIP",
    }
]

/**
 * 
 * @param {number} limit 
 * @description limit paramenter for the take limt of string.
 * @returns 
 */
export const getRandomString = (limit = 8) => {
    return uuid.v4().substring(0, limit);
}