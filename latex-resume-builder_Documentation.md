### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\.env.local
*Saved at: 6/5/2026, 12:38:11 PM*

**[REMOVED]**
```
(from line ~5)
BACKEND_ORIGIN=http://127.0.0.1:8000
```
**[ADDED]**
```
5     BACKEND_ORIGIN=http://127.0.0.1:8000
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\next.config.js
*Saved at: 6/1/2026, 2:18:42 PM*

**[REMOVED]**
```
(from line ~5)
  // Moved out of experimental in Next 16
  serverComponentsExternalPackages: ['pdf-parse', 'mammoth', 'openai'],

```
**[ADDED]**
```
5       experimental: {
6         serverComponentsExternalPackages: ['pdf-parse', 'mammoth', 'openai'],
7       },
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\next.config.js
*Saved at: 6/1/2026, 2:17:32 PM*

**[REMOVED]**
```
(from line ~6)
  serverExternalPackages: ['pdf-parse', 'mammoth', 'openai'],

```
**[ADDED]**
```
6       serverComponentsExternalPackages: ['pdf-parse', 'mammoth', 'openai'],
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\next.config.js
*Saved at: 6/1/2026, 2:04:32 PM*

**[REMOVED]**
```
(from line ~6)
  serverComponentsExternalPackages: ['pdf-parse', 'mammoth', 'openai'],

```
**[ADDED]**
```
6       serverExternalPackages: ['pdf-parse', 'mammoth', 'openai'],
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\next.config.js
*Saved at: 6/1/2026, 2:04:15 PM*

**[REMOVED]**
```
(from line ~6)
  serverExternalPackages: ['pdf-parse', 'mammoth', 'openai'],

```
**[ADDED]**
```
6       serverComponentsExternalPackages: ['pdf-parse', 'mammoth', 'openai'],
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\next.config.js
*Saved at: 6/1/2026, 2:02:30 PM*

**[REMOVED]**
```
(from line ~6)
  serverExternalPackages: [],

```
**[ADDED]**
```
6       serverExternalPackages: ['pdf-parse', 'mammoth', 'openai'],
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\next.config.js
*Saved at: 6/1/2026, 2:02:12 PM*

**[REMOVED]**
```
(from line ~6)
  serverExternalPackages: ['pdf-parse', 'mammoth', 'openai'],

```
**[ADDED]**
```
6       serverExternalPackages: [],
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\tsconfig.json
*Saved at: 6/1/2026, 2:01:15 PM*

**[REMOVED]**
```
(from line ~3)
    "target": "es5",

```
**[ADDED]**
```
3         "target": "es2022",
```
**[REMOVED]**
```
(from line ~18)
    "jsx": "react-jsx",

```
**[ADDED]**
```
18        "jsx": "preserve",
```
**[REMOVED]**
```
(from line ~41)
}
```
**[ADDED]**
```
41    }
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\tsconfig.tsbuildinfo
*Saved at: 6/1/2026, 1:02:37 PM*

**[ADDED]**
```
1     {"fileNames":["./node_modules/typescript/lib/lib.es5.d.ts","./node_modules/typescript/lib/lib.es2015.d.ts","./node_modules/typescript/lib/lib.es2016.d.ts","./node_modules/typescript/lib/lib.es2017.d.ts","./node_modules/typescript/lib/lib.es2018.d.ts","./node_modules/typescript/lib/lib.es2019.d.ts","./node_modules/typescript/lib/lib.es2020.d.ts","./node_modules/typescript/lib/lib.es2021.d.ts","./node_modules/typescript/lib/lib.es2022.d.ts","./node_modules/typescript/lib/lib.es2023.d.ts","./node_modules/typescript/lib/lib.es2024.d.ts","./node_modules/typescript/lib/lib.esnext.d.ts","./node_modules/typescript/lib/lib.dom.d.ts","./node_modules/typescript/lib/lib.dom.iterable.d.ts","./node_modules/typescript/lib/lib.es2015.core.d.ts","./node_modules/typescript/lib/lib.es2015.collection.d.ts","./node_modules/typescript/lib/lib.es2015.generator.d.ts","./node_modules/typescript/lib/lib.es2015.iterable.d.ts","./node_modules/typescript/lib/lib.es2015.promise.d.ts","./node_modules/typescript/lib/lib.es2015.proxy.d.ts","./node_modules/typescript/lib/lib.es2015.reflect.d.ts","./node_modules/typescript/lib/lib.es2015.symbol.d.ts","./node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts","./node_modules/typescript/lib/lib.es2016.array.include.d.ts","./node_modules/typescript/lib/lib.es2016.intl.d.ts","./node_modules/typescript/lib/lib.es2017.arraybuffer.d.ts","./node_modules/typescript/lib/lib.es2017.date.d.ts","./node_modules/typescript/lib/lib.es2017.object.d.ts","./node_modules/typescript/lib/lib.es2017.sharedmemory.d.ts","./node_modules/typescript/lib/lib.es2017.string.d.ts","./node_modules/typescript/lib/lib.es2017.intl.d.ts","./node_modules/typescript/lib/lib.es2017.typedarrays.d.ts","./node_modules/typescript/lib/lib.es2018.asyncgenerator.d.ts","./node_modules/typescript/lib/lib.es2018.asynciterable.d.ts","./node_modules/typescript/lib/lib.es2018.intl.d.ts","./node_modules/typescript/lib/lib.es2018.promise.d.ts","./node_modules/typescript/lib/lib.es2018.regexp.d.ts","./node_modules/typescript/lib/lib.es2019.array.d.ts","./node_modules/typescript/lib/lib.es2019.object.d.ts","./node_modules/typescript/lib/lib.es2019.string.d.ts","./node_modules/typescript/lib/lib.es2019.symbol.d.ts","./node_modules/typescript/lib/lib.es2019.intl.d.ts","./node_modules/typescript/lib/lib.es2020.bigint.d.ts","./node_modules/typescript/lib/lib.es2020.date.d.ts","./node_modules/typescript/lib/lib.es2020.promise.d.ts","./node_modules/typescript/lib/lib.es2020.sharedmemory.d.ts","./node_modules/typescript/lib/lib.es2020.string.d.ts","./node_modules/typescript/lib/lib.es2020.symbol.wellknown.d.ts","./node_modules/typescript/lib/lib.es2020.intl.d.ts","./node_modules/typescript/lib/lib.es2020.number.d.ts","./node_modules/typescript/lib/lib.es2021.promise.d.ts","./node_modules/typescript/lib/lib.es2021.string.d.ts","./node_modules/typescript/lib/lib.es2021.weakref.d.ts","./node_modules/typescript/lib/lib.es2021.intl.d.ts","./node_modules/typescript/lib/lib.es2022.array.d.ts","./node_modules/typescript/lib/lib.es2022.error.d.ts","./node_modules/typescript/lib/lib.es2022.intl.d.ts","./node_modules/typescript/lib/lib.es2022.object.d.ts","./node_modules/typescript/lib/lib.es2022.string.d.ts","./node_modules/typescript/lib/lib.es2022.regexp.d.ts","./node_modules/typescript/lib/lib.es2023.array.d.ts","./node_modules/typescript/lib/lib.es2023.collection.d.ts","./node_modules/typescript/lib/lib.es2023.intl.d.ts","./node_modules/typescript/lib/lib.es2024.arraybuffer.d.ts","./node_modules/typescript/lib/lib.es2024.collection.d.ts","./node_modules/typescript/lib/lib.es2024.object.d.ts","./node_modules/typescript/lib/lib.es2024.promise.d.ts","./node_modules/typescript/lib/lib.es2024.regexp.d.ts","./node_modules/typescript/lib/lib.es2024.sharedmemory.d.ts","./node_modules/typescript/lib/lib.es2024.string.d.ts","./node_modules/typescript/lib/lib.esnext.array.d.ts","./node_modules/typescript/lib/lib.esnext.collection.d.ts","./node_modules/typescript/lib/lib.esnext.intl.d.ts","./node_modules/typescript/lib/lib.esnext.disposable.d.ts","./node_modules/typescript/lib/lib.esnext.promise.d.ts","./node_modules/typescript/lib/lib.esnext.decorators.d.ts","./node_modules/typescript/lib/lib.esnext.iterator.d.ts","./node_modules/typescript/lib/lib.esnext.float16.d.ts","./node_modules/typescript/lib/lib.esnext.error.d.ts","./node_modules/typescript/lib/lib.esnext.sharedmemory.d.ts","./node_modules/typescript/lib/lib.decorators.d.ts","./node_modules/typescript/lib/lib.decorators.legacy.d.ts","./node_modules/@types/react/global.d.ts","./node_modules/csstype/index.d.ts","./node_modules/@types/prop-types/index.d.ts","./node_modules/@types/react/index.d.ts","./node_modules/next/dist/styled-jsx/types/css.d.ts","./node_modules/next/dist/styled-jsx/types/macro.d.ts","./node_modules/next/dist/styled-jsx/types/style.d.ts","./node_modules/next/dist/styled-jsx/types/global.d.ts","./node_modules/next/dist/styled-jsx/types/index.d.ts","./node_modules/next/dist/server/get-page-files.d.ts","./node_modules/@types/node/compatibility/disposable.d.ts","./node_modules/@types/node/compatibility/indexable.d.ts","./node_modules/@types/node/compatibility/iterators.d.ts","./node_modules/@types/node/compatibility/index.d.ts","./node_modules/@types/node/globals.typedarray.d.ts","./node_modules/@types/node/buffer.buffer.d.ts","./node_modules/@types/node/globals.d.ts","./node_modules/@types/node/web-globals/abortcontroller.d.ts","./node_modules/@types/node/web-globals/domexception.d.ts","./node_modules/@types/node/web-globals/events.d.ts","./node_modules/undici-types/header.d.ts","./node_modules/undici-types/readable.d.ts","./node_modules/undici-types/file.d.ts","./node_modules/undici-types/fetch.d.ts","./node_modules/undici-types/formdata.d.ts","./node_modules/undici-types/connector.d.ts","./node_modules/undici-types/client.d.ts","./node_modules/undici-types/errors.d.ts","./node_modules/undici-types/dispatcher.d.ts","./node_modules/undici-types/global-dispatcher.d.ts","./node_modules/undici-types/global-origin.d.ts","./node_modules/undici-types/pool-stats.d.ts","./node_modules/undici-types/pool.d.ts","./node_modules/undici-types/handlers.d.ts","./node_modules/undici-types/balanced-pool.d.ts","./node_modules/undici-types/agent.d.ts","./node_modules/undici-types/mock-interceptor.d.ts","./node_modules/undici-types/mock-agent.d.ts","./node_modules/undici-types/mock-client.d.ts","./node_modules/undici-types/mock-pool.d.ts","./node_modules/undici-types/mock-errors.d.ts","./node_modules/undici-types/proxy-agent.d.ts","./node_modules/undici-types/env-http-proxy-agent.d.ts","./node_modules/undici-types/retry-handler.d.ts","./node_modules/undici-types/retry-agent.d.ts","./node_modules/undici-types/api.d.ts","./node_modules/undici-types/interceptors.d.ts","./node_modules/undici-types/util.d.ts","./node_modules/undici-types/cookies.d.ts","./node_modules/undici-types/patch.d.ts","./node_modules/undici-types/websocket.d.ts","./node_modules/undici-types/eventsource.d.ts","./node_modules/undici-types/filereader.d.ts","./node_modules/undici-types/diagnostics-channel.d.ts","./node_modules/undici-types/content-type.d.ts","./node_modules/undici-types/cache.d.ts","./node_modules/undici-types/index.d.ts","./node_modules/@types/node/web-globals/fetch.d.ts","./node_modules/@types/node/assert.d.ts","./node_modules/@types/node/assert/strict.d.ts","./node_modules/@types/node/async_hooks.d.ts","./node_modules/@types/node/buffer.d.ts","./node_modules/@types/node/child_process.d.ts","./node_modules/@types/node/cluster.d.ts","./node_modules/@types/node/console.d.ts","./node_modules/@types/node/constants.d.ts","./node_modules/@types/node/crypto.d.ts","./node_modules/@types/node/dgram.d.ts","./node_modules/@types/node/diagnostics_channel.d.ts","./node_modules/@types/node/dns.d.ts","./node_modules/@types/node/dns/promises.d.ts","./node_modules/@types/node/domain.d.ts","./node_modules/@types/node/events.d.ts","./node_modules/@types/node/fs.d.ts","./node_modules/@types/node/fs/promises.d.ts","./node_modules/@types/node/http.d.ts","./node_modules/@types/node/http2.d.ts","./node_modules/@types/node/https.d.ts","./node_modules/@types/node/inspector.generated.d.ts","./node_modules/@types/node/module.d.ts","./node_modules/@types/node/net.d.ts","./node_modules/@types/node/os.d.ts","./node_modules/@types/node/path.d.ts","./node_modules/@types/node/perf_hooks.d.ts","./node_modules/@types/node/process.d.ts","./node_modules/@types/node/punycode.d.ts","./node_modules/@types/node/querystring.d.ts","./node_modules/@types/node/readline.d.ts","./node_modules/@types/node/readline/promises.d.ts","./node_modules/@types/node/repl.d.ts","./node_modules/@types/node/sea.d.ts","./node_modules/@types/node/stream.d.ts","./node_modules/@types/node/stream/promises.d.ts","./node_modules/@types/node/stream/consumers.d.ts","./node_modules/@types/node/stream/web.d.ts","./node_modules/@types/node/string_decoder.d.ts","./node_modules/@types/node/test.d.ts","./node_modules/@types/node/timers.d.ts","./node_modules/@types/node/timers/promises.d.ts","./node_modules/@types/node/tls.d.ts","./node_modules/@types/node/trace_events.d.ts","./node_modules/@types/node/tty.d.ts","./node_modules/@types/node/url.d.ts","./node_modules/@types/node/util.d.ts","./node_modules/@types/node/v8.d.ts","./node_modules/@types/node/vm.d.ts","./node_modules/@types/node/wasi.d.ts","./node_modules/@types/node/worker_threads.d.ts","./node_modules/@types/node/zlib.d.ts","./node_modules/@types/node/index.d.ts","./node_modules/@types/react/canary.d.ts","./node_modules/@types/react/experimental.d.ts","./node_modules/@types/react-dom/index.d.ts","./node_modules/@types/react-dom/canary.d.ts","./node_modules/@types/react-dom/experimental.d.ts","./node_modules/next/dist/lib/fallback.d.ts","./node_modules/next/dist/compiled/webpack/webpack.d.ts","./node_modules/next/dist/shared/lib/modern-browserslist-target.d.ts","./node_modules/next/dist/shared/lib/entry-constants.d.ts","./node_modules/next/dist/shared/lib/constants.d.ts","./node_modules/next/dist/server/config.d.ts","./node_modules/next/dist/lib/load-custom-routes.d.ts","./node_modules/next/dist/shared/lib/image-config.d.ts","./node_modules/next/dist/build/webpack/plugins/subresource-integrity-plugin.d.ts","./node_modules/next/dist/server/body-streams.d.ts","./node_modules/next/dist/server/lib/cache-control.d.ts","./node_modules/next/dist/lib/setup-exception-listeners.d.ts","./node_modules/next/dist/lib/worker.d.ts","./node_modules/next/dist/lib/constants.d.ts","./node_modules/next/dist/lib/bundler.d.ts","./node_modules/next/dist/server/lib/experimental/ppr.d.ts","./node_modules/next/dist/lib/page-types.d.ts","./node_modules/next/dist/build/segment-config/app/app-segment-config.d.ts","./node_modules/next/dist/build/segment-config/pages/pages-segment-config.d.ts","./node_modules/next/dist/build/analysis/get-page-static-info.d.ts","./node_modules/next/dist/build/webpack/loaders/get-module-build-info.d.ts","./node_modules/next/dist/build/webpack/plugins/middleware-plugin.d.ts","./node_modules/next/dist/server/require-hook.d.ts","./node_modules/next/dist/server/node-polyfill-crypto.d.ts","./node_modules/next/dist/server/node-environment-baseline.d.ts","./node_modules/next/dist/server/node-environment-extensions/error-inspect.d.ts","./node_modules/next/dist/server/node-environment-extensions/console-file.d.ts","./node_modules/next/dist/server/node-environment-extensions/console-exit.d.ts","./node_modules/next/dist/server/node-environment-extensions/console-dim.external.d.ts","./node_modules/next/dist/server/node-environment-extensions/unhandled-rejection.d.ts","./node_modules/next/dist/server/node-environment-extensions/random.d.ts","./node_modules/next/dist/server/node-environment-extensions/date.d.ts","./node_modules/next/dist/server/node-environment-extensions/web-crypto.d.ts","./node_modules/next/dist/server/node-environment-extensions/node-crypto.d.ts","./node_modules/next/dist/server/node-environment-extensions/fast-set-immediate.external.d.ts","./node_modules/next/dist/server/node-environment.d.ts","./node_modules/next/dist/build/page-extensions-type.d.ts","./node_modules/next/dist/server/route-kind.d.ts","./node_modules/next/dist/server/route-definitions/route-definition.d.ts","./node_modules/next/dist/server/route-definitions/app-page-route-definition.d.ts","./node_modules/next/dist/server/lib/cache-handlers/types.d.ts","./node_modules/next/dist/server/response-cache/types.d.ts","./node_modules/next/dist/server/resume-data-cache/cache-store.d.ts","./node_modules/next/dist/server/resume-data-cache/resume-data-cache.d.ts","./node_modules/next/dist/client/components/app-router-headers.d.ts","./node_modules/next/dist/server/render-result.d.ts","./node_modules/next/dist/server/instrumentation/types.d.ts","./node_modules/next/dist/lib/coalesced-function.d.ts","./node_modules/next/dist/shared/lib/router/utils/middleware-route-matcher.d.ts","./node_modules/next/dist/server/lib/router-utils/types.d.ts","./node_modules/next/dist/trace/types.d.ts","./node_modules/next/dist/trace/trace.d.ts","./node_modules/next/dist/trace/shared.d.ts","./node_modules/next/dist/trace/index.d.ts","./node_modules/next/dist/build/load-jsconfig.d.ts","./node_modules/@next/env/dist/index.d.ts","./node_modules/next/dist/build/webpack/plugins/telemetry-plugin/use-cache-tracker-utils.d.ts","./node_modules/next/dist/build/webpack/plugins/telemetry-plugin/telemetry-plugin.d.ts","./node_modules/next/dist/telemetry/storage.d.ts","./node_modules/next/dist/build/build-context.d.ts","./node_modules/next/dist/shared/lib/bloom-filter.d.ts","./node_modules/next/dist/build/webpack-config.d.ts","./node_modules/next/dist/build/swc/generated-native.d.ts","./node_modules/next/dist/build/swc/types.d.ts","./node_modules/next/dist/server/dev/parse-version-info.d.ts","./node_modules/next/dist/next-devtools/shared/types.d.ts","./node_modules/next/dist/server/dev/dev-indicator-server-state.d.ts","./node_modules/next/dist/next-devtools/dev-overlay/cache-indicator.d.ts","./node_modules/next/dist/server/lib/parse-stack.d.ts","./node_modules/next/dist/next-devtools/server/shared.d.ts","./node_modules/next/dist/next-devtools/shared/stack-frame.d.ts","./node_modules/next/dist/next-devtools/dev-overlay/utils/get-error-by-type.d.ts","./node_modules/@types/react/jsx-runtime.d.ts","./node_modules/next/dist/next-devtools/dev-overlay/container/runtime-error/render-error.d.ts","./node_modules/next/dist/next-devtools/dev-overlay/shared.d.ts","./node_modules/next/dist/server/dev/debug-channel.d.ts","./node_modules/next/dist/server/dev/hot-reloader-types.d.ts","./node_modules/next/dist/server/lib/i18n-provider.d.ts","./node_modules/next/dist/server/web/next-url.d.ts","./node_modules/next/dist/compiled/@edge-runtime/cookies/index.d.ts","./node_modules/next/dist/server/web/spec-extension/cookies.d.ts","./node_modules/next/dist/server/web/spec-extension/request.d.ts","./node_modules/next/dist/server/after/builtin-request-context.d.ts","./node_modules/next/dist/server/web/spec-extension/fetch-event.d.ts","./node_modules/next/dist/server/web/spec-extension/response.d.ts","./node_modules/next/dist/build/segment-config/middleware/middleware-config.d.ts","./node_modules/next/dist/server/web/types.d.ts","./node_modules/next/dist/build/webpack/plugins/pages-manifest-plugin.d.ts","./node_modules/next/dist/shared/lib/router/utils/parse-url.d.ts","./node_modules/next/dist/server/route-definitions/locale-route-definition.d.ts","./node_modules/next/dist/server/route-definitions/pages-route-definition.d.ts","./node_modules/next/dist/build/webpack/plugins/flight-manifest-plugin.d.ts","./node_modules/next/dist/build/webpack/plugins/next-font-manifest-plugin.d.ts","./node_modules/next/dist/shared/lib/deep-readonly.d.ts","./node_modules/next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup.d.ts","./node_modules/next/dist/server/render.d.ts","./node_modules/next/dist/shared/lib/mitt.d.ts","./node_modules/next/dist/client/with-router.d.ts","./node_modules/next/dist/client/router.d.ts","./node_modules/next/dist/client/route-loader.d.ts","./node_modules/next/dist/client/page-loader.d.ts","./node_modules/next/dist/shared/lib/router/router.d.ts","./node_modules/next/dist/shared/lib/router-context.shared-runtime.d.ts","./node_modules/next/dist/shared/lib/loadable-context.shared-runtime.d.ts","./node_modules/next/dist/shared/lib/loadable.shared-runtime.d.ts","./node_modules/next/dist/shared/lib/image-config-context.shared-runtime.d.ts","./node_modules/next/dist/client/components/readonly-url-search-params.d.ts","./node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.d.ts","./node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.d.ts","./node_modules/next/dist/shared/lib/app-router-types.d.ts","./node_modules/next/dist/client/flight-data-helpers.d.ts","./node_modules/next/dist/client/components/router-reducer/ppr-navigations.d.ts","./node_modules/next/dist/client/components/segment-cache/types.d.ts","./node_modules/next/dist/client/components/segment-cache/navigation.d.ts","./node_modules/next/dist/client/components/segment-cache/cache-key.d.ts","./node_modules/next/dist/client/components/router-reducer/fetch-server-response.d.ts","./node_modules/next/dist/client/components/router-reducer/router-reducer-types.d.ts","./node_modules/next/dist/shared/lib/app-router-context.shared-runtime.d.ts","./node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.d.ts","./node_modules/next/dist/server/route-modules/pages/vendored/contexts/entrypoints.d.ts","./node_modules/next/dist/server/route-modules/pages/module.compiled.d.ts","./node_modules/next/dist/build/templates/pages.d.ts","./node_modules/next/dist/server/route-modules/pages/module.d.ts","./node_modules/next/dist/server/route-modules/pages/builtin/_error.d.ts","./node_modules/next/dist/server/load-default-error-components.d.ts","./node_modules/next/dist/server/base-http/node.d.ts","./node_modules/next/dist/server/response-cache/index.d.ts","./node_modules/next/dist/server/route-definitions/pages-api-route-definition.d.ts","./node_modules/next/dist/server/route-matches/pages-api-route-match.d.ts","./node_modules/next/dist/server/route-matchers/route-matcher.d.ts","./node_modules/next/dist/server/route-matcher-providers/route-matcher-provider.d.ts","./node_modules/next/dist/server/route-matcher-managers/route-matcher-manager.d.ts","./node_modules/next/dist/server/normalizers/normalizer.d.ts","./node_modules/next/dist/server/normalizers/locale-route-normalizer.d.ts","./node_modules/next/dist/server/normalizers/request/pathname-normalizer.d.ts","./node_modules/next/dist/server/normalizers/request/suffix.d.ts","./node_modules/next/dist/server/normalizers/request/rsc.d.ts","./node_modules/next/dist/server/normalizers/request/next-data.d.ts","./node_modules/next/dist/server/normalizers/request/segment-prefix-rsc.d.ts","./node_modules/next/dist/build/static-paths/types.d.ts","./node_modules/next/dist/server/base-server.d.ts","./node_modules/next/dist/server/lib/async-callback-set.d.ts","./node_modules/next/dist/shared/lib/router/utils/route-regex.d.ts","./node_modules/next/dist/shared/lib/router/utils/route-matcher.d.ts","./node_modules/sharp/lib/index.d.ts","./node_modules/next/dist/server/image-optimizer.d.ts","./node_modules/next/dist/server/next-server.d.ts","./node_modules/next/dist/server/lib/types.d.ts","./node_modules/next/dist/server/lib/lru-cache.d.ts","./node_modules/next/dist/server/lib/dev-bundler-service.d.ts","./node_modules/next/dist/server/use-cache/cache-life.d.ts","./node_modules/next/dist/server/dev/static-paths-worker.d.ts","./node_modules/next/dist/server/dev/next-dev-server.d.ts","./node_modules/next/dist/server/next.d.ts","./node_modules/next/dist/server/lib/render-server.d.ts","./node_modules/next/dist/server/lib/router-server.d.ts","./node_modules/next/dist/shared/lib/router/utils/path-match.d.ts","./node_modules/next/dist/server/lib/router-utils/filesystem.d.ts","./node_modules/next/dist/server/lib/router-utils/setup-dev-bundler.d.ts","./node_modules/next/dist/server/lib/router-utils/router-server-context.d.ts","./node_modules/next/dist/server/route-modules/route-module.d.ts","./node_modules/next/dist/server/load-components.d.ts","./node_modules/next/dist/server/web/adapter.d.ts","./node_modules/next/dist/server/app-render/types.d.ts","./node_modules/next/dist/build/webpack/loaders/metadata/types.d.ts","./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.d.ts","./node_modules/next/dist/server/lib/app-dir-module.d.ts","./node_modules/next/dist/server/web/spec-extension/adapters/request-cookies.d.ts","./node_modules/next/dist/server/async-storage/draft-mode-provider.d.ts","./node_modules/next/dist/server/web/spec-extension/adapters/headers.d.ts","./node_modules/next/dist/server/app-render/cache-signal.d.ts","./node_modules/next/dist/server/app-render/dynamic-rendering.d.ts","./node_modules/next/dist/server/request/fallback-params.d.ts","./node_modules/next/dist/server/app-render/work-unit-async-storage-instance.d.ts","./node_modules/next/dist/server/lib/lazy-result.d.ts","./node_modules/next/dist/server/lib/implicit-tags.d.ts","./node_modules/next/dist/server/app-render/staged-rendering.d.ts","./node_modules/next/dist/server/app-render/work-unit-async-storage.external.d.ts","./node_modules/next/dist/shared/lib/router/utils/parse-relative-url.d.ts","./node_modules/next/dist/server/app-render/app-render.d.ts","./node_modules/next/dist/server/route-modules/app-page/vendored/contexts/entrypoints.d.ts","./node_modules/next/dist/client/components/error-boundary.d.ts","./node_modules/next/dist/client/components/layout-router.d.ts","./node_modules/next/dist/client/components/render-from-template-context.d.ts","./node_modules/next/dist/server/app-render/action-async-storage-instance.d.ts","./node_modules/next/dist/server/app-render/action-async-storage.external.d.ts","./node_modules/next/dist/client/components/client-page.d.ts","./node_modules/next/dist/client/components/client-segment.d.ts","./node_modules/next/dist/server/request/search-params.d.ts","./node_modules/next/dist/client/components/hooks-server-context.d.ts","./node_modules/next/dist/client/components/http-access-fallback/error-boundary.d.ts","./node_modules/next/dist/lib/metadata/types/alternative-urls-types.d.ts","./node_modules/next/dist/lib/metadata/types/extra-types.d.ts","./node_modules/next/dist/lib/metadata/types/metadata-types.d.ts","./node_modules/next/dist/lib/metadata/types/manifest-types.d.ts","./node_modules/next/dist/lib/metadata/types/opengraph-types.d.ts","./node_modules/next/dist/lib/metadata/types/twitter-types.d.ts","./node_modules/next/dist/lib/metadata/types/metadata-interface.d.ts","./node_modules/next/dist/lib/metadata/types/resolvers.d.ts","./node_modules/next/dist/lib/metadata/types/icons.d.ts","./node_modules/next/dist/lib/metadata/resolve-metadata.d.ts","./node_modules/next/dist/lib/metadata/metadata.d.ts","./node_modules/next/dist/lib/framework/boundary-components.d.ts","./node_modules/next/dist/server/app-render/rsc/preloads.d.ts","./node_modules/next/dist/server/app-render/rsc/postpone.d.ts","./node_modules/next/dist/server/app-render/rsc/taint.d.ts","./node_modules/next/dist/shared/lib/segment-cache/segment-value-encoding.d.ts","./node_modules/next/dist/server/app-render/collect-segment-data.d.ts","./node_modules/next/dist/next-devtools/userspace/app/segment-explorer-node.d.ts","./node_modules/next/dist/server/app-render/entry-base.d.ts","./node_modules/next/dist/build/templates/app-page.d.ts","./node_modules/next/dist/build/rendering-mode.d.ts","./node_modules/@types/react/jsx-dev-runtime.d.ts","./node_modules/next/dist/server/route-modules/app-page/vendored/rsc/entrypoints.d.ts","./node_modules/@types/react-dom/client.d.ts","./node_modules/@types/react-dom/server.d.ts","./node_modules/next/dist/server/route-modules/app-page/vendored/ssr/entrypoints.d.ts","./node_modules/next/dist/server/route-modules/app-page/module.d.ts","./node_modules/next/dist/server/route-modules/app-page/module.compiled.d.ts","./node_modules/next/dist/server/route-definitions/app-route-route-definition.d.ts","./node_modules/next/dist/server/async-storage/work-store.d.ts","./node_modules/next/dist/server/web/http.d.ts","./node_modules/next/dist/server/route-modules/app-route/shared-modules.d.ts","./node_modules/next/dist/client/components/redirect-status-code.d.ts","./node_modules/next/dist/client/components/redirect-error.d.ts","./node_modules/next/dist/build/templates/app-route.d.ts","./node_modules/next/dist/server/route-modules/app-route/module.d.ts","./node_modules/next/dist/server/route-modules/app-route/module.compiled.d.ts","./node_modules/next/dist/build/segment-config/app/app-segments.d.ts","./node_modules/next/dist/build/utils.d.ts","./node_modules/next/dist/server/lib/router-utils/build-prefetch-segment-data-route.d.ts","./node_modules/next/dist/build/turborepo-access-trace/types.d.ts","./node_modules/next/dist/build/turborepo-access-trace/result.d.ts","./node_modules/next/dist/build/turborepo-access-trace/helpers.d.ts","./node_modules/next/dist/build/turborepo-access-trace/index.d.ts","./node_modules/next/dist/export/routes/types.d.ts","./node_modules/next/dist/export/types.d.ts","./node_modules/next/dist/export/worker.d.ts","./node_modules/next/dist/build/worker.d.ts","./node_modules/next/dist/build/index.d.ts","./node_modules/next/dist/server/lib/incremental-cache/index.d.ts","./node_modules/next/dist/server/after/after.d.ts","./node_modules/next/dist/server/after/after-context.d.ts","./node_modules/next/dist/server/app-render/work-async-storage-instance.d.ts","./node_modules/next/dist/server/app-render/create-error-handler.d.ts","./node_modules/next/dist/shared/lib/action-revalidation-kind.d.ts","./node_modules/next/dist/server/app-render/work-async-storage.external.d.ts","./node_modules/next/dist/server/request/params.d.ts","./node_modules/next/dist/server/route-matches/route-match.d.ts","./node_modules/next/dist/server/request-meta.d.ts","./node_modules/next/dist/cli/next-test.d.ts","./node_modules/next/dist/shared/lib/size-limit.d.ts","./node_modules/next/dist/server/config-shared.d.ts","./node_modules/next/dist/server/base-http/index.d.ts","./node_modules/next/dist/server/api-utils/index.d.ts","./node_modules/next/dist/build/adapter/build-complete.d.ts","./node_modules/next/dist/types.d.ts","./node_modules/next/dist/shared/lib/html-context.shared-runtime.d.ts","./node_modules/next/dist/shared/lib/utils.d.ts","./node_modules/next/dist/pages/_app.d.ts","./node_modules/next/app.d.ts","./node_modules/next/dist/server/web/spec-extension/unstable-cache.d.ts","./node_modules/next/dist/server/web/spec-extension/revalidate.d.ts","./node_modules/next/dist/server/web/spec-extension/unstable-no-store.d.ts","./node_modules/next/dist/server/use-cache/cache-tag.d.ts","./node_modules/next/cache.d.ts","./node_modules/next/dist/pages/_document.d.ts","./node_modules/next/document.d.ts","./node_modules/next/dist/shared/lib/dynamic.d.ts","./node_modules/next/dynamic.d.ts","./node_modules/next/dist/pages/_error.d.ts","./node_modules/next/error.d.ts","./node_modules/next/dist/shared/lib/head.d.ts","./node_modules/next/head.d.ts","./node_modules/next/dist/server/request/cookies.d.ts","./node_modules/next/dist/server/request/headers.d.ts","./node_modules/next/dist/server/request/draft-mode.d.ts","./node_modules/next/headers.d.ts","./node_modules/next/dist/shared/lib/get-img-props.d.ts","./node_modules/next/dist/client/image-component.d.ts","./node_modules/next/dist/shared/lib/image-external.d.ts","./node_modules/next/image.d.ts","./node_modules/next/dist/client/link.d.ts","./node_modules/next/link.d.ts","./node_modules/next/dist/client/components/unrecognized-action-error.d.ts","./node_modules/next/dist/client/components/redirect.d.ts","./node_modules/next/dist/client/components/not-found.d.ts","./node_modules/next/dist/client/components/forbidden.d.ts","./node_modules/next/dist/client/components/unauthorized.d.ts","./node_modules/next/dist/client/components/unstable-rethrow.server.d.ts","./node_modules/next/dist/client/components/unstable-rethrow.d.ts","./node_modules/next/dist/client/components/navigation.react-server.d.ts","./node_modules/next/dist/client/components/navigation.d.ts","./node_modules/next/navigation.d.ts","./node_modules/next/router.d.ts","./node_modules/next/dist/client/script.d.ts","./node_modules/next/script.d.ts","./node_modules/next/dist/server/web/spec-extension/user-agent.d.ts","./node_modules/next/dist/compiled/@edge-runtime/primitives/url.d.ts","./node_modules/next/dist/server/web/spec-extension/image-response.d.ts","./node_modules/next/dist/compiled/@vercel/og/satori/index.d.ts","./node_modules/next/dist/compiled/@vercel/og/emoji/index.d.ts","./node_modules/next/dist/compiled/@vercel/og/types.d.ts","./node_modules/next/dist/server/after/index.d.ts","./node_modules/next/dist/server/request/connection.d.ts","./node_modules/next/server.d.ts","./node_modules/next/types/global.d.ts","./node_modules/next/types/compiled.d.ts","./node_modules/next/types.d.ts","./node_modules/next/index.d.ts","./node_modules/next/image-types/global.d.ts","./.next/dev/types/routes.d.ts","./next-env.d.ts","./src/app/api/compile-pdf/route.ts","./node_modules/mammoth/lib/index.d.ts","./src/app/api/extract-text/route.ts","./node_modules/openai/_shims/manual-types.d.ts","./node_modules/openai/_shims/auto/types.d.ts","./node_modules/openai/streaming.d.ts","./node_modules/openai/error.d.ts","./node_modules/openai/_shims/multipartbody.d.ts","./node_modules/openai/uploads.d.ts","./node_modules/openai/core.d.ts","./node_modules/openai/_shims/index.d.ts","./node_modules/openai/pagination.d.ts","./node_modules/openai/resources/shared.d.ts","./node_modules/openai/resources/batches.d.ts","./node_modules/openai/resources/chat/completions/messages.d.ts","./node_modules/openai/resources/chat/completions/completions.d.ts","./node_modules/openai/resources/completions.d.ts","./node_modules/openai/resources/embeddings.d.ts","./node_modules/openai/resources/files.d.ts","./node_modules/openai/resources/images.d.ts","./node_modules/openai/resources/models.d.ts","./node_modules/openai/resources/moderations.d.ts","./node_modules/openai/resources/audio/speech.d.ts","./node_modules/openai/resources/audio/transcriptions.d.ts","./node_modules/openai/resources/audio/translations.d.ts","./node_modules/openai/resources/audio/audio.d.ts","./node_modules/openai/resources/beta/threads/messages.d.ts","./node_modules/openai/resources/beta/threads/runs/steps.d.ts","./node_modules/openai/resources/beta/threads/runs/runs.d.ts","./node_modules/openai/lib/eventstream.d.ts","./node_modules/openai/lib/assistantstream.d.ts","./node_modules/openai/resources/beta/threads/threads.d.ts","./node_modules/openai/resources/beta/assistants.d.ts","./node_modules/openai/resources/chat/completions.d.ts","./node_modules/openai/lib/abstractchatcompletionrunner.d.ts","./node_modules/openai/lib/chatcompletionstream.d.ts","./node_modules/openai/lib/responsesparser.d.ts","./node_modules/openai/resources/responses/input-items.d.ts","./node_modules/openai/lib/responses/eventtypes.d.ts","./node_modules/openai/lib/responses/responsestream.d.ts","./node_modules/openai/resources/responses/responses.d.ts","./node_modules/openai/lib/parser.d.ts","./node_modules/openai/lib/chatcompletionstreamingrunner.d.ts","./node_modules/openai/lib/jsonschema.d.ts","./node_modules/openai/lib/runnablefunction.d.ts","./node_modules/openai/lib/chatcompletionrunner.d.ts","./node_modules/openai/resources/beta/chat/completions.d.ts","./node_modules/openai/resources/beta/chat/chat.d.ts","./node_modules/openai/resources/beta/realtime/sessions.d.ts","./node_modules/openai/resources/beta/realtime/transcription-sessions.d.ts","./node_modules/openai/resources/beta/realtime/realtime.d.ts","./node_modules/openai/resources/beta/beta.d.ts","./node_modules/openai/resources/containers/files/content.d.ts","./node_modules/openai/resources/containers/files/files.d.ts","./node_modules/openai/resources/containers/containers.d.ts","./node_modules/openai/resources/graders/grader-models.d.ts","./node_modules/openai/resources/evals/runs/output-items.d.ts","./node_modules/openai/resources/evals/runs/runs.d.ts","./node_modules/openai/resources/evals/evals.d.ts","./node_modules/openai/resources/fine-tuning/methods.d.ts","./node_modules/openai/resources/fine-tuning/alpha/graders.d.ts","./node_modules/openai/resources/fine-tuning/alpha/alpha.d.ts","./node_modules/openai/resources/fine-tuning/checkpoints/permissions.d.ts","./node_modules/openai/resources/fine-tuning/checkpoints/checkpoints.d.ts","./node_modules/openai/resources/fine-tuning/jobs/checkpoints.d.ts","./node_modules/openai/resources/fine-tuning/jobs/jobs.d.ts","./node_modules/openai/resources/fine-tuning/fine-tuning.d.ts","./node_modules/openai/resources/graders/graders.d.ts","./node_modules/openai/resources/uploads/parts.d.ts","./node_modules/openai/resources/uploads/uploads.d.ts","./node_modules/openai/resources/vector-stores/files.d.ts","./node_modules/openai/resources/vector-stores/file-batches.d.ts","./node_modules/openai/resources/vector-stores/vector-stores.d.ts","./node_modules/openai/index.d.ts","./node_modules/openai/resource.d.ts","./node_modules/openai/resources/chat/chat.d.ts","./node_modules/openai/resources/chat/completions/index.d.ts","./node_modules/openai/resources/chat/index.d.ts","./node_modules/openai/resources/index.d.ts","./node_modules/openai/index.d.mts","./src/app/api/parse-resume/route.ts","./node_modules/@supabase/functions-js/dist/module/types.d.ts","./node_modules/@supabase/functions-js/dist/module/functionsclient.d.ts","./node_modules/@supabase/functions-js/dist/module/index.d.ts","./node_modules/@supabase/postgrest-js/dist/index.d.mts","./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.d.ts","./node_modules/@supabase/realtime-js/dist/module/lib/constants.d.ts","./node_modules/@supabase/realtime-js/dist/module/lib/serializer.d.ts","./node_modules/@supabase/realtime-js/dist/module/lib/timer.d.ts","./node_modules/@supabase/realtime-js/dist/module/lib/push.d.ts","./node_modules/@types/phoenix/index.d.ts","./node_modules/@supabase/realtime-js/dist/module/realtimepresence.d.ts","./node_modules/@supabase/realtime-js/dist/module/realtimechannel.d.ts","./node_modules/@supabase/realtime-js/dist/module/realtimeclient.d.ts","./node_modules/@supabase/realtime-js/dist/module/index.d.ts","./node_modules/iceberg-js/dist/index.d.ts","./node_modules/@supabase/storage-js/dist/index.d.mts","./node_modules/@supabase/auth-js/dist/module/lib/error-codes.d.ts","./node_modules/@supabase/auth-js/dist/module/lib/errors.d.ts","./node_modules/@supabase/auth-js/dist/module/lib/web3/ethereum.d.ts","./node_modules/@supabase/auth-js/dist/module/lib/web3/solana.d.ts","./node_modules/@supabase/auth-js/dist/module/lib/webauthn.dom.d.ts","./node_modules/@supabase/auth-js/dist/module/lib/helpers.d.ts","./node_modules/@supabase/auth-js/dist/module/gotrueclient.d.ts","./node_modules/@supabase/auth-js/dist/module/lib/webauthn.errors.d.ts","./node_modules/@supabase/auth-js/dist/module/lib/webauthn.d.ts","./node_modules/@supabase/auth-js/dist/module/lib/types.d.ts","./node_modules/@supabase/auth-js/dist/module/lib/fetch.d.ts","./node_modules/@supabase/auth-js/dist/module/gotrueadminapi.d.ts","./node_modules/@supabase/auth-js/dist/module/authadminapi.d.ts","./node_modules/@supabase/auth-js/dist/module/authclient.d.ts","./node_modules/@supabase/auth-js/dist/module/lib/locks.d.ts","./node_modules/@supabase/auth-js/dist/module/index.d.ts","./node_modules/@supabase/supabase-js/dist/index.d.mts","./node_modules/cookie/dist/index.d.ts","./node_modules/@supabase/ssr/dist/main/types.d.ts","./node_modules/@supabase/ssr/dist/main/createbrowserclient.d.ts","./node_modules/@supabase/ssr/dist/main/createserverclient.d.ts","./node_modules/@supabase/ssr/dist/main/utils/helpers.d.ts","./node_modules/@supabase/ssr/dist/main/utils/constants.d.ts","./node_modules/@supabase/ssr/dist/main/utils/chunker.d.ts","./node_modules/@supabase/ssr/dist/main/utils/base64url.d.ts","./node_modules/@supabase/ssr/dist/main/utils/index.d.ts","./node_modules/@supabase/ssr/dist/main/index.d.ts","./src/lib/supabase/client.ts","./src/lib/types.ts","./src/context/authcontext.tsx","./src/hooks/useresumes.ts","./src/lib/latextemplate.ts","./src/lib/pdfcompiler.ts","./src/lib/resumeparser.ts","./src/lib/supabase/server.ts","./src/types/parse.d.ts","./src/lib/themecontext.tsx","./src/app/layout.tsx","./node_modules/motion-dom/dist/index.d.ts","./node_modules/motion-utils/dist/index.d.ts","./node_modules/framer-motion/dist/index.d.ts","./node_modules/lucide-react/dist/lucide-react.d.ts","./src/components/ui/themetoggle.tsx","./src/app/page.tsx","./src/components/builder/sections/personalinfo.tsx","./src/components/builder/sections/education.tsx","./src/components/builder/sections/skills.tsx","./src/components/builder/sections/projects.tsx","./src/components/builder/sections/experience.tsx","./src/components/builder/sections/extracurricular.tsx","./src/components/builder/sections/achievements.tsx","./src/components/builder/sections/certifications.tsx","./src/components/builder/sections/publications.tsx","./src/components/builder/formpanel.tsx","./src/components/builder/uploadmode.tsx","./src/components/builder/resumeswitcher.tsx","./src/app/builder/page.tsx","./src/app/login/page.tsx","./.next/types/app/layout.ts","./.next/types/app/page.ts","./.next/types/app/api/compile-pdf/route.ts","./.next/types/app/api/extract-text/route.ts","./.next/types/app/api/parse-resume/route.ts","./.next/types/app/builder/page.ts","./.next/dev/types/cache-life.d.ts","./.next/dev/types/validator.ts","./node_modules/@types/estree/index.d.ts","./node_modules/@types/json-schema/index.d.ts","./node_modules/@types/json5/index.d.ts","./node_modules/form-data/index.d.ts","./node_modules/@types/node-fetch/externals.d.ts","./node_modules/@types/node-fetch/index.d.ts","./node_modules/@types/ws/index.d.ts"],"fileIdsList":[[98,144,459,460,461,462],[98,144],[98,144,270,503,506,509,511,513,591,645,651,664,665],[98,144,270,503,511],[98,144,270,503,513],[98,144,270,503,591],[98,144,270,395,664],[98,144,270,395,645],[98,144,270,395,651],[98,144,507,508,509],[98,144,619],[98,144,614],[98,144,609,617,618],[98,144,609,613,617,618,619],[98,144,609,614,617,619,620,621,622],[98,144,608,617],[98,144,617],[98,144,612,617],[98,144,609,610,611,612,616,618],[98,144,609,612,614,615,617],[98,144,592],[98,144,592,593],[98,144,596,602,603,604],[98,144,603],[98,144,597,599,600,602,604],[98,144,596,597,598,599,603],[98,144,601,603],[98,144,624,626],[98,144,626,627,628,633],[98,144,625],[98,144,626],[98,144,629,630,631,632],[98,144,606],[98,144,594,595,605,607,623],[98,144,158,185,192,677,678],[98,141,144],[98,143,144],[144],[98,144,149,177],[98,144,145,150,155,163,174,185],[98,144,145,146,155,163],[93,94,95,98,144],[98,144,147,186],[98,144,148,149,156,164],[98,144,149,174,182],[98,144,150,152,155,163],[98,143,144,151],[98,144,152,153],[98,144,154,155],[98,143,144,155],[98,144,155,156,157,174,185],[98,144,155,156,157,170,174,177],[98,144,152,155,158,163,174,185],[98,144,155,156,158,159,163,174,182,185],[98,144,158,160,174,182,185],[96,97,98,99,100,101,102,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191],[98,144,155,161],[98,144,162,185,190],[98,144,152,155,163,174],[98,144,164],[98,144,165],[98,143,144,166],[98,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191],[98,144,168],[98,144,169],[98,144,155,170,171],[98,144,170,172,186,188],[98,144,155,174,175,177],[98,144,176,177],[98,144,174,175],[98,144,177],[98,144,178],[98,141,144,174,179],[98,144,155,180,181],[98,144,180,181],[98,144,149,163,174,182],[98,144,183],[98,144,163,184],[98,144,158,169,185],[98,144,149,186],[98,144,174,187],[98,144,162,188],[98,144,189],[98,139,144],[98,139,144,155,157,166,174,177,185,188,190],[98,144,174,191],[86,98,144,195,196,197,412],[86,98,144],[86,98,144,195,196],[86,98,144,196,412],[86,90,98,144,194,454,500],[86,90,98,144,193,454,500],[83,84,85,98,144],[98,144,155,158,160,163,174,182,185,191,192],[98,144,158,174,192],[86,98,144,270,646,647],[98,144,457],[98,144,202,204,208,219,409,437,450],[98,144,204,214,215,216,218,450],[98,144,204,251,253,255,256,259,450,452],[98,144,204,208,210,211,212,242,337,409,427,428,436,450,452],[98,144,450],[98,144,215,307,416,425,445],[98,144,204],[98,144,198,307,445],[98,144,261],[98,144,260,450],[98,144,158,407,416,505],[98,144,158,375,387,425,444],[98,144,158,318],[98,144,430],[98,144,429,430,431],[98,144,429],[92,98,144,158,198,204,208,211,213,215,219,220,233,234,261,337,348,426,437,450,454],[98,144,202,204,217,251,252,257,258,450,505],[98,144,217,505],[98,144,202,234,362,450,505],[98,144,505],[98,144,204,217,218,505],[98,144,254,505],[98,144,220,427,435],[98,144,169,270,445],[98,144,270,445],[86,98,144,270],[86,98,144,379],[98,144,305,315,316,445,482,489],[98,144,304,422,483,484,485,486,488],[98,144,421],[98,144,421,422],[98,144,242,307,308,312],[98,144,307],[98,144,307,311,313],[98,144,307,308,309,310],[98,144,487],[86,98,144,205,476],[86,98,144,185],[86,98,144,217,297],[86,98,144,217,437],[98,144,295,299],[86,98,144,296,456],[86,90,98,144,158,192,193,194,454,498,499],[98,144,158],[98,144,158,208,241,293,338,359,361,432,433,437,450,451],[98,144,233,434],[98,144,454],[98,144,203],[86,98,144,364,377,386,396,398,444],[98,144,169,364,377,395,396,397,444,504],[98,144,389,390,391,392,393,394],[98,144,391],[98,144,395],[98,144,268,269,270,272],[86,98,144,262,263,264,265,271],[98,144,268,271],[98,144,266],[98,144,267],[86,98,144,270,296,456],[86,98,144,270,455,456],[86,98,144,270,456],[98,144,338,439],[98,144,439],[98,144,158,451,456],[98,144,383],[98,143,144,382],[98,144,243,307,324,361,370,373,375,376,415,444,447,451],[98,144,289,307,404],[98,144,375,444],[86,98,144,375,380,381,383,384,385,386,387,388,399,400,401,402,403,405,406,444,445,505],[98,144,369],[98,144,158,169,205,241,244,265,290,291,338,348,359,360,415,438,450,451,452,454,505],[98,144,444],[98,143,144,215,291,348,372,438,440,441,442,443,451],[98,144,375],[98,143,144,241,278,324,365,366,367,368,369,370,371,373,374,444,445],[98,144,158,278,279,365,451,452],[98,144,215,338,348,361,438,444,451],[98,144,158,450,452],[98,144,158,174,447,451,452],[98,144,158,169,185,198,208,217,243,244,246,275,280,285,289,290,291,293,322,324,326,329,331,334,335,336,337,359,361,437,438,445,447,450,451,452],[98,144,158,174],[98,144,204,205,206,213,447,448,449,454,456,505],[98,144,202,450],[98,144,274],[98,144,158,174,185,236,259,261,262,263,264,265,272,273,505],[98,144,169,185,198,236,251,284,285,286,322,323,324,329,337,338,344,347,349,359,361,438,445,447,450],[98,144,213,220,233,337,348,438,450],[98,144,158,185,205,208,324,342,447,450],[98,144,363],[98,144,158,274,345,346,356],[98,144,447,450],[98,144,370,372],[98,144,291,324,437,456],[98,144,158,169,247,251,323,329,344,347,351,447],[98,144,158,220,233,251,352],[98,144,204,246,354,437,450],[98,144,158,185,265,450],[98,144,158,217,245,246,247,256,274,353,355,437,450],[92,98,144,158,291,358,454,456],[98,144,321,359],[98,144,158,169,185,208,219,220,233,243,244,280,284,285,286,290,322,323,324,326,338,339,341,343,359,361,437,438,445,446,447,456],[98,144,158,174,220,344,350,356,447],[98,144,223,224,225,226,227,228,229,230,231,232],[98,144,275,330],[98,144,332],[98,144,330],[98,144,332,333],[98,144,158,208,211,241,242,451],[98,144,158,169,203,205,243,289,290,291,292,320,359,447,452,454,456],[98,144,158,169,185,207,242,292,324,370,438,446,451],[98,144,365],[98,144,366],[98,144,307,337,415],[98,144,367],[98,144,235,239],[98,144,158,208,235,243],[98,144,238,239],[98,144,240],[98,144,235,236],[98,144,235,287],[98,144,235],[98,144,275,328,446],[98,144,327],[98,144,236,445,446],[98,144,325,446],[98,144,236,445],[98,144,415],[98,144,208,237,243,291,307,324,358,361,364,370,377,378,408,409,411,414,437,447,451],[98,144,300,303,305,306,315,316],[86,98,144,195,196,197,270,410],[86,98,144,195,196,197,270,410,413],[98,144,424],[98,144,215,279,291,358,361,375,383,387,417,418,419,420,422,423,426,437,444,450],[98,144,315],[98,144,158,320],[98,144,320],[98,144,158,243,288,293,317,319,358,447,454,456],[98,144,300,301,302,303,305,306,315,316,455],[92,98,144,158,169,185,235,236,244,290,291,324,356,357,359,437,438,447,450,451,454],[98,144,279,281,284,438],[98,144,158,275,450],[98,144,278,375],[98,144,277],[98,144,279,280],[98,144,276,278,450],[98,144,158,207,279,281,282,283,450,451],[86,98,144,307,314,445],[98,144,200,201],[86,98,144,205],[86,98,144,304,445],[86,92,98,144,290,291,454,456],[98,144,205,476,477],[86,98,144,299],[86,98,144,169,185,203,258,294,296,298,456],[98,144,217,445,451],[98,144,340,445],[86,98,144,156,158,169,202,203,253,299,454,455],[86,98,144,193,194,454,500],[86,87,88,89,90,98,144],[98,144,149],[98,144,248,249,250],[98,144,248],[86,90,98,144,158,160,169,192,193,194,195,197,198,203,244,351,395,452,453,456,500],[98,144,464],[98,144,466],[98,144,468],[98,144,470],[98,144,472,473,474],[98,144,478],[91,98,144,458,463,465,467,469,471,475,479,481,491,492,494,503,504,505,506],[98,144,480],[98,144,490],[98,144,296],[98,144,493],[98,143,144,279,281,282,284,495,496,497,500,501,502],[98,144,192],[98,144,514,515,520],[98,144,516,517,519,521],[98,144,520],[98,144,517,519,520,521,522,524,526,527,528,529,530,531,532,536,551,562,565,569,577,578,580,583,586,589],[98,144,520,527,540,544,553,555,556,557,584],[98,144,520,521,537,538,539,540,542,543],[98,144,544,545,552,555,584],[98,144,520,521,526,545,557,584],[98,144,521,544,545,546,552,555,584],[98,144,517],[98,144,523,544,551,557],[98,144,551],[98,144,520,540,547,549,551,584],[98,144,544,551,552],[98,144,553,554,556],[98,144,584],[98,144,533,534,535,585],[98,144,520,521,585],[98,144,516,520,534,536,585],[98,144,520,534,536,585],[98,144,520,522,523,524,585],[98,144,520,522,523,537,538,539,541,542,585],[98,144,542,543,558,561,585],[98,144,557,585],[98,144,520,544,545,546,552,553,555,556,585],[98,144,523,559,560,561,585],[98,144,520,585],[98,144,520,522,523,543,585],[98,144,516,520,522,523,537,538,539,541,542,543,585],[98,144,520,522,523,538,585],[98,144,516,520,523,537,539,541,542,543,585],[98,144,523,526,585],[98,144,526],[98,144,516,520,522,523,525,526,527,585],[98,144,525,526],[98,144,520,522,526,585],[98,144,586,587],[98,144,516,520,526,527,585],[98,144,520,522,564,585],[98,144,520,522,563,585],[98,144,520,522,523,551,566,568,585],[98,144,520,522,568,585],[98,144,520,522,523,551,567,585],[98,144,520,521,522,585],[98,144,571,585],[98,144,520,566,585],[98,144,573,585],[98,144,520,522,585],[98,144,570,572,574,576,585],[98,144,520,522,570,575,585],[98,144,566,585],[98,144,551,585],[98,144,523,524,527,528,529,530,531,532,536,551,562,565,569,577,578,580,583,588],[98,144,520,522,551,585],[98,144,516,520,522,523,547,548,550,551,585],[98,144,520,529,579,585],[98,144,520,522,581,583,585],[98,144,520,522,583,585],[98,144,520,522,523,581,582,585],[98,144,521],[98,144,518,520,521],[98,144,174,192],[98,111,115,144,185],[98,111,144,174,185],[98,106,144],[98,108,111,144,182,185],[98,144,163,182],[98,106,144,192],[98,108,111,144,163,185],[98,103,104,107,110,144,155,174,185],[98,111,118,144],[98,103,109,144],[98,111,132,133,144],[98,107,111,144,177,185,192],[98,132,144,192],[98,105,106,144,192],[98,111,144],[98,105,106,107,108,109,110,111,112,113,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,133,134,135,136,137,138,144],[98,111,126,144],[98,111,118,119,144],[98,109,111,119,120,144],[98,110,144],[98,103,106,111,144],[98,111,115,119,120,144],[98,115,144],[98,109,111,114,144,185],[98,103,108,111,118,144],[98,144,174],[98,106,111,132,144,190,192],[98,144,270,503],[98,144,270,503,512,643],[98,144,270,503,590],[86,98,144,270,491,636,637,638,639,640,648,649,650,661,662,663],[98,144,270,507,637,644],[86,98,144,270,491,635,637,649],[98,144,270,481,637,648,649,650],[86,98,144,270,636,648,649,652,653,654,655,656,657,658,659,660],[86,98,144,195,196,197,270,638,644,648,649],[98,144,270,636,648,649],[86,98,144,270,636,648,649],[98,144,270,636],[86,98,144,270,636,641,648,649],[98,144,270,644,648,649],[86,98,144,270,624,635],[86,98,144,270,635,636,637],[98,144,270],[98,144,270,634],[98,144,270,475,634]],"fileInfos":[{"version":"c430d44666289dae81f30fa7b2edebf186ecc91a2d4c71266ea6ae76388792e1","affectsGlobalScope":true,"impliedFormat":1},{"version":"45b7ab580deca34ae9729e97c13cfd999df04416a79116c3bfb483804f85ded4","impliedFormat":1},{"version":"3facaf05f0c5fc569c5649dd359892c98a85557e3e0c847964caeb67076f4d75","impliedFormat":1},{"version":"e44bb8bbac7f10ecc786703fe0a6a4b952189f908707980ba8f3c8975a760962","impliedFormat":1},{"version":"5e1c4c362065a6b95ff952c0eab010f04dcd2c3494e813b493ecfd4fcb9fc0d8","impliedFormat":1},{"version":"68d73b4a11549f9c0b7d352d10e91e5dca8faa3322bfb77b661839c42b1ddec7","impliedFormat":1},{"version":"5efce4fc3c29ea84e8928f97adec086e3dc876365e0982cc8479a07954a3efd4","impliedFormat":1},{"version":"feecb1be483ed332fad555aff858affd90a48ab19ba7272ee084704eb7167569","impliedFormat":1},{"version":"ee7bad0c15b58988daa84371e0b89d313b762ab83cb5b31b8a2d1162e8eb41c2","impliedFormat":1},{"version":"27bdc30a0e32783366a5abeda841bc22757c1797de8681bbe81fbc735eeb1c10","impliedFormat":1},{"version":"8fd575e12870e9944c7e1d62e1f5a73fcf23dd8d3a321f2a2c74c20d022283fe","impliedFormat":1},{"version":"2ab096661c711e4a81cc464fa1e6feb929a54f5340b46b0a07ac6bbf857471f0","impliedFormat":1},{"version":"080941d9f9ff9307f7e27a83bcd888b7c8270716c39af943532438932ec1d0b9","affectsGlobalScope":true,"impliedFormat":1},{"version":"2e80ee7a49e8ac312cc11b77f1475804bee36b3b2bc896bead8b6e1266befb43","affectsGlobalScope":true,"impliedFormat":1},{"version":"c57796738e7f83dbc4b8e65132f11a377649c00dd3eee333f672b8f0a6bea671","affectsGlobalScope":true,"impliedFormat":1},{"version":"dc2df20b1bcdc8c2d34af4926e2c3ab15ffe1160a63e58b7e09833f616efff44","affectsGlobalScope":true,"impliedFormat":1},{"version":"515d0b7b9bea2e31ea4ec968e9edd2c39d3eebf4a2d5cbd04e88639819ae3b71","affectsGlobalScope":true,"impliedFormat":1},{"version":"0559b1f683ac7505ae451f9a96ce4c3c92bdc71411651ca6ddb0e88baaaad6a3","affectsGlobalScope":true,"impliedFormat":1},{"version":"0dc1e7ceda9b8b9b455c3a2d67b0412feab00bd2f66656cd8850e8831b08b537","affectsGlobalScope":true,"impliedFormat":1},{"version":"ce691fb9e5c64efb9547083e4a34091bcbe5bdb41027e310ebba8f7d96a98671","affectsGlobalScope":true,"impliedFormat":1},{"version":"8d697a2a929a5fcb38b7a65594020fcef05ec1630804a33748829c5ff53640d0","affectsGlobalScope":true,"impliedFormat":1},{"version":"4ff2a353abf8a80ee399af572debb8faab2d33ad38c4b4474cff7f26e7653b8d","affectsGlobalScope":true,"impliedFormat":1},{"version":"fb0f136d372979348d59b3f5020b4cdb81b5504192b1cacff5d1fbba29378aa1","affectsGlobalScope":true,"impliedFormat":1},{"version":"d15bea3d62cbbdb9797079416b8ac375ae99162a7fba5de2c6c505446486ac0a","affectsGlobalScope":true,"impliedFormat":1},{"version":"68d18b664c9d32a7336a70235958b8997ebc1c3b8505f4f1ae2b7e7753b87618","affectsGlobalScope":true,"impliedFormat":1},{"version":"eb3d66c8327153d8fa7dd03f9c58d351107fe824c79e9b56b462935176cdf12a","affectsGlobalScope":true,"impliedFormat":1},{"version":"38f0219c9e23c915ef9790ab1d680440d95419ad264816fa15009a8851e79119","affectsGlobalScope":true,"impliedFormat":1},{"version":"69ab18c3b76cd9b1be3d188eaf8bba06112ebbe2f47f6c322b5105a6fbc45a2e","affectsGlobalScope":true,"impliedFormat":1},{"version":"a680117f487a4d2f30ea46f1b4b7f58bef1480456e18ba53ee85c2746eeca012","affectsGlobalScope":true,"impliedFormat":1},{"version":"2f11ff796926e0832f9ae148008138ad583bd181899ab7dd768a2666700b1893","affectsGlobalScope":true,"impliedFormat":1},{"version":"4de680d5bb41c17f7f68e0419412ca23c98d5749dcaaea1896172f06435891fc","affectsGlobalScope":true,"impliedFormat":1},{"version":"954296b30da6d508a104a3a0b5d96b76495c709785c1d11610908e63481ee667","affectsGlobalScope":true,"impliedFormat":1},{"version":"ac9538681b19688c8eae65811b329d3744af679e0bdfa5d842d0e32524c73e1c","affectsGlobalScope":true,"impliedFormat":1},{"version":"0a969edff4bd52585473d24995c5ef223f6652d6ef46193309b3921d65dd4376","affectsGlobalScope":true,"impliedFormat":1},{"version":"9e9fbd7030c440b33d021da145d3232984c8bb7916f277e8ffd3dc2e3eae2bdb","affectsGlobalScope":true,"impliedFormat":1},{"version":"811ec78f7fefcabbda4bfa93b3eb67d9ae166ef95f9bff989d964061cbf81a0c","affectsGlobalScope":true,"impliedFormat":1},{"version":"717937616a17072082152a2ef351cb51f98802fb4b2fdabd32399843875974ca","affectsGlobalScope":true,"impliedFormat":1},{"version":"d7e7d9b7b50e5f22c915b525acc5a49a7a6584cf8f62d0569e557c5cfc4b2ac2","affectsGlobalScope":true,"impliedFormat":1},{"version":"71c37f4c9543f31dfced6c7840e068c5a5aacb7b89111a4364b1d5276b852557","affectsGlobalScope":true,"impliedFormat":1},{"version":"576711e016cf4f1804676043e6a0a5414252560eb57de9faceee34d79798c850","affectsGlobalScope":true,"impliedFormat":1},{"version":"89c1b1281ba7b8a96efc676b11b264de7a8374c5ea1e6617f11880a13fc56dc6","affectsGlobalScope":true,"impliedFormat":1},{"version":"74f7fa2d027d5b33eb0471c8e82a6c87216223181ec31247c357a3e8e2fddc5b","affectsGlobalScope":true,"impliedFormat":1},{"version":"d6d7ae4d1f1f3772e2a3cde568ed08991a8ae34a080ff1151af28b7f798e22ca","affectsGlobalScope":true,"impliedFormat":1},{"version":"063600664504610fe3e99b717a1223f8b1900087fab0b4cad1496a114744f8df","affectsGlobalScope":true,"impliedFormat":1},{"version":"934019d7e3c81950f9a8426d093458b65d5aff2c7c1511233c0fd5b941e608ab","affectsGlobalScope":true,"impliedFormat":1},{"version":"52ada8e0b6e0482b728070b7639ee42e83a9b1c22d205992756fe020fd9f4a47","affectsGlobalScope":true,"impliedFormat":1},{"version":"3bdefe1bfd4d6dee0e26f928f93ccc128f1b64d5d501ff4a8cf3c6371200e5e6","affectsGlobalScope":true,"impliedFormat":1},{"version":"59fb2c069260b4ba00b5643b907ef5d5341b167e7d1dbf58dfd895658bda2867","affectsGlobalScope":true,"impliedFormat":1},{"version":"639e512c0dfc3fad96a84caad71b8834d66329a1f28dc95e3946c9b58176c73a","affectsGlobalScope":true,"impliedFormat":1},{"version":"368af93f74c9c932edd84c58883e736c9e3d53cec1fe24c0b0ff451f529ceab1","affectsGlobalScope":true,"impliedFormat":1},{"version":"af3dd424cf267428f30ccfc376f47a2c0114546b55c44d8c0f1d57d841e28d74","affectsGlobalScope":true,"impliedFormat":1},{"version":"995c005ab91a498455ea8dfb63aa9f83fa2ea793c3d8aa344be4a1678d06d399","affectsGlobalScope":true,"impliedFormat":1},{"version":"959d36cddf5e7d572a65045b876f2956c973a586da58e5d26cde519184fd9b8a","affectsGlobalScope":true,"impliedFormat":1},{"version":"965f36eae237dd74e6cca203a43e9ca801ce38824ead814728a2807b1910117d","affectsGlobalScope":true,"impliedFormat":1},{"version":"3925a6c820dcb1a06506c90b1577db1fdbf7705d65b62b99dce4be75c637e26b","affectsGlobalScope":true,"impliedFormat":1},{"version":"0a3d63ef2b853447ec4f749d3f368ce642264246e02911fcb1590d8c161b8005","affectsGlobalScope":true,"impliedFormat":1},{"version":"8cdf8847677ac7d20486e54dd3fcf09eda95812ac8ace44b4418da1bbbab6eb8","affectsGlobalScope":true,"impliedFormat":1},{"version":"8444af78980e3b20b49324f4a16ba35024fef3ee069a0eb67616ea6ca821c47a","affectsGlobalScope":true,"impliedFormat":1},{"version":"3287d9d085fbd618c3971944b65b4be57859f5415f495b33a6adc994edd2f004","affectsGlobalScope":true,"impliedFormat":1},{"version":"b4b67b1a91182421f5df999988c690f14d813b9850b40acd06ed44691f6727ad","affectsGlobalScope":true,"impliedFormat":1},{"version":"df83c2a6c73228b625b0beb6669c7ee2a09c914637e2d35170723ad49c0f5cd4","affectsGlobalScope":true,"impliedFormat":1},{"version":"436aaf437562f276ec2ddbee2f2cdedac7664c1e4c1d2c36839ddd582eeb3d0a","affectsGlobalScope":true,"impliedFormat":1},{"version":"8e3c06ea092138bf9fa5e874a1fdbc9d54805d074bee1de31b99a11e2fec239d","affectsGlobalScope":true,"impliedFormat":1},{"version":"87dc0f382502f5bbce5129bdc0aea21e19a3abbc19259e0b43ae038a9fc4e326","affectsGlobalScope":true,"impliedFormat":1},{"version":"b1cb28af0c891c8c96b2d6b7be76bd394fddcfdb4709a20ba05a7c1605eea0f9","affectsGlobalScope":true,"impliedFormat":1},{"version":"2fef54945a13095fdb9b84f705f2b5994597640c46afeb2ce78352fab4cb3279","affectsGlobalScope":true,"impliedFormat":1},{"version":"ac77cb3e8c6d3565793eb90a8373ee8033146315a3dbead3bde8db5eaf5e5ec6","affectsGlobalScope":true,"impliedFormat":1},{"version":"56e4ed5aab5f5920980066a9409bfaf53e6d21d3f8d020c17e4de584d29600ad","affectsGlobalScope":true,"impliedFormat":1},{"version":"4ece9f17b3866cc077099c73f4983bddbcb1dc7ddb943227f1ec070f529dedd1","affectsGlobalScope":true,"impliedFormat":1},{"version":"0a6282c8827e4b9a95f4bf4f5c205673ada31b982f50572d27103df8ceb8013c","affectsGlobalScope":true,"impliedFormat":1},{"version":"1c9319a09485199c1f7b0498f2988d6d2249793ef67edda49d1e584746be9032","affectsGlobalScope":true,"impliedFormat":1},{"version":"e3a2a0cee0f03ffdde24d89660eba2685bfbdeae955a6c67e8c4c9fd28928eeb","affectsGlobalScope":true,"impliedFormat":1},{"version":"811c71eee4aa0ac5f7adf713323a5c41b0cf6c4e17367a34fbce379e12bbf0a4","affectsGlobalScope":true,"impliedFormat":1},{"version":"51ad4c928303041605b4d7ae32e0c1ee387d43a24cd6f1ebf4a2699e1076d4fa","affectsGlobalScope":true,"impliedFormat":1},{"version":"60037901da1a425516449b9a20073aa03386cce92f7a1fd902d7602be3a7c2e9","affectsGlobalScope":true,"impliedFormat":1},{"version":"d4b1d2c51d058fc21ec2629fff7a76249dec2e36e12960ea056e3ef89174080f","affectsGlobalScope":true,"impliedFormat":1},{"version":"22adec94ef7047a6c9d1af3cb96be87a335908bf9ef386ae9fd50eeb37f44c47","affectsGlobalScope":true,"impliedFormat":1},{"version":"196cb558a13d4533a5163286f30b0509ce0210e4b316c56c38d4c0fd2fb38405","affectsGlobalScope":true,"impliedFormat":1},{"version":"73f78680d4c08509933daf80947902f6ff41b6230f94dd002ae372620adb0f60","affectsGlobalScope":true,"impliedFormat":1},{"version":"c5239f5c01bcfa9cd32f37c496cf19c61d69d37e48be9de612b541aac915805b","affectsGlobalScope":true,"impliedFormat":1},{"version":"8e7f8264d0fb4c5339605a15daadb037bf238c10b654bb3eee14208f860a32ea","affectsGlobalScope":true,"impliedFormat":1},{"version":"782dec38049b92d4e85c1585fbea5474a219c6984a35b004963b00beb1aab538","affectsGlobalScope":true,"impliedFormat":1},{"version":"eb5b19b86227ace1d29ea4cf81387279d04bb34051e944bc53df69f58914b788","affectsGlobalScope":true,"impliedFormat":1},{"version":"ac51dd7d31333793807a6abaa5ae168512b6131bd41d9c5b98477fc3b7800f9f","impliedFormat":1},{"version":"87d9d29dbc745f182683f63187bf3d53fd8673e5fca38ad5eaab69798ed29fbc","impliedFormat":1},{"version":"035312d4945d13efa134ae482f6dc56a1a9346f7ac3be7ccbad5741058ce87f3","affectsGlobalScope":true,"impliedFormat":1},{"version":"acd8fd5090ac73902278889c38336ff3f48af6ba03aa665eb34a75e7ba1dccc4","impliedFormat":1},{"version":"d6258883868fb2680d2ca96bc8b1352cab69874581493e6d52680c5ffecdb6cc","impliedFormat":1},{"version":"1b61d259de5350f8b1e5db06290d31eaebebc6baafd5f79d314b5af9256d7153","impliedFormat":1},{"version":"f258e3960f324a956fc76a3d3d9e964fff2244ff5859dcc6ce5951e5413ca826","impliedFormat":1},{"version":"643f7232d07bf75e15bd8f658f664d6183a0efaca5eb84b48201c7671a266979","impliedFormat":1},{"version":"21da358700a3893281ce0c517a7a30cbd46be020d9f0c3f2834d0a8ad1f5fc75","impliedFormat":1},{"version":"70521b6ab0dcba37539e5303104f29b721bfb2940b2776da4cc818c07e1fefc1","affectsGlobalScope":true,"impliedFormat":1},{"version":"ab41ef1f2cdafb8df48be20cd969d875602483859dc194e9c97c8a576892c052","affectsGlobalScope":true,"impliedFormat":1},{"version":"d153a11543fd884b596587ccd97aebbeed950b26933ee000f94009f1ab142848","affectsGlobalScope":true,"impliedFormat":1},{"version":"21d819c173c0cf7cc3ce57c3276e77fd9a8a01d35a06ad87158781515c9a438a","impliedFormat":1},{"version":"98cffbf06d6bab333473c70a893770dbe990783904002c4f1a960447b4b53dca","affectsGlobalScope":true,"impliedFormat":1},{"version":"ba481bca06f37d3f2c137ce343c7d5937029b2468f8e26111f3c9d9963d6568d","affectsGlobalScope":true,"impliedFormat":1},{"version":"6d9ef24f9a22a88e3e9b3b3d8c40ab1ddb0853f1bfbd5c843c37800138437b61","affectsGlobalScope":true,"impliedFormat":1},{"version":"1db0b7dca579049ca4193d034d835f6bfe73096c73663e5ef9a0b5779939f3d0","affectsGlobalScope":true,"impliedFormat":1},{"version":"9798340ffb0d067d69b1ae5b32faa17ab31b82466a3fc00d8f2f2df0c8554aaa","affectsGlobalScope":true,"impliedFormat":1},{"version":"f26b11d8d8e4b8028f1c7d618b22274c892e4b0ef5b3678a8ccbad85419aef43","affectsGlobalScope":true,"impliedFormat":1},{"version":"5929864ce17fba74232584d90cb721a89b7ad277220627cc97054ba15a98ea8f","impliedFormat":1},{"version":"763fe0f42b3d79b440a9b6e51e9ba3f3f91352469c1e4b3b67bfa4ff6352f3f4","impliedFormat":1},{"version":"25c8056edf4314820382a5fdb4bb7816999acdcb929c8f75e3f39473b87e85bc","impliedFormat":1},{"version":"c464d66b20788266e5353b48dc4aa6bc0dc4a707276df1e7152ab0c9ae21fad8","impliedFormat":1},{"version":"78d0d27c130d35c60b5e5566c9f1e5be77caf39804636bc1a40133919a949f21","impliedFormat":1},{"version":"c6fd2c5a395f2432786c9cb8deb870b9b0e8ff7e22c029954fabdd692bff6195","impliedFormat":1},{"version":"1d6e127068ea8e104a912e42fc0a110e2aa5a66a356a917a163e8cf9a65e4a75","impliedFormat":1},{"version":"5ded6427296cdf3b9542de4471d2aa8d3983671d4cac0f4bf9c637208d1ced43","impliedFormat":1},{"version":"7f182617db458e98fc18dfb272d40aa2fff3a353c44a89b2c0ccb3937709bfb5","impliedFormat":1},{"version":"cadc8aced301244057c4e7e73fbcae534b0f5b12a37b150d80e5a45aa4bebcbd","impliedFormat":1},{"version":"385aab901643aa54e1c36f5ef3107913b10d1b5bb8cbcd933d4263b80a0d7f20","impliedFormat":1},{"version":"9670d44354bab9d9982eca21945686b5c24a3f893db73c0dae0fd74217a4c219","impliedFormat":1},{"version":"0b8a9268adaf4da35e7fa830c8981cfa22adbbe5b3f6f5ab91f6658899e657a7","impliedFormat":1},{"version":"11396ed8a44c02ab9798b7dca436009f866e8dae3c9c25e8c1fbc396880bf1bb","impliedFormat":1},{"version":"ba7bc87d01492633cb5a0e5da8a4a42a1c86270e7b3d2dea5d156828a84e4882","impliedFormat":1},{"version":"4893a895ea92c85345017a04ed427cbd6a1710453338df26881a6019432febdd","impliedFormat":1},{"version":"c21dc52e277bcfc75fac0436ccb75c204f9e1b3fa5e12729670910639f27343e","impliedFormat":1},{"version":"13f6f39e12b1518c6650bbb220c8985999020fe0f21d818e28f512b7771d00f9","impliedFormat":1},{"version":"9b5369969f6e7175740bf51223112ff209f94ba43ecd3bb09eefff9fd675624a","impliedFormat":1},{"version":"4fe9e626e7164748e8769bbf74b538e09607f07ed17c2f20af8d680ee49fc1da","impliedFormat":1},{"version":"24515859bc0b836719105bb6cc3d68255042a9f02a6022b3187948b204946bd2","impliedFormat":1},{"version":"ea0148f897b45a76544ae179784c95af1bd6721b8610af9ffa467a518a086a43","impliedFormat":1},{"version":"24c6a117721e606c9984335f71711877293a9651e44f59f3d21c1ea0856f9cc9","impliedFormat":1},{"version":"dd3273ead9fbde62a72949c97dbec2247ea08e0c6952e701a483d74ef92d6a17","impliedFormat":1},{"version":"405822be75ad3e4d162e07439bac80c6bcc6dbae1929e179cf467ec0b9ee4e2e","impliedFormat":1},{"version":"0db18c6e78ea846316c012478888f33c11ffadab9efd1cc8bcc12daded7a60b6","impliedFormat":1},{"version":"e61be3f894b41b7baa1fbd6a66893f2579bfad01d208b4ff61daef21493ef0a8","impliedFormat":1},{"version":"bd0532fd6556073727d28da0edfd1736417a3f9f394877b6d5ef6ad88fba1d1a","impliedFormat":1},{"version":"89167d696a849fce5ca508032aabfe901c0868f833a8625d5a9c6e861ef935d2","impliedFormat":1},{"version":"615ba88d0128ed16bf83ef8ccbb6aff05c3ee2db1cc0f89ab50a4939bfc1943f","impliedFormat":1},{"version":"a4d551dbf8746780194d550c88f26cf937caf8d56f102969a110cfaed4b06656","impliedFormat":1},{"version":"8bd86b8e8f6a6aa6c49b71e14c4ffe1211a0e97c80f08d2c8cc98838006e4b88","impliedFormat":1},{"version":"317e63deeb21ac07f3992f5b50cdca8338f10acd4fbb7257ebf56735bf52ab00","impliedFormat":1},{"version":"4732aec92b20fb28c5fe9ad99521fb59974289ed1e45aecb282616202184064f","impliedFormat":1},{"version":"2e85db9e6fd73cfa3d7f28e0ab6b55417ea18931423bd47b409a96e4a169e8e6","impliedFormat":1},{"version":"c46e079fe54c76f95c67fb89081b3e399da2c7d109e7dca8e4b58d83e332e605","impliedFormat":1},{"version":"bf67d53d168abc1298888693338cb82854bdb2e69ef83f8a0092093c2d562107","impliedFormat":1},{"version":"b52476feb4a0cbcb25e5931b930fc73cb6643fb1a5060bf8a3dda0eeae5b4b68","affectsGlobalScope":true,"impliedFormat":1},{"version":"e2677634fe27e87348825bb041651e22d50a613e2fdf6a4a3ade971d71bac37e","impliedFormat":1},{"version":"7394959e5a741b185456e1ef5d64599c36c60a323207450991e7a42e08911419","impliedFormat":1},{"version":"8c0bcd6c6b67b4b503c11e91a1fb91522ed585900eab2ab1f61bba7d7caa9d6f","impliedFormat":1},{"version":"8cd19276b6590b3ebbeeb030ac271871b9ed0afc3074ac88a94ed2449174b776","affectsGlobalScope":true,"impliedFormat":1},{"version":"696eb8d28f5949b87d894b26dc97318ef944c794a9a4e4f62360cd1d1958014b","impliedFormat":1},{"version":"3f8fa3061bd7402970b399300880d55257953ee6d3cd408722cb9ac20126460c","impliedFormat":1},{"version":"35ec8b6760fd7138bbf5809b84551e31028fb2ba7b6dc91d95d098bf212ca8b4","affectsGlobalScope":true,"impliedFormat":1},{"version":"5524481e56c48ff486f42926778c0a3cce1cc85dc46683b92b1271865bcf015a","impliedFormat":1},{"version":"68bd56c92c2bd7d2339457eb84d63e7de3bd56a69b25f3576e1568d21a162398","affectsGlobalScope":true,"impliedFormat":1},{"version":"3e93b123f7c2944969d291b35fed2af79a6e9e27fdd5faa99748a51c07c02d28","impliedFormat":1},{"version":"9d19808c8c291a9010a6c788e8532a2da70f811adb431c97520803e0ec649991","impliedFormat":1},{"version":"87aad3dd9752067dc875cfaa466fc44246451c0c560b820796bdd528e29bef40","impliedFormat":1},{"version":"4aacb0dd020eeaef65426153686cc639a78ec2885dc72ad220be1d25f1a439df","impliedFormat":1},{"version":"f0bd7e6d931657b59605c44112eaf8b980ba7f957a5051ed21cb93d978cf2f45","impliedFormat":1},{"version":"8db0ae9cb14d9955b14c214f34dae1b9ef2baee2fe4ce794a4cd3ac2531e3255","affectsGlobalScope":true,"impliedFormat":1},{"version":"15fc6f7512c86810273af28f224251a5a879e4261b4d4c7e532abfbfc3983134","impliedFormat":1},{"version":"58adba1a8ab2d10b54dc1dced4e41f4e7c9772cbbac40939c0dc8ce2cdb1d442","impliedFormat":1},{"version":"4b34bdb6f29a4347b7db9c0f8622686035fe25adb1c9e927acd8d22a2cbb6ccb","impliedFormat":1},{"version":"714435130b9015fae551788df2a88038471a5a11eb471f27c4ede86552842bc9","impliedFormat":1},{"version":"855cd5f7eb396f5f1ab1bc0f8580339bff77b68a770f84c6b254e319bbfd1ac7","impliedFormat":1},{"version":"5650cf3dace09e7c25d384e3e6b818b938f68f4e8de96f52d9c5a1b3db068e86","impliedFormat":1},{"version":"1354ca5c38bd3fd3836a68e0f7c9f91f172582ba30ab15bb8c075891b91502b7","affectsGlobalScope":true,"impliedFormat":1},{"version":"27fdb0da0daf3b337c5530c5f266efe046a6ceb606e395b346974e4360c36419","impliedFormat":1},{"version":"2d2fcaab481b31a5882065c7951255703ddbe1c0e507af56ea42d79ac3911201","impliedFormat":1},{"version":"a192fe8ec33f75edbc8d8f3ed79f768dfae11ff5735e7fe52bfa69956e46d78d","impliedFormat":1},{"version":"ca867399f7db82df981d6915bcbb2d81131d7d1ef683bc782b59f71dda59bc85","affectsGlobalScope":true,"impliedFormat":1},{"version":"372413016d17d804e1d139418aca0c68e47a83fb6669490857f4b318de8cccb3","affectsGlobalScope":true,"impliedFormat":1},{"version":"9e043a1bc8fbf2a255bccf9bf27e0f1caf916c3b0518ea34aa72357c0afd42ec","impliedFormat":1},{"version":"b4f70ec656a11d570e1a9edce07d118cd58d9760239e2ece99306ee9dfe61d02","impliedFormat":1},{"version":"3bc2f1e2c95c04048212c569ed38e338873f6a8593930cf5a7ef24ffb38fc3b6","impliedFormat":1},{"version":"6e70e9570e98aae2b825b533aa6292b6abd542e8d9f6e9475e88e1d7ba17c866","impliedFormat":1},{"version":"f9d9d753d430ed050dc1bf2667a1bab711ccbb1c1507183d794cc195a5b085cc","impliedFormat":1},{"version":"9eece5e586312581ccd106d4853e861aaaa1a39f8e3ea672b8c3847eedd12f6e","impliedFormat":1},{"version":"47ab634529c5955b6ad793474ae188fce3e6163e3a3fb5edd7e0e48f14435333","impliedFormat":1},{"version":"37ba7b45141a45ce6e80e66f2a96c8a5ab1bcef0fc2d0f56bb58df96ec67e972","impliedFormat":1},{"version":"45650f47bfb376c8a8ed39d4bcda5902ab899a3150029684ee4c10676d9fbaee","impliedFormat":1},{"version":"fad4e3c207fe23922d0b2d06b01acbfb9714c4f2685cf80fd384c8a100c82fd0","affectsGlobalScope":true,"impliedFormat":1},{"version":"74cf591a0f63db318651e0e04cb55f8791385f86e987a67fd4d2eaab8191f730","impliedFormat":1},{"version":"5eab9b3dc9b34f185417342436ec3f106898da5f4801992d8ff38ab3aff346b5","impliedFormat":1},{"version":"12ed4559eba17cd977aa0db658d25c4047067444b51acfdcbf38470630642b23","affectsGlobalScope":true,"impliedFormat":1},{"version":"f3ffabc95802521e1e4bcba4c88d8615176dc6e09111d920c7a213bdda6e1d65","impliedFormat":1},{"version":"809821b8a065e3234a55b3a9d7846231ed18d66dd749f2494c66288d890daf7f","impliedFormat":1},{"version":"ae56f65caf3be91108707bd8dfbccc2a57a91feb5daabf7165a06a945545ed26","impliedFormat":1},{"version":"a136d5de521da20f31631a0a96bf712370779d1c05b7015d7019a9b2a0446ca9","impliedFormat":1},{"version":"c3b41e74b9a84b88b1dca61ec39eee25c0dbc8e7d519ba11bb070918cfacf656","affectsGlobalScope":true,"impliedFormat":1},{"version":"4737a9dc24d0e68b734e6cfbcea0c15a2cfafeb493485e27905f7856988c6b29","affectsGlobalScope":true,"impliedFormat":1},{"version":"36d8d3e7506b631c9582c251a2c0b8a28855af3f76719b12b534c6edf952748d","impliedFormat":1},{"version":"1ca69210cc42729e7ca97d3a9ad48f2e9cb0042bada4075b588ae5387debd318","impliedFormat":1},{"version":"f5ebe66baaf7c552cfa59d75f2bfba679f329204847db3cec385acda245e574e","impliedFormat":1},{"version":"ed59add13139f84da271cafd32e2171876b0a0af2f798d0c663e8eeb867732cf","affectsGlobalScope":true,"impliedFormat":1},{"version":"05db535df8bdc30d9116fe754a3473d1b6479afbc14ae8eb18b605c62677d518","impliedFormat":1},{"version":"b1810689b76fd473bd12cc9ee219f8e62f54a7d08019a235d07424afbf074d25","impliedFormat":1},{"version":"f9fd93190acb1ffe0bc0fb395df979452f8d625071e9ffc8636e4dfb86ab2508","impliedFormat":1},{"version":"5f41fd8732a89e940c58ce22206e3df85745feb8983e2b4c6257fb8cbb118493","impliedFormat":1},{"version":"17ed71200119e86ccef2d96b73b02ce8854b76ad6bd21b5021d4269bec527b5f","impliedFormat":1},{"version":"1cfa8647d7d71cb03847d616bd79320abfc01ddea082a49569fda71ac5ece66b","impliedFormat":1},{"version":"bb7a61dd55dc4b9422d13da3a6bb9cc5e89be888ef23bbcf6558aa9726b89a1c","impliedFormat":1},{"version":"413df52d4ea14472c2fa5bee62f7a40abd1eb49be0b9722ee01ee4e52e63beb2","impliedFormat":1},{"version":"db6d2d9daad8a6d83f281af12ce4355a20b9a3e71b82b9f57cddcca0a8964a96","impliedFormat":1},{"version":"446a50749b24d14deac6f8843e057a6355dd6437d1fac4f9e5ce4a5071f34bff","impliedFormat":1},{"version":"182e9fcbe08ac7c012e0a6e2b5798b4352470be29a64fdc114d23c2bab7d5106","impliedFormat":1},{"version":"5c9b31919ea1cb350a7ae5e71c9ced8f11723e4fa258a8cc8d16ae46edd623c7","impliedFormat":1},{"version":"4aa42ce8383b45823b3a1d3811c0fdd5f939f90254bc4874124393febbaf89f6","impliedFormat":1},{"version":"96ffa70b486207241c0fcedb5d9553684f7fa6746bc2b04c519e7ebf41a51205","impliedFormat":1},{"version":"3677988e03b749874eb9c1aa8dc88cd77b6005e5c4c39d821cda7b80d5388619","impliedFormat":1},{"version":"a86f82d646a739041d6702101afa82dcb935c416dd93cbca7fd754fd0282ce1f","impliedFormat":1},{"version":"ad0d1d75d129b1c80f911be438d6b61bfa8703930a8ff2be2f0e1f8a91841c64","impliedFormat":1},{"version":"ce75b1aebb33d510ff28af960a9221410a3eaf7f18fc5f21f9404075fba77256","impliedFormat":1},{"version":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","impliedFormat":1},{"version":"02436d7e9ead85e09a2f8e27d5f47d9464bced31738dec138ca735390815c9f0","impliedFormat":1},{"version":"f4625edcb57b37b84506e8b276eb59ca30d31f88c6656d29d4e90e3bc58e69df","impliedFormat":1},{"version":"78a2869ad0cbf3f9045dda08c0d4562b7e1b2bfe07b19e0db072f5c3c56e9584","impliedFormat":1},{"version":"f8d5ff8eafd37499f2b6a98659dd9b45a321de186b8db6b6142faed0fea3de77","impliedFormat":1},{"version":"c86fe861cf1b4c46a0fb7d74dffe596cf679a2e5e8b1456881313170f092e3fa","impliedFormat":1},{"version":"c685d9f68c70fe11ce527287526585a06ea13920bb6c18482ca84945a4e433a7","impliedFormat":1},{"version":"540cc83ab772a2c6bc509fe1354f314825b5dba3669efdfbe4693ecd3048e34f","impliedFormat":1},{"version":"121b0696021ab885c570bbeb331be8ad82c6efe2f3b93a6e63874901bebc13e3","impliedFormat":1},{"version":"4e01846df98d478a2a626ec3641524964b38acaac13945c2db198bf9f3df22ee","impliedFormat":1},{"version":"678d6d4c43e5728bf66e92fc2269da9fa709cb60510fed988a27161473c3853f","impliedFormat":1},{"version":"ffa495b17a5ef1d0399586b590bd281056cee6ce3583e34f39926f8dcc6ecdb5","impliedFormat":1},{"version":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","impliedFormat":1},{"version":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","impliedFormat":1},{"version":"8e609bb71c20b858c77f0e9f90bb1319db8477b13f9f965f1a1e18524bf50881","impliedFormat":1},{"version":"8e609bb71c20b858c77f0e9f90bb1319db8477b13f9f965f1a1e18524bf50881","impliedFormat":1},{"version":"aa14cee20aa0db79f8df101fc027d929aec10feb5b8a8da3b9af3895d05b7ba2","impliedFormat":1},{"version":"493c700ac3bd317177b2eb913805c87fe60d4e8af4fb39c41f04ba81fae7e170","impliedFormat":1},{"version":"aeb554d876c6b8c818da2e118d8b11e1e559adbe6bf606cc9a611c1b6c09f670","impliedFormat":1},{"version":"acf5a2ac47b59ca07afa9abbd2b31d001bf7448b041927befae2ea5b1951d9f9","impliedFormat":1},{"version":"8e609bb71c20b858c77f0e9f90bb1319db8477b13f9f965f1a1e18524bf50881","impliedFormat":1},{"version":"d71291eff1e19d8762a908ba947e891af44749f3a2cbc5bd2ec4b72f72ea795f","impliedFormat":1},{"version":"c0480e03db4b816dff2682b347c95f2177699525c54e7e6f6aa8ded890b76be7","impliedFormat":1},{"version":"e2a37ac938c4bede5bb284b9d2d042da299528f1e61f6f57538f1bd37d760869","impliedFormat":1},{"version":"76def37aff8e3a051cf406e10340ffba0f28b6991c5d987474cc11137796e1eb","impliedFormat":1},{"version":"b620391fe8060cf9bedc176a4d01366e6574d7a71e0ac0ab344a4e76576fcbb8","impliedFormat":1},{"version":"3e7efde639c6a6c3edb9847b3f61e308bf7a69685b92f665048c45132f51c218","impliedFormat":1},{"version":"df45ca1176e6ac211eae7ddf51336dc075c5314bc5c253651bae639defd5eec5","impliedFormat":1},{"version":"106c6025f1d99fd468fd8bf6e5bda724e11e5905a4076c5d29790b6c3745e50c","impliedFormat":1},{"version":"ee8df1cb8d0faaca4013a1b442e99130769ce06f438d18d510fed95890067563","impliedFormat":1},{"version":"bfb7f8475428637bee12bdd31bd9968c1c8a1cc2c3e426c959e2f3a307f8936f","impliedFormat":1},{"version":"6f491d0108927478d3247bbbc489c78c2da7ef552fd5277f1ab6819986fdf0b1","impliedFormat":1},{"version":"594fe24fc54645ab6ccb9dba15d3a35963a73a395b2ef0375ea34bf181ccfd63","impliedFormat":1},{"version":"7cb0ee103671d1e201cd53dda12bc1cd0a35f1c63d6102720c6eeb322cb8e17e","impliedFormat":1},{"version":"15a234e5031b19c48a69ccc1607522d6e4b50f57d308ecb7fe863d44cd9f9eb3","impliedFormat":1},{"version":"148679c6d0f449210a96e7d2e562d589e56fcde87f843a92808b3ff103f1a774","impliedFormat":1},{"version":"6459054aabb306821a043e02b89d54da508e3a6966601a41e71c166e4ea1474f","impliedFormat":1},{"version":"2f9c89cbb29d362290531b48880a4024f258c6033aaeb7e59fbc62db26819650","impliedFormat":1},{"version":"bb37588926aba35c9283fe8d46ebf4e79ffe976343105f5c6d45f282793352b2","impliedFormat":1},{"version":"05c97cddbaf99978f83d96de2d8af86aded9332592f08ce4a284d72d0952c391","impliedFormat":1},{"version":"72179f9dd22a86deaad4cc3490eb0fe69ee084d503b686985965654013f1391b","impliedFormat":1},{"version":"2e6114a7dd6feeef85b2c80120fdbfb59a5529c0dcc5bfa8447b6996c97a69f5","impliedFormat":1},{"version":"7b6ff760c8a240b40dab6e4419b989f06a5b782f4710d2967e67c695ef3e93c4","impliedFormat":1},{"version":"c8f004e6036aa1c764ad4ec543cf89a5c1893a9535c80ef3f2b653e370de45e6","impliedFormat":1},{"version":"dd80b1e600d00f5c6a6ba23f455b84a7db121219e68f89f10552c54ba46e4dc9","impliedFormat":1},{"version":"b064c36f35de7387d71c599bfcf28875849a1dbc733e82bd26cae3d1cd060521","impliedFormat":1},{"version":"05c7280d72f3ed26f346cbe7cbbbb002fb7f15739197cbbee6ab3fd1a6cb9347","impliedFormat":1},{"version":"8de9fe97fa9e00ec00666fa77ab6e91b35d25af8ca75dabcb01e14ad3299b150","impliedFormat":1},{"version":"803cd2aaf1921c218916c2c7ee3fce653e852d767177eb51047ff15b5b253893","impliedFormat":1},{"version":"dba114fb6a32b355a9cfc26ca2276834d72fe0e94cd2c3494005547025015369","impliedFormat":1},{"version":"7ab12b2f1249187223d11a589f5789c75177a0b597b9eb7f8e2e42d045393347","impliedFormat":1},{"version":"ad37fb4be61c1035b68f532b7220f4e8236cf245381ce3b90ac15449ecfe7305","impliedFormat":1},{"version":"93436bd74c66baba229bfefe1314d122c01f0d4c1d9e35081a0c4f0470ac1a6c","impliedFormat":1},{"version":"f974e4a06953682a2c15d5bd5114c0284d5abf8bc0fe4da25cb9159427b70072","impliedFormat":1},{"version":"50256e9c31318487f3752b7ac12ff365c8949953e04568009c8705db802776fb","impliedFormat":1},{"version":"7d73b24e7bf31dfb8a931ca6c4245f6bb0814dfae17e4b60c9e194a631fe5f7b","impliedFormat":1},{"version":"d130c5f73768de51402351d5dc7d1b36eaec980ca697846e53156e4ea9911476","impliedFormat":1},{"version":"413586add0cfe7369b64979d4ec2ed56c3f771c0667fbde1bf1f10063ede0b08","impliedFormat":1},{"version":"06472528e998d152375ad3bd8ebcb69ff4694fd8d2effaf60a9d9f25a37a097a","impliedFormat":1},{"version":"50b5bc34ce6b12eccb76214b51aadfa56572aa6cc79c2b9455cdbb3d6c76af1d","impliedFormat":1},{"version":"b7e16ef7f646a50991119b205794ebfd3a4d8f8e0f314981ebbe991639023d0e","impliedFormat":1},{"version":"42c169fb8c2d42f4f668c624a9a11e719d5d07dacbebb63cbcf7ef365b0a75b3","impliedFormat":1},{"version":"a401617604fa1f6ce437b81689563dfdc377069e4c58465dbd8d16069aede0a5","impliedFormat":1},{"version":"6e9082e91370de5040e415cd9f24e595b490382e8c7402c4e938a8ce4bccc99f","impliedFormat":1},{"version":"8695dec09ad439b0ceef3776ea68a232e381135b516878f0901ed2ea114fd0fe","impliedFormat":1},{"version":"304b44b1e97dd4c94697c3313df89a578dca4930a104454c99863f1784a54357","impliedFormat":1},{"version":"d682336018141807fb602709e2d95a192828fcb8d5ba06dda3833a8ea98f69e3","impliedFormat":1},{"version":"6124e973eab8c52cabf3c07575204efc1784aca6b0a30c79eb85fe240a857efa","impliedFormat":1},{"version":"0d891735a21edc75df51f3eb995e18149e119d1ce22fd40db2b260c5960b914e","impliedFormat":1},{"version":"3b414b99a73171e1c4b7b7714e26b87d6c5cb03d200352da5342ab4088a54c85","impliedFormat":1},{"version":"4fbd3116e00ed3a6410499924b6403cc9367fdca303e34838129b328058ede40","impliedFormat":1},{"version":"b01bd582a6e41457bc56e6f0f9de4cb17f33f5f3843a7cf8210ac9c18472fb0f","impliedFormat":1},{"version":"0a437ae178f999b46b6153d79095b60c42c996bc0458c04955f1c996dc68b971","impliedFormat":1},{"version":"74b2a5e5197bd0f2e0077a1ea7c07455bbea67b87b0869d9786d55104006784f","impliedFormat":1},{"version":"4a7baeb6325920044f66c0f8e5e6f1f52e06e6d87588d837bdf44feb6f35c664","impliedFormat":1},{"version":"12d218a49dbe5655b911e6cc3c13b2c655e4c783471c3b0432137769c79e1b3c","impliedFormat":1},{"version":"7274fbffbd7c9589d8d0ffba68157237afd5cecff1e99881ea3399127e60572f","impliedFormat":1},{"version":"6b0fc04121360f752d196ba35b6567192f422d04a97b2840d7d85f8b79921c92","impliedFormat":1},{"version":"65a15fc47900787c0bd18b603afb98d33ede930bed1798fc984d5ebb78b26cf9","impliedFormat":1},{"version":"9d202701f6e0744adb6314d03d2eb8fc994798fc83d91b691b75b07626a69801","impliedFormat":1},{"version":"a365c4d3bed3be4e4e20793c999c51f5cd7e6792322f14650949d827fbcd170f","impliedFormat":1},{"version":"c5426dbfc1cf90532f66965a7aa8c1136a78d4d0f96d8180ecbfc11d7722f1a5","impliedFormat":1},{"version":"9c82171d836c47486074e4ca8e059735bf97b205e70b196535b5efd40cbe1bc5","impliedFormat":1},{"version":"f374cb24e93e7798c4d9e83ff872fa52d2cdb36306392b840a6ddf46cb925cb6","impliedFormat":1},{"version":"42b81043b00ff27c6bd955aea0f6e741545f2265978bf364b614702b72a027ab","impliedFormat":1},{"version":"de9d2df7663e64e3a91bf495f315a7577e23ba088f2949d5ce9ec96f44fba37d","impliedFormat":1},{"version":"c7af78a2ea7cb1cd009cfb5bdb48cd0b03dad3b54f6da7aab615c2e9e9d570c5","impliedFormat":1},{"version":"1ee45496b5f8bdee6f7abc233355898e5bf9bd51255db65f5ff7ede617ca0027","impliedFormat":1},{"version":"97e5ccc7bb88419005cbdf812243a5b3186cdef81b608540acabe1be163fc3e4","affectsGlobalScope":true,"impliedFormat":1},{"version":"3fbdd025f9d4d820414417eeb4107ffa0078d454a033b506e22d3a23bc3d9c41","affectsGlobalScope":true,"impliedFormat":1},{"version":"a8f8e6ab2fa07b45251f403548b78eaf2022f3c2254df3dc186cb2671fe4996d","affectsGlobalScope":true,"impliedFormat":1},{"version":"fa6c12a7c0f6b84d512f200690bfc74819e99efae69e4c95c4cd30f6884c526e","impliedFormat":1},{"version":"f1c32f9ce9c497da4dc215c3bc84b722ea02497d35f9134db3bb40a8d918b92b","impliedFormat":1},{"version":"b73c319af2cc3ef8f6421308a250f328836531ea3761823b4cabbd133047aefa","affectsGlobalScope":true,"impliedFormat":1},{"version":"e433b0337b8106909e7953015e8fa3f2d30797cea27141d1c5b135365bb975a6","impliedFormat":1},{"version":"9f9bb6755a8ce32d656ffa4763a8144aa4f274d6b69b59d7c32811031467216e","impliedFormat":1},{"version":"5c32bdfbd2d65e8fffbb9fbda04d7165e9181b08dad61154961852366deb7540","impliedFormat":1},{"version":"ddff7fc6edbdc5163a09e22bf8df7bef75f75369ebd7ecea95ba55c4386e2441","impliedFormat":1},{"version":"6b3453eebd474cc8acf6d759f1668e6ce7425a565e2996a20b644c72916ecf75","impliedFormat":1},{"version":"0c05e9842ec4f8b7bfebfd3ca61604bb8c914ba8da9b5337c4f25da427a005f2","impliedFormat":1},{"version":"89cd3444e389e42c56fd0d072afef31387e7f4107651afd2c03950f22dc36f77","impliedFormat":1},{"version":"7f2aa4d4989a82530aaac3f72b3dceca90e9c25bee0b1a327e8a08a1262435ad","impliedFormat":1},{"version":"e39a304f882598138a8022106cb8de332abbbb87f3fee71c5ca6b525c11c51fc","impliedFormat":1},{"version":"faed7a5153215dbd6ebe76dfdcc0af0cfe760f7362bed43284be544308b114cf","impliedFormat":1},{"version":"fcdf3e40e4a01b9a4b70931b8b51476b210c511924fcfe3f0dae19c4d52f1a54","impliedFormat":1},{"version":"345c4327b637d34a15aba4b7091eb068d6ab40a3dedaab9f00986253c9704e53","impliedFormat":1},{"version":"3a788c7fb7b1b1153d69a4d1d9e1d0dfbcf1127e703bdb02b6d12698e683d1fb","impliedFormat":1},{"version":"2e4f37ffe8862b14d8e24ae8763daaa8340c0df0b859d9a9733def0eee7562d9","impliedFormat":1},{"version":"d38530db0601215d6d767f280e3a3c54b2a83b709e8d9001acb6f61c67e965fc","impliedFormat":1},{"version":"6ac6715916fa75a1f7ebdfeacac09513b4d904b667d827b7535e84ff59679aff","impliedFormat":1},{"version":"4805f6161c2c8cefb8d3b8bd96a080c0fe8dbc9315f6ad2e53238f9a79e528a6","impliedFormat":1},{"version":"b83cb14474fa60c5f3ec660146b97d122f0735627f80d82dd03e8caa39b4388c","impliedFormat":1},{"version":"2b5b70d7782fe028487a80a1c214e67bd610532b9f978b78fa60f5b4a359f77e","impliedFormat":1},{"version":"7ee86fbb3754388e004de0ef9e6505485ddfb3be7640783d6d015711c03d302d","impliedFormat":1},{"version":"1a82deef4c1d39f6882f28d275cad4c01f907b9b39be9cbc472fcf2cf051e05b","impliedFormat":1},{"version":"7580e62139cb2b44a0270c8d01abcbfcba2819a02514a527342447fa69b34ef1","impliedFormat":1},{"version":"b73cbf0a72c8800cf8f96a9acfe94f3ad32ca71342a8908b8ae484d61113f647","impliedFormat":1},{"version":"bae6dd176832f6423966647382c0d7ba9e63f8c167522f09a982f086cd4e8b23","impliedFormat":1},{"version":"20865ac316b8893c1a0cc383ccfc1801443fbcc2a7255be166cf90d03fac88c9","impliedFormat":1},{"version":"c9958eb32126a3843deedda8c22fb97024aa5d6dd588b90af2d7f2bfac540f23","impliedFormat":1},{"version":"461d0ad8ae5f2ff981778af912ba71b37a8426a33301daa00f21c6ccb27f8156","impliedFormat":1},{"version":"e927c2c13c4eaf0a7f17e6022eee8519eb29ef42c4c13a31e81a611ab8c95577","impliedFormat":1},{"version":"fcafff163ca5e66d3b87126e756e1b6dfa8c526aa9cd2a2b0a9da837d81bbd72","impliedFormat":1},{"version":"70246ad95ad8a22bdfe806cb5d383a26c0c6e58e7207ab9c431f1cb175aca657","impliedFormat":1},{"version":"f00f3aa5d64ff46e600648b55a79dcd1333458f7a10da2ed594d9f0a44b76d0b","impliedFormat":1},{"version":"772d8d5eb158b6c92412c03228bd9902ccb1457d7a705b8129814a5d1a6308fc","impliedFormat":1},{"version":"802e797bcab5663b2c9f63f51bdf67eff7c41bc64c0fd65e6da3e7941359e2f7","impliedFormat":1},{"version":"8b4327413e5af38cd8cb97c59f48c3c866015d5d642f28518e3a891c469f240e","impliedFormat":1},{"version":"7e6ac205dcb9714f708354fd863bffa45cee90740706cc64b3b39b23ebb84744","impliedFormat":1},{"version":"61dc6e3ac78d64aa864eedd0a208b97b5887cc99c5ba65c03287bf57d83b1eb9","impliedFormat":1},{"version":"4b20fcf10a5413680e39f5666464859fc56b1003e7dfe2405ced82371ebd49b6","impliedFormat":1},{"version":"c06ef3b2569b1c1ad99fcd7fe5fba8d466e2619da5375dfa940a94e0feea899b","impliedFormat":1},{"version":"f7d628893c9fa52ba3ab01bcb5e79191636c4331ee5667ecc6373cbccff8ae12","impliedFormat":1},{"version":"1d879125d1ec570bf04bc1f362fdbe0cb538315c7ac4bcfcdf0c1e9670846aa6","impliedFormat":1},{"version":"f730b468deecf26188ad62ee8950dc29aa2aea9543bb08ed714c3db019359fd9","impliedFormat":1},{"version":"933aee906d42ea2c53b6892192a8127745f2ec81a90695df4024308ba35a8ff4","impliedFormat":1},{"version":"d663134457d8d669ae0df34eabd57028bddc04fc444c4bc04bc5215afc91e1f4","impliedFormat":1},{"version":"144bc326e90b894d1ec78a2af3ffb2eb3733f4d96761db0ca0b6239a8285f972","impliedFormat":1},{"version":"a3e3f0efcae272ab8ee3298e4e819f7d9dd9ff411101f45444877e77cfeca9a4","impliedFormat":1},{"version":"43e96a3d5d1411ab40ba2f61d6a3192e58177bcf3b133a80ad2a16591611726d","impliedFormat":1},{"version":"58659b06d33fa430bee1105b75cf876c0a35b2567207487c8578aec51ca2d977","impliedFormat":1},{"version":"71d9eb4c4e99456b78ae182fb20a5dfc20eb1667f091dbb9335b3c017dd1c783","impliedFormat":1},{"version":"cfa846a7b7847a1d973605fbb8c91f47f3a0f0643c18ac05c47077ebc72e71c7","impliedFormat":1},{"version":"30e6520444df1a004f46fdc8096f3fe06f7bbd93d09c53ada9dcdde59919ccca","impliedFormat":1},{"version":"6c800b281b9e89e69165fd11536195488de3ff53004e55905e6c0059a2d8591e","impliedFormat":1},{"version":"7d4254b4c6c67a29d5e7f65e67d72540480ac2cfb041ca484847f5ae70480b62","impliedFormat":1},{"version":"a58beefce74db00dbb60eb5a4bb0c6726fb94c7797c721f629142c0ae9c94306","impliedFormat":1},{"version":"41eeb453ccb75c5b2c3abef97adbbd741bd7e9112a2510e12f03f646dc9ad13d","impliedFormat":1},{"version":"502fa5863df08b806dbf33c54bee8c19f7e2ad466785c0fc35465d7c5ff80995","impliedFormat":1},{"version":"c91a2d08601a1547ffef326201be26db94356f38693bb18db622ae5e9b3d7c92","impliedFormat":1},{"version":"888cda0fa66d7f74e985a3f7b1af1f64b8ff03eb3d5e80d051c3cbdeb7f32ab7","impliedFormat":1},{"version":"60681e13f3545be5e9477acb752b741eae6eaf4cc01658a25ec05bff8b82a2ef","impliedFormat":1},{"version":"9586918b63f24124a5ca1d0cc2979821a8a57f514781f09fc5aa9cae6d7c0138","impliedFormat":1},{"version":"a57b1802794433adec9ff3fed12aa79d671faed86c49b09e02e1ac41b4f1d33a","impliedFormat":1},{"version":"ad10d4f0517599cdeca7755b930f148804e3e0e5b5a3847adce0f1f71bbccd74","impliedFormat":1},{"version":"1042064ece5bb47d6aba91648fbe0635c17c600ebdf567588b4ca715602f0a9d","impliedFormat":1},{"version":"c49469a5349b3cc1965710b5b0f98ed6c028686aa8450bcb3796728873eb923e","impliedFormat":1},{"version":"4a889f2c763edb4d55cb624257272ac10d04a1cad2ed2948b10ed4a7fda2a428","impliedFormat":1},{"version":"7bb79aa2fead87d9d56294ef71e056487e848d7b550c9a367523ee5416c44cfa","impliedFormat":1},{"version":"d88ea80a6447d7391f52352ec97e56b52ebec934a4a4af6e2464cfd8b39c3ba8","impliedFormat":1},{"version":"55095860901097726220b6923e35a812afdd49242a1246d7b0942ee7eb34c6e4","impliedFormat":1},{"version":"96171c03c2e7f314d66d38acd581f9667439845865b7f85da8df598ff9617476","impliedFormat":1},{"version":"27ff4196654e6373c9af16b6165120e2dd2169f9ad6abb5c935af5abd8c7938c","impliedFormat":1},{"version":"bb8f2dbc03533abca2066ce4655c119bff353dd4514375beb93c08590c03e023","impliedFormat":1},{"version":"d193c8a86144b3a87b22bc1f5534b9c3e0f5a187873ec337c289a183973a58fe","impliedFormat":1},{"version":"1a6e6ba8a07b74e3ad237717c0299d453f9ceb795dbc2f697d1f2dd07cb782d2","impliedFormat":1},{"version":"58d70c38037fc0f949243388ff7ae20cf43321107152f14a9d36ca79311e0ada","impliedFormat":1},{"version":"f56bdc6884648806d34bc66d31cdb787c4718d04105ce2cd88535db214631f82","impliedFormat":1},{"version":"190da5eac6478d61ab9731ab2146fbc0164af2117a363013249b7e7992f1cccb","impliedFormat":1},{"version":"01479d9d5a5dda16d529b91811375187f61a06e74be294a35ecce77e0b9e8d6c","impliedFormat":1},{"version":"49f95e989b4632c6c2a578cc0078ee19a5831832d79cc59abecf5160ea71abad","impliedFormat":1},{"version":"9666533332f26e8995e4d6fe472bdeec9f15d405693723e6497bf94120c566c8","impliedFormat":1},{"version":"ce0df82a9ae6f914ba08409d4d883983cc08e6d59eb2df02d8e4d68309e7848b","impliedFormat":1},{"version":"796273b2edc72e78a04e86d7c58ae94d370ab93a0ddf40b1aa85a37a1c29ecd7","impliedFormat":1},{"version":"5df15a69187d737d6d8d066e189ae4f97e41f4d53712a46b2710ff9f8563ec9f","impliedFormat":1},{"version":"1a4dc28334a926d90ba6a2d811ba0ff6c22775fcc13679521f034c124269fd40","impliedFormat":1},{"version":"f05315ff85714f0b87cc0b54bcd3dde2716e5a6b99aedcc19cad02bf2403e08c","impliedFormat":1},{"version":"8a8c64dafaba11c806efa56f5c69f611276471bef80a1db1f71316ec4168acef","impliedFormat":1},{"version":"43ba4f2fa8c698f5c304d21a3ef596741e8e85a810b7c1f9b692653791d8d97a","impliedFormat":1},{"version":"5fad3b31fc17a5bc58095118a8b160f5260964787c52e7eb51e3d4fcf5d4a6f0","impliedFormat":1},{"version":"72105519d0390262cf0abe84cf41c926ade0ff475d35eb21307b2f94de985778","impliedFormat":1},{"version":"d0a4cac61fa080f2be5ebb68b82726be835689b35994ba0e22e3ed4d2bc45e3b","impliedFormat":1},{"version":"c857e0aae3f5f444abd791ec81206020fbcc1223e187316677e026d1c1d6fe08","impliedFormat":1},{"version":"ccf6dd45b708fb74ba9ed0f2478d4eb9195c9dfef0ff83a6092fa3cf2ff53b4f","impliedFormat":1},{"version":"2d7db1d73456e8c5075387d4240c29a2a900847f9c1bff106a2e490da8fbd457","impliedFormat":1},{"version":"2b15c805f48e4e970f8ec0b1915f22d13ca6212375e8987663e2ef5f0205e832","impliedFormat":1},{"version":"205a31b31beb7be73b8df18fcc43109cbc31f398950190a0967afc7a12cb478c","impliedFormat":1},{"version":"8fca3039857709484e5893c05c1f9126ab7451fa6c29e19bb8c2411a2e937345","impliedFormat":1},{"version":"35069c2c417bd7443ae7c7cafd1de02f665bf015479fec998985ffbbf500628c","impliedFormat":1},{"version":"dba6c7006e14a98ec82999c6f89fbbbfd1c642f41db148535f3b77b8018829b8","impliedFormat":1},{"version":"7f897b285f22a57a5c4dc14a27da2747c01084a542b4d90d33897216dceeea2e","impliedFormat":1},{"version":"7e0b7f91c5ab6e33f511efc640d36e6f933510b11be24f98836a20a2dc914c2d","impliedFormat":1},{"version":"045b752f44bf9bbdcaffd882424ab0e15cb8d11fa94e1448942e338c8ef19fba","impliedFormat":1},{"version":"2894c56cad581928bb37607810af011764a2f511f575d28c9f4af0f2ef02d1ab","impliedFormat":1},{"version":"0a72186f94215d020cb386f7dca81d7495ab6c17066eb07d0f44a5bf33c1b21a","impliedFormat":1},{"version":"d96b39301d0ded3f1a27b47759676a33a02f6f5049bfcbde81e533fd10f50dcb","impliedFormat":1},{"version":"2ded4f930d6abfaa0625cf55e58f565b7cbd4ab5b574dd2cb19f0a83a2f0be8b","impliedFormat":1},{"version":"0aedb02516baf3e66b2c1db9fef50666d6ed257edac0f866ea32f1aa05aa474f","impliedFormat":1},{"version":"ca0f4d9068d652bad47e326cf6ba424ac71ab866e44b24ddb6c2bd82d129586a","affectsGlobalScope":true,"impliedFormat":1},{"version":"04d36005fcbeac741ac50c421181f4e0316d57d148d37cc321a8ea285472462b","impliedFormat":1},{"version":"9e2739b32f741859263fdba0244c194ca8e96da49b430377930b8f721d77c000","impliedFormat":1},{"version":"56ccb49443bfb72e5952f7012f0de1a8679f9f75fc93a5c1ac0bafb28725fc5f","impliedFormat":1},{"version":"d90b9f1520366d713a73bd30c5a9eb0040d0fb6076aff370796bc776fd705943","impliedFormat":1},{"version":"05321b823dd3781d0b6aac8700bfdc0c9181d56479fe52ba6a40c9196fd661a8","impliedFormat":1},{"version":"736a8712572e21ee73337055ce15edb08142fc0f59cd5410af4466d04beff0f9","affectsGlobalScope":true,"impliedFormat":1},{"version":"bef86adb77316505c6b471da1d9b8c9e428867c2566270e8894d4d773a1c4dc2","impliedFormat":1},{"version":"a46dba563f70f32f9e45ae015f3de979225f668075d7a427f874e0f6db584991","impliedFormat":1},{"version":"6ac6715916fa75a1f7ebdfeacac09513b4d904b667d827b7535e84ff59679aff","impliedFormat":1},{"version":"2652448ac55a2010a1f71dd141f828b682298d39728f9871e1cdf8696ef443fd","impliedFormat":1},{"version":"02c4fc9e6bb27545fa021f6056e88ff5fdf10d9d9f1467f1d10536c6e749ac50","impliedFormat":1},{"version":"120599fd965257b1f4d0ff794bc696162832d9d8467224f4665f713a3119078b","impliedFormat":1},{"version":"5433f33b0a20300cca35d2f229a7fc20b0e8477c44be2affeb21cb464af60c76","impliedFormat":1},{"version":"db036c56f79186da50af66511d37d9fe77fa6793381927292d17f81f787bb195","impliedFormat":1},{"version":"bd4131091b773973ca5d2326c60b789ab1f5e02d8843b3587effe6e1ea7c9d86","impliedFormat":1},{"version":"c7f6485931085bf010fbaf46880a9b9ec1a285ad9dc8c695a9e936f5a48f34b4","impliedFormat":1},{"version":"14f6b927888a1112d662877a5966b05ac1bf7ed25d6c84386db4c23c95a5363b","impliedFormat":1},{"version":"6ac6715916fa75a1f7ebdfeacac09513b4d904b667d827b7535e84ff59679aff","impliedFormat":1},{"version":"622694a8522b46f6310c2a9b5d2530dde1e2854cb5829354e6d1ff8f371cf469","impliedFormat":1},{"version":"d24ff95760ea2dfcc7c57d0e269356984e7046b7e0b745c80fea71559f15bdd8","impliedFormat":1},{"version":"a9e6c0ff3f8186fccd05752cf75fc94e147c02645087ac6de5cc16403323d870","impliedFormat":1},{"version":"49c346823ba6d4b12278c12c977fb3a31c06b9ca719015978cb145eb86da1c61","impliedFormat":1},{"version":"bfac6e50eaa7e73bb66b7e052c38fdc8ccfc8dbde2777648642af33cf349f7f1","impliedFormat":1},{"version":"92f7c1a4da7fbfd67a2228d1687d5c2e1faa0ba865a94d3550a3941d7527a45d","impliedFormat":1},{"version":"f53b120213a9289d9a26f5af90c4c686dd71d91487a0aa5451a38366c70dc64b","impliedFormat":1},{"version":"83fe880c090afe485a5c02262c0b7cdd76a299a50c48d9bde02be8e908fb4ae6","impliedFormat":1},{"version":"13c1b657932e827a7ed510395d94fc8b743b9d053ab95b7cd829b2bc46fb06db","impliedFormat":1},{"version":"57d67b72e06059adc5e9454de26bbfe567d412b962a501d263c75c2db430f40e","impliedFormat":1},{"version":"6511e4503cf74c469c60aafd6589e4d14d5eb0a25f9bf043dcbecdf65f261972","impliedFormat":1},{"version":"078131f3a722a8ad3fc0b724cd3497176513cdcb41c80f96a3acbda2a143b58e","impliedFormat":1},{"version":"8c70ddc0c22d85e56011d49fddfaae3405eb53d47b59327b9dd589e82df672e7","impliedFormat":1},{"version":"a67b87d0281c97dfc1197ef28dfe397fc2c865ccd41f7e32b53f647184cc7307","impliedFormat":1},{"version":"771ffb773f1ddd562492a6b9aaca648192ac3f056f0e1d997678ff97dbb6bf9b","impliedFormat":1},{"version":"232f70c0cf2b432f3a6e56a8dc3417103eb162292a9fd376d51a3a9ea5fbbf6f","impliedFormat":1},{"version":"9e155d2255348d950b1f65643fb26c0f14f5109daf8bd9ee24a866ad0a743648","affectsGlobalScope":true,"impliedFormat":1},{"version":"0b103e9abfe82d14c0ad06a55d9f91d6747154ef7cacc73cf27ecad2bfb3afcf","impliedFormat":1},{"version":"7a883e9c84e720810f86ef4388f54938a65caa0f4d181a64e9255e847a7c9f51","impliedFormat":1},{"version":"a0ba218ac1baa3da0d5d9c1ec1a7c2f8676c284e6f5b920d6d049b13fa267377","impliedFormat":1},{"version":"8a0e762ceb20c7e72504feef83d709468a70af4abccb304f32d6b9bac1129b2c","impliedFormat":1},{"version":"d408d6f32de8d1aba2ff4a20f1aa6a6edd7d92c997f63b90f8ad3f9017cf5e46","impliedFormat":1},{"version":"9252d498a77517aab5d8d4b5eb9d71e4b225bbc7123df9713e08181de63180f6","impliedFormat":1},{"version":"b1f1d57fde8247599731b24a733395c880a6561ec0c882efaaf20d7df968c5af","impliedFormat":1},{"version":"9d622ea608d43eb463c0c4538fd5baa794bc18ea0bb8e96cd2ab6fd483d55fe2","impliedFormat":1},{"version":"35e6379c3f7cb27b111ad4c1aa69538fd8e788ab737b8ff7596a1b40e96f4f90","impliedFormat":1},{"version":"1fffe726740f9787f15b532e1dc870af3cd964dbe29e191e76121aa3dd8693f2","impliedFormat":1},{"version":"371bf6127c1d427836de95197155132501cb6b69ef8709176ce6e0b85d059264","impliedFormat":1},{"version":"2bafd700e617d3693d568e972d02b92224b514781f542f70d497a8fdf92d52a2","affectsGlobalScope":true,"impliedFormat":1},{"version":"5542d8a7ea13168cb573be0d1ba0d29460d59430fb12bb7bf4674efd5604e14c","impliedFormat":1},{"version":"af48e58339188d5737b608d41411a9c054685413d8ae88b8c1d0d9bfabdf6e7e","impliedFormat":1},{"version":"616775f16134fa9d01fc677ad3f76e68c051a056c22ab552c64cc281a9686790","impliedFormat":1},{"version":"65c24a8baa2cca1de069a0ba9fba82a173690f52d7e2d0f1f7542d59d5eb4db0","impliedFormat":1},{"version":"f9fe6af238339a0e5f7563acee3178f51db37f32a2e7c09f85273098cee7ec49","impliedFormat":1},{"version":"1de8c302fd35220d8f29dea378a4ae45199dc8ff83ca9923aca1400f2b28848a","impliedFormat":1},{"version":"77e71242e71ebf8528c5802993697878f0533db8f2299b4d36aa015bae08a79c","impliedFormat":1},{"version":"98a787be42bd92f8c2a37d7df5f13e5992da0d967fab794adbb7ee18370f9849","impliedFormat":1},{"version":"332248ee37cca52903572e66c11bef755ccc6e235835e63d3c3e60ddda3e9b93","impliedFormat":1},{"version":"94e8cc88ae2ef3d920bb3bdc369f48436db123aa2dc07f683309ad8c9968a1e1","impliedFormat":1},{"version":"4545c1a1ceca170d5d83452dd7c4994644c35cf676a671412601689d9a62da35","impliedFormat":1},{"version":"320f4091e33548b554d2214ce5fc31c96631b513dffa806e2e3a60766c8c49d9","impliedFormat":1},{"version":"a2d648d333cf67b9aeac5d81a1a379d563a8ffa91ddd61c6179f68de724260ff","impliedFormat":1},{"version":"d90d5f524de38889d1e1dbc2aeef00060d779f8688c02766ddb9ca195e4a713d","impliedFormat":1},{"version":"a3f41ed1b4f2fc3049394b945a68ae4fdefd49fa1739c32f149d32c0545d67f5","impliedFormat":1},{"version":"b0309e1eda99a9e76f87c18992d9c3689b0938266242835dd4611f2b69efe456","impliedFormat":1},{"version":"47699512e6d8bebf7be488182427189f999affe3addc1c87c882d36b7f2d0b0e","impliedFormat":1},{"version":"6ceb10ca57943be87ff9debe978f4ab73593c0c85ee802c051a93fc96aaf7a20","impliedFormat":1},{"version":"1de3ffe0cc28a9fe2ac761ece075826836b5a02f340b412510a59ba1d41a505a","impliedFormat":1},{"version":"e46d6cc08d243d8d0d83986f609d830991f00450fb234f5b2f861648c42dc0d8","impliedFormat":1},{"version":"1c0a98de1323051010ce5b958ad47bc1c007f7921973123c999300e2b7b0ecc0","impliedFormat":1},{"version":"ff863d17c6c659440f7c5c536e4db7762d8c2565547b2608f36b798a743606ca","impliedFormat":1},{"version":"5412ad0043cd60d1f1406fc12cb4fb987e9a734decbdd4db6f6acf71791e36fe","impliedFormat":1},{"version":"ad036a85efcd9e5b4f7dd5c1a7362c8478f9a3b6c3554654ca24a29aa850a9c5","impliedFormat":1},{"version":"fedebeae32c5cdd1a85b4e0504a01996e4a8adf3dfa72876920d3dd6e42978e7","impliedFormat":1},{"version":"b6c1f64158da02580f55e8a2728eda6805f79419aed46a930f43e68ad66a38fc","impliedFormat":1},{"version":"cdf21eee8007e339b1b9945abf4a7b44930b1d695cc528459e68a3adc39a622e","impliedFormat":1},{"version":"bc9ee0192f056b3d5527bcd78dc3f9e527a9ba2bdc0a2c296fbc9027147df4b2","impliedFormat":1},{"version":"330896c1a2b9693edd617be24fbf9e5895d6e18c7955d6c08f028f272b37314d","impliedFormat":1},{"version":"1d9c0a9a6df4e8f29dc84c25c5aa0bb1da5456ebede7a03e03df08bb8b27bae6","impliedFormat":1},{"version":"84380af21da938a567c65ef95aefb5354f676368ee1a1cbb4cae81604a4c7d17","impliedFormat":1},{"version":"1af3e1f2a5d1332e136f8b0b95c0e6c0a02aaabd5092b36b64f3042a03debf28","impliedFormat":1},{"version":"30d8da250766efa99490fc02801047c2c6d72dd0da1bba6581c7e80d1d8842a4","impliedFormat":1},{"version":"03566202f5553bd2d9de22dfab0c61aa163cabb64f0223c08431fb3fc8f70280","impliedFormat":1},{"version":"4c0a1233155afb94bd4d7518c75c84f98567cd5f13fc215d258de196cdb40d91","impliedFormat":1},{"version":"e7765aa8bcb74a38b3230d212b4547686eb9796621ffb4367a104451c3f9614f","impliedFormat":1},{"version":"1de80059b8078ea5749941c9f863aa970b4735bdbb003be4925c853a8b6b4450","impliedFormat":1},{"version":"1d079c37fa53e3c21ed3fa214a27507bda9991f2a41458705b19ed8c2b61173d","impliedFormat":1},{"version":"5bf5c7a44e779790d1eb54c234b668b15e34affa95e78eada73e5757f61ed76a","impliedFormat":1},{"version":"5835a6e0d7cd2738e56b671af0e561e7c1b4fb77751383672f4b009f4e161d70","impliedFormat":1},{"version":"5c634644d45a1b6bc7b05e71e05e52ec04f3d73d9ac85d5927f647a5f965181a","impliedFormat":1},{"version":"4b7f74b772140395e7af67c4841be1ab867c11b3b82a51b1aeb692822b76c872","impliedFormat":1},{"version":"27be6622e2922a1b412eb057faa854831b95db9db5035c3f6d4b677b902ab3b7","impliedFormat":1},{"version":"a68d4b3182e8d776cdede7ac9630c209a7bfbb59191f99a52479151816ef9f9e","impliedFormat":99},{"version":"39644b343e4e3d748344af8182111e3bbc594930fff0170256567e13bbdbebb0","impliedFormat":99},{"version":"ed7fd5160b47b0de3b1571c5c5578e8e7e3314e33ae0b8ea85a895774ee64749","impliedFormat":99},{"version":"63a7595a5015e65262557f883463f934904959da563b4f788306f699411e9bac","impliedFormat":1},{"version":"4ba137d6553965703b6b55fd2000b4e07ba365f8caeb0359162ad7247f9707a6","impliedFormat":1},{"version":"6de125ea94866c736c6d58d68eb15272cf7d1020a5b459fea1c660027eca9a90","affectsGlobalScope":true,"impliedFormat":1},{"version":"8fac4a15690b27612d8474fb2fc7cc00388df52d169791b78d1a3645d60b4c8b","affectsGlobalScope":true,"impliedFormat":1},{"version":"064ac1c2ac4b2867c2ceaa74bbdce0cb6a4c16e7c31a6497097159c18f74aa7c","impliedFormat":1},{"version":"3dc14e1ab45e497e5d5e4295271d54ff689aeae00b4277979fdd10fa563540ae","impliedFormat":1},{"version":"d3b315763d91265d6b0e7e7fa93cfdb8a80ce7cdd2d9f55ba0f37a22db00bdb8","impliedFormat":1},{"version":"b789bf89eb19c777ed1e956dbad0925ca795701552d22e68fd130a032008b9f9","impliedFormat":1},{"version":"23778824ad6c313e9f078da63f5d1e9bdc36968b8d544c3c191e6ed037d0b220","affectsGlobalScope":true},"083e23c4c5e7761db151134ea1ef7896120c86c5888cdc8a861f534f7e86d6fd",{"version":"f109d2cf92c8ea6807f52ee6c5dbe437deb25b3f73a92b45684643e1f69fe19a","signature":"5482433fe0667e87a55966a30f4389c1bcdb914c2d74f1037bc2651735cac91f"},{"version":"e00dd69f218382063242c4289d6d06afeb6f6d78cb08347e2616b9ecde3ee2fe","impliedFormat":1},{"version":"c24fda42b427bfeaec7f4b164a64e8ffec7e0aa4bc7911b0aea392349c1935cb","signature":"10c7b6fe609507b557f54be5cccac0722dd5009dc37d95a87aaf566990087d9b"},{"version":"b1535397a73ca6046ca08957788a4c9a745730c7b2b887e9b9bc784214f3abac","impliedFormat":1},{"version":"1dab12d45a7ab2b167b489150cc7d10043d97eadc4255bfee8d9e07697073c61","impliedFormat":1},{"version":"611c4448eee5289fb486356d96a8049ce8e10e58885608b1d218ab6000c489b3","impliedFormat":1},{"version":"5de017dece7444a2041f5f729fe5035c3e8a94065910fbd235949a25c0c5b035","impliedFormat":1},{"version":"d47961927fe421b16a444286485165f10f18c2ef7b2b32a599c6f22106cd223b","impliedFormat":1},{"version":"341672ca9475e1625c105a6a99f46e8b4f14dff977e53a828deef7b5e932638f","impliedFormat":1},{"version":"d3b5d359e0523d0b9f85016266c9a50ce9cda399aeac1b9eeecb63ba577e4d27","impliedFormat":1},{"version":"5b9f65234e953177fcc9088e69d363706ccd0696a15d254ac5787b28bdfb7cb0","impliedFormat":1},{"version":"510a5373df4110d355b3fb5c72dfd3906782aeacbb44de71ceee0f0dece36352","impliedFormat":1},{"version":"eb76f85d8a8893360da026a53b39152237aaa7f033a267009b8e590139afd7de","impliedFormat":1},{"version":"1c19f268e0f1ed1a6485ca80e0cfd4e21bdc71cb974e2ac7b04b5fce0a91482b","impliedFormat":1},{"version":"84a28d684e49bae482c89c996e8aeaabf44c0355237a3a1303749da2161a90c1","impliedFormat":1},{"version":"89c36d61bae1591a26b3c08db2af6fdd43ffaab0f96646dead5af39ff0cf44d3","impliedFormat":1},{"version":"fcd615891bdf6421c708b42a6006ed8b0cf50ca0ac2b37d66a5777d8222893ce","impliedFormat":1},{"version":"1c87dfe5efcac5c2cd5fc454fe5df66116d7dc284b6e7b70bd30c07375176b36","impliedFormat":1},{"version":"6362fcd24c5b52eb88e9cf33876abd9b066d520fc9d4c24173e58dcddcfe12d5","impliedFormat":1},{"version":"aa064f60b7e64c04a759f5806a0d82a954452300ee27566232b0cf5dad5b6ba6","impliedFormat":1},{"version":"7ffb4e58ca1b9ed5f26bed3dc0287c4abd7a2ba301ca55e2546d01a7f7f73de7","impliedFormat":1},{"version":"65a6307cc74644b8813e553b468ea7cc7a1e5c4b241db255098b35f308bfc4b5","impliedFormat":1},{"version":"bd8e8f02d1b0ebfa518f7d8b5f0db06ae260c192e211a1ef86397f4b49ee198f","impliedFormat":1},{"version":"71b32ccf8c508c2f7445b1b2c144dd7eef9434f7bfa6a92a9ebd0253a75cb54a","impliedFormat":1},{"version":"4fd8e7e446c8379cfb1f165961b1d2f984b40d73f5ad343d93e33962292ec2e0","impliedFormat":1},{"version":"45079ac211d6cfda93dd7d0e7fc1cf2e510dad5610048ef71e47328b765515be","impliedFormat":1},{"version":"7ae8f8b4f56ba486dc9561d873aae5b3ad263ffb9683c8f9ffc18d25a7fd09a4","impliedFormat":1},{"version":"e0ab56e00ef473df66b345c9d64e42823c03e84d9a679020746d23710c2f9fce","impliedFormat":1},{"version":"d99deead63d250c60b647620d1ddaf497779aef1084f85d3d0a353cbc4ea8a60","impliedFormat":1},{"version":"ba64b14db9d08613474dc7c06d8ffbcb22a00a4f9d2641b2dcf97bc91da14275","impliedFormat":1},{"version":"530197974beb0a02c5a9eb7223f03e27651422345c8c35e1a13ddc67e6365af5","impliedFormat":1},{"version":"512c43b21074254148f89bd80ae00f7126db68b4d0bd1583b77b9c8af91cc0d3","impliedFormat":1},{"version":"0bfacd36c923f059779049c6c74c00823c56386397a541fefc8d8672d26e0c42","impliedFormat":1},{"version":"19d04b82ed0dc5ba742521b6da97f22362fe40d6efa5ca5650f08381e5c939b2","impliedFormat":1},{"version":"f02ac71075b54b5c0a384dddbd773c9852dba14b4bf61ca9f1c8ba6b09101d3e","impliedFormat":1},{"version":"bbf0ae18efd0b886897a23141532d9695435c279921c24bcb86090f2466d0727","impliedFormat":1},{"version":"067670de65606b4aa07964b0269b788a7fe48026864326cd3ab5db9fc5e93120","impliedFormat":1},{"version":"7a094146e95764e687120cdb840d7e92fe9960c2168d697639ad51af7230ef5e","impliedFormat":1},{"version":"21290aaea56895f836a0f1da5e1ef89285f8c0e85dc85fd59e2b887255484a6f","impliedFormat":1},{"version":"a07254fded28555a750750f3016aa44ec8b41fbf3664b380829ed8948124bafe","impliedFormat":1},{"version":"f14fbd9ec19692009e5f2727a662f841bbe65ac098e3371eb9a4d9e6ac05bca7","impliedFormat":1},{"version":"46f640a5efe8e5d464ced887797e7855c60581c27575971493998f253931b9a3","impliedFormat":1},{"version":"cdf62cebf884c6fde74f733d7993b7e255e513d6bc1d0e76c5c745ac8df98453","impliedFormat":1},{"version":"e6dd8526d318cce4cb3e83bef3cb4bf3aa08186ddc984c4663cf7dee221d430e","impliedFormat":1},{"version":"bc79e5e54981d32d02e32014b0279f1577055b2ebee12f4d2dc6451efd823a19","impliedFormat":1},{"version":"ce9f76eceb4f35c5ecd9bf7a1a22774c8b4962c2c52e5d56a8d3581a07b392f9","impliedFormat":1},{"version":"7d390f34038ca66aef27575cffb5a25a1034df470a8f7789a9079397a359bf8b","impliedFormat":1},{"version":"18084f07f6e85e59ce11b7118163dff2e452694fffb167d9973617699405fbd1","impliedFormat":1},{"version":"6af607dd78a033679e46c1c69c126313a1485069bdec46036f0fbfe64e393979","impliedFormat":1},{"version":"44c556b0d0ede234f633da4fb95df7d6e9780007003e108e88b4969541373db1","impliedFormat":1},{"version":"ef1491fb98f7a8837af94bfff14351b28485d8b8f490987820695cedac76dc99","impliedFormat":1},{"version":"0d4ba4ad7632e46bab669c1261452a1b35b58c3b1f6a64fb456440488f9008cf","impliedFormat":1},{"version":"74a0fa488591d372a544454d6cd93bbadd09c26474595ea8afed7125692e0859","impliedFormat":1},{"version":"0a9ae72be840cc5be5b0af985997029c74e3f5bcd4237b0055096bb01241d723","impliedFormat":1},{"version":"920004608418d82d0aad39134e275a427255aaf1dafe44dca10cc432ef5ca72a","impliedFormat":1},{"version":"3ac2bd86af2bab352d126ccdde1381cd4db82e3d09a887391c5c1254790727a1","impliedFormat":1},{"version":"2efc9ad74a84d3af0e00c12769a1032b2c349430d49aadebdf710f57857c9647","impliedFormat":1},{"version":"f18cc4e4728203a0282b94fc542523dfd78967a8f160fabc920faa120688151f","impliedFormat":1},{"version":"cc609a30a3dd07d6074290dadfb49b9f0f2c09d0ae7f2fa6b41e2dae2432417b","impliedFormat":1},{"version":"c473f6bd005279b9f3a08c38986f1f0eaf1b0f9d094fec6bc66309e7504b6460","impliedFormat":1},{"version":"0043ff78e9f07cbbbb934dd80d0f5fe190437715446ec9550d1f97b74ec951ac","impliedFormat":1},{"version":"bdc013746db3189a2525e87e2da9a6681f78352ef25ae513aa5f9a75f541e0ae","impliedFormat":1},{"version":"4f567b8360c2be77e609f98efc15de3ffcdbe2a806f34a3eba1ee607c04abab6","impliedFormat":1},{"version":"615bf0ac5606a0e79312d70d4b978ac4a39b3add886b555b1b1a35472327034e","impliedFormat":1},{"version":"818e96d8e24d98dfd8fd6d9d1bbabcac082bcf5fbbe64ca2a32d006209a8ee54","impliedFormat":1},{"version":"18b0b9a38fe92aa95a40431676b2102139c5257e5635fe6a48b197e9dcb660f1","impliedFormat":1},{"version":"86b382f98cb678ff23a74fe1d940cbbf67bcd3162259e8924590ecf8ee24701e","impliedFormat":1},{"version":"aeea2c497f27ce34df29448cbe66adb0f07d3a5d210c24943d38b8026ffa6d3c","impliedFormat":1},{"version":"0fbe1a754e3da007cc2726f61bc8f89b34b466fe205b20c1e316eb240bebe9e8","impliedFormat":1},{"version":"aa2f3c289c7a3403633e411985025b79af473c0bf0fdd980b9712bd6a1705d59","impliedFormat":1},{"version":"e140d9fa025dadc4b098c54278271a032d170d09f85f16f372e4879765277af8","impliedFormat":1},{"version":"70d9e5189fd4dabc81b82cf7691d80e0abf55df5030cc7f12d57df62c72b5076","impliedFormat":1},{"version":"a96be3ed573c2a6d4c7d4e7540f1738a6e90c92f05f684f5ee2533929dd8c6b2","impliedFormat":1},{"version":"2a545aa0bc738bd0080a931ccf8d1d9486c75cbc93e154597d93f46d2f3be3b4","impliedFormat":1},{"version":"137272a656222e83280287c3b6b6d949d38e6c125b48aff9e987cf584ff8eb42","impliedFormat":1},{"version":"5277b2beeb856b348af1c23ffdaccde1ec447abede6f017a0ab0362613309587","impliedFormat":1},{"version":"d4b6804b4c4cb3d65efd5dc8a672825cea7b39db98363d2d9c2608078adce5f8","impliedFormat":1},{"version":"929f67e0e7f3b3a3bcd4e17074e2e60c94b1e27a8135472a7d002a36cd640629","impliedFormat":1},{"version":"0c73536b65135298d43d1ef51dd81a6eba3b69ef0ce005db3de11365fda30a55","impliedFormat":1},{"version":"2a545aa0bc738bd0080a931ccf8d1d9486c75cbc93e154597d93f46d2f3be3b4","impliedFormat":99},{"version":"4279fdf3c57e06da86f316c95357065ee485062cacaef97e60897281de600fc4","signature":"10c7b6fe609507b557f54be5cccac0722dd5009dc37d95a87aaf566990087d9b"},{"version":"c9a77ed9a04fea1f0ff41787598704ec316d1ce2c727306019acbeaf3764cd73","impliedFormat":1},{"version":"59bf5a79d7de85f8743543977bafb4b478b60bf6ee7d1aa5ac3b4332968659f3","impliedFormat":1},{"version":"a3628f430f8d502a5c026a0c932a5c41e6361d8e0248287872cd8999bc534399","impliedFormat":1},{"version":"ff2726da83ea8164f457779c6a76619b4500e3053d97992e218115f13f5d98d5","impliedFormat":99},{"version":"14d2c82e20688a04591f3f936c0a3d976c702af336dac78ff06f4a5a238f3d69","impliedFormat":1},{"version":"f310fa3dfdda2854fbb1f9353cd86bee9dd05af77ade654895254da12ecd5e02","impliedFormat":1},{"version":"2b6c6039f4d2f656904d66f82231488f4852f861d27147884895097f74e3e812","impliedFormat":1},{"version":"1f84dff7964146377785aa684028ca62290e0639ac41fd0c5f391a5f5d414adc","impliedFormat":1},{"version":"4edf6371c3fd1f12c91cab0b0c42340ba0205e1a24f95757551ba46b6ab0e8a4","impliedFormat":1},{"version":"54d2709d08dc65b1cb180673e8f667f965a41b35be47e9aade190e931f3e29e8","impliedFormat":1},{"version":"727ba8cceee36c0b20288e608971ba2c438d3f99fb75f99614d659020f7c932f","impliedFormat":1},{"version":"86d7e0f2e4d36ccff4a10d8b269d46ad0cd22c27978196576303ff77cf065e2f","impliedFormat":1},{"version":"826e4a25b9c82e13e672f3b9872e7d25f5dd12345fa330cedff2a8a6f6ac9aa3","impliedFormat":1},{"version":"c0e42e780d502d530ce67e30d09a3b81c5d37d500c1f7ef04f4bd806f648b96a","impliedFormat":1},{"version":"447b6a80636a59c918ed18af1019de1efa94109a086e8fd8f3d20eb9b9a6937b","impliedFormat":99},{"version":"62d4ba94f7d1eb3c7817ca10366f63a3586a60ce1d5817f5ab05d0c90ba6bf5e","impliedFormat":99},{"version":"05c9c065eadecdce0ee370455e3c36674bfb08673f1a268a398002a0d2d801b7","impliedFormat":1},{"version":"596c5e157764a7859c6cd9c34313b24820dbea63717c9deec9cd789964ffcd7f","impliedFormat":1},{"version":"0eae63800777384563d5727e572982c220d47acf736dcdb569a2749a32378f19","impliedFormat":1},{"version":"9bf41a89bd0bbd4f8a23a7925d04f99267cb84a5a5b239185f3320edea329b9c","impliedFormat":1},{"version":"ba69d5ef968a0350e3216f4dfd39f846ed9a500f360acbe473e4f88278b3c746","impliedFormat":1},{"version":"ca2d1749803143fc680e7f89c0ee9e59fdbf1b4139666016fb152121e3e2c53c","impliedFormat":1},{"version":"c7d1aa1583720f98076b18aef12700c2bb68226fc71603a7da2654a189a0e024","impliedFormat":1},{"version":"ecfb7796212d2f1d7fc48d7d42dd6ec4c270f3080572d19f24b2638ae0defac3","impliedFormat":1},{"version":"717c42dfb8774242bcf05836fbc643bd7ccbf21908e5b8fe7920c950617ffc19","impliedFormat":1},{"version":"fdab35f51f6eb13e8c97511f16139414e3c165dafd293d2ceee986b5b97e7a06","impliedFormat":1},{"version":"18eaffdf9c5aaf96d3ba7e3d9d788193a119be6792c1f32da4ac3595687a3a59","impliedFormat":1},{"version":"fe7ce1a943259b76d844abc531d1e5221264ede5639175c3c456faeb42c41eb8","impliedFormat":1},{"version":"4ae9b50481136302de9c77668621ed3a0b34998f3e091ca3701426f4fe369c8a","impliedFormat":1},{"version":"9ba9ecc57d2f52b3ed3ac229636ee9a36e92e18b80eeae11ffb546c12e56d5e5","impliedFormat":1},{"version":"17644c49b3a6c1907a292b491472a609f342d069c660043b96e398574e34b6a7","impliedFormat":1},{"version":"d182d419bb30a1408784ed95fbabd973dde7517641e04525f0ce761df5d193a5","impliedFormat":1},{"version":"4d0352b218553e7d37f715f1ac212bed4b52192e0806f8e883bedcd83c66798e","impliedFormat":99},{"version":"79c164aa4f8a8418df7717206ea52508f72743224a6b9c705f10724c6dbb5548","impliedFormat":1},{"version":"5b5f805a25fe76e6d211cf9f02f050c0303ff749e8414a7c7cb9af7d1eb858c8","impliedFormat":1},{"version":"d5ddeb656d348d374e66cb45af72ea82ed9f2076e3ef8efb29e4277ed999d92f","impliedFormat":1},{"version":"0f41aefa7d388e8e43f10941a10d48e1d7274b27fe8267006b9e5787ab7cc601","impliedFormat":1},{"version":"2550666c9d94b29e5735e40d2a3e7fde1e13cff08f9883cfd56ea996d4317555","impliedFormat":1},{"version":"2ed360a6314d0aadeecb8491a6fde17b58b8464acde69501dbd7242544bcce57","impliedFormat":1},{"version":"4158a50e206f82c95e0ad4ea442ff6c99f20b5b85c5444474b8a9504c59294aa","impliedFormat":1},{"version":"c7a9dc2768c7d68337e05a443d0ce8000b0d24d7dfa98751173421e165d44629","impliedFormat":1},{"version":"d93cbdbf9cb855ad40e03d425b1ef98d61160021608cf41b431c0fc7e39a0656","impliedFormat":1},{"version":"561a4879505d41a27c404f637ae50e3da92126aa70d94cc073f6a2e102d565b0","impliedFormat":1},{"version":"7a388d312e798416cdfe22fe8b01c0ce3f12eb6081aced3b4960702f7ed947a2","signature":"decdc0961f0dd86a107c58655c4f052cb22f11ae43184c425e5b854accc792dd"},{"version":"ffef35200533208ff20826bf35832fc34df628f7625c13eca36288876c6fea92","signature":"3848b632e960641ac6dfb66dec43e56f9d6d1c29ae0090edd8e4bddfb4efe7f4"},{"version":"8f0251cf3358a787330dfaad9c3b30783774519cfc1b7eebbfc6b830f3ac5229","signature":"85fa56d0c0ce8d62713f7fbf1bbff4aad2fc15d6ad8b47d09551a6a364ab2e65"},{"version":"e1a7ea0605ed4fd3c40103d997cb64641830c6c6828419a289b4d03820664f9f","signature":"c0cd06dae7a3cde32e3c87ac3b74f3839c497ba98b9d39f112fb94b2b84d47ca"},{"version":"9d0510fe29cedd094c253404432c5af0db597ff034e1fe39adf876cf608a7ab4","signature":"ecfc8c133204845700f2f98b41762d0cb78f5fdccd7dd43e89560d8f2f15a499"},{"version":"f23bf5e05002c58a1fb58beaecc4707e4c8c1d6cd3b2dbdfec3903bdb82e7100","signature":"0a3b84de063a8aa39c7bf748256125b92a5ea2bb6eaaa5606a777ef07e106b01"},{"version":"74ef918f834d33756a99ee0c073a3db62e030aeae325e11f843fedf37a703f6f","signature":"444053dfa4f21455cc857fbd1fe38fe5d9aef0d0568bca1d32634eaa54838e1b"},{"version":"27d149febaadb0678165b1a09ab84fea888d133e048f0eca369d6f22b8162e99","signature":"43374017817c927ca55fb09f644488cbf806d0d4d732d70d272d40e49fa2f220"},"b89cc659cef5524ed428fd848276729224ab7064b9ca43ad8d00fd6bef01e75b",{"version":"c8dc73612b5703319291beae694ae0553002fb1a7541a4943a7afa059852a385","signature":"a6b7c8f188601b594e6738b153be93aca7731e4afd0ea2900be742aef6248abb"},{"version":"d34e55f302f2178be2cf2fff407276e55267e5e928441956ff0ed573ab935f1b","signature":"45eca8a62f7e13a92fbfb7c633e7fb9017f8423a201d905114d6a4ffcebbe8f7"},{"version":"38479e9851ea5f43f60baaa6bc894a49dba0a74dd706ce592d32bcb8b59e3be9","affectsGlobalScope":true,"impliedFormat":1},{"version":"9592f843d45105b9335c4cd364b9b2562ce4904e0895152206ac4f5b2d1bb212","impliedFormat":1},{"version":"f9ff719608ace88cae7cb823f159d5fb82c9550f2f7e6e7d0f4c6e41d4e4edb4","affectsGlobalScope":true,"impliedFormat":1},{"version":"b51fb3ae19c62cea8c1aad18a569b939b1203cf0f0beede96a95c9ef00dc821d","impliedFormat":1},{"version":"1fa1c8bdd02bd0f6e1932ab5c4bf2f283c048defe5f291c717745801cc19950d","signature":"0bb9a610c11197d1f48702c9bbb5e5a4548a5d4f289d308189ef924ff734cb53"},{"version":"7e07659555c2af67fc616fee827a83b361c692d92d20a6627493c60f12189d6b","signature":"7b87720aae5dbfb749d597c437531239e4019502dc0e78633561735db617b6f3"},{"version":"2111f8c537588cab916a7dccedda5587a067a845faad09f91e822468a962cd4d","signature":"bff0a4337dae8b44ee936a7602c8efab79d2b7a3d1907c3ac2ece9d89aa9a2a9"},{"version":"a2733bcaa15b53a1407657ae7bde65a392b1b53750085c1ac59ae475f4baf505","signature":"4cfc416860adb6f068a0edef9f3da8a27a8709ebed8c29ebeb1934b6dfcfd0be"},{"version":"06d98f62dad6c5bb90725d3b7ae59e26a69304149a2910f2533f93ac9272b106","signature":"777a6bb94103e426e0758d3f5c04840809cfcb06a4a42087f915b5083ee275f1"},{"version":"c1b9f549ac6314827ead15f6aab1c0cb6658b4f60bafb416b7ca3319828409bb","signature":"2a42ea6a4a9713f21ebe4bff31e8eba3a91df0090d469c675372ac932f8909ca"},{"version":"ee1de2f3cb86e4859d9df4c2b2cfbdf488b0dc980cd3276a3007d0dd8cae72d5","signature":"0925f39fe09abb0a7d5b42b2da4aca13a611654f2b1556c3cfbe454a952a0f12"},{"version":"b885c5df20aa8c3ac71f3e2e0bf1b544cb7dd32d9d6beb6dbb9c0b50ed5cb23d","signature":"54c66c3d9a571f2070f56921ffce8e4716199b2d0bd238d4aa11e590e665d5e7"},{"version":"85da8ac41a0e8caaac0606da9ee1db884af42d046e5923e0b82b30ebe96dcee0","signature":"bc0819347c181043822f7c25fdb1d71e434bce84db95b58175de3ba7bd2b5ad8"},{"version":"91a39b4091910d65088e7293b476310df289029650377bd8c96a0ed4b9999ff5","signature":"537c96d32e5db9c12b233a7333781387840ca6c5a7bda2e3741c5f4fe344e11f"},{"version":"a9e89dcf3c84ffaef264055fe4aa3fc12261e3d8695065dfbc80800231594285","signature":"ea405031d7778aa34fee1745e374239e85c7daca019fc942f7adfd6beee6bd3f"},{"version":"75e52d99711821b84ad4e68543d21f114b43fb762ec7ce7e38bb1a707f784f40","signature":"c59a9274e7066b7ff440b7b1f2dd871b0dec5cc777a418c25698338a3b4b5b31"},{"version":"4a8f7670049cf882facdc51bfc84d604427ee84c9bad4754a71e2f497714d554","signature":"78088f5e996307b184dfa94bd6f8a509d427bab57539057d99f3d688882aa65a"},{"version":"93098b4d4c2cefd1e399e5523afcffb1d6a488309beba1b632dbd7e5c867e678","signature":"729c0b07a95e6e74ec967bff6dacfe1889d5cc968085ff8371cd69613d5eebcc"},{"version":"52c891c3dc9f4cc383d3279c4692382f53ba03c23b94e888e73ed22aca74cb53","signature":"2a897700826ae8301e811e36dc89e5bcc11973bbbd7fc54c09fedd92fe03f7c9"},{"version":"735fceddba3993000814a351abae44228bd724ec21a039e0d10849f9ac4f98e8","signature":"26ba71f79eb1ccc526399c703ceb9595712a793b7d939584ca92df4a3ce4fea8"},{"version":"78fa1a4a695ecdcccd493d82351977ac26c5416f606e6f2002ff24191b1911c4","signature":"2cc743b624d6891f9275f11f76fedfe235af04641c806e7dc65e55740db4dd29"},{"version":"f008e8b257404d2d1ca175ffc1a0d14273a19edcaa08be658cf3c7dada2ed195","signature":"2cc743b624d6891f9275f11f76fedfe235af04641c806e7dc65e55740db4dd29"},{"version":"41abf4cc2c321b310fc411127eb632315cef4e1078d8c78afdab6a19e90f58f0","signature":"2cc743b624d6891f9275f11f76fedfe235af04641c806e7dc65e55740db4dd29"},{"version":"961f466e41f03c1a2d2de5ff01aad67fd07ba0049b91f5b6659358186a3d8888","signature":"2cc743b624d6891f9275f11f76fedfe235af04641c806e7dc65e55740db4dd29"},{"version":"1f3fbc2086e38829eff7fd33779168c6bf1e1000886339987d50ed01f42b77a9","signature":"2cc743b624d6891f9275f11f76fedfe235af04641c806e7dc65e55740db4dd29"},{"version":"d0b4ebf5a340a660ec2cbc4c8a4ecda337804d7a5e9b50223372cc5628a3bcf6","signature":"2cc743b624d6891f9275f11f76fedfe235af04641c806e7dc65e55740db4dd29"},"d1986184a09a52db8228cb2bb2a61a8c05c9354e5b93cec8e2628d8579c892d7",{"version":"eb81082eed6687dbf51335bbf25a6565a834f2f0871e502bd9d90b0671900ad1","signature":"8e609bb71c20b858c77f0e9f90bb1319db8477b13f9f965f1a1e18524bf50881"},{"version":"151ff381ef9ff8da2da9b9663ebf657eac35c4c9a19183420c05728f31a6761d","impliedFormat":1},{"version":"f3d8c757e148ad968f0d98697987db363070abada5f503da3c06aefd9d4248c1","impliedFormat":1},{"version":"96d14f21b7652903852eef49379d04dbda28c16ed36468f8c9fa08f7c14c9538","impliedFormat":1},{"version":"736097ddbb2903bef918bb3b5811ef1c9c5656f2a73bd39b22a91b9cc2525e50","impliedFormat":1},{"version":"4340936f4e937c452ae783514e7c7bbb7fc06d0c97993ff4865370d0962bb9cf","impliedFormat":1},{"version":"b70c7ea83a7d0de17a791d9b5283f664033a96362c42cc4d2b2e0bdaa65ef7d1","impliedFormat":1},{"version":"1ba59c8bbeed2cb75b239bb12041582fa3e8ef32f8d0bd0ec802e38442d3f317","impliedFormat":1}],"root":[[509,511],513,591,[635,645],[650,673]],"options":{"allowJs":true,"esModuleInterop":true,"jsx":4,"module":99,"skipLibCheck":true,"strict":true,"target":1},"referencedMap":[[672,1],[509,2],[673,3],[668,4],[669,5],[670,6],[671,7],[666,8],[667,9],[510,10],[253,2],[620,11],[621,12],[619,13],[614,14],[623,15],[608,2],[609,16],[618,17],[613,18],[622,2],[617,19],[610,2],[611,2],[616,20],[612,17],[615,18],[593,21],[594,22],[592,2],[595,2],[605,23],[597,2],[600,24],[598,2],[599,2],[596,2],[603,25],[604,26],[602,27],[627,28],[628,28],[634,29],[626,30],[632,2],[631,2],[630,31],[629,30],[633,32],[607,33],[624,34],[674,2],[675,2],[676,2],[678,2],[679,35],[141,36],[142,36],[143,37],[98,38],[144,39],[145,40],[146,41],[93,2],[96,42],[94,2],[95,2],[147,43],[148,44],[149,45],[150,46],[151,47],[152,48],[153,48],[154,49],[155,50],[156,51],[157,52],[99,2],[97,2],[158,53],[159,54],[160,55],[192,56],[161,57],[162,58],[163,59],[164,60],[165,61],[166,62],[167,63],[168,64],[169,65],[170,66],[171,66],[172,67],[173,2],[174,68],[176,69],[175,70],[177,71],[178,72],[179,73],[180,74],[181,75],[182,76],[183,77],[184,78],[185,79],[186,80],[187,81],[188,82],[189,83],[100,2],[101,2],[102,2],[140,84],[190,85],[191,86],[601,2],[85,2],[196,87],[412,88],[197,89],[195,88],[413,90],[193,91],[194,92],[83,2],[86,93],[410,88],[270,88],[680,94],[625,2],[84,2],[677,95],[648,96],[606,2],[649,88],[512,2],[646,2],[647,2],[458,97],[463,1],[453,98],[217,99],[257,100],[437,101],[252,102],[234,2],[409,2],[215,2],[426,103],[283,104],[216,2],[337,105],[260,106],[261,107],[408,108],[423,109],[319,110],[431,111],[432,112],[430,113],[429,2],[427,114],[259,115],[218,116],[362,2],[363,117],[289,118],[219,119],[290,118],[285,118],[206,118],[255,120],[254,2],[436,121],[448,2],[242,2],[384,122],[385,123],[379,88],[485,2],[387,2],[388,124],[380,125],[490,126],[489,127],[484,2],[304,2],[422,128],[421,2],[483,129],[381,88],[313,130],[309,131],[314,132],[312,2],[311,133],[310,2],[486,2],[482,2],[488,134],[487,2],[308,131],[477,135],[480,136],[298,137],[297,138],[296,139],[493,88],[295,140],[277,2],[496,2],[499,2],[498,88],[500,141],[199,2],[433,142],[434,143],[435,144],[212,2],[245,2],[211,145],[198,2],[400,88],[204,146],[399,147],[398,148],[389,2],[390,2],[397,2],[392,2],[395,149],[391,2],[393,150],[396,151],[394,150],[214,2],[209,2],[210,118],[265,2],[271,152],[272,153],[269,154],[267,155],[268,156],[263,2],[406,124],[292,124],[457,157],[464,158],[468,159],[440,160],[439,2],[280,2],[501,161],[452,162],[382,163],[383,164],[377,165],[368,2],[405,166],[442,88],[369,167],[407,168],[402,169],[401,2],[403,2],[374,2],[361,170],[441,171],[444,172],[371,173],[375,174],[366,175],[418,176],[451,177],[323,178],[338,179],[207,180],[450,181],[203,182],[273,183],[264,2],[274,184],[350,185],[262,2],[349,186],[92,2],[343,187],[244,2],[364,188],[339,2],[208,2],[238,2],[347,189],[213,2],[275,190],[373,191],[438,192],[372,2],[346,2],[266,2],[352,193],[353,194],[428,2],[355,195],[357,196],[356,197],[247,2],[345,180],[359,198],[322,199],[344,200],[351,201],[222,2],[226,2],[225,2],[224,2],[229,2],[223,2],[232,2],[231,2],[228,2],[227,2],[230,2],[233,202],[221,2],[331,203],[330,2],[335,204],[332,205],[334,206],[336,204],[333,205],[243,207],[293,208],[447,209],[502,2],[472,210],[474,211],[370,212],[473,213],[445,171],[386,171],[220,2],[324,214],[239,215],[240,216],[241,217],[237,218],[417,218],[287,218],[325,219],[288,219],[236,220],[235,2],[329,221],[328,222],[327,223],[326,224],[446,225],[416,226],[415,227],[378,228],[411,229],[414,230],[425,231],[424,232],[420,233],[321,234],[318,235],[320,236],[317,237],[358,238],[348,2],[462,2],[360,239],[419,2],[276,240],[367,142],[365,241],[278,242],[281,243],[497,2],[279,244],[282,244],[460,2],[459,2],[461,2],[495,2],[284,245],[443,2],[315,246],[307,88],[258,2],[202,247],[291,2],[466,88],[201,2],[476,248],[306,88],[470,124],[305,249],[455,250],[303,248],[205,2],[478,251],[301,88],[302,88],[294,2],[200,2],[300,252],[299,253],[246,254],[376,65],[286,65],[354,2],[341,255],[340,2],[404,131],[316,88],[449,145],[456,256],[87,88],[90,257],[91,258],[88,88],[89,2],[256,259],[251,260],[250,2],[249,261],[248,2],[454,262],[465,263],[467,264],[469,265],[471,266],[475,267],[508,268],[479,268],[507,269],[481,270],[491,271],[492,272],[494,273],[503,274],[506,145],[505,2],[504,275],[515,2],[521,276],[514,2],[518,2],[520,277],[517,278],[590,279],[584,279],[545,280],[541,281],[556,282],[546,283],[553,284],[540,285],[554,2],[552,286],[549,287],[550,288],[547,289],[555,290],[522,278],[585,291],[536,292],[533,293],[534,294],[535,295],[524,296],[543,297],[562,298],[558,299],[557,300],[561,301],[559,302],[560,302],[537,303],[539,304],[538,305],[542,306],[586,307],[544,308],[526,309],[587,310],[525,311],[588,312],[527,313],[565,314],[563,293],[564,315],[528,302],[569,316],[567,317],[568,318],[529,319],[572,320],[571,321],[574,322],[573,323],[577,324],[575,323],[576,325],[570,326],[566,327],[578,326],[530,302],[589,328],[531,323],[532,302],[548,329],[551,330],[523,2],[579,302],[580,331],[582,332],[581,333],[583,334],[516,335],[519,336],[342,337],[81,2],[82,2],[13,2],[14,2],[16,2],[15,2],[2,2],[17,2],[18,2],[19,2],[20,2],[21,2],[22,2],[23,2],[24,2],[3,2],[25,2],[26,2],[4,2],[27,2],[31,2],[28,2],[29,2],[30,2],[32,2],[33,2],[34,2],[5,2],[35,2],[36,2],[37,2],[38,2],[6,2],[42,2],[39,2],[40,2],[41,2],[43,2],[7,2],[44,2],[49,2],[50,2],[45,2],[46,2],[47,2],[48,2],[8,2],[54,2],[51,2],[52,2],[53,2],[55,2],[9,2],[56,2],[57,2],[58,2],[60,2],[59,2],[61,2],[62,2],[10,2],[63,2],[64,2],[65,2],[11,2],[66,2],[67,2],[68,2],[69,2],[70,2],[1,2],[71,2],[72,2],[12,2],[76,2],[74,2],[79,2],[78,2],[73,2],[77,2],[75,2],[80,2],[118,338],[128,339],[117,338],[138,340],[109,341],[108,342],[137,275],[131,343],[136,344],[111,345],[125,346],[110,347],[134,348],[106,349],[105,275],[135,350],[107,351],[112,352],[113,2],[116,352],[103,2],[139,353],[129,354],[120,355],[121,356],[123,357],[119,358],[122,359],[132,275],[114,360],[115,361],[124,362],[104,363],[127,354],[126,352],[130,2],[133,364],[511,365],[513,366],[591,367],[664,368],[645,369],[665,370],[651,371],[661,372],[663,373],[658,374],[659,374],[653,375],[656,375],[657,375],[652,376],[655,375],[660,375],[654,375],[662,377],[650,378],[637,379],[638,380],[639,376],[640,381],[641,376],[635,382],[642,383],[644,124],[636,381],[643,2]],"affectedFilesPendingEmit":[673,668,669,670,671,666,667,511,513,591,664,645,665,651,661,663,658,659,653,656,657,652,655,660,654,662,650,637,638,639,640,641,635,642,644,636],"version":"5.9.3"}
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\tailwind.config.js
*Saved at: 6/1/2026, 1:01:43 PM*

**[REMOVED]**
```
(from line ~53)
};

```
**[ADDED]**
```
53    };
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\package-lock.json
*Saved at: 6/1/2026, 12:59:11 PM*

**[REMOVED]**
```
(from line ~11)
        "@supabase/ssr": "^0.5.0",

```
**[ADDED]**
```
11            "@supabase/ssr": "^0.9.0",
```
**[REMOVED]**
```
(from line ~17)
        "next": "14.2.5",

```
**[ADDED]**
```
17            "next": "^16.1.6",
18            "openai": "^4.56.0",
```
**[REMOVED]**
```
(from line ~29)
        "eslint": "^8",
        "eslint-config-next": "14.2.5",

```
**[ADDED]**
```
29            "eslint": "^9.39.3",
30            "eslint-config-next": "^16.1.6",
```
**[ADDED]**
```
49        "node_modules/@babel/code-frame": {
50          "version": "7.29.0",
51          "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.0.tgz",
52          "integrity": "sha512-9NhCeYjq9+3uxgdtp20LSiJXJvN0FeCtNGpJxuMFZ1Kv3cWUNb6DOhJwUvcVCzKGR66cw4njwM6hrJLqgOwbcw==",
53          "dev": true,
54          "license": "MIT",
55          "dependencies": {
56            "@babel/helper-validator-identifier": "^7.28.5",
57            "js-tokens": "^4.0.0",
58            "picocolors": "^1.1.1"
59          },
60          "engines": {
61            "node": ">=6.9.0"
62          }
63        },
64        "node_modules/@babel/compat-data": {
65          "version": "7.29.0",
66          "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.0.tgz",
67          "integrity": "sha512-T1NCJqT/j9+cn8fvkt7jtwbLBfLC/1y1c7NtCeXFRgzGTsafi68MRv8yzkYSapBnFA6L3U2VSc02ciDzoAJhJg==",
68          "dev": true,
69          "license": "MIT",
70          "engines": {
71            "node": ">=6.9.0"
72          }
73        },
74        "node_modules/@babel/core": {
75          "version": "7.29.0",
76          "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.0.tgz",
77          "integrity": "sha512-CGOfOJqWjg2qW/Mb6zNsDm+u5vFQ8DxXfbM09z69p5Z6+mE1ikP2jUXw+j42Pf1XTYED2Rni5f95npYeuwMDQA==",
78          "dev": true,
79          "license": "MIT",
80          "peer": true,
81          "dependencies": {
82            "@babel/code-frame": "^7.29.0",
83            "@babel/generator": "^7.29.0",
84            "@babel/helper-compilation-targets": "^7.28.6",
85            "@babel/helper-module-transforms": "^7.28.6",
86            "@babel/helpers": "^7.28.6",
87            "@babel/parser": "^7.29.0",
88            "@babel/template": "^7.28.6",
89            "@babel/traverse": "^7.29.0",
90            "@babel/types": "^7.29.0",
91            "@jridgewell/remapping": "^2.3.5",
92            "convert-source-map": "^2.0.0",
93            "debug": "^4.1.0",
94            "gensync": "^1.0.0-beta.2",
95            "json5": "^2.2.3",
96            "semver": "^6.3.1"
97          },
98          "engines": {
99            "node": ">=6.9.0"
100         },
101         "funding": {
102           "type": "opencollective",
103           "url": "https://opencollective.com/babel"
104         }
105       },
106       "node_modules/@babel/generator": {
107         "version": "7.29.1",
108         "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.1.tgz",
109         "integrity": "sha512-qsaF+9Qcm2Qv8SRIMMscAvG4O3lJ0F1GuMo5HR/Bp02LopNgnZBC/EkbevHFeGs4ls/oPz9v+Bsmzbkbe+0dUw==",
110         "dev": true,
111         "license": "MIT",
112         "dependencies": {
113           "@babel/parser": "^7.29.0",
114           "@babel/types": "^7.29.0",
115           "@jridgewell/gen-mapping": "^0.3.12",
116           "@jridgewell/trace-mapping": "^0.3.28",
117           "jsesc": "^3.0.2"
118         },
119         "engines": {
120           "node": ">=6.9.0"
121         }
122       },
123       "node_modules/@babel/helper-compilation-targets": {
124         "version": "7.28.6",
125         "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.28.6.tgz",
126         "integrity": "sha512-JYtls3hqi15fcx5GaSNL7SCTJ2MNmjrkHXg4FSpOA/grxK8KwyZ5bubHsCq8FXCkua6xhuaaBit+3b7+VZRfcA==",
127         "dev": true,
128         "license": "MIT",
129         "dependencies": {
130           "@babel/compat-data": "^7.28.6",
131           "@babel/helper-validator-option": "^7.27.1",
132           "browserslist": "^4.24.0",
133           "lru-cache": "^5.1.1",
134           "semver": "^6.3.1"
135         },
136         "engines": {
137           "node": ">=6.9.0"
138         }
139       },
140       "node_modules/@babel/helper-globals": {
141         "version": "7.28.0",
142         "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
143         "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
144         "dev": true,
145         "license": "MIT",
146         "engines": {
147           "node": ">=6.9.0"
148         }
149       },
150       "node_modules/@babel/helper-module-imports": {
151         "version": "7.28.6",
152         "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.28.6.tgz",
153         "integrity": "sha512-l5XkZK7r7wa9LucGw9LwZyyCUscb4x37JWTPz7swwFE/0FMQAGpiWUZn8u9DzkSBWEcK25jmvubfpw2dnAMdbw==",
154         "dev": true,
155         "license": "MIT",
156         "dependencies": {
157           "@babel/traverse": "^7.28.6",
158           "@babel/types": "^7.28.6"
159         },
160         "engines": {
161           "node": ">=6.9.0"
162         }
163       },
164       "node_modules/@babel/helper-module-transforms": {
165         "version": "7.28.6",
166         "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.6.tgz",
167         "integrity": "sha512-67oXFAYr2cDLDVGLXTEABjdBJZ6drElUSI7WKp70NrpyISso3plG9SAGEF6y7zbha/wOzUByWWTJvEDVNIUGcA==",
168         "dev": true,
169         "license": "MIT",
170         "dependencies": {
171           "@babel/helper-module-imports": "^7.28.6",
172           "@babel/helper-validator-identifier": "^7.28.5",
173           "@babel/traverse": "^7.28.6"
174         },
175         "engines": {
176           "node": ">=6.9.0"
177         },
178         "peerDependencies": {
179           "@babel/core": "^7.0.0"
180         }
181       },
182       "node_modules/@babel/helper-string-parser": {
183         "version": "7.27.1",
184         "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
185         "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
186         "dev": true,
187         "license": "MIT",
188         "engines": {
189           "node": ">=6.9.0"
190         }
191       },
192       "node_modules/@babel/helper-validator-identifier": {
193         "version": "7.28.5",
194         "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.28.5.tgz",
195         "integrity": "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q==",
196         "dev": true,
197         "license": "MIT",
198         "engines": {
199           "node": ">=6.9.0"
200         }
201       },
202       "node_modules/@babel/helper-validator-option": {
203         "version": "7.27.1",
204         "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
205         "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
206         "dev": true,
207         "license": "MIT",
208         "engines": {
209           "node": ">=6.9.0"
210         }
211       },
212       "node_modules/@babel/helpers": {
213         "version": "7.28.6",
214         "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.28.6.tgz",
215         "integrity": "sha512-xOBvwq86HHdB7WUDTfKfT/Vuxh7gElQ+Sfti2Cy6yIWNW05P8iUslOVcZ4/sKbE+/jQaukQAdz/gf3724kYdqw==",
216         "dev": true,
217         "license": "MIT",
218         "dependencies": {
219           "@babel/template": "^7.28.6",
220           "@babel/types": "^7.28.6"
221         },
222         "engines": {
223           "node": ">=6.9.0"
224         }
225       },
226       "node_modules/@babel/parser": {
227         "version": "7.29.0",
228         "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.0.tgz",
229         "integrity": "sha512-IyDgFV5GeDUVX4YdF/3CPULtVGSXXMLh1xVIgdCgxApktqnQV0r7/8Nqthg+8YLGaAtdyIlo2qIdZrbCv4+7ww==",
230         "dev": true,
231         "license": "MIT",
232         "dependencies": {
233           "@babel/types": "^7.29.0"
234         },
235         "bin": {
236           "parser": "bin/babel-parser.js"
237         },
238         "engines": {
239           "node": ">=6.0.0"
240         }
241       },
242       "node_modules/@babel/template": {
243         "version": "7.28.6",
244         "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.28.6.tgz",
245         "integrity": "sha512-YA6Ma2KsCdGb+WC6UpBVFJGXL58MDA6oyONbjyF/+5sBgxY/dwkhLogbMT2GXXyU84/IhRw/2D1Os1B/giz+BQ==",
246         "dev": true,
247         "license": "MIT",
248         "dependencies": {
249           "@babel/code-frame": "^7.28.6",
250           "@babel/parser": "^7.28.6",
251           "@babel/types": "^7.28.6"
252         },
253         "engines": {
254           "node": ">=6.9.0"
255         }
256       },
257       "node_modules/@babel/traverse": {
258         "version": "7.29.0",
259         "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.0.tgz",
260         "integrity": "sha512-4HPiQr0X7+waHfyXPZpWPfWL/J7dcN1mx9gL6WdQVMbPnF3+ZhSMs8tCxN7oHddJE9fhNE7+lxdnlyemKfJRuA==",
261         "dev": true,
262         "license": "MIT",
263         "dependencies": {
264           "@babel/code-frame": "^7.29.0",
265           "@babel/generator": "^7.29.0",
266           "@babel/helper-globals": "^7.28.0",
267           "@babel/parser": "^7.29.0",
268           "@babel/template": "^7.28.6",
269           "@babel/types": "^7.29.0",
270           "debug": "^4.3.1"
271         },
272         "engines": {
273           "node": ">=6.9.0"
274         }
275       },
276       "node_modules/@babel/types": {
277         "version": "7.29.0",
278         "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.0.tgz",
279         "integrity": "sha512-LwdZHpScM4Qz8Xw2iKSzS+cfglZzJGvofQICy7W7v4caru4EaAmyUuO6BGrbyQ2mYV11W0U8j5mBhd14dd3B0A==",
280         "dev": true,
281         "license": "MIT",
282         "dependencies": {
283           "@babel/helper-string-parser": "^7.27.1",
284           "@babel/helper-validator-identifier": "^7.28.5"
285         },
286         "engines": {
287           "node": ">=6.9.0"
288         }
289       },
```
**[REMOVED]**
```
(from line ~291)
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/@emnapi/core/-/core-1.10.0.tgz",
      "integrity": "sha512-yq6OkJ4p82CAfPl0u9mQebQHKPJkY7WrIuk205cTYnYe+k2Z8YBh11FrbRG/H6ihirqcacOgl2BIO8oyMQLeXw==",

```
**[ADDED]**
```
291         "version": "1.8.1",
292         "resolved": "https://registry.npmjs.org/@emnapi/core/-/core-1.8.1.tgz",
293         "integrity": "sha512-AvT9QFpxK0Zd8J0jopedNm+w/2fIzvtPKPjqyw9jwvBaReTTqPBk9Hixaz7KbjimP+QNz605/XnjFcDAL2pqBg==",
```
**[REMOVED]**
```
(from line ~297)
      "peer": true,

```
**[REMOVED]**
```
(from line ~298)
        "@emnapi/wasi-threads": "1.2.1",

```
**[ADDED]**
```
298           "@emnapi/wasi-threads": "1.1.0",
```
**[REMOVED]**
```
(from line ~303)
      "version": "1.10.0",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.10.0.tgz",
      "integrity": "sha512-ewvYlk86xUoGI0zQRNq/mC+16R1QeDlKQy21Ki3oSYXNgLb45GV1P6A0M+/s6nyCuNDqe5VpaY84BzXGwVbwFA==",
      "dev": true,

```
**[ADDED]**
```
303         "version": "1.8.1",
304         "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.8.1.tgz",
305         "integrity": "sha512-mehfKSMWjjNol8659Z8KxEMrdSJDDot5SXMq00dM8BN4o+CLNXQ0xH2V7EchNHV4RmbZLmmPdEaXZc5H2FXmDg==",
```
**[REMOVED]**
```
(from line ~308)
      "peer": true,

```
**[REMOVED]**
```
(from line ~313)
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@emnapi/wasi-threads/-/wasi-threads-1.2.1.tgz",
      "integrity": "sha512-uTII7OYF+/Mes/MrcIOYp5yOtSMLBWSIoLPpcgwipoiKbli6k322tcoFsxoIIxPDqW01SQGAgko4EzZi2BNv2w==",

```
**[ADDED]**
```
313         "version": "1.1.0",
314         "resolved": "https://registry.npmjs.org/@emnapi/wasi-threads/-/wasi-threads-1.1.0.tgz",
315         "integrity": "sha512-WI0DdZ8xFSbgMjR1sFsKABJ/C5OnRrjT06JXbZKexJGrDuPTzZdDYfFlsgcCXCyf+suG5QU2e/y1Wo2V/OapLQ==",
```
**[ADDED]**
```
342       "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
343         "version": "3.4.3",
344         "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
345         "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
346         "dev": true,
347         "license": "Apache-2.0",
348         "engines": {
349           "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
350         },
351         "funding": {
352           "url": "https://opencollective.com/eslint"
353         }
354       },
```
**[ADDED]**
```
365       "node_modules/@eslint/config-array": {
366         "version": "0.21.1",
367         "resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.21.1.tgz",
368         "integrity": "sha512-aw1gNayWpdI/jSYVgzN5pL0cfzU02GT3NBpeT/DXbx1/1x7ZKxFPd9bwrzygx/qiwIQiJ1sw/zD8qY/kRvlGHA==",
369         "dev": true,
370         "license": "Apache-2.0",
371         "dependencies": {
372           "@eslint/object-schema": "^2.1.7",
373           "debug": "^4.3.1",
374           "minimatch": "^3.1.2"
375         },
376         "engines": {
377           "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
378         }
379       },
380       "node_modules/@eslint/config-helpers": {
381         "version": "0.4.2",
382         "resolved": "https://registry.npmjs.org/@eslint/config-helpers/-/config-helpers-0.4.2.tgz",
383         "integrity": "sha512-gBrxN88gOIf3R7ja5K9slwNayVcZgK6SOUORm2uBzTeIEfeVaIhOpCtTox3P6R7o2jLFwLFTLnC7kU/RGcYEgw==",
384         "dev": true,
385         "license": "Apache-2.0",
386         "dependencies": {
387           "@eslint/core": "^0.17.0"
388         },
389         "engines": {
390           "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
391         }
392       },
393       "node_modules/@eslint/core": {
394         "version": "0.17.0",
395         "resolved": "https://registry.npmjs.org/@eslint/core/-/core-0.17.0.tgz",
396         "integrity": "sha512-yL/sLrpmtDaFEiUj1osRP4TI2MDz1AddJL+jZ7KSqvBuliN4xqYY54IfdN8qD8Toa6g1iloph1fxQNkjOxrrpQ==",
397         "dev": true,
398         "license": "Apache-2.0",
399         "dependencies": {
400           "@types/json-schema": "^7.0.15"
401         },
402         "engines": {
403           "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
404         }
405       },
```
**[REMOVED]**
```
(from line ~407)
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-2.1.4.tgz",
      "integrity": "sha512-269Z39MS6wVJtsoUl10L60WdkhJVdPG24Q4eZTH3nnF6lpvSShEK3wQjDX9JRWAUPvPh7COouPpU9IrqaZFvtQ==",

```
**[ADDED]**
```
407         "version": "3.3.4",
408         "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-3.3.4.tgz",
409         "integrity": "sha512-4h4MVF8pmBsncB60r0wSJiIeUKTSD4m7FmTFThG8RHlsg9ajqckLm9OraguFGZE4vVdpiI1Q4+hFnisopmG6gQ==",
```
**[REMOVED]**
```
(from line ~413)
        "ajv": "^6.12.4",

```
**[ADDED]**
```
413           "ajv": "^6.14.0",
```
**[REMOVED]**
```
(from line ~415)
        "espree": "^9.6.0",
        "globals": "^13.19.0",

```
**[ADDED]**
```
415           "espree": "^10.0.1",
416           "globals": "^14.0.0",
```
**[REMOVED]**
```
(from line ~419)
        "js-yaml": "^4.1.0",
        "minimatch": "^3.1.2",

```
**[ADDED]**
```
419           "js-yaml": "^4.1.1",
420           "minimatch": "^3.1.3",
```
**[REMOVED]**
```
(from line ~424)
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"

```
**[ADDED]**
```
424           "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
```
**[REMOVED]**
```
(from line ~431)
      "version": "8.57.1",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-8.57.1.tgz",
      "integrity": "sha512-d9zaMRSTIKDLhctzH12MtXvJKSSUhaHcjV+2Z+GK+EEY7XKpP5yR4x+N3TAcHTcu963nIr+TMcCb4DBCYX1z6Q==",

```
**[ADDED]**
```
431         "version": "9.39.3",
432         "resolved": "https://registry.npmjs.org/@eslint/js/-/js-9.39.3.tgz",
433         "integrity": "sha512-1B1VkCq6FuUNlQvlBYb+1jDu/gV297TIs/OeiaSR9l1H27SVW55ONE1e1Vp16NqP683+xEGzxYtv4XCiDPaQiw==",
```
**[REMOVED]**
```
(from line ~437)
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"

```
**[ADDED]**
```
437           "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
438         },
439         "funding": {
440           "url": "https://eslint.org/donate"
```
**[REMOVED]**
```
(from line ~443)
    "node_modules/@humanwhocodes/config-array": {
      "version": "0.13.0",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/config-array/-/config-array-0.13.0.tgz",
      "integrity": "sha512-DZLEEqFWQFiyK6h5YIeynKx7JlvCYWL0cImfSRXZ9l4Sg2efkFGTuFf6vzXjK1cq6IYkU+Eg/JizXw+TD2vRNw==",
      "deprecated": "Use @eslint/config-array instead",

```
**[ADDED]**
```
443       "node_modules/@eslint/object-schema": {
444         "version": "2.1.7",
445         "resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-2.1.7.tgz",
446         "integrity": "sha512-VtAOaymWVfZcmZbp6E2mympDIHvyjXs/12LqWYjVw6qjrfF+VK+fyG33kChz3nnK+SU5/NeHOqrTEHS8sXO3OA==",
```
**[ADDED]**
```
449         "engines": {
450           "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
451         }
452       },
453       "node_modules/@eslint/plugin-kit": {
454         "version": "0.4.1",
455         "resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.4.1.tgz",
456         "integrity": "sha512-43/qtrDUokr7LJqoF2c3+RInu/t4zfrpYdoSDfYyhg52rwLV6TnOvdG4fXm7IkSB3wErkcmJS9iEhjVtOSEjjA==",
457         "dev": true,
458         "license": "Apache-2.0",
```
**[REMOVED]**
```
(from line ~460)
        "@humanwhocodes/object-schema": "^2.0.3",
        "debug": "^4.3.1",
        "minimatch": "^3.0.5"

```
**[ADDED]**
```
460           "@eslint/core": "^0.17.0",
461           "levn": "^0.4.1"
```
**[REMOVED]**
```
(from line ~464)
        "node": ">=10.10.0"

```
**[ADDED]**
```
464           "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
```
**[ADDED]**
```
467       "node_modules/@humanfs/core": {
468         "version": "0.19.1",
469         "resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.1.tgz",
470         "integrity": "sha512-5DyQ4+1JEUzejeK1JGICcideyfUbGixgS9jNgex5nqkW+cY7WZhxBigmieN5Qnw9ZosSNVC9KQKyb+GUaGyKUA==",
471         "dev": true,
472         "license": "Apache-2.0",
473         "engines": {
474           "node": ">=18.18.0"
475         }
476       },
477       "node_modules/@humanfs/node": {
478         "version": "0.16.7",
479         "resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.7.tgz",
480         "integrity": "sha512-/zUx+yOsIrG4Y43Eh2peDeKCxlRt/gET6aHfaKpuq267qXdYDFViVHfMaLyygZOnl0kGWxFIgsBy8QFuTLUXEQ==",
481         "dev": true,
482         "license": "Apache-2.0",
483         "dependencies": {
484           "@humanfs/core": "^0.19.1",
485           "@humanwhocodes/retry": "^0.4.0"
486         },
487         "engines": {
488           "node": ">=18.18.0"
489         }
490       },
```
**[REMOVED]**
```
(from line ~505)
    "node_modules/@humanwhocodes/object-schema": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/object-schema/-/object-schema-2.0.3.tgz",
      "integrity": "sha512-93zYdMES/c1D69yZiKDBj0V24vqNzB/koF26KPaagAfd3P/4gUlh3Dys5ogAK+Exi9QyzlD8x/08Zt7wIKcDcA==",
      "deprecated": "Use @eslint/object-schema instead",

```
**[ADDED]**
```
505       "node_modules/@humanwhocodes/retry": {
506         "version": "0.4.3",
507         "resolved": "https://registry.npmjs.org/@humanwhocodes/retry/-/retry-0.4.3.tgz",
508         "integrity": "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==",
```
**[REMOVED]**
```
(from line ~510)
      "license": "BSD-3-Clause"

```
**[ADDED]**
```
510         "license": "Apache-2.0",
511         "engines": {
512           "node": ">=18.18"
513         },
514         "funding": {
515           "type": "github",
516           "url": "https://github.com/sponsors/nzakas"
517         }
```
**[REMOVED]**
```
(from line ~519)
    "node_modules/@isaacs/cliui": {
      "version": "8.0.2",
      "resolved": "https://registry.npmjs.org/@isaacs/cliui/-/cliui-8.0.2.tgz",
      "integrity": "sha512-O8jcjabXaleOG9DQ0+ARXWZBTfnP4WNAqzuiJK7ll44AmxGKv/J2M4TPjxjY3znBCfvBXFzucm1twdyFybFqEA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "string-width": "^5.1.2",
        "string-width-cjs": "npm:string-width@^4.2.0",
        "strip-ansi": "^7.0.1",
        "strip-ansi-cjs": "npm:strip-ansi@^6.0.1",
        "wrap-ansi": "^8.1.0",
        "wrap-ansi-cjs": "npm:wrap-ansi@^7.0.0"

```
**[ADDED]**
```
519       "node_modules/@img/colour": {
520         "version": "1.1.0",
521         "resolved": "https://registry.npmjs.org/@img/colour/-/colour-1.1.0.tgz",
522         "integrity": "sha512-Td76q7j57o/tLVdgS746cYARfSyxk8iEfRxewL9h4OMzYhbW4TAcppl0mT4eyqXddh6L/jwoM75mo7ixa/pCeQ==",
523         "license": "MIT",
524         "optional": true,
525         "engines": {
526           "node": ">=18"
527         }
528       },
529       "node_modules/@img/sharp-darwin-arm64": {
530         "version": "0.34.5",
531         "resolved": "https://registry.npmjs.org/@img/sharp-darwin-arm64/-/sharp-darwin-arm64-0.34.5.tgz",
532         "integrity": "sha512-imtQ3WMJXbMY4fxb/Ndp6HBTNVtWCUI0WdobyheGf5+ad6xX8VIDO8u2xE4qc/fr08CKG/7dDseFtn6M6g/r3w==",
533         "cpu": [
534           "arm64"
535         ],
536         "license": "Apache-2.0",
537         "optional": true,
538         "os": [
539           "darwin"
540         ],
541         "engines": {
542           "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
```
**[ADDED]**
```
544         "funding": {
545           "url": "https://opencollective.com/libvips"
546         },
547         "optionalDependencies": {
548           "@img/sharp-libvips-darwin-arm64": "1.2.4"
549         }
550       },
551       "node_modules/@img/sharp-darwin-x64": {
552         "version": "0.34.5",
553         "resolved": "https://registry.npmjs.org/@img/sharp-darwin-x64/-/sharp-darwin-x64-0.34.5.tgz",
554         "integrity": "sha512-YNEFAF/4KQ/PeW0N+r+aVVsoIY0/qxxikF2SWdp+NRkmMB7y9LBZAVqQ4yhGCm/H3H270OSykqmQMKLBhBJDEw==",
555         "cpu": [
556           "x64"
557         ],
558         "license": "Apache-2.0",
559         "optional": true,
560         "os": [
561           "darwin"
562         ],
```
**[REMOVED]**
```
(from line ~564)
        "node": ">=12"

```
**[ADDED]**
```
564           "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
565         },
566         "funding": {
567           "url": "https://opencollective.com/libvips"
568         },
569         "optionalDependencies": {
570           "@img/sharp-libvips-darwin-x64": "1.2.4"
```
**[REMOVED]**
```
(from line ~573)
    "node_modules/@isaacs/cliui/node_modules/ansi-regex": {
      "version": "6.2.2",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.2.2.tgz",
      "integrity": "sha512-Bq3SmSpyFHaWjPk8If9yc6svM8c56dB5BAtW4Qbw5jHTwwXXcTLoRMkpDJp6VL0XzlWaCHTXrkFURMYmD0sLqg==",
      "dev": true,
      "license": "MIT",

```
**[ADDED]**
```
573       "node_modules/@img/sharp-libvips-darwin-arm64": {
574         "version": "1.2.4",
575         "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-arm64/-/sharp-libvips-darwin-arm64-1.2.4.tgz",
576         "integrity": "sha512-zqjjo7RatFfFoP0MkQ51jfuFZBnVE2pRiaydKJ1G/rHZvnsrHAOcQALIi9sA5co5xenQdTugCvtb1cuf78Vf4g==",
577         "cpu": [
578           "arm64"
579         ],
580         "license": "LGPL-3.0-or-later",
581         "optional": true,
582         "os": [
583           "darwin"
584         ],
585         "funding": {
586           "url": "https://opencollective.com/libvips"
587         }
588       },
589       "node_modules/@img/sharp-libvips-darwin-x64": {
590         "version": "1.2.4",
591         "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-x64/-/sharp-libvips-darwin-x64-1.2.4.tgz",
592         "integrity": "sha512-1IOd5xfVhlGwX+zXv2N93k0yMONvUlANylbJw1eTah8K/Jtpi15KC+WSiaX/nBmbm2HxRM1gZ0nSdjSsrZbGKg==",
593         "cpu": [
594           "x64"
595         ],
596         "license": "LGPL-3.0-or-later",
597         "optional": true,
598         "os": [
599           "darwin"
600         ],
601         "funding": {
602           "url": "https://opencollective.com/libvips"
603         }
604       },
605       "node_modules/@img/sharp-libvips-linux-arm": {
606         "version": "1.2.4",
607         "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm/-/sharp-libvips-linux-arm-1.2.4.tgz",
608         "integrity": "sha512-bFI7xcKFELdiNCVov8e44Ia4u2byA+l3XtsAj+Q8tfCwO6BQ8iDojYdvoPMqsKDkuoOo+X6HZA0s0q11ANMQ8A==",
609         "cpu": [
610           "arm"
611         ],
612         "license": "LGPL-3.0-or-later",
613         "optional": true,
614         "os": [
615           "linux"
616         ],
617         "funding": {
618           "url": "https://opencollective.com/libvips"
619         }
620       },
621       "node_modules/@img/sharp-libvips-linux-arm64": {
622         "version": "1.2.4",
623         "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm64/-/sharp-libvips-linux-arm64-1.2.4.tgz",
624         "integrity": "sha512-excjX8DfsIcJ10x1Kzr4RcWe1edC9PquDRRPx3YVCvQv+U5p7Yin2s32ftzikXojb1PIFc/9Mt28/y+iRklkrw==",
625         "cpu": [
626           "arm64"
627         ],
628         "license": "LGPL-3.0-or-later",
629         "optional": true,
630         "os": [
631           "linux"
632         ],
633         "funding": {
634           "url": "https://opencollective.com/libvips"
635         }
636       },
637       "node_modules/@img/sharp-libvips-linux-ppc64": {
638         "version": "1.2.4",
639         "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-ppc64/-/sharp-libvips-linux-ppc64-1.2.4.tgz",
640         "integrity": "sha512-FMuvGijLDYG6lW+b/UvyilUWu5Ayu+3r2d1S8notiGCIyYU/76eig1UfMmkZ7vwgOrzKzlQbFSuQfgm7GYUPpA==",
641         "cpu": [
642           "ppc64"
643         ],
644         "license": "LGPL-3.0-or-later",
645         "optional": true,
646         "os": [
647           "linux"
648         ],
649         "funding": {
650           "url": "https://opencollective.com/libvips"
651         }
652       },
653       "node_modules/@img/sharp-libvips-linux-riscv64": {
654         "version": "1.2.4",
655         "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-riscv64/-/sharp-libvips-linux-riscv64-1.2.4.tgz",
656         "integrity": "sha512-oVDbcR4zUC0ce82teubSm+x6ETixtKZBh/qbREIOcI3cULzDyb18Sr/Wcyx7NRQeQzOiHTNbZFF1UwPS2scyGA==",
657         "cpu": [
658           "riscv64"
659         ],
660         "license": "LGPL-3.0-or-later",
661         "optional": true,
662         "os": [
663           "linux"
664         ],
665         "funding": {
666           "url": "https://opencollective.com/libvips"
667         }
668       },
669       "node_modules/@img/sharp-libvips-linux-s390x": {
670         "version": "1.2.4",
671         "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-s390x/-/sharp-libvips-linux-s390x-1.2.4.tgz",
672         "integrity": "sha512-qmp9VrzgPgMoGZyPvrQHqk02uyjA0/QrTO26Tqk6l4ZV0MPWIW6LTkqOIov+J1yEu7MbFQaDpwdwJKhbJvuRxQ==",
673         "cpu": [
674           "s390x"
675         ],
676         "license": "LGPL-3.0-or-later",
677         "optional": true,
678         "os": [
679           "linux"
680         ],
681         "funding": {
682           "url": "https://opencollective.com/libvips"
683         }
684       },
685       "node_modules/@img/sharp-libvips-linux-x64": {
686         "version": "1.2.4",
687         "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-x64/-/sharp-libvips-linux-x64-1.2.4.tgz",
688         "integrity": "sha512-tJxiiLsmHc9Ax1bz3oaOYBURTXGIRDODBqhveVHonrHJ9/+k89qbLl0bcJns+e4t4rvaNBxaEZsFtSfAdquPrw==",
689         "cpu": [
690           "x64"
691         ],
692         "license": "LGPL-3.0-or-later",
693         "optional": true,
694         "os": [
695           "linux"
696         ],
697         "funding": {
698           "url": "https://opencollective.com/libvips"
699         }
700       },
701       "node_modules/@img/sharp-libvips-linuxmusl-arm64": {
702         "version": "1.2.4",
703         "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-arm64/-/sharp-libvips-linuxmusl-arm64-1.2.4.tgz",
704         "integrity": "sha512-FVQHuwx1IIuNow9QAbYUzJ+En8KcVm9Lk5+uGUQJHaZmMECZmOlix9HnH7n1TRkXMS0pGxIJokIVB9SuqZGGXw==",
705         "cpu": [
706           "arm64"
707         ],
708         "license": "LGPL-3.0-or-later",
709         "optional": true,
710         "os": [
711           "linux"
712         ],
713         "funding": {
714           "url": "https://opencollective.com/libvips"
715         }
716       },
717       "node_modules/@img/sharp-libvips-linuxmusl-x64": {
718         "version": "1.2.4",
719         "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-x64/-/sharp-libvips-linuxmusl-x64-1.2.4.tgz",
720         "integrity": "sha512-+LpyBk7L44ZIXwz/VYfglaX/okxezESc6UxDSoyo2Ks6Jxc4Y7sGjpgU9s4PMgqgjj1gZCylTieNamqA1MF7Dg==",
721         "cpu": [
722           "x64"
723         ],
724         "license": "LGPL-3.0-or-later",
725         "optional": true,
726         "os": [
727           "linux"
728         ],
729         "funding": {
730           "url": "https://opencollective.com/libvips"
731         }
732       },
733       "node_modules/@img/sharp-linux-arm": {
734         "version": "0.34.5",
735         "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm/-/sharp-linux-arm-0.34.5.tgz",
736         "integrity": "sha512-9dLqsvwtg1uuXBGZKsxem9595+ujv0sJ6Vi8wcTANSFpwV/GONat5eCkzQo/1O6zRIkh0m/8+5BjrRr7jDUSZw==",
737         "cpu": [
738           "arm"
739         ],
740         "license": "Apache-2.0",
741         "optional": true,
742         "os": [
743           "linux"
744         ],
```
**[REMOVED]**
```
(from line ~746)
        "node": ">=12"

```
**[ADDED]**
```
746           "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
```
**[REMOVED]**
```
(from line ~749)
        "url": "https://github.com/chalk/ansi-regex?sponsor=1"

```
**[ADDED]**
```
749           "url": "https://opencollective.com/libvips"
750         },
751         "optionalDependencies": {
752           "@img/sharp-libvips-linux-arm": "1.2.4"
```
**[REMOVED]**
```
(from line ~755)
    "node_modules/@isaacs/cliui/node_modules/strip-ansi": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.2.0.tgz",
      "integrity": "sha512-yDPMNjp4WyfYBkHnjIRLfca1i6KMyGCtsVgoKe/z1+6vukgaENdgGBZt+ZmKPc4gavvEZ5OgHfHdrazhgNyG7w==",
      "dev": true,
      "license": "MIT",

```
**[ADDED]**
```
755       "node_modules/@img/sharp-linux-arm64": {
756         "version": "0.34.5",
757         "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm64/-/sharp-linux-arm64-0.34.5.tgz",
758         "integrity": "sha512-bKQzaJRY/bkPOXyKx5EVup7qkaojECG6NLYswgktOZjaXecSAeCWiZwwiFf3/Y+O1HrauiE3FVsGxFg8c24rZg==",
759         "cpu": [
760           "arm64"
761         ],
762         "license": "Apache-2.0",
763         "optional": true,
764         "os": [
765           "linux"
766         ],
767         "engines": {
768           "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
769         },
770         "funding": {
771           "url": "https://opencollective.com/libvips"
772         },
773         "optionalDependencies": {
774           "@img/sharp-libvips-linux-arm64": "1.2.4"
775         }
776       },
777       "node_modules/@img/sharp-linux-ppc64": {
778         "version": "0.34.5",
779         "resolved": "https://registry.npmjs.org/@img/sharp-linux-ppc64/-/sharp-linux-ppc64-0.34.5.tgz",
780         "integrity": "sha512-7zznwNaqW6YtsfrGGDA6BRkISKAAE1Jo0QdpNYXNMHu2+0dTrPflTLNkpc8l7MUP5M16ZJcUvysVWWrMefZquA==",
781         "cpu": [
782           "ppc64"
783         ],
784         "license": "Apache-2.0",
785         "optional": true,
786         "os": [
787           "linux"
788         ],
789         "engines": {
790           "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
791         },
792         "funding": {
793           "url": "https://opencollective.com/libvips"
794         },
795         "optionalDependencies": {
796           "@img/sharp-libvips-linux-ppc64": "1.2.4"
797         }
798       },
799       "node_modules/@img/sharp-linux-riscv64": {
800         "version": "0.34.5",
801         "resolved": "https://registry.npmjs.org/@img/sharp-linux-riscv64/-/sharp-linux-riscv64-0.34.5.tgz",
802         "integrity": "sha512-51gJuLPTKa7piYPaVs8GmByo7/U7/7TZOq+cnXJIHZKavIRHAP77e3N2HEl3dgiqdD/w0yUfiJnII77PuDDFdw==",
803         "cpu": [
804           "riscv64"
805         ],
806         "license": "Apache-2.0",
807         "optional": true,
808         "os": [
809           "linux"
810         ],
811         "engines": {
812           "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
813         },
814         "funding": {
815           "url": "https://opencollective.com/libvips"
816         },
817         "optionalDependencies": {
818           "@img/sharp-libvips-linux-riscv64": "1.2.4"
819         }
820       },
821       "node_modules/@img/sharp-linux-s390x": {
822         "version": "0.34.5",
823         "resolved": "https://registry.npmjs.org/@img/sharp-linux-s390x/-/sharp-linux-s390x-0.34.5.tgz",
824         "integrity": "sha512-nQtCk0PdKfho3eC5MrbQoigJ2gd1CgddUMkabUj+rBevs8tZ2cULOx46E7oyX+04WGfABgIwmMC0VqieTiR4jg==",
825         "cpu": [
826           "s390x"
827         ],
828         "license": "Apache-2.0",
829         "optional": true,
830         "os": [
831           "linux"
832         ],
833         "engines": {
834           "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
835         },
836         "funding": {
837           "url": "https://opencollective.com/libvips"
838         },
839         "optionalDependencies": {
840           "@img/sharp-libvips-linux-s390x": "1.2.4"
841         }
842       },
843       "node_modules/@img/sharp-linux-x64": {
844         "version": "0.34.5",
845         "resolved": "https://registry.npmjs.org/@img/sharp-linux-x64/-/sharp-linux-x64-0.34.5.tgz",
846         "integrity": "sha512-MEzd8HPKxVxVenwAa+JRPwEC7QFjoPWuS5NZnBt6B3pu7EG2Ge0id1oLHZpPJdn3OQK+BQDiw9zStiHBTJQQQQ==",
847         "cpu": [
848           "x64"
849         ],
850         "license": "Apache-2.0",
851         "optional": true,
852         "os": [
853           "linux"
854         ],
855         "engines": {
856           "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
857         },
858         "funding": {
859           "url": "https://opencollective.com/libvips"
860         },
861         "optionalDependencies": {
862           "@img/sharp-libvips-linux-x64": "1.2.4"
863         }
864       },
865       "node_modules/@img/sharp-linuxmusl-arm64": {
866         "version": "0.34.5",
867         "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-arm64/-/sharp-linuxmusl-arm64-0.34.5.tgz",
868         "integrity": "sha512-fprJR6GtRsMt6Kyfq44IsChVZeGN97gTD331weR1ex1c1rypDEABN6Tm2xa1wE6lYb5DdEnk03NZPqA7Id21yg==",
869         "cpu": [
870           "arm64"
871         ],
872         "license": "Apache-2.0",
873         "optional": true,
874         "os": [
875           "linux"
876         ],
877         "engines": {
878           "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
879         },
880         "funding": {
881           "url": "https://opencollective.com/libvips"
882         },
883         "optionalDependencies": {
884           "@img/sharp-libvips-linuxmusl-arm64": "1.2.4"
885         }
886       },
887       "node_modules/@img/sharp-linuxmusl-x64": {
888         "version": "0.34.5",
889         "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-x64/-/sharp-linuxmusl-x64-0.34.5.tgz",
890         "integrity": "sha512-Jg8wNT1MUzIvhBFxViqrEhWDGzqymo3sV7z7ZsaWbZNDLXRJZoRGrjulp60YYtV4wfY8VIKcWidjojlLcWrd8Q==",
891         "cpu": [
892           "x64"
893         ],
894         "license": "Apache-2.0",
895         "optional": true,
896         "os": [
897           "linux"
898         ],
899         "engines": {
900           "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
901         },
902         "funding": {
903           "url": "https://opencollective.com/libvips"
904         },
905         "optionalDependencies": {
906           "@img/sharp-libvips-linuxmusl-x64": "1.2.4"
907         }
908       },
909       "node_modules/@img/sharp-wasm32": {
910         "version": "0.34.5",
911         "resolved": "https://registry.npmjs.org/@img/sharp-wasm32/-/sharp-wasm32-0.34.5.tgz",
912         "integrity": "sha512-OdWTEiVkY2PHwqkbBI8frFxQQFekHaSSkUIJkwzclWZe64O1X4UlUjqqqLaPbUpMOQk6FBu/HtlGXNblIs0huw==",
913         "cpu": [
914           "wasm32"
915         ],
916         "license": "Apache-2.0 AND LGPL-3.0-or-later AND MIT",
917         "optional": true,
```
**[REMOVED]**
```
(from line ~919)
        "ansi-regex": "^6.2.2"

```
**[ADDED]**
```
919           "@emnapi/runtime": "^1.7.0"
```
**[REMOVED]**
```
(from line ~922)
        "node": ">=12"

```
**[ADDED]**
```
922           "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
```
**[REMOVED]**
```
(from line ~925)
        "url": "https://github.com/chalk/strip-ansi?sponsor=1"

```
**[ADDED]**
```
925           "url": "https://opencollective.com/libvips"
```
**[ADDED]**
```
928       "node_modules/@img/sharp-win32-arm64": {
929         "version": "0.34.5",
930         "resolved": "https://registry.npmjs.org/@img/sharp-win32-arm64/-/sharp-win32-arm64-0.34.5.tgz",
931         "integrity": "sha512-WQ3AgWCWYSb2yt+IG8mnC6Jdk9Whs7O0gxphblsLvdhSpSTtmu69ZG1Gkb6NuvxsNACwiPV6cNSZNzt0KPsw7g==",
932         "cpu": [
933           "arm64"
934         ],
935         "license": "Apache-2.0 AND LGPL-3.0-or-later",
936         "optional": true,
937         "os": [
938           "win32"
939         ],
940         "engines": {
941           "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
942         },
943         "funding": {
944           "url": "https://opencollective.com/libvips"
945         }
946       },
947       "node_modules/@img/sharp-win32-ia32": {
948         "version": "0.34.5",
949         "resolved": "https://registry.npmjs.org/@img/sharp-win32-ia32/-/sharp-win32-ia32-0.34.5.tgz",
950         "integrity": "sha512-FV9m/7NmeCmSHDD5j4+4pNI8Cp3aW+JvLoXcTUo0IqyjSfAZJ8dIUmijx1qaJsIiU+Hosw6xM5KijAWRJCSgNg==",
951         "cpu": [
952           "ia32"
953         ],
954         "license": "Apache-2.0 AND LGPL-3.0-or-later",
955         "optional": true,
956         "os": [
957           "win32"
958         ],
959         "engines": {
960           "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
961         },
962         "funding": {
963           "url": "https://opencollective.com/libvips"
964         }
965       },
966       "node_modules/@img/sharp-win32-x64": {
967         "version": "0.34.5",
968         "resolved": "https://registry.npmjs.org/@img/sharp-win32-x64/-/sharp-win32-x64-0.34.5.tgz",
969         "integrity": "sha512-+29YMsqY2/9eFEiW93eqWnuLcWcufowXewwSNIT6UwZdUUCrM3oFjMWH/Z6/TMmb4hlFenmfAVbpWeup2jryCw==",
970         "cpu": [
971           "x64"
972         ],
973         "license": "Apache-2.0 AND LGPL-3.0-or-later",
974         "optional": true,
975         "os": [
976           "win32"
977         ],
978         "engines": {
979           "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
980         },
981         "funding": {
982           "url": "https://opencollective.com/libvips"
983         }
984       },
```
**[ADDED]**
```
996       "node_modules/@jridgewell/remapping": {
997         "version": "2.3.5",
998         "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
999         "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
1000        "dev": true,
1001        "license": "MIT",
1002        "dependencies": {
1003          "@jridgewell/gen-mapping": "^0.3.5",
1004          "@jridgewell/trace-mapping": "^0.3.24"
1005        }
1006      },
```
**[REMOVED]**
```
(from line ~1036)
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/@napi-rs/wasm-runtime/-/wasm-runtime-1.1.4.tgz",
      "integrity": "sha512-3NQNNgA1YSlJb/kMH1ildASP9HW7/7kYnRI2szWJaofaS1hWmbGI4H+d3+22aGzXXN9IJ+n+GiFVcGipJP18ow==",

```
**[ADDED]**
```
1036        "version": "0.2.12",
1037        "resolved": "https://registry.npmjs.org/@napi-rs/wasm-runtime/-/wasm-runtime-0.2.12.tgz",
1038        "integrity": "sha512-ZVWUcfwY4E/yPitQJl481FjFo3K22D6qF0DuFH6Y/nbnE11GY5uguDxZMGXPQ8WQ0128MXQD7TnfHyK4oWoIJQ==",
```
**[REMOVED]**
```
(from line ~1043)
        "@tybys/wasm-util": "^0.10.1"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/Brooooooklyn"
      },
      "peerDependencies": {
        "@emnapi/core": "^1.7.1",
        "@emnapi/runtime": "^1.7.1"

```
**[ADDED]**
```
1043          "@emnapi/core": "^1.4.3",
1044          "@emnapi/runtime": "^1.4.3",
1045          "@tybys/wasm-util": "^0.10.0"
```
**[REMOVED]**
```
(from line ~1049)
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/env/-/env-14.2.5.tgz",
      "integrity": "sha512-/zZGkrTOsraVfYjGP8uM0p6r0BDT6xWpkjdVbcz66PJVSpwXX3yNiRycxAuDfBKGWBrZBXRuK/YVlkNgxHGwmA==",

```
**[ADDED]**
```
1049        "version": "16.1.6",
1050        "resolved": "https://registry.npmjs.org/@next/env/-/env-16.1.6.tgz",
1051        "integrity": "sha512-N1ySLuZjnAtN3kFnwhAwPvZah8RJxKasD7x1f8shFqhncnWZn4JMfg37diLNuoHsLAlrDfM3g4mawVdtAG8XLQ==",
```
**[REMOVED]**
```
(from line ~1055)
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/eslint-plugin-next/-/eslint-plugin-next-14.2.5.tgz",
      "integrity": "sha512-LY3btOpPh+OTIpviNojDpUdIbHW9j0JBYBjsIp8IxtDFfYFyORvw3yNq6N231FVqQA7n7lwaf7xHbVJlA1ED7g==",

```
**[ADDED]**
```
1055        "version": "16.1.6",
1056        "resolved": "https://registry.npmjs.org/@next/eslint-plugin-next/-/eslint-plugin-next-16.1.6.tgz",
1057        "integrity": "sha512-/Qq3PTagA6+nYVfryAtQ7/9FEr/6YVyvOtl6rZnGsbReGLf0jZU6gkpr1FuChAQpvV46a78p4cmHOVP8mbfSMQ==",
```
**[REMOVED]**
```
(from line ~1061)
        "glob": "10.3.10"

```
**[ADDED]**
```
1061          "fast-glob": "3.3.1"
```
**[REMOVED]**
```
(from line ~1065)
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-arm64/-/swc-darwin-arm64-14.2.5.tgz",
      "integrity": "sha512-/9zVxJ+K9lrzSGli1///ujyRfon/ZneeZ+v4ptpiPoOU+GKZnm8Wj8ELWU1Pm7GHltYRBklmXMTUqM/DqQ99FQ==",

```
**[ADDED]**
```
1065        "version": "16.1.6",
1066        "resolved": "https://registry.npmjs.org/@next/swc-darwin-arm64/-/swc-darwin-arm64-16.1.6.tgz",
1067        "integrity": "sha512-wTzYulosJr/6nFnqGW7FrG3jfUUlEf8UjGA0/pyypJl42ExdVgC6xJgcXQ+V8QFn6niSG2Pb8+MIG1mZr2vczw==",
```
**[REMOVED]**
```
(from line ~1081)
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-x64/-/swc-darwin-x64-14.2.5.tgz",
      "integrity": "sha512-vXHOPCwfDe9qLDuq7U1OYM2wUY+KQ4Ex6ozwsKxp26BlJ6XXbHleOUldenM67JRyBfVjv371oneEvYd3H2gNSA==",

```
**[ADDED]**
```
1081        "version": "16.1.6",
1082        "resolved": "https://registry.npmjs.org/@next/swc-darwin-x64/-/swc-darwin-x64-16.1.6.tgz",
1083        "integrity": "sha512-BLFPYPDO+MNJsiDWbeVzqvYd4NyuRrEYVB5k2N3JfWncuHAy2IVwMAOlVQDFjj+krkWzhY2apvmekMkfQR0CUQ==",
```
**[REMOVED]**
```
(from line ~1097)
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-gnu/-/swc-linux-arm64-gnu-14.2.5.tgz",
      "integrity": "sha512-vlhB8wI+lj8q1ExFW8lbWutA4M2ZazQNvMWuEDqZcuJJc78iUnLdPPunBPX8rC4IgT6lIx/adB+Cwrl99MzNaA==",

```
**[ADDED]**
```
1097        "version": "16.1.6",
1098        "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-gnu/-/swc-linux-arm64-gnu-16.1.6.tgz",
1099        "integrity": "sha512-OJYkCd5pj/QloBvoEcJ2XiMnlJkRv9idWA/j0ugSuA34gMT6f5b7vOiCQHVRpvStoZUknhl6/UxOXL4OwtdaBw==",
```
**[REMOVED]**
```
(from line ~1113)
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-musl/-/swc-linux-arm64-musl-14.2.5.tgz",
      "integrity": "sha512-NpDB9NUR2t0hXzJJwQSGu1IAOYybsfeB+LxpGsXrRIb7QOrYmidJz3shzY8cM6+rO4Aojuef0N/PEaX18pi9OA==",

```
**[ADDED]**
```
1113        "version": "16.1.6",
1114        "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-musl/-/swc-linux-arm64-musl-16.1.6.tgz",
1115        "integrity": "sha512-S4J2v+8tT3NIO9u2q+S0G5KdvNDjXfAv06OhfOzNDaBn5rw84DGXWndOEB7d5/x852A20sW1M56vhC/tRVbccQ==",
```
**[REMOVED]**
```
(from line ~1129)
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-gnu/-/swc-linux-x64-gnu-14.2.5.tgz",
      "integrity": "sha512-8XFikMSxWleYNryWIjiCX+gU201YS+erTUidKdyOVYi5qUQo/gRxv/3N1oZFCgqpesN6FPeqGM72Zve+nReVXQ==",

```
**[ADDED]**
```
1129        "version": "16.1.6",
1130        "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-gnu/-/swc-linux-x64-gnu-16.1.6.tgz",
1131        "integrity": "sha512-2eEBDkFlMMNQnkTyPBhQOAyn2qMxyG2eE7GPH2WIDGEpEILcBPI/jdSv4t6xupSP+ot/jkfrCShLAa7+ZUPcJQ==",
```
**[REMOVED]**
```
(from line ~1145)
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-musl/-/swc-linux-x64-musl-14.2.5.tgz",
      "integrity": "sha512-6QLwi7RaYiQDcRDSU/os40r5o06b5ue7Jsk5JgdRBGGp8l37RZEh9JsLSM8QF0YDsgcosSeHjglgqi25+m04IQ==",

```
**[ADDED]**
```
1145        "version": "16.1.6",
1146        "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-musl/-/swc-linux-x64-musl-16.1.6.tgz",
1147        "integrity": "sha512-oicJwRlyOoZXVlxmIMaTq7f8pN9QNbdes0q2FXfRsPhfCi8n8JmOZJm5oo1pwDaFbnnD421rVU409M3evFbIqg==",
```
**[REMOVED]**
```
(from line ~1161)
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-arm64-msvc/-/swc-win32-arm64-msvc-14.2.5.tgz",
      "integrity": "sha512-1GpG2VhbspO+aYoMOQPQiqc/tG3LzmsdBH0LhnDS3JrtDx2QmzXe0B6mSZZiN3Bq7IOMXxv1nlsjzoS1+9mzZw==",

```
**[ADDED]**
```
1161        "version": "16.1.6",
1162        "resolved": "https://registry.npmjs.org/@next/swc-win32-arm64-msvc/-/swc-win32-arm64-msvc-16.1.6.tgz",
1163        "integrity": "sha512-gQmm8izDTPgs+DCWH22kcDmuUp7NyiJgEl18bcr8irXA5N2m2O+JQIr6f3ct42GOs9c0h8QF3L5SzIxcYAAXXw==",
```
**[REMOVED]**
```
(from line ~1176)
    "node_modules/@next/swc-win32-ia32-msvc": {
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-ia32-msvc/-/swc-win32-ia32-msvc-14.2.5.tgz",
      "integrity": "sha512-Igh9ZlxwvCDsu6438FXlQTHlRno4gFpJzqPjSIBZooD22tKeI4fE/YMRoHVJHmrQ2P5YL1DoZ0qaOKkbeFWeMg==",
      "cpu": [
        "ia32"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },

```
**[REMOVED]**
```
(from line ~1177)
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-x64-msvc/-/swc-win32-x64-msvc-14.2.5.tgz",
      "integrity": "sha512-tEQ7oinq1/CjSG9uSTerca3v4AZ+dFa+4Yu6ihaG8Ud8ddqLQgFGcnwYls13H5X5CPDPZJdYxyeMui6muOLd4g==",

```
**[ADDED]**
```
1177        "version": "16.1.6",
1178        "resolved": "https://registry.npmjs.org/@next/swc-win32-x64-msvc/-/swc-win32-x64-msvc-16.1.6.tgz",
1179        "integrity": "sha512-NRfO39AIrzBnixKbjuo2YiYhB6o9d8v/ymU9m/Xk8cyVk+k7XylniXkHwjs4s70wedVffc6bQNbufk5v0xEm0A==",
```
**[REMOVED]**
```
(from line ~1240)
    "node_modules/@pkgjs/parseargs": {
      "version": "0.11.0",
      "resolved": "https://registry.npmjs.org/@pkgjs/parseargs/-/parseargs-0.11.0.tgz",
      "integrity": "sha512-+1VkjdD0QBLPodGrJUeqarH8VAIvQODIbwh9XpP5Syisf7YoQgsJKPNFoqqLQlu+VQ/tVSshMR6loPMn8U+dPg==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=14"
      }
    },

```
**[REMOVED]**
```
(from line ~1247)
    "node_modules/@rushstack/eslint-patch": {
      "version": "1.16.1",
      "resolved": "https://registry.npmjs.org/@rushstack/eslint-patch/-/eslint-patch-1.16.1.tgz",
      "integrity": "sha512-TvZbIpeKqGQQ7X0zSCvPH9riMSFQFSggnfBjFZ1mEoILW+UuXCKwOoPcgjMwiUtRqFZ8jWhPJc4um14vC6I4ag==",
      "dev": true,
      "license": "MIT"
    },

```
**[REMOVED]**
```
(from line ~1248)
      "version": "2.106.2",
      "resolved": "https://registry.npmjs.org/@supabase/auth-js/-/auth-js-2.106.2.tgz",
      "integrity": "sha512-VcAjUErkHkhC5Jaf+g/G1qbkQrFh8edaCdHa7pxJmHUjkWKjT7UnYCtPA89XV0N0GIYRkEqJZw5V62CtOxTmBQ==",

```
**[ADDED]**
```
1248        "version": "2.98.0",
1249        "resolved": "https://registry.npmjs.org/@supabase/auth-js/-/auth-js-2.98.0.tgz",
1250        "integrity": "sha512-GBH361T0peHU91AQNzOlIrjUZw9TZbB9YDRiyFgk/3Kvr3/Z1NWUZ2athWTfHhwNNi8IrW00foyFxQD9IO/Trg==",
```
**[REMOVED]**
```
(from line ~1260)
      "version": "2.106.2",
      "resolved": "https://registry.npmjs.org/@supabase/functions-js/-/functions-js-2.106.2.tgz",
      "integrity": "sha512-oRnr0QrL8H+zTO1YyQ1QjiHZU/957jvubbxSJTUm2XLAgzoGGV9Tahfyd+uvLsBLRVmXLtpU3oyCjdQIvkGMOA==",

```
**[ADDED]**
```
1260        "version": "2.98.0",
1261        "resolved": "https://registry.npmjs.org/@supabase/functions-js/-/functions-js-2.98.0.tgz",
1262        "integrity": "sha512-N/xEyiNU5Org+d+PNCpv+TWniAXRzxIURxDYsS/m2I/sfAB/HcM9aM2Dmf5edj5oWb9GxID1OBaZ8NMmPXL+Lg==",
```
**[REMOVED]**
```
(from line ~1271)
    "node_modules/@supabase/phoenix": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/@supabase/phoenix/-/phoenix-0.4.2.tgz",
      "integrity": "sha512-YSAGnmDAfuleFCVt3CeurQZAhxRfXWeZIIkwp7NhYzQ1UwW6ePSnzsFAiUm/mbCkfoCf70QQHKW/K6RKh52a4A==",
      "license": "MIT"
    },

```
**[REMOVED]**
```
(from line ~1272)
      "version": "2.106.2",
      "resolved": "https://registry.npmjs.org/@supabase/postgrest-js/-/postgrest-js-2.106.2.tgz",
      "integrity": "sha512-tDOzyPgp9pIRMR2x6C9+uDSJrnXSzxLtt3d7nC+Lrsy3jnJDHYfdQC/xcRyhJE/TOBJ0heSqRKR3UmejDjZxsw==",

```
**[ADDED]**
```
1272        "version": "2.98.0",
1273        "resolved": "https://registry.npmjs.org/@supabase/postgrest-js/-/postgrest-js-2.98.0.tgz",
1274        "integrity": "sha512-v6e9WeZuJijzUut8HyXu6gMqWFepIbaeaMIm1uKzei4yLg9bC9OtEW9O14LE/9ezqNbSAnSLO5GtOLFdm7Bpkg==",
```
**[REMOVED]**
```
(from line ~1284)
      "version": "2.106.2",
      "resolved": "https://registry.npmjs.org/@supabase/realtime-js/-/realtime-js-2.106.2.tgz",
      "integrity": "sha512-LdRGT7DNhyZkPjubUv5bSdAZ0jSEX8wTHvx7htj7+K59TOZRvz4TuQK7tL2RWxyIZVeFMRluL04SzWS61rKnUA==",

```
**[ADDED]**
```
1284        "version": "2.98.0",
1285        "resolved": "https://registry.npmjs.org/@supabase/realtime-js/-/realtime-js-2.98.0.tgz",
1286        "integrity": "sha512-rOWt28uGyFipWOSd+n0WVMr9kUXiWaa7J4hvyLCIHjRFqWm1z9CaaKAoYyfYMC1Exn3WT8WePCgiVhlAtWC2yw==",
```
**[REMOVED]**
```
(from line ~1289)
        "@supabase/phoenix": "^0.4.2",
        "tslib": "2.8.1"

```
**[ADDED]**
```
1289          "@types/phoenix": "^1.6.6",
1290          "@types/ws": "^8.18.1",
1291          "tslib": "2.8.1",
1292          "ws": "^8.18.2"
```
**[REMOVED]**
```
(from line ~1299)
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/@supabase/ssr/-/ssr-0.5.2.tgz",
      "integrity": "sha512-n3plRhr2Bs8Xun1o4S3k1CDv17iH5QY9YcoEvXX3bxV1/5XSasA0mNXYycFmADIdtdE6BG9MRjP5CGIs8qxC8A==",

```
**[ADDED]**
```
1299        "version": "0.9.0",
1300        "resolved": "https://registry.npmjs.org/@supabase/ssr/-/ssr-0.9.0.tgz",
1301        "integrity": "sha512-UFY6otYV3yqCgV+AyHj80vNkTvbf1Gas2LW4dpbQ4ap6p6v3eB2oaDfcI99jsuJzwVBCFU4BJI+oDYyhNk1z0Q==",
```
**[REMOVED]**
```
(from line ~1304)
        "@types/cookie": "^0.6.0",
        "cookie": "^0.7.0"

```
**[ADDED]**
```
1304          "cookie": "^1.0.2"
```
**[REMOVED]**
```
(from line ~1307)
        "@supabase/supabase-js": "^2.43.4"

```
**[ADDED]**
```
1307          "@supabase/supabase-js": "^2.97.0"
```
**[REMOVED]**
```
(from line ~1311)
      "version": "2.106.2",
      "resolved": "https://registry.npmjs.org/@supabase/storage-js/-/storage-js-2.106.2.tgz",
      "integrity": "sha512-xgKCSYuev1YarV+iVqr+zlfgSyremnJtn8T0NCT8L4XmMv1CLtESc0Q6kNp8+mKWdX/8ND0nzm7OMKx08kwNAw==",

```
**[ADDED]**
```
1311        "version": "2.98.0",
1312        "resolved": "https://registry.npmjs.org/@supabase/storage-js/-/storage-js-2.98.0.tgz",
1313        "integrity": "sha512-tzr2mG+v7ILSAZSfZMSL9OPyIH4z1ikgQ8EcQTKfMRz4EwmlFt3UnJaGzSOxyvF5b+fc9So7qdSUWTqGgeLokQ==",
```
**[REMOVED]**
```
(from line ~1324)
      "version": "2.106.2",
      "resolved": "https://registry.npmjs.org/@supabase/supabase-js/-/supabase-js-2.106.2.tgz",
      "integrity": "sha512-2/RZ/1fmJx/MRSEDG2Xk8+J4JVk5clM9V0uSI6kUTrcS32KA89DtqI5RUOC9r6mzY3WBC9qexLjssIHjbLyVJA==",

```
**[ADDED]**
```
1324        "version": "2.98.0",
1325        "resolved": "https://registry.npmjs.org/@supabase/supabase-js/-/supabase-js-2.98.0.tgz",
1326        "integrity": "sha512-Ohc97CtInLwZyiSASz7tT9/Abm/vqnIbO9REp+PivVUII8UZsuI3bngRQnYgJdFoOIwvaEII1fX1qy8x0CyNiw==",
```
**[REMOVED]**
```
(from line ~1330)
        "@supabase/auth-js": "2.106.2",
        "@supabase/functions-js": "2.106.2",
        "@supabase/postgrest-js": "2.106.2",
        "@supabase/realtime-js": "2.106.2",
        "@supabase/storage-js": "2.106.2"

```
**[ADDED]**
```
1330          "@supabase/auth-js": "2.98.0",
1331          "@supabase/functions-js": "2.98.0",
1332          "@supabase/postgrest-js": "2.98.0",
1333          "@supabase/realtime-js": "2.98.0",
1334          "@supabase/storage-js": "2.98.0"
```
**[REMOVED]**
```
(from line ~1340)
    "node_modules/@swc/counter": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/@swc/counter/-/counter-0.1.3.tgz",
      "integrity": "sha512-e2BR4lsJkkRlKZ/qCHPw9ZaSxc0MVUd7gtbtaB7aMvHeJVYe8sOB8DBZkP2DtISHGSku9sCK6T6cnY0CtXrOCQ==",
      "license": "Apache-2.0"
    },

```
**[REMOVED]**
```
(from line ~1341)
      "version": "0.5.5",
      "resolved": "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.5.tgz",
      "integrity": "sha512-KGYxvIOXcceOAbEk4bi/dVLEK9z8sZ0uBB3Il5b1rhfClSpcX0yfRO0KmTkqR2cnQDymwLB+25ZyMzICg/cm/A==",

```
**[ADDED]**
```
1341        "version": "0.5.15",
1342        "resolved": "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.15.tgz",
1343        "integrity": "sha512-JQ5TuMi45Owi4/BIMAJBoSQoOJu12oOk/gADqlcUL9JEdHB8vyjUSsxqeNXnmXHjYKMi2WcYtezGEEhqUI/E2g==",
```
**[REMOVED]**
```
(from line ~1346)
        "@swc/counter": "^0.1.3",
        "tslib": "^2.4.0"

```
**[ADDED]**
```
1346          "tslib": "^2.8.0"
```
**[REMOVED]**
```
(from line ~1350)
      "version": "0.10.2",
      "resolved": "https://registry.npmjs.org/@tybys/wasm-util/-/wasm-util-0.10.2.tgz",
      "integrity": "sha512-RoBvJ2X0wuKlWFIjrwffGw1IqZHKQqzIchKaadZZfnNpsAYp2mM0h36JtPCjNDAHGgYez/15uMBpfGwchhiMgg==",

```
**[ADDED]**
```
1350        "version": "0.10.1",
1351        "resolved": "https://registry.npmjs.org/@tybys/wasm-util/-/wasm-util-0.10.1.tgz",
1352        "integrity": "sha512-9tTaPJLSiejZKx+Bmog4uSubteqTvFrVrURwkmHixBo0G4seD0zUxp98E1DzUBJxLQ3NPwXrGKDiVjwx/DpPsg==",
```
**[REMOVED]**
```
(from line ~1360)
    "node_modules/@types/cookie": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/@types/cookie/-/cookie-0.6.0.tgz",
      "integrity": "sha512-4Kh9a6B2bQciAhf7FSuMRRkUWecJgJu9nPnx3yzpsfXX/c50REIqpHY4C82bXP90qrLtXtkDxTZosYO3UpOwlA==",

```
**[ADDED]**
```
1360      "node_modules/@types/estree": {
1361        "version": "1.0.8",
1362        "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.8.tgz",
1363        "integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
1364        "dev": true,
```
**[ADDED]**
```
1367      "node_modules/@types/json-schema": {
1368        "version": "7.0.15",
1369        "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
1370        "integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
1371        "dev": true,
1372        "license": "MIT"
1373      },
```
**[REMOVED]**
```
(from line ~1382)
      "version": "20.19.41",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-20.19.41.tgz",
      "integrity": "sha512-ECymXOukMnOoVkC2bb1Vc/w/836DXncOg5m8Xj1RH7xSHZJWNYY6Zh7EH477vcnD5egKNNfy2RpNOmuChhFPgQ==",
      "dev": true,

```
**[ADDED]**
```
1382        "version": "20.19.35",
1383        "resolved": "https://registry.npmjs.org/@types/node/-/node-20.19.35.tgz",
1384        "integrity": "sha512-Uarfe6J91b9HAUXxjvSOdiO2UPOKLm07Q1oh0JHxoZ1y8HoqxDAu3gVrsrOHeiio0kSsoVBt4wFrKOm0dKxVPQ==",
```
**[ADDED]**
```
1390      "node_modules/@types/node-fetch": {
1391        "version": "2.6.13",
1392        "resolved": "https://registry.npmjs.org/@types/node-fetch/-/node-fetch-2.6.13.tgz",
1393        "integrity": "sha512-QGpRVpzSaUs30JBSGPjOg4Uveu384erbHBoT1zeONvyCfwQxIkUshLAOqN/k9EjGviPRmWTTe6aH2qySWKTVSw==",
1394        "license": "MIT",
1395        "dependencies": {
1396          "@types/node": "*",
1397          "form-data": "^4.0.4"
1398        }
1399      },
1400      "node_modules/@types/phoenix": {
1401        "version": "1.6.7",
1402        "resolved": "https://registry.npmjs.org/@types/phoenix/-/phoenix-1.6.7.tgz",
1403        "integrity": "sha512-oN9ive//QSBkf19rfDv45M7eZPi0eEXylht2OLEXicu5b4KoQ1OzXIw+xDSGWxSxe1JmepRR/ZH283vsu518/Q==",
1404        "license": "MIT"
1405      },
```
**[REMOVED]**
```
(from line ~1414)
      "version": "18.3.29",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-18.3.29.tgz",
      "integrity": "sha512-ch0qJdr2JY0r04NXSprbK6TXOgnaJ1Tz23fm5W+z0/CBah6BSBc3n96h7K9GOtwh0HrilNWHIBzE1Ko4Dcw/Wg==",

```
**[ADDED]**
```
1414        "version": "18.3.28",
1415        "resolved": "https://registry.npmjs.org/@types/react/-/react-18.3.28.tgz",
1416        "integrity": "sha512-z9VXpC7MWrhfWipitjNdgCauoMLRdIILQsAEV+ZesIzBq/oUlxk0m3ApZuMFCXdnS4U7KrI+l3WRUEGQ8K1QKw==",
```
**[ADDED]**
```
1435      "node_modules/@types/ws": {
1436        "version": "8.18.1",
1437        "resolved": "https://registry.npmjs.org/@types/ws/-/ws-8.18.1.tgz",
1438        "integrity": "sha512-ThVF6DCVhA8kUGy+aazFQ4kXQ7E1Ty7A3ypFOe0IcJV8O/M511G99AW24irKrW56Wt44yG9+ij8FaqoBGkuBXg==",
1439        "license": "MIT",
1440        "dependencies": {
1441          "@types/node": "*"
1442        }
1443      },
1444      "node_modules/@typescript-eslint/eslint-plugin": {
1445        "version": "8.56.1",
1446        "resolved": "https://registry.npmjs.org/@typescript-eslint/eslint-plugin/-/eslint-plugin-8.56.1.tgz",
1447        "integrity": "sha512-Jz9ZztpB37dNC+HU2HI28Bs9QXpzCz+y/twHOwhyrIRdbuVDxSytJNDl6z/aAKlaRIwC7y8wJdkBv7FxYGgi0A==",
1448        "dev": true,
1449        "license": "MIT",
1450        "dependencies": {
1451          "@eslint-community/regexpp": "^4.12.2",
1452          "@typescript-eslint/scope-manager": "8.56.1",
1453          "@typescript-eslint/type-utils": "8.56.1",
1454          "@typescript-eslint/utils": "8.56.1",
1455          "@typescript-eslint/visitor-keys": "8.56.1",
1456          "ignore": "^7.0.5",
1457          "natural-compare": "^1.4.0",
1458          "ts-api-utils": "^2.4.0"
1459        },
1460        "engines": {
1461          "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
1462        },
1463        "funding": {
1464          "type": "opencollective",
1465          "url": "https://opencollective.com/typescript-eslint"
1466        },
1467        "peerDependencies": {
1468          "@typescript-eslint/parser": "^8.56.1",
1469          "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
1470          "typescript": ">=4.8.4 <6.0.0"
1471        }
1472      },
1473      "node_modules/@typescript-eslint/eslint-plugin/node_modules/ignore": {
1474        "version": "7.0.5",
1475        "resolved": "https://registry.npmjs.org/ignore/-/ignore-7.0.5.tgz",
1476        "integrity": "sha512-Hs59xBNfUIunMFgWAbGX5cq6893IbWg4KnrjbYwX3tx0ztorVgTDA6B2sxf8ejHJ4wz8BqGUMYlnzNBer5NvGg==",
1477        "dev": true,
1478        "license": "MIT",
1479        "engines": {
1480          "node": ">= 4"
1481        }
1482      },
```
**[REMOVED]**
```
(from line ~1484)
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-7.2.0.tgz",
      "integrity": "sha512-5FKsVcHTk6TafQKQbuIVkXq58Fnbkd2wDL4LB7AURN7RUOu1utVP+G8+6u3ZhEroW3DF6hyo3ZEXxgKgp4KeCg==",

```
**[ADDED]**
```
1484        "version": "8.56.1",
1485        "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-8.56.1.tgz",
1486        "integrity": "sha512-klQbnPAAiGYFyI02+znpBRLyjL4/BrBd0nyWkdC0s/6xFLkXYQ8OoRrSkqacS1ddVxf/LDyODIKbQ5TgKAf/Fg==",
```
**[REMOVED]**
```
(from line ~1488)
      "license": "BSD-2-Clause",

```
**[ADDED]**
```
1488        "license": "MIT",
1489        "peer": true,
```
**[REMOVED]**
```
(from line ~1491)
        "@typescript-eslint/scope-manager": "7.2.0",
        "@typescript-eslint/types": "7.2.0",
        "@typescript-eslint/typescript-estree": "7.2.0",
        "@typescript-eslint/visitor-keys": "7.2.0",
        "debug": "^4.3.4"

```
**[ADDED]**
```
1491          "@typescript-eslint/scope-manager": "8.56.1",
1492          "@typescript-eslint/types": "8.56.1",
1493          "@typescript-eslint/typescript-estree": "8.56.1",
1494          "@typescript-eslint/visitor-keys": "8.56.1",
1495          "debug": "^4.4.3"
```
**[REMOVED]**
```
(from line ~1498)
        "node": "^16.0.0 || >=18.0.0"

```
**[ADDED]**
```
1498          "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
```
**[REMOVED]**
```
(from line ~1505)
        "eslint": "^8.56.0"

```
**[ADDED]**
```
1505          "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
1506          "typescript": ">=4.8.4 <6.0.0"
1507        }
1508      },
1509      "node_modules/@typescript-eslint/project-service": {
1510        "version": "8.56.1",
1511        "resolved": "https://registry.npmjs.org/@typescript-eslint/project-service/-/project-service-8.56.1.tgz",
1512        "integrity": "sha512-TAdqQTzHNNvlVFfR+hu2PDJrURiwKsUvxFn1M0h95BB8ah5jejas08jUWG4dBA68jDMI988IvtfdAI53JzEHOQ==",
1513        "dev": true,
1514        "license": "MIT",
1515        "dependencies": {
1516          "@typescript-eslint/tsconfig-utils": "^8.56.1",
1517          "@typescript-eslint/types": "^8.56.1",
1518          "debug": "^4.4.3"
```
**[REMOVED]**
```
(from line ~1520)
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }

```
**[ADDED]**
```
1520        "engines": {
1521          "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
1522        },
1523        "funding": {
1524          "type": "opencollective",
1525          "url": "https://opencollective.com/typescript-eslint"
1526        },
1527        "peerDependencies": {
1528          "typescript": ">=4.8.4 <6.0.0"
```
**[REMOVED]**
```
(from line ~1532)
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-7.2.0.tgz",
      "integrity": "sha512-Qh976RbQM/fYtjx9hs4XkayYujB/aPwglw2choHmf3zBjB4qOywWSdt9+KLRdHubGcoSwBnXUH2sR3hkyaERRg==",

```
**[ADDED]**
```
1532        "version": "8.56.1",
1533        "resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-8.56.1.tgz",
1534        "integrity": "sha512-YAi4VDKcIZp0O4tz/haYKhmIDZFEUPOreKbfdAN3SzUDMcPhJ8QI99xQXqX+HoUVq8cs85eRKnD+rne2UAnj2w==",
```
**[REMOVED]**
```
(from line ~1538)
        "@typescript-eslint/types": "7.2.0",
        "@typescript-eslint/visitor-keys": "7.2.0"

```
**[ADDED]**
```
1538          "@typescript-eslint/types": "8.56.1",
1539          "@typescript-eslint/visitor-keys": "8.56.1"
```
**[REMOVED]**
```
(from line ~1542)
        "node": "^16.0.0 || >=18.0.0"

```
**[ADDED]**
```
1542          "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
```
**[ADDED]**
```
1549      "node_modules/@typescript-eslint/tsconfig-utils": {
1550        "version": "8.56.1",
1551        "resolved": "https://registry.npmjs.org/@typescript-eslint/tsconfig-utils/-/tsconfig-utils-8.56.1.tgz",
1552        "integrity": "sha512-qOtCYzKEeyr3aR9f28mPJqBty7+DBqsdd63eO0yyDwc6vgThj2UjWfJIcsFeSucYydqcuudMOprZ+x1SpF3ZuQ==",
1553        "dev": true,
1554        "license": "MIT",
1555        "engines": {
1556          "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
1557        },
1558        "funding": {
1559          "type": "opencollective",
1560          "url": "https://opencollective.com/typescript-eslint"
1561        },
1562        "peerDependencies": {
1563          "typescript": ">=4.8.4 <6.0.0"
1564        }
1565      },
1566      "node_modules/@typescript-eslint/type-utils": {
1567        "version": "8.56.1",
1568        "resolved": "https://registry.npmjs.org/@typescript-eslint/type-utils/-/type-utils-8.56.1.tgz",
1569        "integrity": "sha512-yB/7dxi7MgTtGhZdaHCemf7PuwrHMenHjmzgUW1aJpO+bBU43OycnM3Wn+DdvDO/8zzA9HlhaJ0AUGuvri4oGg==",
1570        "dev": true,
1571        "license": "MIT",
1572        "dependencies": {
1573          "@typescript-eslint/types": "8.56.1",
1574          "@typescript-eslint/typescript-estree": "8.56.1",
1575          "@typescript-eslint/utils": "8.56.1",
1576          "debug": "^4.4.3",
1577          "ts-api-utils": "^2.4.0"
1578        },
1579        "engines": {
1580          "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
1581        },
1582        "funding": {
1583          "type": "opencollective",
1584          "url": "https://opencollective.com/typescript-eslint"
1585        },
1586        "peerDependencies": {
1587          "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
1588          "typescript": ">=4.8.4 <6.0.0"
1589        }
1590      },
```
**[REMOVED]**
```
(from line ~1592)
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-7.2.0.tgz",
      "integrity": "sha512-XFtUHPI/abFhm4cbCDc5Ykc8npOKBSJePY3a3s+lwumt7XWJuzP5cZcfZ610MIPHjQjNsOLlYK8ASPaNG8UiyA==",

```
**[ADDED]**
```
1592        "version": "8.56.1",
1593        "resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-8.56.1.tgz",
1594        "integrity": "sha512-dbMkdIUkIkchgGDIv7KLUpa0Mda4IYjo4IAMJUZ+3xNoUXxMsk9YtKpTHSChRS85o+H9ftm51gsK1dZReY9CVw==",
```
**[REMOVED]**
```
(from line ~1598)
        "node": "^16.0.0 || >=18.0.0"

```
**[ADDED]**
```
1598          "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
```
**[REMOVED]**
```
(from line ~1606)
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-7.2.0.tgz",
      "integrity": "sha512-cyxS5WQQCoBwSakpMrvMXuMDEbhOo9bNHHrNcEWis6XHx6KF518tkF1wBvKIn/tpq5ZpUYK7Bdklu8qY0MsFIA==",

```
**[ADDED]**
```
1606        "version": "8.56.1",
1607        "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-8.56.1.tgz",
1608        "integrity": "sha512-qzUL1qgalIvKWAf9C1HpvBjif+Vm6rcT5wZd4VoMb9+Km3iS3Cv9DY6dMRMDtPnwRAFyAi7YXJpTIEXLvdfPxg==",
```
**[REMOVED]**
```
(from line ~1610)
      "license": "BSD-2-Clause",

```
**[ADDED]**
```
1610        "license": "MIT",
```
**[REMOVED]**
```
(from line ~1612)
        "@typescript-eslint/types": "7.2.0",
        "@typescript-eslint/visitor-keys": "7.2.0",
        "debug": "^4.3.4",
        "globby": "^11.1.0",
        "is-glob": "^4.0.3",
        "minimatch": "9.0.3",
        "semver": "^7.5.4",
        "ts-api-utils": "^1.0.1"

```
**[ADDED]**
```
1612          "@typescript-eslint/project-service": "8.56.1",
1613          "@typescript-eslint/tsconfig-utils": "8.56.1",
1614          "@typescript-eslint/types": "8.56.1",
1615          "@typescript-eslint/visitor-keys": "8.56.1",
1616          "debug": "^4.4.3",
1617          "minimatch": "^10.2.2",
1618          "semver": "^7.7.3",
1619          "tinyglobby": "^0.2.15",
1620          "ts-api-utils": "^2.4.0"
```
**[REMOVED]**
```
(from line ~1623)
        "node": "^16.0.0 || >=18.0.0"

```
**[ADDED]**
```
1623          "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
```
**[REMOVED]**
```
(from line ~1629)
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }

```
**[ADDED]**
```
1629        "peerDependencies": {
1630          "typescript": ">=4.8.4 <6.0.0"
```
**[ADDED]**
```
1633      "node_modules/@typescript-eslint/typescript-estree/node_modules/balanced-match": {
1634        "version": "4.0.4",
1635        "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-4.0.4.tgz",
1636        "integrity": "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA==",
1637        "dev": true,
1638        "license": "MIT",
1639        "engines": {
1640          "node": "18 || 20 || >=22"
1641        }
1642      },
```
**[REMOVED]**
```
(from line ~1644)
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.1.1.tgz",
      "integrity": "sha512-WR1cURNjuvBLMZBMbqM0UoE+WAfdUcEV1ccD8PVBVOI+Z3ND4+SZbN8RsfT2bMuG1qwz5RFvPukSZm5fF2D5eA==",

```
**[ADDED]**
```
1644        "version": "5.0.4",
1645        "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-5.0.4.tgz",
1646        "integrity": "sha512-h+DEnpVvxmfVefa4jFbCf5HdH5YMDXRsmKflpf1pILZWRFlTbJpxeU55nJl4Smt5HQaGzg1o6RHFPJaOqnmBDg==",
```
**[REMOVED]**
```
(from line ~1650)
        "balanced-match": "^1.0.0"

```
**[ADDED]**
```
1650          "balanced-match": "^4.0.2"
1651        },
1652        "engines": {
1653          "node": "18 || 20 || >=22"
```
**[REMOVED]**
```
(from line ~1657)
      "version": "9.0.3",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-9.0.3.tgz",
      "integrity": "sha512-RHiac9mvaRw0x3AYRgDC1CxAP7HTcNrrECeA8YYJeWnpo+2Q5CegtZjaotWTWxDG3UeGA1coE05iH1mPjT/2mg==",

```
**[ADDED]**
```
1657        "version": "10.2.4",
1658        "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.4.tgz",
1659        "integrity": "sha512-oRjTw/97aTBN0RHbYCdtF1MQfvusSIBQM0IZEgzl6426+8jSC0nF1a/GmnVLpfB9yyr6g6FTqWqiZVbxrtaCIg==",
```
**[REMOVED]**
```
(from line ~1661)
      "license": "ISC",

```
**[ADDED]**
```
1661        "license": "BlueOak-1.0.0",
```
**[REMOVED]**
```
(from line ~1663)
        "brace-expansion": "^2.0.1"

```
**[ADDED]**
```
1663          "brace-expansion": "^5.0.2"
```
**[REMOVED]**
```
(from line ~1666)
        "node": ">=16 || 14 >=14.17"

```
**[ADDED]**
```
1666          "node": "18 || 20 || >=22"
```
**[ADDED]**
```
1672      "node_modules/@typescript-eslint/typescript-estree/node_modules/semver": {
1673        "version": "7.7.4",
1674        "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.4.tgz",
1675        "integrity": "sha512-vFKC2IEtQnVhpT78h1Yp8wzwrf8CM+MzKMHGJZfBtzhZNycRFnXsHk6E5TxIkkMsgNS7mdX3AGB7x2QM2di4lA==",
1676        "dev": true,
1677        "license": "ISC",
1678        "bin": {
1679          "semver": "bin/semver.js"
1680        },
1681        "engines": {
1682          "node": ">=10"
1683        }
1684      },
1685      "node_modules/@typescript-eslint/utils": {
1686        "version": "8.56.1",
1687        "resolved": "https://registry.npmjs.org/@typescript-eslint/utils/-/utils-8.56.1.tgz",
1688        "integrity": "sha512-HPAVNIME3tABJ61siYlHzSWCGtOoeP2RTIaHXFMPqjrQKCGB9OgUVdiNgH7TJS2JNIQ5qQ4RsAUDuGaGme/KOA==",
1689        "dev": true,
1690        "license": "MIT",
1691        "dependencies": {
1692          "@eslint-community/eslint-utils": "^4.9.1",
1693          "@typescript-eslint/scope-manager": "8.56.1",
1694          "@typescript-eslint/types": "8.56.1",
1695          "@typescript-eslint/typescript-estree": "8.56.1"
1696        },
1697        "engines": {
1698          "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
1699        },
1700        "funding": {
1701          "type": "opencollective",
1702          "url": "https://opencollective.com/typescript-eslint"
1703        },
1704        "peerDependencies": {
1705          "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
1706          "typescript": ">=4.8.4 <6.0.0"
1707        }
1708      },
```
**[REMOVED]**
```
(from line ~1710)
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-7.2.0.tgz",
      "integrity": "sha512-c6EIQRHhcpl6+tO8EMR+kjkkV+ugUNXOmeASA1rlzkd8EPIriavpWoiEz1HR/VLhbVIdhqnV6E7JZm00cBDx2A==",

```
**[ADDED]**
```
1710        "version": "8.56.1",
1711        "resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-8.56.1.tgz",
1712        "integrity": "sha512-KiROIzYdEV85YygXw6BI/Dx4fnBlFQu6Mq4QE4MOH9fFnhohw6wX/OAvDY2/C+ut0I3RSPKenvZJIVYqJNkhEw==",
```
**[REMOVED]**
```
(from line ~1716)
        "@typescript-eslint/types": "7.2.0",
        "eslint-visitor-keys": "^3.4.1"

```
**[ADDED]**
```
1716          "@typescript-eslint/types": "8.56.1",
1717          "eslint-visitor-keys": "^5.0.0"
```
**[REMOVED]**
```
(from line ~1720)
        "node": "^16.0.0 || >=18.0.0"

```
**[ADDED]**
```
1720          "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
```
**[REMOVED]**
```
(from line ~1727)
    "node_modules/@ungap/structured-clone": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/@ungap/structured-clone/-/structured-clone-1.3.1.tgz",
      "integrity": "sha512-mUFwbeTqrVgDQxFveS+df2yfap6iuP20NAKAsBt5jDEoOTDew+zwLAOilHCeQJOVSvmgCX4ogqIrA0mnyr08yQ==",

```
**[ADDED]**
```
1727      "node_modules/@typescript-eslint/visitor-keys/node_modules/eslint-visitor-keys": {
1728        "version": "5.0.1",
1729        "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
1730        "integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
```
**[REMOVED]**
```
(from line ~1732)
      "license": "ISC"

```
**[ADDED]**
```
1732        "license": "Apache-2.0",
1733        "engines": {
1734          "node": "^20.19.0 || ^22.13.0 || >=24"
1735        },
1736        "funding": {
1737          "url": "https://opencollective.com/eslint"
1738        }
```
**[REMOVED]**
```
(from line ~1741)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-android-arm-eabi/-/resolver-binding-android-arm-eabi-1.12.2.tgz",
      "integrity": "sha512-g5T90pqg1bo/7mytQx6F4iBNC0Wsh9cu+z9veDbFjc7HjpesJFWD7QMS0NGStXM075+7dJPPVvBbpZlnrdpi/w==",

```
**[ADDED]**
```
1741        "version": "1.11.1",
1742        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-android-arm-eabi/-/resolver-binding-android-arm-eabi-1.11.1.tgz",
1743        "integrity": "sha512-ppLRUgHVaGRWUx0R0Ut06Mjo9gBaBkg3v/8AxusGLhsIotbBLuRk51rAzqLC8gq6NyyAojEXglNjzf6R948DNw==",
```
**[REMOVED]**
```
(from line ~1755)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-android-arm64/-/resolver-binding-android-arm64-1.12.2.tgz",
      "integrity": "sha512-YGCRZv/9GLhwmz6mYDeTsm/92BAyR28l6c2ReweVW5pWgfsitWLY8upvfRlGdoyD8HjeTHSYJWyZGD4KJA/nFQ==",

```
**[ADDED]**
```
1755        "version": "1.11.1",
1756        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-android-arm64/-/resolver-binding-android-arm64-1.11.1.tgz",
1757        "integrity": "sha512-lCxkVtb4wp1v+EoN+HjIG9cIIzPkX5OtM03pQYkG+U5O/wL53LC4QbIeazgiKqluGeVEeBlZahHalCaBvU1a2g==",
```
**[REMOVED]**
```
(from line ~1769)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-darwin-arm64/-/resolver-binding-darwin-arm64-1.12.2.tgz",
      "integrity": "sha512-u9DiNT1auQMO20A9SyTuG3wUgQWB9Z7KjAg0uFuCDR1FsAY8A0CG2S6JpHS1xwm/w1G08bjXZDcyOCjv1WAm2w==",

```
**[ADDED]**
```
1769        "version": "1.11.1",
1770        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-darwin-arm64/-/resolver-binding-darwin-arm64-1.11.1.tgz",
1771        "integrity": "sha512-gPVA1UjRu1Y/IsB/dQEsp2V1pm44Of6+LWvbLc9SDk1c2KhhDRDBUkQCYVWe6f26uJb3fOK8saWMgtX8IrMk3g==",
```
**[REMOVED]**
```
(from line ~1783)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-darwin-x64/-/resolver-binding-darwin-x64-1.12.2.tgz",
      "integrity": "sha512-f7rPLi/T1HVKZu/u6t87lroib16n8vrSzcyxI7lg4BGO9UF26KhQL44sd9eOUgrTYhvRXtWOIZT5PejdPyJfUA==",

```
**[ADDED]**
```
1783        "version": "1.11.1",
1784        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-darwin-x64/-/resolver-binding-darwin-x64-1.11.1.tgz",
1785        "integrity": "sha512-cFzP7rWKd3lZaCsDze07QX1SC24lO8mPty9vdP+YVa3MGdVgPmFc59317b2ioXtgCMKGiCLxJ4HQs62oz6GfRQ==",
```
**[REMOVED]**
```
(from line ~1797)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-freebsd-x64/-/resolver-binding-freebsd-x64-1.12.2.tgz",
      "integrity": "sha512-BpcOjWCJub6nRZUS2zA20pmLvjtqAtGejETaIyRLiZiQf++cbrjltLA5NN/xaXfqeOBOSlMFbemIl5/S5tljmg==",

```
**[ADDED]**
```
1797        "version": "1.11.1",
1798        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-freebsd-x64/-/resolver-binding-freebsd-x64-1.11.1.tgz",
1799        "integrity": "sha512-fqtGgak3zX4DCB6PFpsH5+Kmt/8CIi4Bry4rb1ho6Av2QHTREM+47y282Uqiu3ZRF5IQioJQ5qWRV6jduA+iGw==",
```
**[REMOVED]**
```
(from line ~1811)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm-gnueabihf/-/resolver-binding-linux-arm-gnueabihf-1.12.2.tgz",
      "integrity": "sha512-vZTDvdSISZjJx66OzJqtsOhzifbqRjbmI1Mnu49fQDwog5GtDI4QidRiEAYbZCRj9C8YZEW+3ZjqsyS9GR4k2A==",

```
**[ADDED]**
```
1811        "version": "1.11.1",
1812        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm-gnueabihf/-/resolver-binding-linux-arm-gnueabihf-1.11.1.tgz",
1813        "integrity": "sha512-u92mvlcYtp9MRKmP+ZvMmtPN34+/3lMHlyMj7wXJDeXxuM0Vgzz0+PPJNsro1m3IZPYChIkn944wW8TYgGKFHw==",
```
**[REMOVED]**
```
(from line ~1825)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm-musleabihf/-/resolver-binding-linux-arm-musleabihf-1.12.2.tgz",
      "integrity": "sha512-BiPI+IrIlwcW4nLLMM21+B1dFPzd55yAVgVGrdgDjNef+ch03GdxrcyaIz8X9SsQirh/kCQ7mviyWlMxdh2D7g==",

```
**[ADDED]**
```
1825        "version": "1.11.1",
1826        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm-musleabihf/-/resolver-binding-linux-arm-musleabihf-1.11.1.tgz",
1827        "integrity": "sha512-cINaoY2z7LVCrfHkIcmvj7osTOtm6VVT16b5oQdS4beibX2SYBwgYLmqhBjA1t51CarSaBuX5YNsWLjsqfW5Cw==",
```
**[REMOVED]**
```
(from line ~1839)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm64-gnu/-/resolver-binding-linux-arm64-gnu-1.12.2.tgz",
      "integrity": "sha512-zJc0H99FEPoFfSrNpa91HYfxzfAJCr502oxNK1cfdC9hlaFI43RT+JFCann9JUgZmLzzntChHyn13Sgn9ljHNg==",

```
**[ADDED]**
```
1839        "version": "1.11.1",
1840        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm64-gnu/-/resolver-binding-linux-arm64-gnu-1.11.1.tgz",
1841        "integrity": "sha512-34gw7PjDGB9JgePJEmhEqBhWvCiiWCuXsL9hYphDF7crW7UgI05gyBAi6MF58uGcMOiOqSJ2ybEeCvHcq0BCmQ==",
```
**[REMOVED]**
```
(from line ~1853)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm64-musl/-/resolver-binding-linux-arm64-musl-1.12.2.tgz",
      "integrity": "sha512-KQ3Lki6l+Pz1k/eBipN41ES+YUK30beLGb9YqcB1O542cyLCNE6GaxrfcY3T6EezmGGk84wb5XyO9loTM9tkcA==",

```
**[ADDED]**
```
1853        "version": "1.11.1",
1854        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm64-musl/-/resolver-binding-linux-arm64-musl-1.11.1.tgz",
1855        "integrity": "sha512-RyMIx6Uf53hhOtJDIamSbTskA99sPHS96wxVE/bJtePJJtpdKGXO1wY90oRdXuYOGOTuqjT8ACccMc4K6QmT3w==",
```
**[REMOVED]**
```
(from line ~1866)
    "node_modules/@unrs/resolver-binding-linux-loong64-gnu": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-loong64-gnu/-/resolver-binding-linux-loong64-gnu-1.12.2.tgz",
      "integrity": "sha512-3SJGEh1DborhG6pyxvhPzCT4bbSIVihsvgJc13P1bHG7KLdNDaF9T3gsTwFc7Jw/5Y5/iWOjkEx7Zy0NvCGX3Q==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-loong64-musl": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-loong64-musl/-/resolver-binding-linux-loong64-musl-1.12.2.tgz",
      "integrity": "sha512-jiuG/Obbel7uw1PwHNFfrkiKhLAF6mnyZ6aWlOAVN9WqKm8v0OFGnciJIHu8+CMvXLQ8AD51LPzAoUfT21D5Ew==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },

```
**[REMOVED]**
```
(from line ~1867)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-ppc64-gnu/-/resolver-binding-linux-ppc64-gnu-1.12.2.tgz",
      "integrity": "sha512-q7xRvVpmcfeL+LlZg8Pbbo6QaTZwDU5BaGZbwfhkEsXJn3Was8xYfE0RBH266xZt0rM6B7i8xAYIvjthuUIWHg==",

```
**[ADDED]**
```
1867        "version": "1.11.1",
1868        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-ppc64-gnu/-/resolver-binding-linux-ppc64-gnu-1.11.1.tgz",
1869        "integrity": "sha512-D8Vae74A4/a+mZH0FbOkFJL9DSK2R6TFPC9M+jCWYia/q2einCubX10pecpDiTmkJVUH+y8K3BZClycD8nCShA==",
```
**[REMOVED]**
```
(from line ~1881)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-riscv64-gnu/-/resolver-binding-linux-riscv64-gnu-1.12.2.tgz",
      "integrity": "sha512-0CVdx6lcnT3Q9inOH8tsMIOJ6ImndllMjqJHg8RLVdB7Vq4SfkEXl9mCSsVNuNA4MCYycRicCUxPCabVHJRr6A==",

```
**[ADDED]**
```
1881        "version": "1.11.1",
1882        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-riscv64-gnu/-/resolver-binding-linux-riscv64-gnu-1.11.1.tgz",
1883        "integrity": "sha512-frxL4OrzOWVVsOc96+V3aqTIQl1O2TjgExV4EKgRY09AJ9leZpEg8Ak9phadbuX0BA4k8U5qtvMSQQGGmaJqcQ==",
```
**[REMOVED]**
```
(from line ~1895)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-riscv64-musl/-/resolver-binding-linux-riscv64-musl-1.12.2.tgz",
      "integrity": "sha512-iOwlRo9vnp6R6ohHQS11n0NnfdXx/omhkocmIfaPRpQhKZ+3BDMkkdRVh53qjkFkpPddf+FETA28NwGN7l5l+w==",

```
**[ADDED]**
```
1895        "version": "1.11.1",
1896        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-riscv64-musl/-/resolver-binding-linux-riscv64-musl-1.11.1.tgz",
1897        "integrity": "sha512-mJ5vuDaIZ+l/acv01sHoXfpnyrNKOk/3aDoEdLO/Xtn9HuZlDD6jKxHlkN8ZhWyLJsRBxfv9GYM2utQ1SChKew==",
```
**[REMOVED]**
```
(from line ~1909)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-s390x-gnu/-/resolver-binding-linux-s390x-gnu-1.12.2.tgz",
      "integrity": "sha512-HYJtLfXq94q8iZNFT1lknx258wlkkWhZeUXJRqzKBBUJ00CvZ+N33zgbCqimLjsyw5Va6uUxhVa12mI+kaveEw==",

```
**[ADDED]**
```
1909        "version": "1.11.1",
1910        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-s390x-gnu/-/resolver-binding-linux-s390x-gnu-1.11.1.tgz",
1911        "integrity": "sha512-kELo8ebBVtb9sA7rMe1Cph4QHreByhaZ2QEADd9NzIQsYNQpt9UkM9iqr2lhGr5afh885d/cB5QeTXSbZHTYPg==",
```
**[REMOVED]**
```
(from line ~1923)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-x64-gnu/-/resolver-binding-linux-x64-gnu-1.12.2.tgz",
      "integrity": "sha512-mPsUhunKKDih5O96Y6enDQyHc1SqBPlY1E/SfMWDM3EdJ95Z9CArPeCVwCCqbP45ljvivdEk8Fxn+SIb1rDAJQ==",

```
**[ADDED]**
```
1923        "version": "1.11.1",
1924        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-x64-gnu/-/resolver-binding-linux-x64-gnu-1.11.1.tgz",
1925        "integrity": "sha512-C3ZAHugKgovV5YvAMsxhq0gtXuwESUKc5MhEtjBpLoHPLYM+iuwSj3lflFwK3DPm68660rZ7G8BMcwSro7hD5w==",
```
**[REMOVED]**
```
(from line ~1937)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-x64-musl/-/resolver-binding-linux-x64-musl-1.12.2.tgz",
      "integrity": "sha512-azrt6+5ydLd8Vt210AAFis/lZevSfPw93EJRIJG+xPu4WCJ8K0kppCTpMyLPcKT7H15M4Jnt2tMp5bOvCkRC6A==",

```
**[ADDED]**
```
1937        "version": "1.11.1",
1938        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-x64-musl/-/resolver-binding-linux-x64-musl-1.11.1.tgz",
1939        "integrity": "sha512-rV0YSoyhK2nZ4vEswT/QwqzqQXw5I6CjoaYMOX0TqBlWhojUf8P94mvI7nuJTeaCkkds3QE4+zS8Ko+GdXuZtA==",
```
**[REMOVED]**
```
(from line ~1950)
    "node_modules/@unrs/resolver-binding-openharmony-arm64": {
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-openharmony-arm64/-/resolver-binding-openharmony-arm64-1.12.2.tgz",
      "integrity": "sha512-YZ9hP4O0X9PQb8eO980qmLNGH4zT3I9+SZTdt0Pr0YyuGQhYKoOZkV02VzrzyOZJ5xIJ3UFIenKkUkGg8GjgWQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },

```
**[REMOVED]**
```
(from line ~1951)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-wasm32-wasi/-/resolver-binding-wasm32-wasi-1.12.2.tgz",
      "integrity": "sha512-tYFDIkMxSflfEc/h92ZWNsZlHSwgimbNHSO3PL2JWQHfCuC2q316jMyYU9TIWZsFK2bQwyK5VAdYgn8ygPj69A==",

```
**[ADDED]**
```
1951        "version": "1.11.1",
1952        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-wasm32-wasi/-/resolver-binding-wasm32-wasi-1.11.1.tgz",
1953        "integrity": "sha512-5u4RkfxJm+Ng7IWgkzi3qrFOvLvQYnPBmjmZQ8+szTK/b31fQCnleNl1GgEt7nIsZRIf5PLhPwT0WM+q45x/UQ==",
```
**[REMOVED]**
```
(from line ~1961)
        "@emnapi/core": "1.10.0",
        "@emnapi/runtime": "1.10.0",
        "@napi-rs/wasm-runtime": "^1.1.4"

```
**[ADDED]**
```
1961          "@napi-rs/wasm-runtime": "^0.2.11"
```
**[REMOVED]**
```
(from line ~1968)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-arm64-msvc/-/resolver-binding-win32-arm64-msvc-1.12.2.tgz",
      "integrity": "sha512-qzNyg3xL0VPQmCaUh+N5jSitce6k+uCBfMDesWRnlULOZaqUkaJ0ybdT+UqlAWJoQjuqfIU/0Ptx9bteN4D82g==",

```
**[ADDED]**
```
1968        "version": "1.11.1",
1969        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-arm64-msvc/-/resolver-binding-win32-arm64-msvc-1.11.1.tgz",
1970        "integrity": "sha512-nRcz5Il4ln0kMhfL8S3hLkxI85BXs3o8EYoattsJNdsX4YUU89iOkVn7g0VHSRxFuVMdM4Q1jEpIId1Ihim/Uw==",
```
**[REMOVED]**
```
(from line ~1982)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-ia32-msvc/-/resolver-binding-win32-ia32-msvc-1.12.2.tgz",
      "integrity": "sha512-WD9sY00OfpHVGfsnHZoA8jVT+esS/Bg8z8jzxp5BnDCjjwsuKsPQrzswwpFy4J1AUJbXPRfkpcX0mXrzeXW79g==",

```
**[ADDED]**
```
1982        "version": "1.11.1",
1983        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-ia32-msvc/-/resolver-binding-win32-ia32-msvc-1.11.1.tgz",
1984        "integrity": "sha512-DCEI6t5i1NmAZp6pFonpD5m7i6aFrpofcp4LA2i8IIq60Jyo28hamKBxNrZcyOwVOZkgsRp9O2sXWBWP8MnvIQ==",
```
**[REMOVED]**
```
(from line ~1996)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-x64-msvc/-/resolver-binding-win32-x64-msvc-1.12.2.tgz",
      "integrity": "sha512-nAB74NfSNKknqQ1RrYj6uz8FcXEomu/MATJZxh/x+BArzN2U3JbOYC0APYzUIGhVY3m5hRxA8VPNdPBoG8txlA==",

```
**[ADDED]**
```
1996        "version": "1.11.1",
1997        "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-x64-msvc/-/resolver-binding-win32-x64-msvc-1.11.1.tgz",
1998        "integrity": "sha512-lrW200hZdbfRtztbygyaq/6jP6AKE8qQN2KvPcJ+x7wiD038YtnYtZ82IMNJ69GJibV7bwL3y9FgK+5w/pYt6g==",
```
**[REMOVED]**
```
(from line ~2010)
      "version": "0.8.13",
      "resolved": "https://registry.npmjs.org/@xmldom/xmldom/-/xmldom-0.8.13.tgz",
      "integrity": "sha512-KRYzxepc14G/CEpEGc3Yn+JKaAeT63smlDr+vjB8jRfgTBBI9wRj/nkQEO+ucV8p8I9bfKLWp37uHgFrbntPvw==",

```
**[ADDED]**
```
2010        "version": "0.8.11",
2011        "resolved": "https://registry.npmjs.org/@xmldom/xmldom/-/xmldom-0.8.11.tgz",
2012        "integrity": "sha512-cQzWCtO6C8TQiYl1ruKNn2U6Ao4o4WBBcbL61yJl84x+j5sOWWFU9X7DpND8XZG3daDppSsigMdfAIl2upQBRw==",
```
**[ADDED]**
```
2018      "node_modules/abort-controller": {
2019        "version": "3.0.0",
2020        "resolved": "https://registry.npmjs.org/abort-controller/-/abort-controller-3.0.0.tgz",
2021        "integrity": "sha512-h8lQ8tacZYnR3vNQTgibj+tODHI5/+l06Au2Pcriv/Gmet0eaj4TwWH41sO9wnHDiQsEj19q0drzdWdeAHtweg==",
2022        "license": "MIT",
2023        "dependencies": {
2024          "event-target-shim": "^5.0.0"
2025        },
2026        "engines": {
2027          "node": ">=6.5"
2028        }
2029      },
```
**[ADDED]**
```
2054      "node_modules/agentkeepalive": {
2055        "version": "4.6.0",
2056        "resolved": "https://registry.npmjs.org/agentkeepalive/-/agentkeepalive-4.6.0.tgz",
2057        "integrity": "sha512-kja8j7PjmncONqaTsB8fQ+wE2mSU2DJ9D4XKoJ5PFWIdRMa6SLSN1ff4mOr4jCbfRSsxR4keIiySJU0N9T5hIQ==",
2058        "license": "MIT",
2059        "dependencies": {
2060          "humanize-ms": "^1.2.1"
2061        },
2062        "engines": {
2063          "node": ">= 8.0.0"
2064        }
2065      },
```
**[REMOVED]**
```
(from line ~2067)
      "version": "6.15.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.15.0.tgz",
      "integrity": "sha512-fgFx7Hfoq60ytK2c7DhnF8jIvzYgOMxfugjLOSMHjLIPgenqa7S7oaagATUq99mV6IYvN2tRmC0wnTYX6iPbMw==",

```
**[ADDED]**
```
2067        "version": "6.14.0",
2068        "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.14.0.tgz",
2069        "integrity": "sha512-IWrosm/yrn43eiKqkfkHis7QioDleaXQHdDVPKg0FSwwd/DuvyX79TZnFOnYpB7dcsFAMmtFztZuXPDvSePkFw==",
```
**[REMOVED]**
```
(from line ~2083)
    "node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },

```
**[REMOVED]**
```
(from line ~2184)
    "node_modules/array-union": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/array-union/-/array-union-2.1.0.tgz",
      "integrity": "sha512-HGyxoOTYUyCM6stUe6EJgnd4EoewAI7zMdfqO+kGjnlZmBDz/cR5pf8r/cR4Wq60sL/p0IkcjUEEPwS3GFrIyw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },

```
**[ADDED]**
```
2321      "node_modules/asynckit": {
2322        "version": "0.4.0",
2323        "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
2324        "integrity": "sha512-Oei9OH4tRh0YqU3GxhX79dM/mwVgvbZJaSNaRk+bshkj0S5cfHcgYakreBjrHwatXKbz+IoIdYLxrKim2MjW0Q==",
2325        "license": "MIT"
2326      },
```
**[REMOVED]**
```
(from line ~2328)
      "version": "10.5.0",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.5.0.tgz",
      "integrity": "sha512-FMhOoZV4+qR6aTUALKX2rEqGG+oyATvwBt9IIzVR5rMa2HRWPkxf+P+PAJLD1I/H5/II+HuZcBJYEFBpq39ong==",

```
**[ADDED]**
```
2328        "version": "10.4.27",
2329        "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.4.27.tgz",
2330        "integrity": "sha512-NP9APE+tO+LuJGn7/9+cohklunJsXWiaWEfV3si4Gi/XHDwVNgkwr1J3RQYFIvPy76GmJ9/bW8vyoU1LcxwKHA==",
```
**[REMOVED]**
```
(from line ~2348)
        "browserslist": "^4.28.2",
        "caniuse-lite": "^1.0.30001787",

```
**[ADDED]**
```
2348          "browserslist": "^4.28.1",
2349          "caniuse-lite": "^1.0.30001774",
```
**[REMOVED]**
```
(from line ~2381)
      "version": "4.11.4",
      "resolved": "https://registry.npmjs.org/axe-core/-/axe-core-4.11.4.tgz",
      "integrity": "sha512-KunSNx+TVpkAw/6ULfhnx+HWRecjqZGTOyquAoWHYLRSdK1tB5Ihce1ZW+UY3fj33bYAFWPu7W/GRSmmrCGuxA==",

```
**[ADDED]**
```
2381        "version": "4.11.1",
2382        "resolved": "https://registry.npmjs.org/axe-core/-/axe-core-4.11.1.tgz",
2383        "integrity": "sha512-BASOg+YwO2C+346x3LZOeoovTIoTrRqEsqMa6fmfAV0P+U9mFr9NsyOEpiYvFjbc64NMrSswhV50WdXzdb/Z5A==",
```
**[REMOVED]**
```
(from line ~2428)
      "version": "2.10.33",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.10.33.tgz",
      "integrity": "sha512-bA6+tcSLpz2tIEdDXZPpPTIuxBcC4+w6SieaYyfigIa4h8GlFxbA17v22Vx3JUtuZQj9SgOsnbK+aTBzyDyEuw==",
      "dev": true,

```
**[ADDED]**
```
2428        "version": "2.10.0",
2429        "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.10.0.tgz",
2430        "integrity": "sha512-lIyg0szRfYbiy67j9KN8IyeD7q7hcmqnJ1ddWmNt19ItGpNN64mnllmxUNFIOdOm6by97jlL6wfpTTJrmnjWAA==",
```
**[REMOVED]**
```
(from line ~2459)
      "version": "1.1.15",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.15.tgz",
      "integrity": "sha512-EwOCDEex4quD37XhqM3omwtMoJjr//isUZz1JopUNWms+4Z2ViyM/k1YIRePpoVNnQhENnxtFjLaxNHrT7xIUg==",

```
**[ADDED]**
```
2459        "version": "1.1.12",
2460        "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.12.tgz",
2461        "integrity": "sha512-9T9UjW3r0UW5c1Q7GTwllptXwhvYmEzFhzMfZ9H7FQWt+uZePjZPjBP/W1ZEyZ1twGWom5/56TF4lPcqjnDHcg==",
```
**[REMOVED]**
```
(from line ~2483)
      "version": "4.28.2",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.2.tgz",
      "integrity": "sha512-48xSriZYYg+8qXna9kwqjIVzuQxi+KYWp2+5nCYnYKPTr0LvD89Jqk2Or5ogxz0NUMfIjhh2lIUX/LyX9B4oIg==",

```
**[ADDED]**
```
2483        "version": "4.28.1",
2484        "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.1.tgz",
2485        "integrity": "sha512-ZC5Bd0LgJXgwGqUknZY/vkUQ04r8NXnJZ3yYi4vDmSiZmC/pdSN0NbNRPxZpbtO4uAfDUAFffO8IZoM3Gj8IkA==",
```
**[REMOVED]**
```
(from line ~2504)
        "baseline-browser-mapping": "^2.10.12",
        "caniuse-lite": "^1.0.30001782",
        "electron-to-chromium": "^1.5.328",
        "node-releases": "^2.0.36",
        "update-browserslist-db": "^1.2.3"

```
**[ADDED]**
```
2504          "baseline-browser-mapping": "^2.9.0",
2505          "caniuse-lite": "^1.0.30001759",
2506          "electron-to-chromium": "^1.5.263",
2507          "node-releases": "^2.0.27",
2508          "update-browserslist-db": "^1.2.0"
```
**[REMOVED]**
```
(from line ~2517)
    "node_modules/busboy": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/busboy/-/busboy-1.6.0.tgz",
      "integrity": "sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==",
      "dependencies": {
        "streamsearch": "^1.1.0"
      },
      "engines": {
        "node": ">=10.16.0"
      }
    },

```
**[REMOVED]**
```
(from line ~2518)
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/call-bind/-/call-bind-1.0.9.tgz",
      "integrity": "sha512-a/hy+pNsFUTR+Iz8TCJvXudKVLAnz/DyeSUo10I5yvFDQJBFU2s9uqQpoSrJlroHUKoKqzg+epxyP9lqFdzfBQ==",

```
**[ADDED]**
```
2518        "version": "1.0.8",
2519        "resolved": "https://registry.npmjs.org/call-bind/-/call-bind-1.0.8.tgz",
2520        "integrity": "sha512-oKlSFMcMwpUg2ednkhQ454wfWiU/ul3CkJe/PEHcTKuiX6RpbehUiFMXu13HalGZxfUwCQzZG747YXBn1im9ww==",
```
**[REMOVED]**
```
(from line ~2524)
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "get-intrinsic": "^1.3.0",

```
**[ADDED]**
```
2524          "call-bind-apply-helpers": "^1.0.0",
2525          "es-define-property": "^1.0.0",
2526          "get-intrinsic": "^1.2.4",
```
**[REMOVED]**
```
(from line ~2540)
      "dev": true,

```
**[REMOVED]**
```
(from line ~2587)
      "version": "1.0.30001793",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001793.tgz",
      "integrity": "sha512-iwSsYWaCOoh26cV8NwNRViHlrfUvYsHDfRVcbtmw0Kg6PJIZZXwMkj1442FYLBGkeUf1juAsU3DTfxW579mrPA==",

```
**[ADDED]**
```
2587        "version": "1.0.30001776",
2588        "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001776.tgz",
2589        "integrity": "sha512-sg01JDPzZ9jGshqKSckOQthXnYwOEP50jeVFhaSFbZcOy05TiuuaffDOfcwtCisJ9kNQuLBFibYywv2Bgm9osw==",
```
**[ADDED]**
```
2696      "node_modules/combined-stream": {
2697        "version": "1.0.8",
2698        "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
2699        "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
2700        "license": "MIT",
2701        "dependencies": {
2702          "delayed-stream": "~1.0.0"
2703        },
2704        "engines": {
2705          "node": ">= 0.8"
2706        }
2707      },
```
**[ADDED]**
```
2725      "node_modules/convert-source-map": {
2726        "version": "2.0.0",
2727        "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
2728        "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
2729        "dev": true,
2730        "license": "MIT"
2731      },
```
**[REMOVED]**
```
(from line ~2733)
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.2.tgz",
      "integrity": "sha512-yki5XnKuf750l50uGTllt6kKILY4nQ1eNIQatoXEByZ5dWgnKqbnqmTrBE5B4N7lrMJKQ2ytWMiTO2o0v6Ew/w==",

```
**[ADDED]**
```
2733        "version": "1.1.1",
2734        "resolved": "https://registry.npmjs.org/cookie/-/cookie-1.1.1.tgz",
2735        "integrity": "sha512-ei8Aos7ja0weRpFzJnEA9UHJ/7XQmqglbRwnf2ATjcB9Wq874VKH9kfjjirM6UhU2/E5fFYadylyhFldcqSidQ==",
```
**[REMOVED]**
```
(from line ~2738)
        "node": ">= 0.6"

```
**[ADDED]**
```
2738          "node": ">=18"
2739        },
2740        "funding": {
2741          "type": "opencollective",
2742          "url": "https://opencollective.com/express"
```
**[ADDED]**
```
2908      "node_modules/delayed-stream": {
2909        "version": "1.0.0",
2910        "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
2911        "integrity": "sha512-ZySD7Nf91aLB0RxL4KGrKHBXl7Eds1DAmEdcoVawXnLD7SDhpNgtuII2aAkg7a7QS41jxPSZ17p4VdGnMHk3MQ==",
2912        "license": "MIT",
2913        "engines": {
2914          "node": ">=0.4.0"
2915        }
2916      },
2917      "node_modules/detect-libc": {
2918        "version": "2.1.2",
2919        "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
2920        "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
2921        "license": "Apache-2.0",
2922        "optional": true,
2923        "engines": {
2924          "node": ">=8"
2925        }
2926      },
```
**[REMOVED]**
```
(from line ~2940)
    "node_modules/dir-glob": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/dir-glob/-/dir-glob-3.0.1.tgz",
      "integrity": "sha512-WkrWp9GR4KXfKGYzOLmTuGVi1UWFfws377n9cc55/tb6DuqyF6pcQ5AbiHEshaDpY9v6oaSr2XCDidGmMwdzIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "path-type": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },

```
**[REMOVED]**
```
(from line ~2948)
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-3.0.0.tgz",
      "integrity": "sha512-yS+Q5i3hBf7GBkd4KG8a7eBNNWNGLTaEwwYWUijIYM7zrlYDM0BFXHjjPWlWZ1Rg7UaddZeIDmi9jF3HmqiQ2w==",

```
**[ADDED]**
```
2948        "version": "2.1.0",
2949        "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
2950        "integrity": "sha512-35mSku4ZXK0vfCuHEDAwt55dg2jNajHZ1odvF+8SSr82EsZY4QmXfuWso8oEd8zRhVObSN18aM0CjSdoBX7zIw==",
```
**[REMOVED]**
```
(from line ~2957)
        "node": ">=6.0.0"

```
**[ADDED]**
```
2957          "node": ">=0.10.0"
```
**[REMOVED]**
```
(from line ~2973)
      "dev": true,

```
**[REMOVED]**
```
(from line ~2983)
    "node_modules/eastasianwidth": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/eastasianwidth/-/eastasianwidth-0.2.0.tgz",
      "integrity": "sha512-I88TYZWc9XiYHRQ4/3c5rjjfgkjhLyW2luGIheGERbNQ6OY7yTybanSpDXZa8y7VUP9YmDcYa+eyq4ca7iLqWA==",
      "dev": true,
      "license": "MIT"
    },

```
**[REMOVED]**
```
(from line ~2984)
      "version": "1.5.364",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.364.tgz",
      "integrity": "sha512-G/dYE3+AYhyHwzTwg8UbnXf7zqMERYh7l2jJ3QujhFsH8agSYwtnGAR2aZ7f0AakIKJXd5En/Hre4igIUrdlYw==",

```
**[ADDED]**
```
2984        "version": "1.5.307",
2985        "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.307.tgz",
2986        "integrity": "sha512-5z3uFKBWjiNR44nFcYdkcXjKMbg5KXNdciu7mhTPo9tB7NbqSNP2sSnGR+fqknZSCwKkBN+oxiiajWs4dT6ORg==",
```
**[REMOVED]**
```
(from line ~2998)
      "version": "1.24.2",
      "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.24.2.tgz",
      "integrity": "sha512-2FpH9Q5i2RRwyEP1AylXe6nYLR5OhaJTZwmlcP0dL/+JCbgg7yyEo/sEK6HeGZRf3dFpWwThaRHVApXSkW3xeg==",

```
**[ADDED]**
```
2998        "version": "1.24.1",
2999        "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.24.1.tgz",
3000        "integrity": "sha512-zHXBLhP+QehSSbsS9Pt23Gg964240DPd6QCf8WpkqEXxQ7fhdZzYsocOr5u7apWonsS5EjZDmTF+/slGMyasvw==",
```
**[REMOVED]**
```
(from line ~3070)
      "dev": true,

```
**[REMOVED]**
```
(from line ~3079)
      "dev": true,

```
**[REMOVED]**
```
(from line ~3085)
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/es-iterator-helpers/-/es-iterator-helpers-1.3.2.tgz",
      "integrity": "sha512-HVLACW1TppGYjJ8H6/jqH/pqOtKRw6wMlrB23xfExmFWxFquAIWCmwoLsOyN96K4a5KbmOf5At9ZUO3GZbetAw==",

```
**[ADDED]**
```
3085        "version": "1.2.2",
3086        "resolved": "https://registry.npmjs.org/es-iterator-helpers/-/es-iterator-helpers-1.2.2.tgz",
3087        "integrity": "sha512-BrUQ0cPTB/IwXj23HtwHjS9n7O4h9FX94b4xc5zlTHxeLgTAdzYUDyy6KdExAl9lbN5rtfe44xpjpmj9grxs5w==",
```
**[REMOVED]**
```
(from line ~3091)
        "call-bind": "^1.0.9",

```
**[ADDED]**
```
3091          "call-bind": "^1.0.8",
```
**[REMOVED]**
```
(from line ~3094)
        "es-abstract": "^1.24.2",

```
**[ADDED]**
```
3094          "es-abstract": "^1.24.1",
```
**[REMOVED]**
```
(from line ~3106)
        "math-intrinsics": "^1.1.0"

```
**[ADDED]**
```
3106          "safe-array-concat": "^1.1.3"
```
**[REMOVED]**
```
(from line ~3113)
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.2.tgz",
      "integrity": "sha512-HWcBoN6NileqtSydK2FqHbS/LoDd2pqrnQHLyJzBj4kOp/ky2MWMN694xOfkK8/SnUsW2DH7EfyVlydKCsm1Zw==",
      "dev": true,

```
**[ADDED]**
```
3113        "version": "1.1.1",
3114        "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
3115        "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
```
**[REMOVED]**
```
(from line ~3128)
      "dev": true,

```
**[REMOVED]**
```
(from line ~3194)
      "version": "8.57.1",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-8.57.1.tgz",
      "integrity": "sha512-ypowyDxpVSYpkXr9WPv2PAZCtNip1Mv5KTW0SCurXv/9iOpcrH9PaqUElksqEB6pChqHGDRCFTyrZlGhnLNGiA==",
      "deprecated": "This version is no longer supported. Please see https://eslint.org/version-support for other options.",

```
**[ADDED]**
```
3194        "version": "9.39.3",
3195        "resolved": "https://registry.npmjs.org/eslint/-/eslint-9.39.3.tgz",
3196        "integrity": "sha512-VmQ+sifHUbI/IcSopBCF/HO3YiHQx/AVd3UVyYL6weuwW+HvON9VYn5l6Zl1WZzPWXPNZrSQpxwkkZ/VuvJZzg==",
```
**[REMOVED]**
```
(from line ~3201)
        "@eslint-community/eslint-utils": "^4.2.0",
        "@eslint-community/regexpp": "^4.6.1",
        "@eslint/eslintrc": "^2.1.4",
        "@eslint/js": "8.57.1",
        "@humanwhocodes/config-array": "^0.13.0",

```
**[ADDED]**
```
3201          "@eslint-community/eslint-utils": "^4.8.0",
3202          "@eslint-community/regexpp": "^4.12.1",
3203          "@eslint/config-array": "^0.21.1",
3204          "@eslint/config-helpers": "^0.4.2",
3205          "@eslint/core": "^0.17.0",
3206          "@eslint/eslintrc": "^3.3.1",
3207          "@eslint/js": "9.39.3",
3208          "@eslint/plugin-kit": "^0.4.1",
3209          "@humanfs/node": "^0.16.6",
```
**[REMOVED]**
```
(from line ~3211)
        "@nodelib/fs.walk": "^1.2.8",
        "@ungap/structured-clone": "^1.2.0",

```
**[ADDED]**
```
3211          "@humanwhocodes/retry": "^0.4.2",
3212          "@types/estree": "^1.0.6",
```
**[REMOVED]**
```
(from line ~3215)
        "cross-spawn": "^7.0.2",

```
**[ADDED]**
```
3215          "cross-spawn": "^7.0.6",
```
**[REMOVED]**
```
(from line ~3217)
        "doctrine": "^3.0.0",

```
**[REMOVED]**
```
(from line ~3218)
        "eslint-scope": "^7.2.2",
        "eslint-visitor-keys": "^3.4.3",
        "espree": "^9.6.1",
        "esquery": "^1.4.2",

```
**[ADDED]**
```
3218          "eslint-scope": "^8.4.0",
3219          "eslint-visitor-keys": "^4.2.1",
3220          "espree": "^10.4.0",
3221          "esquery": "^1.5.0",
```
**[REMOVED]**
```
(from line ~3224)
        "file-entry-cache": "^6.0.1",

```
**[ADDED]**
```
3224          "file-entry-cache": "^8.0.0",
```
**[REMOVED]**
```
(from line ~3227)
        "globals": "^13.19.0",
        "graphemer": "^1.4.0",

```
**[REMOVED]**
```
(from line ~3230)
        "is-path-inside": "^3.0.3",
        "js-yaml": "^4.1.0",

```
**[REMOVED]**
```
(from line ~3231)
        "levn": "^0.4.1",

```
**[REMOVED]**
```
(from line ~3234)
        "optionator": "^0.9.3",
        "strip-ansi": "^6.0.1",
        "text-table": "^0.2.0"

```
**[ADDED]**
```
3234          "optionator": "^0.9.3"
```
**[REMOVED]**
```
(from line ~3240)
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"

```
**[ADDED]**
```
3240          "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
```
**[REMOVED]**
```
(from line ~3243)
        "url": "https://opencollective.com/eslint"

```
**[ADDED]**
```
3243          "url": "https://eslint.org/donate"
3244        },
3245        "peerDependencies": {
3246          "jiti": "*"
3247        },
3248        "peerDependenciesMeta": {
3249          "jiti": {
3250            "optional": true
3251          }
```
**[REMOVED]**
```
(from line ~3255)
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/eslint-config-next/-/eslint-config-next-14.2.5.tgz",
      "integrity": "sha512-zogs9zlOiZ7ka+wgUnmcM0KBEDjo4Jis7kxN1jvC0N4wynQ2MIx/KBkg4mVF63J5EK4W0QMCn7xO3vNisjaAoA==",

```
**[ADDED]**
```
3255        "version": "16.1.6",
3256        "resolved": "https://registry.npmjs.org/eslint-config-next/-/eslint-config-next-16.1.6.tgz",
3257        "integrity": "sha512-vKq40io2B0XtkkNDYyleATwblNt8xuh3FWp8SpSz3pt7P01OkBFlKsJZ2mWt5WsCySlDQLckb1zMY9yE9Qy0LA==",
```
**[REMOVED]**
```
(from line ~3261)
        "@next/eslint-plugin-next": "14.2.5",
        "@rushstack/eslint-patch": "^1.3.3",
        "@typescript-eslint/parser": "^5.4.2 || ^6.0.0 || 7.0.0 - 7.2.0",

```
**[ADDED]**
```
3261          "@next/eslint-plugin-next": "16.1.6",
```
**[REMOVED]**
```
(from line ~3264)
        "eslint-plugin-import": "^2.28.1",
        "eslint-plugin-jsx-a11y": "^6.7.1",
        "eslint-plugin-react": "^7.33.2",
        "eslint-plugin-react-hooks": "^4.5.0 || 5.0.0-canary-7118f5dd7-20230705"

```
**[ADDED]**
```
3264          "eslint-plugin-import": "^2.32.0",
3265          "eslint-plugin-jsx-a11y": "^6.10.0",
3266          "eslint-plugin-react": "^7.37.0",
3267          "eslint-plugin-react-hooks": "^7.0.0",
3268          "globals": "16.4.0",
3269          "typescript-eslint": "^8.46.0"
```
**[REMOVED]**
```
(from line ~3272)
        "eslint": "^7.23.0 || ^8.0.0",

```
**[ADDED]**
```
3272          "eslint": ">=9.0.0",
```
**[ADDED]**
```
3281      "node_modules/eslint-config-next/node_modules/globals": {
3282        "version": "16.4.0",
3283        "resolved": "https://registry.npmjs.org/globals/-/globals-16.4.0.tgz",
3284        "integrity": "sha512-ob/2LcVVaVGCYN+r14cnwnoDPUufjiYgSqRhiFD0Q1iI4Odora5RE8Iv1D24hAz5oMophRGkGz+yuvQmmUMnMw==",
3285        "dev": true,
3286        "license": "MIT",
3287        "engines": {
3288          "node": ">=18"
3289        },
3290        "funding": {
3291          "url": "https://github.com/sponsors/sindresorhus"
3292        }
3293      },
```
**[REMOVED]**
```
(from line ~3295)
      "version": "0.3.10",
      "resolved": "https://registry.npmjs.org/eslint-import-resolver-node/-/eslint-import-resolver-node-0.3.10.tgz",
      "integrity": "sha512-tRrKqFyCaKict5hOd244sL6EQFNycnMQnBe+j8uqGNXYzsImGbGUU4ibtoaBmv5FLwJwcFJNeg1GeVjQfbMrDQ==",

```
**[ADDED]**
```
3295        "version": "0.3.9",
3296        "resolved": "https://registry.npmjs.org/eslint-import-resolver-node/-/eslint-import-resolver-node-0.3.9.tgz",
3297        "integrity": "sha512-WFj2isz22JahUv+B788TlO3N6zL3nNJGU8CcZbPZvVEkBPaJdCV4vy5wyghty5ROFbCRnm132v8BScu5/1BQ8g==",
```
**[REMOVED]**
```
(from line ~3302)
        "is-core-module": "^2.16.1",
        "resolve": "^2.0.0-next.6"

```
**[ADDED]**
```
3302          "is-core-module": "^2.13.0",
3303          "resolve": "^1.22.4"
```
**[REMOVED]**
```
(from line ~3352)
      "version": "2.13.0",
      "resolved": "https://registry.npmjs.org/eslint-module-utils/-/eslint-module-utils-2.13.0.tgz",
      "integrity": "sha512-bLohSkT6469rRs8czj0tLTD8vaeIS/whvPRJVjDr7IuoTT1k5DYDERlNycjDj/HkOlvQdYurmfZ/g3fG5bgeLQ==",

```
**[ADDED]**
```
3352        "version": "2.12.1",
3353        "resolved": "https://registry.npmjs.org/eslint-module-utils/-/eslint-module-utils-2.12.1.tgz",
3354        "integrity": "sha512-L8jSWTze7K2mTg0vos/RuLRS5soomksDPoJLXIslC7c8Wmut3bx7CPpJijDcBZtxQ5lrbUdM+s0OlNbz0DCDNw==",
```
**[REMOVED]**
```
(from line ~3423)
    "node_modules/eslint-plugin-import/node_modules/doctrine": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
      "integrity": "sha512-35mSku4ZXK0vfCuHEDAwt55dg2jNajHZ1odvF+8SSr82EsZY4QmXfuWso8oEd8zRhVObSN18aM0CjSdoBX7zIw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "esutils": "^2.0.2"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/eslint-plugin-import/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },

```
**[REMOVED]**
```
(from line ~3487)
      "version": "5.0.0-canary-7118f5dd7-20230705",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-5.0.0-canary-7118f5dd7-20230705.tgz",
      "integrity": "sha512-AZYbMo/NW9chdL7vk6HQzQhT+PvTAEVqWk9ziruUoW2kAOcN5qNyelv70e0F1VNQAbvutOC9oc+xfWycI9FxDw==",

```
**[ADDED]**
```
3487        "version": "7.0.1",
3488        "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-7.0.1.tgz",
3489        "integrity": "sha512-O0d0m04evaNzEPoSW+59Mezf8Qt0InfgGIBJnpC0h3NH/WjUAR7BIKUfysC6todmtiZ/A0oUVS8Gce0WhBrHsA==",
```
**[ADDED]**
```
3492        "dependencies": {
3493          "@babel/core": "^7.24.4",
3494          "@babel/parser": "^7.24.4",
3495          "hermes-parser": "^0.25.1",
3496          "zod": "^3.25.0 || ^4.0.0",
3497          "zod-validation-error": "^3.5.0 || ^4.0.0"
3498        },
```
**[REMOVED]**
```
(from line ~3500)
        "node": ">=10"

```
**[ADDED]**
```
3500          "node": ">=18"
```
**[REMOVED]**
```
(from line ~3503)
        "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0"

```
**[ADDED]**
```
3503          "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0"
```
**[REMOVED]**
```
(from line ~3506)
    "node_modules/eslint-plugin-react/node_modules/doctrine": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
      "integrity": "sha512-35mSku4ZXK0vfCuHEDAwt55dg2jNajHZ1odvF+8SSr82EsZY4QmXfuWso8oEd8zRhVObSN18aM0CjSdoBX7zIw==",

```
**[ADDED]**
```
3506      "node_modules/eslint-plugin-react/node_modules/resolve": {
3507        "version": "2.0.0-next.6",
3508        "resolved": "https://registry.npmjs.org/resolve/-/resolve-2.0.0-next.6.tgz",
3509        "integrity": "sha512-3JmVl5hMGtJ3kMmB3zi3DL25KfkCEyy3Tw7Gmw7z5w8M9WlwoPFnIvwChzu1+cF3iaK3sp18hhPz8ANeimdJfA==",
```
**[REMOVED]**
```
(from line ~3511)
      "license": "Apache-2.0",

```
**[ADDED]**
```
3511        "license": "MIT",
```
**[REMOVED]**
```
(from line ~3513)
        "esutils": "^2.0.2"

```
**[ADDED]**
```
3513          "es-errors": "^1.3.0",
3514          "is-core-module": "^2.16.1",
3515          "node-exports-info": "^1.6.0",
3516          "object-keys": "^1.1.1",
3517          "path-parse": "^1.0.7",
3518          "supports-preserve-symlinks-flag": "^1.0.0"
```
**[ADDED]**
```
3520        "bin": {
3521          "resolve": "bin/resolve"
3522        },
```
**[REMOVED]**
```
(from line ~3524)
        "node": ">=0.10.0"

```
**[ADDED]**
```
3524          "node": ">= 0.4"
3525        },
3526        "funding": {
3527          "url": "https://github.com/sponsors/ljharb"
```
**[REMOVED]**
```
(from line ~3530)
    "node_modules/eslint-plugin-react/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },

```
**[REMOVED]**
```
(from line ~3531)
      "version": "7.2.2",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-7.2.2.tgz",
      "integrity": "sha512-dOt21O7lTMhDM+X9mB4GX+DZrZtCUJPL/wlcTqxyrx5IvO0IYtILdtrQGQp+8n5S0gwSVmOf9NQrjMOgfQZlIg==",

```
**[ADDED]**
```
3531        "version": "8.4.0",
3532        "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-8.4.0.tgz",
3533        "integrity": "sha512-sNXOfKCn74rt8RICKMvJS7XKV/Xk9kA7DyJr8mJik3S7Cwgy3qlkkmyS2uQB3jiJg6VNdZd/pDBJu0nvG2NlTg==",
```
**[REMOVED]**
```
(from line ~3541)
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"

```
**[ADDED]**
```
3541          "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
```
**[REMOVED]**
```
(from line ~3548)
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",

```
**[ADDED]**
```
3548        "version": "4.2.1",
3549        "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-4.2.1.tgz",
3550        "integrity": "sha512-Uhdk5sfqcee/9H/rCOJikYz67o0a2Tw2hGRPOG2Y1R2dg7brRe1uG0yaNQDHu+TO/uQPF/5eCapvYSmHUjt7JQ==",
```
**[REMOVED]**
```
(from line ~3554)
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"

```
**[ADDED]**
```
3554          "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
```
**[REMOVED]**
```
(from line ~3561)
      "version": "9.6.1",
      "resolved": "https://registry.npmjs.org/espree/-/espree-9.6.1.tgz",
      "integrity": "sha512-oruZaFkjorTpF32kDSI5/75ViwGeZginGGy2NoOSg3Q9bnwlnmDm4HLnkl0RE3n+njDXR037aY1+x58Z/zFdwQ==",

```
**[ADDED]**
```
3561        "version": "10.4.0",
3562        "resolved": "https://registry.npmjs.org/espree/-/espree-10.4.0.tgz",
3563        "integrity": "sha512-j6PAQ2uUr79PZhBjP5C5fhl8e39FmRnOjsD5lGnWrFU8i2G776tBK7+nP8KuQUTTyAZUwfQqXAgrVH5MbH9CYQ==",
```
**[REMOVED]**
```
(from line ~3567)
        "acorn": "^8.9.0",

```
**[ADDED]**
```
3567          "acorn": "^8.15.0",
```
**[REMOVED]**
```
(from line ~3569)
        "eslint-visitor-keys": "^3.4.1"

```
**[ADDED]**
```
3569          "eslint-visitor-keys": "^4.2.1"
```
**[REMOVED]**
```
(from line ~3572)
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"

```
**[ADDED]**
```
3572          "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
```
**[ADDED]**
```
3624      "node_modules/event-target-shim": {
3625        "version": "5.0.1",
3626        "resolved": "https://registry.npmjs.org/event-target-shim/-/event-target-shim-5.0.1.tgz",
3627        "integrity": "sha512-i/2XbnSz/uxRCU6+NdVJgKWDTM427+MqYbkQzD321DuCQJUqOuJKIA0IM2+W2xtYHdKOmZ4dR6fExsd4SXL+WQ==",
3628        "license": "MIT",
3629        "engines": {
3630          "node": ">=6"
3631        }
3632      },
```
**[REMOVED]**
```
(from line ~3641)
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",

```
**[ADDED]**
```
3641        "version": "3.3.1",
3642        "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.1.tgz",
3643        "integrity": "sha512-kNFPyjhh5cKjrUltxs+wFx+ZkbRaxxmZ+X0ZU31SOsxCEtP9VPgtq2teZw1DebupL5GmDaNQ6yKMMVcM41iqDg==",
```
**[REMOVED]**
```
(from line ~3651)
        "micromatch": "^4.0.8"

```
**[ADDED]**
```
3651          "micromatch": "^4.0.4"
```
**[REMOVED]**
```
(from line ~3695)
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-6.0.1.tgz",
      "integrity": "sha512-7Gps/XWymbLk2QLYK4NzpMOrYjMhdIxXuIvy2QBsLE6ljuodKvdkWs/cpyJJ3CVIVpH0Oi1Hvg1ovbMzLdFBBg==",

```
**[ADDED]**
```
3695        "version": "8.0.0",
3696        "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-8.0.0.tgz",
3697        "integrity": "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ==",
```
**[REMOVED]**
```
(from line ~3701)
        "flat-cache": "^3.0.4"

```
**[ADDED]**
```
3701          "flat-cache": "^4.0.0"
```
**[REMOVED]**
```
(from line ~3704)
        "node": "^10.12.0 || >=12.0.0"

```
**[ADDED]**
```
3704          "node": ">=16.0.0"
```
**[REMOVED]**
```
(from line ~3738)
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-3.2.0.tgz",
      "integrity": "sha512-CYcENa+FtcUKLmhhqyctpclsq7QF38pKjZHsGNiSQF5r4FtoKDWabFDl3hzaEQMvT1LHEysw5twgLvpYYb4vbw==",

```
**[ADDED]**
```
3738        "version": "4.0.1",
3739        "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-4.0.1.tgz",
3740        "integrity": "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw==",
```
**[REMOVED]**
```
(from line ~3745)
        "keyv": "^4.5.3",
        "rimraf": "^3.0.2"

```
**[ADDED]**
```
3745          "keyv": "^4.5.4"
```
**[REMOVED]**
```
(from line ~3748)
        "node": "^10.12.0 || >=12.0.0"

```
**[ADDED]**
```
3748          "node": ">=16"
```
**[REMOVED]**
```
(from line ~3752)
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.4.2.tgz",
      "integrity": "sha512-PjDse7RzhcPkIJwy5t7KPWQSZ9cAbzQXcafsetQoD7sOJRQlGikNbx7yZp2OotDnJyrDcbyRq3Ttb18iYOqkxA==",

```
**[ADDED]**
```
3752        "version": "3.3.4",
3753        "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.3.4.tgz",
3754        "integrity": "sha512-3+mMldrTAPdta5kjX2G2J7iX4zxtnwpdA8Tr2ZSjkyPSanvbZAcy6flmtnXbEybHrDcU9641lxrMfFuUxVz9vA==",
```
**[REMOVED]**
```
(from line ~3774)
    "node_modules/foreground-child": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/foreground-child/-/foreground-child-3.3.1.tgz",
      "integrity": "sha512-gIXjKqtFuWEgzFRJA9WCQeSJLZDjgJUOMCMzxtvFq/37KojM1BFGufqsCy0r4qSQmYLsZYMeyRqzIWOMup03sw==",
      "dev": true,
      "license": "ISC",

```
**[ADDED]**
```
3774      "node_modules/form-data": {
3775        "version": "4.0.5",
3776        "resolved": "https://registry.npmjs.org/form-data/-/form-data-4.0.5.tgz",
3777        "integrity": "sha512-8RipRLol37bNs2bhoV67fiTEvdTrbMUYcFTiy3+wuuOnUog2QBHCZWXDRijWQfAkhBj2Uf5UnVaiWwA5vdd82w==",
3778        "license": "MIT",
```
**[REMOVED]**
```
(from line ~3780)
        "cross-spawn": "^7.0.6",
        "signal-exit": "^4.0.1"

```
**[ADDED]**
```
3780          "asynckit": "^0.4.0",
3781          "combined-stream": "^1.0.8",
3782          "es-set-tostringtag": "^2.1.0",
3783          "hasown": "^2.0.2",
3784          "mime-types": "^2.1.12"
```
**[REMOVED]**
```
(from line ~3787)
        "node": ">=14"

```
**[ADDED]**
```
3787          "node": ">= 6"
3788        }
3789      },
3790      "node_modules/form-data-encoder": {
3791        "version": "1.7.2",
3792        "resolved": "https://registry.npmjs.org/form-data-encoder/-/form-data-encoder-1.7.2.tgz",
3793        "integrity": "sha512-qfqtYan3rxrnCk1VYaA4H+Ms9xdpPqvLZa6xmMgFvhO32x7/3J/ExcTd6qpxM0vH2GdMI+poehyBZvqfMTto8A==",
3794        "license": "MIT"
3795      },
3796      "node_modules/formdata-node": {
3797        "version": "4.4.1",
3798        "resolved": "https://registry.npmjs.org/formdata-node/-/formdata-node-4.4.1.tgz",
3799        "integrity": "sha512-0iirZp3uVDjVGt9p49aTaqjk84TrglENEDuqfdlZQ1roC9CWlPk6Avf8EEnZNcAqPonwkG35x4n3ww/1THYAeQ==",
3800        "license": "MIT",
3801        "dependencies": {
3802          "node-domexception": "1.0.0",
3803          "web-streams-polyfill": "4.0.0-beta.3"
```
**[REMOVED]**
```
(from line ~3805)
      "funding": {
        "url": "https://github.com/sponsors/isaacs"

```
**[ADDED]**
```
3805        "engines": {
3806          "node": ">= 12.20"
```
**[REMOVED]**
```
(from line ~3850)
    "node_modules/fs.realpath": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
      "integrity": "sha512-OO0pH2lK6a0hZnAdau5ItzHPI6pUlvI7jMVnxUQRtw4owF2wk8lOSabtGDCTP4Ggrg2MbGnWO9X8K1t4+fGMDw==",
      "dev": true,
      "license": "ISC"
    },

```
**[REMOVED]**
```
(from line ~3869)
      "dev": true,

```
**[ADDED]**
```
3915      "node_modules/gensync": {
3916        "version": "1.0.0-beta.2",
3917        "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
3918        "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
3919        "dev": true,
3920        "license": "MIT",
3921        "engines": {
3922          "node": ">=6.9.0"
3923        }
3924      },
```
**[REMOVED]**
```
(from line ~3929)
      "dev": true,

```
**[REMOVED]**
```
(from line ~3953)
      "dev": true,

```
**[REMOVED]**
```
(from line ~3981)
      "version": "4.14.0",
      "resolved": "https://registry.npmjs.org/get-tsconfig/-/get-tsconfig-4.14.0.tgz",
      "integrity": "sha512-yTb+8DXzDREzgvYmh6s9vHsSVCHeC0G3PI5bEXNBHtmshPnO+S5O7qgLEOn0I5QvMy6kpZN8K1NKGyilLb93wA==",

```
**[ADDED]**
```
3981        "version": "4.13.6",
3982        "resolved": "https://registry.npmjs.org/get-tsconfig/-/get-tsconfig-4.13.6.tgz",
3983        "integrity": "sha512-shZT/QMiSHc/YBLxxOkMtgSid5HFoauqCE3/exfsEcwg1WkeqjG+V40yBbBrsD+jW2HDXcs28xOfcbm2jI8Ddw==",
```
**[REMOVED]**
```
(from line ~3993)
    "node_modules/glob": {
      "version": "10.3.10",
      "resolved": "https://registry.npmjs.org/glob/-/glob-10.3.10.tgz",
      "integrity": "sha512-fa46+tv1Ak0UPK1TOy/pZrIybNNt4HCv7SDzwyfiOZkvZLEbjsZkJBPtDHVshZjbecAoAGSC20MjLDG/qr679g==",
      "deprecated": "Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "foreground-child": "^3.1.0",
        "jackspeak": "^2.3.5",
        "minimatch": "^9.0.1",
        "minipass": "^5.0.0 || ^6.0.2 || ^7.0.0",
        "path-scurry": "^1.10.1"
      },
      "bin": {
        "glob": "dist/esm/bin.mjs"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },

```
**[REMOVED]**
```
(from line ~4006)
    "node_modules/glob/node_modules/brace-expansion": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.1.1.tgz",
      "integrity": "sha512-WR1cURNjuvBLMZBMbqM0UoE+WAfdUcEV1ccD8PVBVOI+Z3ND4+SZbN8RsfT2bMuG1qwz5RFvPukSZm5fF2D5eA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0"
      }
    },
    "node_modules/glob/node_modules/minimatch": {
      "version": "9.0.9",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-9.0.9.tgz",
      "integrity": "sha512-OBwBN9AL4dqmETlpS2zasx+vTeWclWzkblfZk7KTA5j3jeOONz/tRCnZomUyvNg83wL5Zv9Ss6HMJXAgL8R2Yg==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^2.0.2"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },

```
**[REMOVED]**
```
(from line ~4007)
      "version": "13.24.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-13.24.0.tgz",
      "integrity": "sha512-AhO5QUcj8llrbG09iWhPU2B204J1xnPeL8kQmVorSsy+Sjj1sk8gIyh6cUocGmH4L0UuhAJy+hJMRA4mgA4mFQ==",

```
**[ADDED]**
```
4007        "version": "14.0.0",
4008        "resolved": "https://registry.npmjs.org/globals/-/globals-14.0.0.tgz",
4009        "integrity": "sha512-oahGvuMGQlPw/ivIYBjVSrWAfWLBeku5tpPE2fOPLi+WHffIWbuh2tCjhyQhTBPMf5E9jDEH4FOmTYgYwbKwtQ==",
```
**[REMOVED]**
```
(from line ~4012)
      "dependencies": {
        "type-fest": "^0.20.2"
      },

```
**[REMOVED]**
```
(from line ~4013)
        "node": ">=8"

```
**[ADDED]**
```
4013          "node": ">=18"
```
**[REMOVED]**
```
(from line ~4036)
    "node_modules/globby": {
      "version": "11.1.0",
      "resolved": "https://registry.npmjs.org/globby/-/globby-11.1.0.tgz",
      "integrity": "sha512-jhIXaOzy1sb8IyocaruWSn1TjmnBVs8Ayhcy83rmxNJ8q2uWKCAj3CnJY+KpGSXCueAPc0i05kVvVKtP1t9S3g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-union": "^2.1.0",
        "dir-glob": "^3.0.1",
        "fast-glob": "^3.2.9",
        "ignore": "^5.2.0",
        "merge2": "^1.4.1",
        "slash": "^3.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },

```
**[REMOVED]**
```
(from line ~4040)
      "dev": true,

```
**[REMOVED]**
```
(from line ~4048)
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "license": "ISC"
    },
    "node_modules/graphemer": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/graphemer/-/graphemer-1.4.0.tgz",
      "integrity": "sha512-EtKwoO6kxCL9WO5xipiHTZlSzBm7WLT627TqC/uVRd0HKmq8NXyebnNYxDoBi7wt8eTWrUrKXCOVaFq9x1kgag==",
      "dev": true,
      "license": "MIT"
    },

```
**[REMOVED]**
```
(from line ~4104)
      "dev": true,

```
**[REMOVED]**
```
(from line ~4116)
      "dev": true,

```
**[REMOVED]**
```
(from line ~4128)
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.4.tgz",
      "integrity": "sha512-T2UbfbBEF32wiepXIsMlTW9+dDYC6wMh/t/vYA4tuOMKqWz/n3vr1NFSxQiyP+zk2mXsoMA/i/7qV6LKut1t1A==",
      "dev": true,

```
**[ADDED]**
```
4128        "version": "2.0.2",
4129        "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
4130        "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
```
**[ADDED]**
```
4139      "node_modules/hermes-estree": {
4140        "version": "0.25.1",
4141        "resolved": "https://registry.npmjs.org/hermes-estree/-/hermes-estree-0.25.1.tgz",
4142        "integrity": "sha512-0wUoCcLp+5Ev5pDW2OriHC2MJCbwLwuRx+gAqMTOkGKJJiBCLjtrvy4PWUGn6MIVefecRpzoOZ/UV6iGdOr+Cw==",
4143        "dev": true,
4144        "license": "MIT"
4145      },
4146      "node_modules/hermes-parser": {
4147        "version": "0.25.1",
4148        "resolved": "https://registry.npmjs.org/hermes-parser/-/hermes-parser-0.25.1.tgz",
4149        "integrity": "sha512-6pEjquH3rqaI6cYAXYPcz9MS4rY6R4ngRgrgfDshRptUZIc3lw0MCIJIGDj9++mfySOuPTHB4nrSW99BCvOPIA==",
4150        "dev": true,
4151        "license": "MIT",
4152        "dependencies": {
4153          "hermes-estree": "0.25.1"
4154        }
4155      },
4156      "node_modules/humanize-ms": {
4157        "version": "1.2.1",
4158        "resolved": "https://registry.npmjs.org/humanize-ms/-/humanize-ms-1.2.1.tgz",
4159        "integrity": "sha512-Fl70vYtsAFb/C06PTS9dZBo7ihau+Tu/DNCk/OyHhea07S+aeMWpFFkUaXRa8fI+ScZbEI8dfSxwY7gxZ9SAVQ==",
4160        "license": "MIT",
4161        "dependencies": {
4162          "ms": "^2.0.0"
4163        }
4164      },
```
**[REMOVED]**
```
(from line ~4217)
    "node_modules/inflight": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
      "integrity": "sha512-k92I/b08q4wvFscXCLvqfsHCrjrF7yiXsQuIVvVE7N82W3+aqpzuUdBbfhWcy/FZR3/4IgflMgKLOsvPDrGCJA==",
      "deprecated": "This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "once": "^1.3.0",
        "wrappy": "1"
      }
    },

```
**[ADDED]**
```
4332      "node_modules/is-bun-module/node_modules/semver": {
4333        "version": "7.7.4",
4334        "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.4.tgz",
4335        "integrity": "sha512-vFKC2IEtQnVhpT78h1Yp8wzwrf8CM+MzKMHGJZfBtzhZNycRFnXsHk6E5TxIkkMsgNS7mdX3AGB7x2QM2di4lA==",
4336        "dev": true,
4337        "license": "ISC",
4338        "bin": {
4339          "semver": "bin/semver.js"
4340        },
4341        "engines": {
4342          "node": ">=10"
4343        }
4344      },
```
**[REMOVED]**
```
(from line ~4359)
      "version": "2.16.2",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.2.tgz",
      "integrity": "sha512-evOr8xfXKxE6qSR0hSXL2r3sd7ALj8+7jQEUvPYcm5sgZFdJ+AYzT6yNmJenvIYQBgIGwfwz08sL8zoL7yq2BA==",

```
**[ADDED]**
```
4359        "version": "2.16.1",
4360        "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.1.tgz",
4361        "integrity": "sha512-UfoeMA6fIJ8wTYFEUjelnaGI67v6+N7qXJEvQuIGa99l4xsCruSYOVSQ0uPANn4dAzm8lkYPaKLrrijLq7x23w==",
```
**[REMOVED]**
```
(from line ~4365)
        "hasown": "^2.0.3"

```
**[ADDED]**
```
4365          "hasown": "^2.0.2"
```
**[REMOVED]**
```
(from line ~4435)
    "node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },

```
**[REMOVED]**
```
(from line ~4521)
    "node_modules/is-path-inside": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/is-path-inside/-/is-path-inside-3.0.3.tgz",
      "integrity": "sha512-Fd4gABb+ycGAmKou8eMftCupSir5lRxqf4aD/vd0cD2qc4HL07OjCeuHMr8Ro4CoMaeCKDB0/ECBOVWjTwUvPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },

```
**[REMOVED]**
```
(from line ~4697)
    "node_modules/jackspeak": {
      "version": "2.3.6",
      "resolved": "https://registry.npmjs.org/jackspeak/-/jackspeak-2.3.6.tgz",
      "integrity": "sha512-N3yCS/NegsOBokc8GAdM8UcmfsKiSS8cipheD/nivzr700H+nsMOxJjQnvwOcRYVuFkdH0wGUvW2WbXGmrZGbQ==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "@isaacs/cliui": "^8.0.2"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      },
      "optionalDependencies": {
        "@pkgjs/parseargs": "^0.11.0"
      }
    },

```
**[REMOVED]**
```
(from line ~4715)
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.2.0.tgz",
      "integrity": "sha512-ePWsvanv0DWuDRsW8dnt+R4jQ31SCRCQ7hhNcPXZPsoBZiemuZNYGf7adZdqX2D86j6rvKp3RpCxVTSb8WQlOw==",

```
**[ADDED]**
```
4715        "version": "4.1.1",
4716        "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.1.1.tgz",
4717        "integrity": "sha512-qQKT4zQxXl8lLwBtHMWwaTcGfFOZviOJet3Oy/xmGk2gZH677CJM9EvtfdSkgWcATZhj/55JZ0rmy3myCT5lsA==",
```
**[REMOVED]**
```
(from line ~4719)
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/puzrin"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/nodeca"
        }
      ],

```
**[ADDED]**
```
4727      "node_modules/jsesc": {
4728        "version": "3.1.0",
4729        "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
4730        "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
4731        "dev": true,
4732        "license": "MIT",
4733        "bin": {
4734          "jsesc": "bin/jsesc"
4735        },
4736        "engines": {
4737          "node": ">=6"
4738        }
4739      },
```
**[REMOVED]**
```
(from line ~4762)
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/json5/-/json5-1.0.2.tgz",
      "integrity": "sha512-g1MWMLBiz8FKi1e4w0UyVL3w+iJceWAFBAaBnnGKOpNa5f8TLktkbre1+s6oICydWAm+HRUGTmI+//xv2hvXYA==",

```
**[ADDED]**
```
4762        "version": "2.2.3",
4763        "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
4764        "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
```
**[REMOVED]**
```
(from line ~4767)
      "dependencies": {
        "minimist": "^1.2.0"
      },

```
**[ADDED]**
```
4769        },
4770        "engines": {
4771          "node": ">=6"
```
**[REMOVED]**
```
(from line ~4922)
      "version": "10.4.3",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.4.3.tgz",
      "integrity": "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==",

```
**[ADDED]**
```
4922        "version": "5.1.1",
4923        "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
4924        "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
```
**[REMOVED]**
```
(from line ~4926)
      "license": "ISC"

```
**[ADDED]**
```
4926        "license": "ISC",
4927        "dependencies": {
4928          "yallist": "^3.0.2"
4929        }
```
**[REMOVED]**
```
(from line ~4941)
      "version": "1.12.0",
      "resolved": "https://registry.npmjs.org/mammoth/-/mammoth-1.12.0.tgz",
      "integrity": "sha512-cwnK1RIcRdDMi2HRx2EXGYlxqIEh0Oo3bLhorgnsVJi2UkbX1+jKxuBNR9PC5+JaX7EkmJxFPmo6mjLpqShI2w==",

```
**[ADDED]**
```
4941        "version": "1.11.0",
4942        "resolved": "https://registry.npmjs.org/mammoth/-/mammoth-1.11.0.tgz",
4943        "integrity": "sha512-BcEqqY/BOwIcI1iR5tqyVlqc3KIaMRa4egSoK83YAVrBf6+yqdAAbtUcFDCWX8Zef8/fgNZ6rl4VUv+vVX8ddQ==",
```
**[REMOVED]**
```
(from line ~4977)
      "dev": true,

```
**[ADDED]**
```
5006      "node_modules/mime-db": {
5007        "version": "1.52.0",
5008        "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
5009        "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
5010        "license": "MIT",
5011        "engines": {
5012          "node": ">= 0.6"
5013        }
5014      },
5015      "node_modules/mime-types": {
5016        "version": "2.1.35",
5017        "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
5018        "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
5019        "license": "MIT",
5020        "dependencies": {
5021          "mime-db": "1.52.0"
5022        },
5023        "engines": {
5024          "node": ">= 0.6"
5025        }
5026      },
```
**[REMOVED]**
```
(from line ~5050)
    "node_modules/minipass": {
      "version": "7.1.3",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-7.1.3.tgz",
      "integrity": "sha512-tEBHqDnIoM/1rXME1zgka9g6Q2lcoCkxHLuc7ODJ5BxbP5d4c2Z5cGgtXAku59200Cx7diuHTOYfSBD8n6mm8A==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },

```
**[REMOVED]**
```
(from line ~5069)
      "dev": true,

```
**[REMOVED]**
```
(from line ~5084)
      "version": "3.3.12",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.12.tgz",
      "integrity": "sha512-ZB9RH/39qpq5Vu6Y+NmUaFhQR6pp+M2Xt76XBnEwDaGcVAqhlvxrl3B2bKS5D3NH3QR76v3aSrKaF/Kiy7lEtQ==",

```
**[ADDED]**
```
5084        "version": "3.3.11",
5085        "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.11.tgz",
5086        "integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
```
**[REMOVED]**
```
(from line ~5125)
      "version": "14.2.5",
      "resolved": "https://registry.npmjs.org/next/-/next-14.2.5.tgz",
      "integrity": "sha512-0f8aRfBVL+mpzfBjYfQuLWh2WyAwtJXCRfkPF4UJ5qd2YwrHczsrSzXU4tRMV0OAxR8ZJZWPFn6uhSC56UTsLA==",
      "deprecated": "This version has a security vulnerability. Please upgrade to a patched version. See https://nextjs.org/blog/security-update-2025-12-11 for more details.",

```
**[ADDED]**
```
5125        "version": "16.1.6",
5126        "resolved": "https://registry.npmjs.org/next/-/next-16.1.6.tgz",
5127        "integrity": "sha512-hkyRkcu5x/41KoqnROkfTm2pZVbKxvbZRuNvKXLRXxs3VfyO0WhY50TQS40EuKO9SW3rBj/sF3WbVwDACeMZyw==",
```
**[REMOVED]**
```
(from line ~5130)
        "@next/env": "14.2.5",
        "@swc/helpers": "0.5.5",
        "busboy": "1.6.0",

```
**[ADDED]**
```
5130          "@next/env": "16.1.6",
5131          "@swc/helpers": "0.5.15",
5132          "baseline-browser-mapping": "^2.8.3",
```
**[REMOVED]**
```
(from line ~5134)
        "graceful-fs": "^4.2.11",

```
**[REMOVED]**
```
(from line ~5135)
        "styled-jsx": "5.1.1"

```
**[ADDED]**
```
5135          "styled-jsx": "5.1.6"
```
**[REMOVED]**
```
(from line ~5141)
        "node": ">=18.17.0"

```
**[ADDED]**
```
5141          "node": ">=20.9.0"
```
**[REMOVED]**
```
(from line ~5144)
        "@next/swc-darwin-arm64": "14.2.5",
        "@next/swc-darwin-x64": "14.2.5",
        "@next/swc-linux-arm64-gnu": "14.2.5",
        "@next/swc-linux-arm64-musl": "14.2.5",
        "@next/swc-linux-x64-gnu": "14.2.5",
        "@next/swc-linux-x64-musl": "14.2.5",
        "@next/swc-win32-arm64-msvc": "14.2.5",
        "@next/swc-win32-ia32-msvc": "14.2.5",
        "@next/swc-win32-x64-msvc": "14.2.5"

```
**[ADDED]**
```
5144          "@next/swc-darwin-arm64": "16.1.6",
5145          "@next/swc-darwin-x64": "16.1.6",
5146          "@next/swc-linux-arm64-gnu": "16.1.6",
5147          "@next/swc-linux-arm64-musl": "16.1.6",
5148          "@next/swc-linux-x64-gnu": "16.1.6",
5149          "@next/swc-linux-x64-musl": "16.1.6",
5150          "@next/swc-win32-arm64-msvc": "16.1.6",
5151          "@next/swc-win32-x64-msvc": "16.1.6",
5152          "sharp": "^0.34.4"
```
**[REMOVED]**
```
(from line ~5156)
        "@playwright/test": "^1.41.2",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",

```
**[ADDED]**
```
5156          "@playwright/test": "^1.51.1",
5157          "babel-plugin-react-compiler": "*",
5158          "react": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",
5159          "react-dom": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",
```
**[ADDED]**
```
5169          "babel-plugin-react-compiler": {
5170            "optional": true
5171          },
```
**[ADDED]**
```
5205      "node_modules/node-domexception": {
5206        "version": "1.0.0",
5207        "resolved": "https://registry.npmjs.org/node-domexception/-/node-domexception-1.0.0.tgz",
5208        "integrity": "sha512-/jKZoMpw0F8GRwl4/eLROPA3cfcXtLApP0QzLmUT/HuPCZWyB7IY9ZrMeKw2O/nFIqPQB3PVM9aYm0F312AXDQ==",
5209        "deprecated": "Use your platform's native DOMException instead",
5210        "funding": [
5211          {
5212            "type": "github",
5213            "url": "https://github.com/sponsors/jimmywarting"
5214          },
5215          {
5216            "type": "github",
5217            "url": "https://paypal.me/jimmywarting"
5218          }
5219        ],
5220        "license": "MIT",
5221        "engines": {
5222          "node": ">=10.5.0"
5223        }
5224      },
```
**[REMOVED]**
```
(from line ~5250)
    "node_modules/node-exports-info/node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"

```
**[ADDED]**
```
5250      "node_modules/node-fetch": {
5251        "version": "2.7.0",
5252        "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-2.7.0.tgz",
5253        "integrity": "sha512-c4FRfUm/dbcWZ7U+1Wq0AwCyFL+3nt2bEw05wfxSz+DWpWsitgmSgYmy2dQdWyKC1694ELPqMs/YzUSNozLt8A==",
5254        "license": "MIT",
5255        "dependencies": {
5256          "whatwg-url": "^5.0.0"
5257        },
5258        "engines": {
5259          "node": "4.x || >=6.0.0"
5260        },
5261        "peerDependencies": {
5262          "encoding": "^0.1.0"
5263        },
5264        "peerDependenciesMeta": {
5265          "encoding": {
5266            "optional": true
5267          }
```
**[REMOVED]**
```
(from line ~5271)
      "version": "2.0.46",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.46.tgz",
      "integrity": "sha512-GYVXHE2KnrzAfsAjl4uP++evGFCrAU1jta4ubEjIG7YWt/64Gqv66a30yKwWczVjA6j3bM4nBwH7Pk1JmDHaxQ==",

```
**[ADDED]**
```
5271        "version": "2.0.27",
5272        "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.27.tgz",
5273        "integrity": "sha512-nmh3lCkYZ3grZvqcCH+fjmQ7X+H0OeZgP40OierEaAptX4XofMh5kwNbWh7lBduUzCcV/8kZ+NDLCwm2iorIlA==",
```
**[REMOVED]**
```
(from line ~5275)
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }

```
**[ADDED]**
```
5275        "license": "MIT"
```
**[REMOVED]**
```
(from line ~5420)
    "node_modules/once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
      "dev": true,
      "license": "ISC",

```
**[ADDED]**
```
5420      "node_modules/openai": {
5421        "version": "4.104.0",
5422        "resolved": "https://registry.npmjs.org/openai/-/openai-4.104.0.tgz",
5423        "integrity": "sha512-p99EFNsA/yX6UhVO93f5kJsDRLAg+CTA2RBqdHK4RtK8u5IJw32Hyb2dTGKbnnFmnuoBv5r7Z2CURI9sGZpSuA==",
5424        "license": "Apache-2.0",
```
**[REMOVED]**
```
(from line ~5426)
        "wrappy": "1"

```
**[ADDED]**
```
5426          "@types/node": "^18.11.18",
5427          "@types/node-fetch": "^2.6.4",
5428          "abort-controller": "^3.0.0",
5429          "agentkeepalive": "^4.2.1",
5430          "form-data-encoder": "1.7.2",
5431          "formdata-node": "^4.3.2",
5432          "node-fetch": "^2.6.7"
5433        },
5434        "bin": {
5435          "openai": "bin/cli"
5436        },
5437        "peerDependencies": {
5438          "ws": "^8.18.0",
5439          "zod": "^3.23.8"
5440        },
5441        "peerDependenciesMeta": {
5442          "ws": {
5443            "optional": true
5444          },
5445          "zod": {
5446            "optional": true
5447          }
```
**[ADDED]**
```
5450      "node_modules/openai/node_modules/@types/node": {
5451        "version": "18.19.130",
5452        "resolved": "https://registry.npmjs.org/@types/node/-/node-18.19.130.tgz",
5453        "integrity": "sha512-GRaXQx6jGfL8sKfaIDD6OupbIHBr9jv7Jnaml9tB7l4v068PAOXqfcujMMo5PhbIs6ggR1XODELqahT2R8v0fg==",
5454        "license": "MIT",
5455        "dependencies": {
5456          "undici-types": "~5.26.4"
5457        }
5458      },
5459      "node_modules/openai/node_modules/undici-types": {
5460        "version": "5.26.5",
5461        "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-5.26.5.tgz",
5462        "integrity": "sha512-JlCMO+ehdEIKqlFxk6IfVoAUVmgz7cU7zD/h9XZ0qzeosSHmUJVOzSQvvYSYWXkFXC+IfLKSIffhv0sVZup6pA==",
5463        "license": "MIT"
5464      },
```
**[REMOVED]**
```
(from line ~5594)
    "node_modules/path-scurry": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/path-scurry/-/path-scurry-1.11.1.tgz",
      "integrity": "sha512-Xa4Nw17FS9ApQFJ9umLiJS4orGjm7ZzwUrwamcGQuHSzDyth9boKDaycYdDcZDuqYATXw4HFXgaqWTctW/v1HA==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "lru-cache": "^10.2.0",
        "minipass": "^5.0.0 || ^6.0.2 || ^7.0.0"
      },
      "engines": {
        "node": ">=16 || 14 >=14.18"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/path-type": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-type/-/path-type-4.0.0.tgz",
      "integrity": "sha512-gDKb8aZMDeD/tZWs9P6+q0J9Mwkdl6xMV8TjnGP3qJVJ06bdMgkbBlLU8IdfOsIsFz2BW1rNVT3XuNEl8zPAvw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },

```
**[REMOVED]**
```
(from line ~5617)
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",

```
**[ADDED]**
```
5617        "version": "2.3.1",
5618        "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
5619        "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
```
**[REMOVED]**
```
(from line ~5660)
      "version": "8.5.15",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.15.tgz",
      "integrity": "sha512-FfR8sjd4em2T6fb3I2MwAJU7HWVMr9zba+enmQeeWFfCbm+UOC/0X4DS8XtpUTMwWMGbjKYP7xjfNekzyGmB3A==",

```
**[ADDED]**
```
5660        "version": "8.5.8",
5661        "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.8.tgz",
5662        "integrity": "sha512-OW/rX8O/jXnm82Ey1k44pObPtdblfiuWnrd8X7GJ7emImCOstunGbXUpp7HdBrFQX6rJzn3sPT397Wp5aCwCHg==",
```
**[REMOVED]**
```
(from line ~5681)
        "nanoid": "^3.3.12",

```
**[ADDED]**
```
5681          "nanoid": "^3.3.11",
```
**[REMOVED]**
```
(from line ~5707)
    "node_modules/postcss-import/node_modules/resolve": {
      "version": "1.22.12",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.12.tgz",
      "integrity": "sha512-TyeJ1zif53BPfHootBGwPRYT1RUt6oGWsaQr8UyZW/eAm9bKoijtvruSDEmZHm92CwS9nj7/fWttqPCgzep8CA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },

```
**[REMOVED]**
```
(from line ~5999)
      "version": "2.0.0-next.7",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-2.0.0-next.7.tgz",
      "integrity": "sha512-tqt+NBWwyaMgw3zDsnygx4CByWjQEJHOPMdslYhppaQSJUtL/D4JO9CcBBlhPoI8lz9oJIDXkwXfhF4aWqP8xQ==",

```
**[ADDED]**
```
5999        "version": "1.22.11",
6000        "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.11.tgz",
6001        "integrity": "sha512-RfqAvLnMl313r7c9oclB1HhUEAezcpLjz95wFH4LVuhk9JF/r22qmVP9AMmOU4vMX7Q8pN8jwNg/CSpdFnMjTQ==",
```
**[REMOVED]**
```
(from line ~6005)
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.2",
        "node-exports-info": "^1.6.0",
        "object-keys": "^1.1.1",

```
**[ADDED]**
```
6005          "is-core-module": "^2.16.1",
```
**[REMOVED]**
```
(from line ~6050)
    "node_modules/rimraf": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-3.0.2.tgz",
      "integrity": "sha512-JZkJMZkAGFFPP2YqXZXPbMlMBgsxzE8ILs4lMIX/2o0L9UBw9O/Y3o6wFw/i9YLapcUJWwqbi3kdxIPdC62TIA==",
      "deprecated": "Rimraf versions prior to v4 are no longer supported",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "glob": "^7.1.3"
      },
      "bin": {
        "rimraf": "bin.js"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/rimraf/node_modules/glob": {
      "version": "7.2.3",
      "resolved": "https://registry.npmjs.org/glob/-/glob-7.2.3.tgz",
      "integrity": "sha512-nFR0zLpU2YCaRxwoCJvL6UvCH2JFyFVIvwTLsIf21AuHlMskA1hhTdk+LlYJtOlYt9v6dvszD2BGRqBL+iQK9Q==",
      "deprecated": "Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "fs.realpath": "^1.0.0",
        "inflight": "^1.0.4",
        "inherits": "2",
        "minimatch": "^3.1.1",
        "once": "^1.3.0",
        "path-is-absolute": "^1.0.0"
      },
      "engines": {
        "node": "*"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },

```
**[REMOVED]**
```
(from line ~6075)
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/safe-array-concat/-/safe-array-concat-1.1.4.tgz",
      "integrity": "sha512-wtZlHyOje6OZTGqAoaDKxFkgRtkF9CnHAVnCHKfuj200wAgL+bSJhdsCD2l0Qx/2ekEXjPWcyKkfGb5CPboslg==",

```
**[ADDED]**
```
6075        "version": "1.1.3",
6076        "resolved": "https://registry.npmjs.org/safe-array-concat/-/safe-array-concat-1.1.3.tgz",
6077        "integrity": "sha512-AURm5f0jYEOydBj7VQlVvDrjeFgthDdEF5H1dP+6mNpoXOMo1quQqJ4wvJDyRZ9+pO3kGWoOdmV08cSv2aJV6Q==",
```
**[REMOVED]**
```
(from line ~6081)
        "call-bind": "^1.0.9",
        "call-bound": "^1.0.4",
        "get-intrinsic": "^1.3.0",

```
**[ADDED]**
```
6081          "call-bind": "^1.0.8",
6082          "call-bound": "^1.0.2",
6083          "get-intrinsic": "^1.2.6",
```
**[REMOVED]**
```
(from line ~6159)
      "version": "7.8.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.8.1.tgz",
      "integrity": "sha512-rkVq3IXh+4FDGch+KwzX3aV9W3kO54GyEgpvBzSyctDA6Xtd7RJQV1xmXbeQp5v7+VzLOfVqiutSE6GICgPFvg==",

```
**[ADDED]**
```
6159        "version": "6.3.1",
6160        "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
6161        "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
```
**[REMOVED]**
```
(from line ~6166)
      },
      "engines": {
        "node": ">=10"

```
**[ADDED]**
```
6223      "node_modules/sharp": {
6224        "version": "0.34.5",
6225        "resolved": "https://registry.npmjs.org/sharp/-/sharp-0.34.5.tgz",
6226        "integrity": "sha512-Ou9I5Ft9WNcCbXrU9cMgPBcCK8LiwLqcbywW3t4oDV37n1pzpuNLsYiAV8eODnjbtQlSDwZ2cUEeQz4E54Hltg==",
6227        "hasInstallScript": true,
6228        "license": "Apache-2.0",
6229        "optional": true,
6230        "dependencies": {
6231          "@img/colour": "^1.0.0",
6232          "detect-libc": "^2.1.2",
6233          "semver": "^7.7.3"
6234        },
6235        "engines": {
6236          "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
6237        },
6238        "funding": {
6239          "url": "https://opencollective.com/libvips"
6240        },
6241        "optionalDependencies": {
6242          "@img/sharp-darwin-arm64": "0.34.5",
6243          "@img/sharp-darwin-x64": "0.34.5",
6244          "@img/sharp-libvips-darwin-arm64": "1.2.4",
6245          "@img/sharp-libvips-darwin-x64": "1.2.4",
6246          "@img/sharp-libvips-linux-arm": "1.2.4",
6247          "@img/sharp-libvips-linux-arm64": "1.2.4",
6248          "@img/sharp-libvips-linux-ppc64": "1.2.4",
6249          "@img/sharp-libvips-linux-riscv64": "1.2.4",
6250          "@img/sharp-libvips-linux-s390x": "1.2.4",
6251          "@img/sharp-libvips-linux-x64": "1.2.4",
6252          "@img/sharp-libvips-linuxmusl-arm64": "1.2.4",
6253          "@img/sharp-libvips-linuxmusl-x64": "1.2.4",
6254          "@img/sharp-linux-arm": "0.34.5",
6255          "@img/sharp-linux-arm64": "0.34.5",
6256          "@img/sharp-linux-ppc64": "0.34.5",
6257          "@img/sharp-linux-riscv64": "0.34.5",
6258          "@img/sharp-linux-s390x": "0.34.5",
6259          "@img/sharp-linux-x64": "0.34.5",
6260          "@img/sharp-linuxmusl-arm64": "0.34.5",
6261          "@img/sharp-linuxmusl-x64": "0.34.5",
6262          "@img/sharp-wasm32": "0.34.5",
6263          "@img/sharp-win32-arm64": "0.34.5",
6264          "@img/sharp-win32-ia32": "0.34.5",
6265          "@img/sharp-win32-x64": "0.34.5"
6266        }
6267      },
6268      "node_modules/sharp/node_modules/semver": {
6269        "version": "7.7.4",
6270        "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.4.tgz",
6271        "integrity": "sha512-vFKC2IEtQnVhpT78h1Yp8wzwrf8CM+MzKMHGJZfBtzhZNycRFnXsHk6E5TxIkkMsgNS7mdX3AGB7x2QM2di4lA==",
6272        "license": "ISC",
6273        "optional": true,
6274        "bin": {
6275          "semver": "bin/semver.js"
6276        },
6277        "engines": {
6278          "node": ">=10"
6279        }
6280      },
```
**[REMOVED]**
```
(from line ~6325)
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.1.tgz",
      "integrity": "sha512-mjn/0bi/oUURjc5Xl7IaWi/OJJJumuoJFQJfDDyO46+hBWsfaVM65TBHq2eoZBhzl9EchxOijpkbRC8SVBQU0w==",

```
**[ADDED]**
```
6325        "version": "1.0.0",
6326        "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.0.tgz",
6327        "integrity": "sha512-FCLHtRD/gnpCiCHEiJLOwdmFP+wzCmDEkc9y7NsYxeF4u7Btsn1ZuwgwJGxImImHicJArLP4R0yX4c2KCrMrTA==",
```
**[REMOVED]**
```
(from line ~6332)
        "object-inspect": "^1.13.4"

```
**[ADDED]**
```
6332          "object-inspect": "^1.13.3"
```
**[REMOVED]**
```
(from line ~6380)
    "node_modules/signal-exit": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-4.1.0.tgz",
      "integrity": "sha512-bzyZ1e88w9O1iNJbKnOlvYTrWPDl46O1bG0D3XInv+9tkPrxrN8jUUTiFlDkkmKWgn1M6CfIA13SuGqOa9Korw==",
      "dev": true,
      "license": "ISC",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/slash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/slash/-/slash-3.0.0.tgz",
      "integrity": "sha512-g9Q1haeby36OSStwb4ntCGGGaKsaVSjQ68fBxoQcutl5fS1vuY18H3wSt3jFyFtrkx+Kz0V1G85A4MyAdDMi2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },

```
**[REMOVED]**
```
(from line ~6416)
    "node_modules/streamsearch": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/streamsearch/-/streamsearch-1.1.0.tgz",
      "integrity": "sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg==",
      "engines": {
        "node": ">=10.0.0"
      }
    },

```
**[REMOVED]**
```
(from line ~6425)
    "node_modules/string-width": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-5.1.2.tgz",
      "integrity": "sha512-HnLOCR3vjcY8beoNLtcjZ5/nxn2afmME6lhrDrebokqMap+XbeW8n9TXpPDOqdGK5qcI3oT0GKTW6wC7EMiVqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eastasianwidth": "^0.2.0",
        "emoji-regex": "^9.2.2",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/string-width-cjs": {
      "name": "string-width",
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/string-width-cjs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/string-width/node_modules/ansi-regex": {
      "version": "6.2.2",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.2.2.tgz",
      "integrity": "sha512-Bq3SmSpyFHaWjPk8If9yc6svM8c56dB5BAtW4Qbw5jHTwwXXcTLoRMkpDJp6VL0XzlWaCHTXrkFURMYmD0sLqg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-regex?sponsor=1"
      }
    },
    "node_modules/string-width/node_modules/strip-ansi": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.2.0.tgz",
      "integrity": "sha512-yDPMNjp4WyfYBkHnjIRLfca1i6KMyGCtsVgoKe/z1+6vukgaENdgGBZt+ZmKPc4gavvEZ5OgHfHdrazhgNyG7w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^6.2.2"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/strip-ansi?sponsor=1"
      }
    },

```
**[REMOVED]**
```
(from line ~6538)
    "node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi-cjs": {
      "name": "strip-ansi",
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },

```
**[REMOVED]**
```
(from line ~6562)
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/styled-jsx/-/styled-jsx-5.1.1.tgz",
      "integrity": "sha512-pW7uC1l4mBZ8ugbiZrcIsiIvVx1UmTfw7UkC3Um2tmfUq9Bhk8IiyEIPl6F8agHgjzku6j0xQEZbfA5uSgSaCw==",

```
**[ADDED]**
```
6562        "version": "5.1.6",
6563        "resolved": "https://registry.npmjs.org/styled-jsx/-/styled-jsx-5.1.6.tgz",
6564        "integrity": "sha512-qSVyDTeMotdvQYoHWLNGwRFJHC+i+ZvdBRYosOFgC+Wg1vx4frN2/RG/NA7SYqqvKNLf39P2LSRA2pu6n0XYZA==",
```
**[REMOVED]**
```
(from line ~6573)
        "react": ">= 16.8.0 || 17.x.x || ^18.0.0-0"

```
**[ADDED]**
```
6573          "react": ">= 16.8.0 || 17.x.x || ^18.0.0-0 || ^19.0.0-0"
```
**[REMOVED]**
```
(from line ~6681)
    "node_modules/tailwindcss/node_modules/resolve": {
      "version": "1.22.12",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.12.tgz",
      "integrity": "sha512-TyeJ1zif53BPfHootBGwPRYT1RUt6oGWsaQr8UyZW/eAm9bKoijtvruSDEmZHm92CwS9nj7/fWttqPCgzep8CA==",

```
**[ADDED]**
```
6681      "node_modules/tailwindcss/node_modules/fast-glob": {
6682        "version": "3.3.3",
6683        "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
6684        "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
```
**[REMOVED]**
```
(from line ~6688)
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"

```
**[ADDED]**
```
6688          "@nodelib/fs.stat": "^2.0.2",
6689          "@nodelib/fs.walk": "^1.2.3",
6690          "glob-parent": "^5.1.2",
6691          "merge2": "^1.3.0",
6692          "micromatch": "^4.0.8"
```
**[REMOVED]**
```
(from line ~6694)
      "bin": {
        "resolve": "bin/resolve"
      },

```
**[REMOVED]**
```
(from line ~6695)
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"

```
**[ADDED]**
```
6695          "node": ">=8.6.0"
```
**[REMOVED]**
```
(from line ~6698)
    "node_modules/text-table": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/text-table/-/text-table-0.2.0.tgz",
      "integrity": "sha512-N+8UisAXDGk8PFXP4HAzVR9nbfmVJ3zYLAWiTIoqC5v5isinhr+r5uaO8+7r3BMfuNIufIsA7RdpVgacC2cSpw==",

```
**[ADDED]**
```
6698      "node_modules/tailwindcss/node_modules/fast-glob/node_modules/glob-parent": {
6699        "version": "5.1.2",
6700        "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
6701        "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
```
**[REMOVED]**
```
(from line ~6703)
      "license": "MIT"

```
**[ADDED]**
```
6703        "license": "ISC",
6704        "dependencies": {
6705          "is-glob": "^4.0.1"
6706        },
6707        "engines": {
6708          "node": ">= 6"
6709        }
```
**[REMOVED]**
```
(from line ~6735)
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",

```
**[ADDED]**
```
6735        "version": "0.2.15",
6736        "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.15.tgz",
6737        "integrity": "sha512-j2Zq4NyQYG5XMST4cbs02Ak8iJUdxRM0XI5QyxXuZOzKOINmWurp3smXu3y5wDcJrptwpSjgXHzIQxR0omXljQ==",
```
**[REMOVED]**
```
(from line ~6742)
        "picomatch": "^4.0.4"

```
**[ADDED]**
```
6742          "picomatch": "^4.0.3"
```
**[REMOVED]**
```
(from line ~6770)
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.4.tgz",
      "integrity": "sha512-QP88BAKvMam/3NxH6vj2o21R6MjxZUAd6nlwAS/pnGvN9IVLocLHxGYIzFhg6fUQ+5th6P4dv4eW9jX3DSIj7A==",

```
**[ADDED]**
```
6770        "version": "4.0.3",
6771        "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.3.tgz",
6772        "integrity": "sha512-5gTmgEY/sqK6gFXLIsQNH19lWb4ebPDLA4SdLP7dsWkIXHWlG66oPuVvXSGFPppYZz8ZDZq0dYYrbHfBCVUb1Q==",
```
**[ADDED]**
```
6796      "node_modules/tr46": {
6797        "version": "0.0.3",
6798        "resolved": "https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz",
6799        "integrity": "sha512-N3WMsuqV66lT30CrXNbEjx4GEwlow3v6rr4mCcv6prnfwhS01rkgyFdjPNBYd9br7LpXV1+Emh01fHnq2Gdgrw==",
6800        "license": "MIT"
6801      },
```
**[REMOVED]**
```
(from line ~6803)
      "version": "1.4.3",
      "resolved": "https://registry.npmjs.org/ts-api-utils/-/ts-api-utils-1.4.3.tgz",
      "integrity": "sha512-i3eMG77UTMD0hZhgRS562pv83RC6ukSAC2GMNWc+9dieh/+jDM5u5YG+NHX6VNDRHQcHwmsTHctP9LhbC3WxVw==",

```
**[ADDED]**
```
6803        "version": "2.4.0",
6804        "resolved": "https://registry.npmjs.org/ts-api-utils/-/ts-api-utils-2.4.0.tgz",
6805        "integrity": "sha512-3TaVTaAv2gTiMB35i3FiGJaRfwb3Pyn/j3m/bfAvGe8FB7CF6u+LMYqYlDh7reQf7UNvoTvdfAqHGmPGOSsPmA==",
```
**[REMOVED]**
```
(from line ~6809)
        "node": ">=16"

```
**[ADDED]**
```
6809          "node": ">=18.12"
```
**[REMOVED]**
```
(from line ~6812)
        "typescript": ">=4.2.0"

```
**[ADDED]**
```
6812          "typescript": ">=4.8.4"
```
**[ADDED]**
```
6835      "node_modules/tsconfig-paths/node_modules/json5": {
6836        "version": "1.0.2",
6837        "resolved": "https://registry.npmjs.org/json5/-/json5-1.0.2.tgz",
6838        "integrity": "sha512-g1MWMLBiz8FKi1e4w0UyVL3w+iJceWAFBAaBnnGKOpNa5f8TLktkbre1+s6oICydWAm+HRUGTmI+//xv2hvXYA==",
6839        "dev": true,
6840        "license": "MIT",
6841        "dependencies": {
6842          "minimist": "^1.2.0"
6843        },
6844        "bin": {
6845          "json5": "lib/cli.js"
6846        }
6847      },
```
**[REMOVED]**
```
(from line ~6867)
    "node_modules/type-fest": {
      "version": "0.20.2",
      "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-0.20.2.tgz",
      "integrity": "sha512-Ne+eE4r0/iWnpAxD852z3A+N0Bt5RN//NjJwRd2VFHEmrywxf5vsZlh4R6lixl6B+wz/8d+maTSAkN1FIkI3LQ==",
      "dev": true,
      "license": "(MIT OR CC0-1.0)",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },

```
**[REMOVED]**
```
(from line ~6925)
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/typed-array-length/-/typed-array-length-1.0.8.tgz",
      "integrity": "sha512-phPGCwqr2+Qo0fwniCE8e4pKnGu/yFb5nD5Y8bf0EEeiI5GklnACYA9GFy/DrAeRrKHXvHn+1SUsOWgJp6RO+g==",

```
**[ADDED]**
```
6925        "version": "1.0.7",
6926        "resolved": "https://registry.npmjs.org/typed-array-length/-/typed-array-length-1.0.7.tgz",
6927        "integrity": "sha512-3KS2b+kL7fsuk/eJZ7EQdnEmQoaho/r6KUef7hxvltNA5DR8NAUM+8wJMbJyZ4G9/7i3v5zPBIMN5aybAh2/Jg==",
```
**[REMOVED]**
```
(from line ~6931)
        "call-bind": "^1.0.9",
        "for-each": "^0.3.5",
        "gopd": "^1.2.0",
        "is-typed-array": "^1.1.15",
        "possible-typed-array-names": "^1.1.0",
        "reflect.getprototypeof": "^1.0.10"

```
**[ADDED]**
```
6931          "call-bind": "^1.0.7",
6932          "for-each": "^0.3.3",
6933          "gopd": "^1.0.1",
6934          "is-typed-array": "^1.1.13",
6935          "possible-typed-array-names": "^1.0.0",
6936          "reflect.getprototypeof": "^1.0.6"
```
**[ADDED]**
```
6960      "node_modules/typescript-eslint": {
6961        "version": "8.56.1",
6962        "resolved": "https://registry.npmjs.org/typescript-eslint/-/typescript-eslint-8.56.1.tgz",
6963        "integrity": "sha512-U4lM6pjmBX7J5wk4szltF7I1cGBHXZopnAXCMXb3+fZ3B/0Z3hq3wS/CCUB2NZBNAExK92mCU2tEohWuwVMsDQ==",
6964        "dev": true,
6965        "license": "MIT",
6966        "dependencies": {
6967          "@typescript-eslint/eslint-plugin": "8.56.1",
6968          "@typescript-eslint/parser": "8.56.1",
6969          "@typescript-eslint/typescript-estree": "8.56.1",
6970          "@typescript-eslint/utils": "8.56.1"
6971        },
6972        "engines": {
6973          "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
6974        },
6975        "funding": {
6976          "type": "opencollective",
6977          "url": "https://opencollective.com/typescript-eslint"
6978        },
6979        "peerDependencies": {
6980          "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
6981          "typescript": ">=4.8.4 <6.0.0"
6982        }
6983      },
```
**[REMOVED]**
```
(from line ~7013)
      "dev": true,

```
**[REMOVED]**
```
(from line ~7016)
      "version": "1.12.2",
      "resolved": "https://registry.npmjs.org/unrs-resolver/-/unrs-resolver-1.12.2.tgz",
      "integrity": "sha512-dmlRxBJJayXjqTwC+JtF1HhJmgf3ftQ3YejFcZrf4+KKtJv0qDsK1pjqaaVjG7wJ5NJ6UVP1OqRMQ71Z4C3rxQ==",

```
**[ADDED]**
```
7016        "version": "1.11.1",
7017        "resolved": "https://registry.npmjs.org/unrs-resolver/-/unrs-resolver-1.11.1.tgz",
7018        "integrity": "sha512-bSjt9pjaEBnNiGgc9rUiHGKv5l4/TGzDmYw3RhnkJGtLhbnnA/5qJj7x3dNDCRx/PJxu774LlH8lCOlB4hEfKg==",
```
**[REMOVED]**
```
(from line ~7023)
        "napi-postinstall": "^0.3.4"

```
**[ADDED]**
```
7023          "napi-postinstall": "^0.3.0"
```
**[REMOVED]**
```
(from line ~7029)
        "@unrs/resolver-binding-android-arm-eabi": "1.12.2",
        "@unrs/resolver-binding-android-arm64": "1.12.2",
        "@unrs/resolver-binding-darwin-arm64": "1.12.2",
        "@unrs/resolver-binding-darwin-x64": "1.12.2",
        "@unrs/resolver-binding-freebsd-x64": "1.12.2",
        "@unrs/resolver-binding-linux-arm-gnueabihf": "1.12.2",
        "@unrs/resolver-binding-linux-arm-musleabihf": "1.12.2",
        "@unrs/resolver-binding-linux-arm64-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-arm64-musl": "1.12.2",
        "@unrs/resolver-binding-linux-loong64-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-loong64-musl": "1.12.2",
        "@unrs/resolver-binding-linux-ppc64-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-riscv64-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-riscv64-musl": "1.12.2",
        "@unrs/resolver-binding-linux-s390x-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-x64-gnu": "1.12.2",
        "@unrs/resolver-binding-linux-x64-musl": "1.12.2",
        "@unrs/resolver-binding-openharmony-arm64": "1.12.2",
        "@unrs/resolver-binding-wasm32-wasi": "1.12.2",
        "@unrs/resolver-binding-win32-arm64-msvc": "1.12.2",
        "@unrs/resolver-binding-win32-ia32-msvc": "1.12.2",
        "@unrs/resolver-binding-win32-x64-msvc": "1.12.2"

```
**[ADDED]**
```
7029          "@unrs/resolver-binding-android-arm-eabi": "1.11.1",
7030          "@unrs/resolver-binding-android-arm64": "1.11.1",
7031          "@unrs/resolver-binding-darwin-arm64": "1.11.1",
7032          "@unrs/resolver-binding-darwin-x64": "1.11.1",
7033          "@unrs/resolver-binding-freebsd-x64": "1.11.1",
7034          "@unrs/resolver-binding-linux-arm-gnueabihf": "1.11.1",
7035          "@unrs/resolver-binding-linux-arm-musleabihf": "1.11.1",
7036          "@unrs/resolver-binding-linux-arm64-gnu": "1.11.1",
7037          "@unrs/resolver-binding-linux-arm64-musl": "1.11.1",
7038          "@unrs/resolver-binding-linux-ppc64-gnu": "1.11.1",
7039          "@unrs/resolver-binding-linux-riscv64-gnu": "1.11.1",
7040          "@unrs/resolver-binding-linux-riscv64-musl": "1.11.1",
7041          "@unrs/resolver-binding-linux-s390x-gnu": "1.11.1",
7042          "@unrs/resolver-binding-linux-x64-gnu": "1.11.1",
7043          "@unrs/resolver-binding-linux-x64-musl": "1.11.1",
7044          "@unrs/resolver-binding-wasm32-wasi": "1.11.1",
7045          "@unrs/resolver-binding-win32-arm64-msvc": "1.11.1",
7046          "@unrs/resolver-binding-win32-ia32-msvc": "1.11.1",
7047          "@unrs/resolver-binding-win32-x64-msvc": "1.11.1"
```
**[ADDED]**
```
7097      "node_modules/web-streams-polyfill": {
7098        "version": "4.0.0-beta.3",
7099        "resolved": "https://registry.npmjs.org/web-streams-polyfill/-/web-streams-polyfill-4.0.0-beta.3.tgz",
7100        "integrity": "sha512-QW95TCTaHmsYfHDybGMwO5IJIM93I/6vTRk+daHTWFPhwh+C8Cg7j7XyKrwrj8Ib6vYXe0ocYNrmzY4xAAN6ug==",
7101        "license": "MIT",
7102        "engines": {
7103          "node": ">= 14"
7104        }
7105      },
7106      "node_modules/webidl-conversions": {
7107        "version": "3.0.1",
7108        "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-3.0.1.tgz",
7109        "integrity": "sha512-2JAn3z8AR6rjK8Sm8orRC0h/bcl/DqL7tRPdGZ4I1CjdF+EaMLmYxBHyXuKL849eucPFhvBoxMsflfOb8kxaeQ==",
7110        "license": "BSD-2-Clause"
7111      },
7112      "node_modules/whatwg-url": {
7113        "version": "5.0.0",
7114        "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-5.0.0.tgz",
7115        "integrity": "sha512-saE57nupxk6v3HY35+jzBwYa0rKSy0XR8JSxZPwgLr7ys0IBzhGviA1/TUGJLmSVqs8pb9AnvICXEuOHLprYTw==",
7116        "license": "MIT",
7117        "dependencies": {
7118          "tr46": "~0.0.3",
7119          "webidl-conversions": "^3.0.0"
7120        }
7121      },
```
**[REMOVED]**
```
(from line ~7213)
      "version": "1.1.21",
      "resolved": "https://registry.npmjs.org/which-typed-array/-/which-typed-array-1.1.21.tgz",
      "integrity": "sha512-zbRA8cVm6io/d5W8uIe2hblzN76/Wm3v/yiythQvr+dpBWeqhPSWIDNj4zOyHi4zKbMK6DN34Xsr9jPHJERAEw==",

```
**[ADDED]**
```
7213        "version": "1.1.20",
7214        "resolved": "https://registry.npmjs.org/which-typed-array/-/which-typed-array-1.1.20.tgz",
7215        "integrity": "sha512-LYfpUkmqwl0h9A2HL09Mms427Q1RZWuOHsukfVcKRq9q95iQxdw0ix1JQrqbcDR9PH1QDwf5Qo8OZb5lksZ8Xg==",
```
**[REMOVED]**
```
(from line ~7220)
        "call-bind": "^1.0.9",

```
**[ADDED]**
```
7220          "call-bind": "^1.0.8",
```
**[REMOVED]**
```
(from line ~7244)
    "node_modules/wrap-ansi": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-8.1.0.tgz",
      "integrity": "sha512-si7QWI6zUMq56bESFvagtmzMdGOtoxfR+Sez11Mobfc7tm+VkUckk9bW2UeffTGVUbOksxmSw0AA2gs8g71NCQ==",
      "dev": true,

```
**[ADDED]**
```
7244      "node_modules/ws": {
7245        "version": "8.19.0",
7246        "resolved": "https://registry.npmjs.org/ws/-/ws-8.19.0.tgz",
7247        "integrity": "sha512-blAT2mjOEIi0ZzruJfIhb3nps74PRWTCz1IjglWEEpQl5XS/UNama6u2/rjFkDDouqr4L67ry+1aGIALViWjDg==",
```
**[REMOVED]**
```
(from line ~7249)
      "dependencies": {
        "ansi-styles": "^6.1.0",
        "string-width": "^5.0.1",
        "strip-ansi": "^7.0.1"
      },

```
**[REMOVED]**
```
(from line ~7250)
        "node": ">=12"

```
**[ADDED]**
```
7250          "node": ">=10.0.0"
```
**[REMOVED]**
```
(from line ~7252)
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs": {
      "name": "wrap-ansi",
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"

```
**[ADDED]**
```
7252        "peerDependencies": {
7253          "bufferutil": "^4.0.1",
7254          "utf-8-validate": ">=5.0.2"
```
**[REMOVED]**
```
(from line ~7256)
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"

```
**[ADDED]**
```
7256        "peerDependenciesMeta": {
7257          "bufferutil": {
7258            "optional": true
7259          },
7260          "utf-8-validate": {
7261            "optional": true
7262          }
```
**[REMOVED]**
```
(from line ~7265)
    "node_modules/wrap-ansi-cjs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/wrap-ansi-cjs/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dev": true,

```
**[ADDED]**
```
7265      "node_modules/xmlbuilder": {
7266        "version": "10.1.1",
7267        "resolved": "https://registry.npmjs.org/xmlbuilder/-/xmlbuilder-10.1.1.tgz",
7268        "integrity": "sha512-OyzrcFLL/nb6fMGHbiRDuPup9ljBycsdCypwuyg5AAHvyWzGfChJpCXMG88AGTIMFhGZ9RccFN1e6lhg3hkwKg==",
```
**[REMOVED]**
```
(from line ~7270)
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },

```
**[REMOVED]**
```
(from line ~7271)
        "node": ">=8"

```
**[ADDED]**
```
7271          "node": ">=4.0"
```
**[REMOVED]**
```
(from line ~7274)
    "node_modules/wrap-ansi/node_modules/ansi-regex": {
      "version": "6.2.2",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.2.2.tgz",
      "integrity": "sha512-Bq3SmSpyFHaWjPk8If9yc6svM8c56dB5BAtW4Qbw5jHTwwXXcTLoRMkpDJp6VL0XzlWaCHTXrkFURMYmD0sLqg==",

```
**[ADDED]**
```
7274      "node_modules/yallist": {
7275        "version": "3.1.1",
7276        "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
7277        "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
```
**[REMOVED]**
```
(from line ~7279)
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-regex?sponsor=1"
      }

```
**[ADDED]**
```
7279        "license": "ISC"
```
**[REMOVED]**
```
(from line ~7281)
    "node_modules/wrap-ansi/node_modules/ansi-styles": {
      "version": "6.2.3",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-6.2.3.tgz",
      "integrity": "sha512-4Dj6M28JB+oAH8kFkTLUo+a2jwOFkuqb3yucU0CANcRRUbxS0cP0nZYCGjcc3BNXwRIsUVmDGgzawme7zvJHvg==",

```
**[ADDED]**
```
7281      "node_modules/yocto-queue": {
7282        "version": "0.1.0",
7283        "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
7284        "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
```
**[REMOVED]**
```
(from line ~7288)
        "node": ">=12"

```
**[ADDED]**
```
7288          "node": ">=10"
```
**[REMOVED]**
```
(from line ~7291)
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"

```
**[ADDED]**
```
7291          "url": "https://github.com/sponsors/sindresorhus"
```
**[REMOVED]**
```
(from line ~7294)
    "node_modules/wrap-ansi/node_modules/strip-ansi": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.2.0.tgz",
      "integrity": "sha512-yDPMNjp4WyfYBkHnjIRLfca1i6KMyGCtsVgoKe/z1+6vukgaENdgGBZt+ZmKPc4gavvEZ5OgHfHdrazhgNyG7w==",
      "dev": true,

```
**[ADDED]**
```
7294      "node_modules/zod": {
7295        "version": "3.25.76",
7296        "resolved": "https://registry.npmjs.org/zod/-/zod-3.25.76.tgz",
7297        "integrity": "sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ==",
7298        "devOptional": true,
```
**[REMOVED]**
```
(from line ~7300)
      "dependencies": {
        "ansi-regex": "^6.2.2"
      },
      "engines": {
        "node": ">=12"
      },

```
**[ADDED]**
```
7300        "peer": true,
```
**[REMOVED]**
```
(from line ~7302)
        "url": "https://github.com/chalk/strip-ansi?sponsor=1"

```
**[ADDED]**
```
7302          "url": "https://github.com/sponsors/colinhacks"
```
**[REMOVED]**
```
(from line ~7305)
    "node_modules/wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",

```
**[ADDED]**
```
7305      "node_modules/zod-validation-error": {
7306        "version": "4.0.2",
7307        "resolved": "https://registry.npmjs.org/zod-validation-error/-/zod-validation-error-4.0.2.tgz",
7308        "integrity": "sha512-Q6/nZLe6jxuU80qb/4uJ4t5v2VEZ44lzQjPDhYJNztRQ4wyWc6VF3D3Kb/fAuPetZQnhS3hnajCf9CsWesghLQ==",
```
**[REMOVED]**
```
(from line ~7310)
      "license": "ISC"
    },
    "node_modules/xmlbuilder": {
      "version": "10.1.1",
      "resolved": "https://registry.npmjs.org/xmlbuilder/-/xmlbuilder-10.1.1.tgz",
      "integrity": "sha512-OyzrcFLL/nb6fMGHbiRDuPup9ljBycsdCypwuyg5AAHvyWzGfChJpCXMG88AGTIMFhGZ9RccFN1e6lhg3hkwKg==",

```
**[REMOVED]**
```
(from line ~7312)
        "node": ">=4.0"
      }
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"

```
**[ADDED]**
```
7312          "node": ">=18.0.0"
```
**[REMOVED]**
```
(from line ~7314)
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"

```
**[ADDED]**
```
7314        "peerDependencies": {
7315          "zod": "^3.25.0 || ^4.0.0"
```
**[REMOVED]**
```
(from line ~7319)
}

```
**[ADDED]**
```
7319  }
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\tsconfig.json
*Saved at: 6/1/2026, 12:44:18 PM*

**[REMOVED]**
```
(from line ~4)
    "ignoreDeprecations": "6.0",

```
**[REMOVED]**
```
(from line ~41)
}

```
**[ADDED]**
```
41    }
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\package.json
*Saved at: 6/1/2026, 12:44:07 PM*

**[REMOVED]**
```
(from line ~12)
    "@supabase/ssr": "^0.5.0",
    "@supabase/supabase-js": "^2.45.0",
    "clsx": "^2.1.1",

```
**[ADDED]**
```
12        "next": "14.2.5",
13        "react": "^18",
14        "react-dom": "^18",
```
**[REMOVED]**
```
(from line ~18)
    "next": "^9.3.3",

```
**[REMOVED]**
```
(from line ~19)
    "react": "^18",
    "react-dom": "^18",
    "tailwind-merge": "^2.4.0"

```
**[ADDED]**
```
19        "clsx": "^2.1.1",
20        "tailwind-merge": "^2.4.0",
21        "@supabase/supabase-js": "^2.45.0",
22        "@supabase/ssr": "^0.5.0"
```
**[ADDED]**
```
25        "typescript": "^5",
```
**[ADDED]**
```
29        "tailwindcss": "^3.4.1",
30        "postcss": "^8",
```
**[REMOVED]**
```
(from line ~33)
    "eslint-config-next": "^16.2.6",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"

```
**[ADDED]**
```
33        "eslint-config-next": "14.2.5"
```
**[REMOVED]**
```
(from line ~35)
}

```
**[ADDED]**
```
35    }
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\tsconfig.json
*Saved at: 6/1/2026, 12:29:47 PM*

**[ADDED]**
```
4         "ignoreDeprecations": "6.0",
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\.env.local
*Saved at: 6/1/2026, 10:06:20 AM*

**[REMOVED]**
```
(from line ~7)
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_rAmb2bWgxsQrj8c7PFz4zw_bpkZMSNV
```
**[ADDED]**
```
7     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuaHdnbmlua2phZmNkamRxbHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MjczOTEsImV4cCI6MjA4ODEwMzM5MX0.5aZAJDgyy9q4OvaNclybyPV5sNIVkYdmllxMKUIEpwc
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\.env.local
*Saved at: 6/1/2026, 10:06:04 AM*

**[REMOVED]**
```
(from line ~7)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```
**[ADDED]**
```
7     NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_rAmb2bWgxsQrj8c7PFz4zw_bpkZMSNV
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\context\AuthContext.tsx
*Saved at: 6/1/2026, 10:04:18 AM*

**[REMOVED]**
```
(from line ~5)
// Avoid direct dependency on @supabase/supabase-js types to prevent
// "Cannot find module '@supabase/supabase-js'" type errors in some setups.
// Provide minimal local type declarations compatible with usage in this file.
type User = { [key: string]: any } | null;
type Session = { user?: User } | null;

```
**[ADDED]**
```
5     import { User, Session } from '@supabase/supabase-js';
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\context\AuthContext.tsx
*Saved at: 6/1/2026, 10:03:59 AM*

**[REMOVED]**
```
(from line ~5)
import type { User, Session } from '@supabase/supabase-js';

```
**[ADDED]**
```
5     // Avoid direct dependency on @supabase/supabase-js types to prevent
6     // "Cannot find module '@supabase/supabase-js'" type errors in some setups.
7     // Provide minimal local type declarations compatible with usage in this file.
8     type User = { [key: string]: any } | null;
9     type Session = { user?: User } | null;
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\context\AuthContext.tsx
*Saved at: 6/1/2026, 10:03:36 AM*

**[REMOVED]**
```
(from line ~5)
import { User, Session } from '@supabase/supabase-js';

```
**[ADDED]**
```
5     import type { User, Session } from '@supabase/supabase-js';
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\.env.local
*Saved at: 6/1/2026, 10:01:39 AM*

**[ADDED]**
```
6     NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
7     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\lib\latexTemplate.ts
*Saved at: 5/29/2026, 4:22:38 PM*

**[REMOVED]**
```
(from line ~109)
      ? `\n\\textbar{\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`

```
**[ADDED]**
```
109         ? `\n\\textbar{} {\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\lib\latexTemplate.ts
*Saved at: 5/29/2026, 4:22:15 PM*

**[REMOVED]**
```
(from line ~109)
      ? `\n\\textbar{} {\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`

```
**[ADDED]**
```
109         ? `\n\\textbar{\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\lib\latexTemplate.ts
*Saved at: 5/29/2026, 4:22:02 PM*

**[REMOVED]**
```
(from line ~111)
    return `\\textbf{} {${esc(p.name)}}${techPart}${ghLink}${liveLink}\n${bulletList(p.bullets)}`;

```
**[ADDED]**
```
111       return `\\textbf{${esc(p.name)}}${techPart}${ghLink}${liveLink}\n${bulletList(p.bullets)}`;
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\lib\latexTemplate.ts
*Saved at: 5/29/2026, 4:21:46 PM*

**[REMOVED]**
```
(from line ~111)
    return `\\textbf{] {${esc(p.name)}}${techPart}${ghLink}${liveLink}\n${bulletList(p.bullets)}`;

```
**[ADDED]**
```
111       return `\\textbf{} {${esc(p.name)}}${techPart}${ghLink}${liveLink}\n${bulletList(p.bullets)}`;
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\lib\latexTemplate.ts
*Saved at: 5/29/2026, 4:21:02 PM*

**[REMOVED]**
```
(from line ~111)
    return `\\textbf{${esc(p.name)}}${techPart}${ghLink}${liveLink}\n${bulletList(p.bullets)}`;

```
**[ADDED]**
```
111       return `\\textbf{] {${esc(p.name)}}${techPart}${ghLink}${liveLink}\n${bulletList(p.bullets)}`;
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\lib\latexTemplate.ts
*Saved at: 5/29/2026, 4:20:31 PM*

**[REMOVED]**
```
(from line ~109)
      ? `\n\\textbar{}{\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`

```
**[ADDED]**
```
109         ? `\n\\textbar{} {\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`
```

---

### 📄 c:\Users\ELaunch\OneDrive\nitin-p\latex-resume-builder\src\lib\latexTemplate.ts
*Saved at: 5/29/2026, 4:20:30 PM*

**[REMOVED]**
```
(from line ~109)
      ? `\n\\textbar{\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`

```
**[ADDED]**
```
109         ? `\n\\textbar{}{\\href{${p.liveUrl}}{\\textcolor{blue!70!black}{Live Link}}}`
```

---

### 📄 c:\Users\ELaunch\AppData\Local\Temp\BvSshSftp-20YEH98H\AGUHW7Q2\68QY7PVC\mongo_tool.py
*Saved at: 4/7/2026, 10:13:03 AM*

**[REMOVED]**
```
(from line ~221)
        api_key=openai_api_key,s

```
**[ADDED]**
```
221           api_key=openai_api_key,
```

---

### 📄 c:\Users\ELaunch\AppData\Local\Temp\BvSshSftp-20YEH98H\AGUHW7Q2\68QY7PVC\mongo_tool.py
*Saved at: 4/7/2026, 10:13:02 AM*

**[REMOVED]**
```
(from line ~221)
        api_key=openai_api_key,

```
**[ADDED]**
```
221           api_key=openai_api_key,s
```

---

