import dayjs from 'dayjs';

export const buildParams = (data?: any) => {
    if (data) {
        const dataEdited = {
            ...data,
        };

        let queryData = {};
        try {
            queryData = Object.fromEntries(
                Object.entries(dataEdited).filter(([_, v]) => v != null && v !== '' && v !== -1),
            );
        } catch (err) {
            console.log('Có lỗi xảy ra: ', err);
        }

        return Object.keys(queryData)
            .map(key => {
                if (Array.isArray(queryData[key])) {
                    return `${key}=[${queryData[key]}]`;
                }
                if (typeof queryData[key] === 'object') {
                    return `${key}=${JSON.stringify(queryData[key])}`;
                }
                return `${key}=${encodeURIComponent(queryData[key])}`;
            })
            .join('&');
    }
    return '';
};
export const buildURLWithParam = (url: string, query?: any) => {
    return url + '?' + buildParams(query);
};

export function extend(obj1, obj2) {
    return { ...obj1, ...obj2 };
}

export const isValidUrl = (url: string) => {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i',
    ); // fragment locator
    return !!pattern.test(url);
};

//copy to clipboard
export const copyToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
};

// 5am < time <= 11am: sáng
// 11am < time <= 2pm: trưa
// 2pm < time <= 6pm: chiều
// 6pm < time <= 5am: tối
export const getGreetingFromTime = () => {
    const d = new Date();
    const time = d.getHours();
    if (time > 5 && time < 11) {
        return 'sáng';
    }
    if (time >= 11 && time < 14) {
        return 'trưa';
    }
    if (time >= 14 && time < 18) {
        return 'chiều';
    }
    return 'tối';
};

export const getResetTimeInDate = (date: any) =>
    dayjs(date).set('hours', 6).set('minutes', 0).set('seconds', 0);
