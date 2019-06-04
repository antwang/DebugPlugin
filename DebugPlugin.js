const fs = require("fs");
const path = require("path");

class DebugPlugin {
  constructor(options) {
    this.options = Object.assign({}, { enable: false }, options);
  }
  apply(compiler) {
    const ID = `vc-debug`;
    compiler.hooks.entryOption.tap(ID, this.addVConsole.bind(this));
  }

  addVConsole(localPath, entry) {
    let vconslePath = "DebugPlugin/vconsole.js";
    const { enable } = this.options;
    const _exist = module.parent.paths.find(item => {
      let _vconslePath = path.join(item, vconslePath);
      if (fs.existsSync(item) && fs.existsSync(_vconslePath)) {
        vconslePath = _vconslePath;
        return true;
      }
      return false;
    });

    if (!_exist) {
      console.error("DebugPlugin/vconsole.js not found!");
      return;
    }

    if (enable) {
      if (typeof entry === "string") {
        entry = [vconslePath, entry];
        console.error("entry could not be a string");
        return;
      }

      if (Object.prototype.toString.call(entry) === "[object Array]") {
        entry.unshift(vconslePath);
      }

      if (Object.prototype.toString.call(entry) === "[object Object]") {
        for (let key in entry) {
          if (Object.prototype.toString.call(entry[key]) === "[object Array]") {
            entry[key].unshift(vconslePath);
          }
          if (typeof entry[key] === "string") {
            entry[key] = [vconslePath, entry[key]];
          }
        }
      }
    }
  }
}

module.exports = DebugPlugin;
