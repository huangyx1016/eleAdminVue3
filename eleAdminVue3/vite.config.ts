import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons"; //引入vite-plugin-svg-icons 插件 用于生成 svg 雪碧图.
import path from "path"; // https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md

// https://vitejs.dev/config/
export default defineConfig({
  //*****plugins插件配置*****
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
      /**
       * 自定义插入位置
       * @default: body-last
       */
      //inject?: "body-last" | "body-first"
      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      customDomId: "__svg__icons__dom__",
    }), //vite-plugin-svg-icons 插件配置项
    Components({
      resolvers: [
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js", //去除i18n控制台提示vue-i18n.esm-bundler.js:39 You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle
    },
  },
  // *****开发服务器配置*****
  server: {
    //配置代理,解决跨域问题
    proxy: {
      //配置自定义代理规则
      "/api": {
        target: "http://127.0.0.1:8888/api/private/v1/", //后台接口路径
        changeOrigin: true, //是否跨域
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  //定义全局常量替换方式
  define: {
    //定义开发环境
    "process.env": {
      ENV: "development",
      VUE_APP_BASE_API: "/api",
    },
    //生产环境
    "process.pro": {
      ENV: "production",
      VUE_APP_BASE_API: "/prod-api",
    },
  },
});
