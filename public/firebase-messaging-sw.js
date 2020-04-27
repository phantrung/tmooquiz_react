importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');
firebase.initializeApp({
    messagingSenderId: "399374294024"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // // Customize Notification here
    // const notificationTitle = 'Background Message Title';
    // const notificationOptions = {
    //     body: 'Background Message body.',
    //     icon: '/firebase-logo.png'
    // };
    //
    // return self.registration.showNotification(notificationTitle,
    //     notificationOptions);
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            console.log(windowClients)
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return self.registration.showNotification("New Notifcation");
        });
    return promiseChain;
});

self.addEventListener('notificationclick', function(event) {
    let url = 'https://example.com/some-path/';
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});

