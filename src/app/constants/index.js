const DEFAULT_GLOBAL_STATE = {
    user: {
    },
    theme: {
        value: "light",
        colors: {
        }
    },
    modal: {
        children: undefined,
        onCancel: undefined,
        isActive: false,
        type: "loading",
        data: undefined,
        onSubmit: {
            action: () => {},
            text: "Tamam"
        }
    }
};
export default DEFAULT_GLOBAL_STATE;

export const ROUTES = [
    {
        title: "Ana Sayfa",
        route: "/"
    },
    {
        title: "Başla",
        route: "/dashboard"
    }
];

export const THEME_TOKENS = {
    spacing: 10
};

export const REAL_ESTATE_STATES = {
    "empty": {
        "color": "orange",
        "value": "Boş"
    },
    "active": {
        "value": "Kullanımda",
        "color": "green"
    }
};