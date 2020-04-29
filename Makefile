DESTDIR=/opt/
NPM=/usr/local/bin/npm

all: app/node_modules

app/node_modules: app/package.json
	cd app && $(NPM) install
	patch -u app/node_modules/mdns/lib/browser.js < mdns-browser.patch
	patch -u app/node_modules/google-home-notifier/package.json < google-tts-api.patch
	cd app/node_modules/google-home-notifier && $(NPM) update google-tts-api

install:
	mkdir -p $(DESTDIR)/line2google
	cp -r app/* $(DESTDIR)/line2google/
