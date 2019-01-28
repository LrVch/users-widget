import { WIDGET_ITEMS_COUNT } from './config';

export const deleteRepeated = (source, pattern) =>
    source.filter(item => !pattern.some(s => s.id === item.id));

export const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
};

export const mapToItem = (elemData) => {
    return {
        id: elemData.id,
        img: elemData.avatar_url,
        name: elemData.login,
        href: elemData.html_url
    };
};

export const mapToItems = (elemsData, count = WIDGET_ITEMS_COUNT) => {
    return elemsData.map(mapToItem).slice(0, count);
};

export const mapResponse = ({ refreshItemId, response, renderedData }) => {
    if (!refreshItemId || !renderedData.length) {
        return mapToItems(response);
    } else {
        const index = renderedData.findIndex(elem => elem.id === Number(refreshItemId));
        const outOfRepeat = deleteRepeated(response, renderedData);
        const newElemIndex = randomInteger(0, outOfRepeat.length - 1);
        const newElem = mapToItem(outOfRepeat[newElemIndex]);
        return [...renderedData.slice(0, index), newElem, ...renderedData.slice(index + 1)];
    }
};

export const compbineData = ([data, renderedData]) => ({ ...data, renderedData });

export const getRandomOffset = (offset = 500) =>  Math.floor(Math.random() * offset);
