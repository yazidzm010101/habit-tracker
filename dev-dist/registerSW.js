if('serviceWorker' in navigator) navigator.serviceWorker.register('/habit-trackerdev-sw.js?dev-sw', { scope: '/habit-tracker', type: 'classic' })