import { buildURLWithParam, extend } from '.';
import { DOMAIN_API_URL } from '../constants';
import { ResponseData } from '../constants/interface';

export function fetch(url, params?: {}, options?: {}, timeOut?: 10): Promise<ResponseData<any>> {
    const zf_id = document.cookie.replace(/(?:(?:^|.*;\s*)zf_id\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    const exOptions = extend(
        {
            credentials: 'include',
            headers: zf_id ? { authorization: zf_id } : {},
        },
        options,
    );

    return window.fetch(buildURLWithParam(url, params), exOptions).then(toJson).then(validResp);
}

export const getWithPath = (path, params?: {}, options?: {}, timeOut?: 10) => {
    return getWithUrl(DOMAIN_API_URL + path, params, options, timeOut);
};

export const getWithLocalPath = (path, params?: {}, options?: {}, timeOut?: 10) => {
    return getWithUrl('http://localhost:3000/api' + path, params, options, timeOut);
};

export const getWithUrl = (url: string, params?: {}, options?: {}, timeOut?: 10) => {
    return fetch(url, params, options, timeOut);
};

export const getUrlFromPath = (path, params) => {
    return buildURLWithParam(DOMAIN_API_URL + path, params);
};

export const post = (url, params = {}, data: any = {}, options: any = {}, timeOut) => {
    return fetch(url, params, extend({ body: JSON.stringify(data) }, options), timeOut);
};

export const postWithUrlBinary = (url, params?: {}, data?: {}, options?: {}, timeOut?: 10) => {
    const formData = new FormData();
    for (const key in data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
        }
    }
    return fetch(url, params, extend({ body: formData, method: 'POST' }, options), timeOut);
};

export const postWithPath = (path, params?: {}, data?: {}, options?: {}, timeOut?: 10) => {
    return postWithUrl(DOMAIN_API_URL + path, params, data, options, timeOut);
};

export const putWithPath = (path, params?: {}, data?: {}, options?: {}, timeOut?: 10) => {
    return putWithUrl(DOMAIN_API_URL + path, params, data, options, timeOut);
};

export const postWithPathBinary = (path, params?: {}, data?: {}, options?: {}, timeOut?: 10) => {
    return postWithUrlBinary(DOMAIN_API_URL + path, params, data, options, timeOut);
};

export const postWithUrl = (url, params?: {}, data?: {}, options?: {}, timeOut?: 10) => {
    return post(url, params, data, extend({ method: 'POST' }, options), timeOut);
};

export const putWithUrl = (url, params?: {}, data?: {}, options?: {}, timeOut?: 10) => {
    return post(url, params, data, extend({ method: 'PUT' }, options), timeOut);
};

export const getFileWithPath = (path, params?: {}, options?: {}, timeOut?: 10) => {
    let fileName = 'file.txt';
    const exOptions = extend(
        {
            credentials: 'include',
        },
        options,
    );

    return window
        .fetch(buildURLWithParam(DOMAIN_API_URL + path, params), exOptions)
        .then(resp => {
            if (resp.ok) {
                const disposition = resp.headers.get('content-disposition');
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    const matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) {
                        const files = matches[1].split("''");
                        fileName = files[files.length - 1];
                    }
                }

                return resp.blob();
            } else {
                return Promise.reject(resp);
            }
        })
        .then(blob => {
            // 2. Create blob link to download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            // 3. Append to html page
            document.body.appendChild(link);
            // 4. Force download
            link.click();
            // 5. Clean up and remove the link
            link?.parentNode?.removeChild(link);
        });
};

function toJson(resp) {
    if (resp.ok) {
        return resp.json();
    }

    return Promise.reject(resp);
}

function validResp<T>(resp: ResponseData<T>): Promise<ResponseData<T>> {
    if (!resp || resp.code !== 0) {
        return Promise.reject(resp);
    }
    return Promise.resolve(resp);
}
