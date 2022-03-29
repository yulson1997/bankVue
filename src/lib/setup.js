import platformSupport from '../../bankConfig/platformSupport'

platformSupport.installJsBridgeImpl()
platformSupport.installNetImpl();
platformSupport.installConfig();

const requireAll = (context) => context.keys().map(context);
const req = require.context('assets/img', true, /\.svg$/);
requireAll(req);