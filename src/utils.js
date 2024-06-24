import Papa from "papaparse";

export async function loadCSVData(filePath, header = false) {
    return new Promise((resolve, reject) => {
        Papa.parse(filePath, {
            download: true,
            header: header,
            skipEmptyLines: true,
            dynamicTyping: true,

            complete: (result) => {
                if (result.data) {
                    resolve(result.data);
                } else {
                    reject(new Error("Failed to parse CSV file."));
                }
            },
            error: (error) => {
                reject(error);
            },
        });
    });
}

export function sortParallellyArr(sortingArr, sortedArr) {
    const ix = sortingArr.map((x, i) => i);
    ix.sort((a, b) => sortingArr[a] - sortingArr[b]);
    sortingArr = ix.map((x) => sortingArr[x]);
    sortedArr = ix.map((x) => sortedArr[x]);

    return [sortingArr, sortedArr];
}

export function hexToHsv(hex) {
    let r = 0,
        g = 0,
        b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    (r /= 255), (g /= 255), (b /= 255);
    let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h,
        s,
        v = max;
    let d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [h * 360, s * 100, v * 100];
}

export function randomColors(amount) {
    const randomColors = [];
    const letters = "0123456789ABCDEF";

    for (let i = 0; i < amount; i++) {
        let color = "#";
        for (let j = 0; j < 6; j++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        randomColors.push(color);
    }
    return randomColors;
}
