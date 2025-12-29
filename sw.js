// バージョン管理（更新時はここを v2, v3 と変えてください）
[span_5](start_span)[span_6](start_span)const CACHE_NAME = 'app-v1';[span_5](end_span)[span_6](end_span)

// ここにアイコンのファイル名を追加します
[span_7](start_span)[span_8](start_span)const ASSETS_TO_CACHE = [[span_7](end_span)[span_8](end_span)
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// インストール処理
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      [span_9](start_span)[span_10](start_span)return cache.addAll(ASSETS_TO_CACHE);[span_9](end_span)[span_10](end_span)
    })
  );
  [span_11](start_span)[span_12](start_span)self.skipWaiting();[span_11](end_span)[span_12](end_span)
});

// アクティベート（古いキャッシュを削除）
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            [span_13](start_span)[span_14](start_span).map((key) => caches.delete(key))[span_13](end_span)[span_14](end_span)
      );
    })
  );
  [span_15](start_span)self.clients.claim();[span_15](end_span)
});

// フェッチ（キャッシュ優先戦略）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      [span_16](start_span)[span_17](start_span)return response || fetch(event.request);[span_16](end_span)[span_17](end_span)
    })
  );
});
