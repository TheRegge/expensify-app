import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// require('dotenv').config({path: '.env.test' }); // Pass env variables to tests (for Firebase)
import DotEnv from 'dotenv';

DotEnv.config({path: '.env.test'}); // Pass .env.test variables to tests (so can connect to Firebase)

Enzyme.configure({
    adapter: new Adapter()
});