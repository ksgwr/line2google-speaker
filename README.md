# line2google-speaker
raspberry pi上でLINEとGoogleNestHubと連携するためのスクリプト郡

## Build

```
$ sudo apt-get install nodejs npm
$ sudo npm install n -g
$ sudo n stable
// restart shell
$ sudo apt-get install libavahi-compat-libdnssd-dev
// for node-gyp build error : Not found dns_sd.h

$ vim app/secrets.json
// setup configuration

$ sudo apt-get install devscripts cdbs
$ dpkg-buildpackage -us -uc
$ ls ../line2google*.deb
```

debuild = dpkg-buildpackage + lintian
node_modulesはlintianを突破できないのでパッケージをあげることはできない

### Debug Package

```
$ dpkg -c ../line2google*.deb
```

## Install

```
$ sudo dpkg -i ../line2google_*_all.deb
$ ls /opt/line2google 
```

## UnInstall

```
$ sudo dpkg -r line2google
```

## Restart App

```
$ sudo systemctl restart line2google
```

## Check Log
```
$ sudo journalctl
```
