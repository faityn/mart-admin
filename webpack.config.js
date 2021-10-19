const commonConfig = require('./src/config/webpack');
const { merge } = require('webpack-merge');

const addons = (addonsArg) => {
  let addons = [...[addonsArg]]
    .filter(Boolean); 

  return addons.map(addonName =>
    require(`./src/config/addons/webpack.${addonName}.js`)
  );
};


module.exports = env => {

  if (!env) {
    throw new Error("You must pass an --env.env flag into your build for webpack to work!");
  }

  const envConfig = require(`./src/config/webpack.${env.env}.js`);

  const mergedConfig = merge(
    commonConfig,
    envConfig,
    ...addons(env.addons)
  );

  return mergedConfig;
};