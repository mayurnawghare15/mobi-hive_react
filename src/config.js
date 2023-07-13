let API_SERVER = 'https//stage.credithive.co.uk/webservices/';
if (process.env.REACT_APP_BACKEND_SERVER) {
    API_SERVER = process.env.REACT_APP_BACKEND_SERVER;
} else {
    API_SERVER = 'http://localhost:5000/api/';
}

const config = {
    // basename: only at build time to set, and don't add '/' at end off BASENAME for breadcrumbs, also don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: '',
    defaultPath: '/',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    API_SERVER: API_SERVER
};

export default config;
