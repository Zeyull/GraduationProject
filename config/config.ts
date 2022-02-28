import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './routes';
import theme from './theme';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  routes,
  theme,
  fastRefresh: {},
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  extraPostCSSPlugins: [require('tailwindcss'), require('autoprefixer')],
});
