export interface ResponseData<T> {
    msg: string;
    code: number;
    data: T;
    total?: number;
}

export interface IUser {
    id: string;
    name: string;
    birthday: string;
    gender: string;
    avatar: string;
}

export interface IClientConfig {
    oaId: string;
    address: string;
    medicalLink: string;
    menu: string[];
    promotion: string[];
    logoURL: string;
    wifi: {
        name: string;
        password: string;
    };
    payment: {
        icon: string;
        title: string;
        description: string;
        actionLink: string;
    }[];
}
export interface IAppConfig {
    title: string;
    headerColor: string;
    textColor: string;
    statusBarColor: string;
    leftButton: string;
}
